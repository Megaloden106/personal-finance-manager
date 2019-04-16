const db = require('./database');

const helpers = {
  getOptions({ limit, offset, sort }) {
    let query = '';
    if (limit) query += ` LIMIT ${limit}`;
    if (offset) query += ` OFFSET ${limit}`;
    if (sort) query += Array.isArray(sort) ? sort.join(', ') : sort;
    return query;
  },
  joinValues(vals) {
    return Object.values(vals).reduce((acc, curr, i) => {
      let result = acc;
      if (i !== 0) result += ', ';
      result += typeof curr === 'string' ? `'${curr}'` : curr;
      return result;
    }, '');
  },
  getConditions(keys, vals, target) {
    const table = target ? `${target}.` : '';
    const results = [];
    // key OPERATOR value AND/OR key OPERATOR value
    for (let i = 0; i < keys.length; i += 1) {
      const hasOr = Object.keys(vals[i]).includes('or');
      if (keys[i] === 'or') {
        const orConditions = [];
        vals[i].forEach((condition) => {
          const prop = Object.keys(condition)[0];
          const operation = helpers.getOperation(Object.values(condition)[0]);
          orConditions.push(` ${table}${prop} ${operation}`);
        });
        results.push(orConditions.join(' OR'));
      } else if (hasOr) {
        const orKeys = Object.keys(vals[i].or);
        const orVals = Object.values(vals[i].or);
        const orConditions = orKeys
          .map((key, j) => {
            const operation = helpers.getOperation({ [key]: orVals[j] });
            return ` ${table}${keys[i]} ${operation}`;
          }).join(' OR');
        results.push(orConditions);
      } else {
        const andKeys = Object.keys(vals[i]);
        if (typeof vals[i] === 'object' && andKeys.length > 1) {
          const andVals = Object.values(vals[i]);
          andKeys.forEach((key, j) => {
            const operation = helpers.getOperation({ [key]: andVals[j] });
            results.push(` ${table}${keys[i]} ${operation}`);
          });
        } else {
          const operation = helpers.getOperation(vals[i]);
          results.push(` ${table}${keys[i]} ${operation}`);
        }
      }
    }
    return results.join(' AND');
  },
  getOperation(condition) {
    const prop = typeof condition === 'object'
      ? Object.keys(condition)[0]
      : condition;
    const value = typeof condition[prop] === 'string'
      ? `'${condition[prop]}'`
      : condition[prop];
    switch (prop) {
      case '<':
      case 'lt':
        return `< ${value}`;
      case '<=':
      case 'lt=':
        return `<= ${value}`;
      case '>':
      case 'gt':
        return `> ${value}`;
      case '>=':
      case 'gte':
        return `>= ${value}`;
      case '!=':
      case 'ne':
        if (value === null) return 'NOT NULL';
        return `!= ${value}`;
      case '=':
      case 'eq':
        if (value === null) return 'IS NULL';
        return `= ${value}`;
      case 'btwn':
        return `BETWEEN ${condition[prop].join(' AND')}`;
      case 'nbtwn':
        return `NOT BETWEEN ${condition[prop].join(' AND')}`;
      case 'like':
        return `LIKE ${value}`;
      case 'nlike':
        return `NOT LIKE ${value}`;
      case 'ilike':
        return `ILIKE ${value}`;
      case 'nilike':
        return `NOT ILIKE ${value}`;
      case 'startsWith':
        return `LIKE '${condition[prop]}%'`;
      case 'endsWith':
        return `LIKE '%${condition[prop]}'`;
      case 'substring':
        return `LIKE '%${condition[prop]}%'`;
      default:
        return `= ${prop}`;
    }
  },
};

class Model {
  constructor(table, columns) {
    this.table = table;
    this.columns = columns;

    // query executor
    this.exec = query => db.any(query);

    // temp destroy, but does nothing
    this.destroy = () => null;
  }

  _getAttributes({ model, attr, include }) {
    const results = [];
    const table = model && model.table;
    if (attr !== null) results.push(this._getTableAttributes(attr, table));

    // recursive base case need the include object
    if (!include) return results;

    // DFS recursive call for single/multiple children
    if (Array.isArray(include)) {
      include.forEach(join => results.push(...this._getAttributes(join)));
      return results;
    }
    return results.concat(this._getAttributes(include));
  }

  _getTableAttributes(attributes, table = this.table) {
    if (attributes === undefined) return `${table}.*`;
    if (Array.isArray(attributes)) return attributes.map(prop => `${table}.${prop}`).join(', ');
    return ` ${table}.${attributes}`;
  }

  _getJoins(target, joins) {
    // recursive base case no joins
    if (!joins) return [];
    const table = target.table || this.table;

    // DFS for both single/multiple children
    if (Array.isArray(joins)) {
      const results = [];
      joins.forEach(join => results.push(this._getTableJoins(join, table)));
      return results;
    }
    return [this._getTableJoins(joins, table)];
  }

  _getTableJoins({ model, where, include }, target) {
    const results = [];
    const key = Object.keys(where)[0];
    const value = Object.values(where)[0];
    results.push(` JOIN ${model.table} ON ${target}.${value} = ${model.table}.${key}`);
    if (include) results.push(...this._getJoins(model, include));
    return results;
  }

  // CRU api routes
  create(initValues) {
    const { joinValues } = helpers;
    let query = `INSERT INTO ${this.table} `;

    const keys = Object.keys(initValues).join(', ');
    const vals = joinValues(initValues);
    query += `(${keys}) VALUES (${vals})`;

    return this.exec(`${query};`);
  }

  find(criteria = {}) {
    if (Object.entries(criteria).length === 0 && criteria.constructor === Object) {
      return this.exec(`SELECT * FROM ${this.table};`);
    }

    let query = 'SELECT';
    const { getConditions, getOptions } = helpers;
    const hasJoin = criteria.where && criteria.include;

    // ATTRIBUTES
    if (hasJoin) query += `${this._getAttributes(criteria).join(',')}`;
    else query += ' *';
    query += ` FROM ${this.table}`;

    // JOIN
    if (hasJoin) query += this._getJoins(criteria, criteria.include).join('');

    // CONDITION
    const where = criteria.where || criteria;
    const keys = Object.keys(where);
    const vals = Object.values(where);
    if (keys.length > 0) {
      query += ` WHERE${getConditions(keys, vals, hasJoin && this.table)}`;
    }

    // OPTIONS
    if (criteria.where) query += getOptions(criteria);

    return this.exec(`${query};`);
  }

  async findOne(criteria = {}) {
    const res = criteria.where
      ? await this.find({ ...criteria, limit: 1 })
      : await this.find({ where: criteria, limit: 1 });
    return res[0];
  }

  update(newValues, criteria) {
    let query = `UPDATE ${this.table} `;

    // NEW VALS
    const keys1 = Object.keys(newValues).join(', ');
    const vals1 = helpers.joinValues(newValues);
    query += `SET (${keys1}) = (${vals1})`;

    // CONDITION
    const { getConditions } = helpers;
    const where = criteria.where || criteria;
    const keys = Object.keys(where);
    const vals = Object.values(where);
    if (keys.length > 0) {
      query += ` WHERE${getConditions(keys, vals)}`;
    }

    return this.exec(`${query};`);
  }
}

module.exports = Model;
