import db from './database';
import helpers from './helpers';

class Schema {
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

module.exports = Schema;
