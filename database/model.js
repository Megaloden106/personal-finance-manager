const db = require('./database');

const helpers = {
  appendVal(val) {
    if (typeof val === 'string') {
      return `'${val}'`;
    }
    return val;
  },
  appendCriteria(keys, vals) {
    let result = '';
    for (let i = 0; i < keys.length; i += 1) {
      result += i === 0 ? ' WHERE ' : ' AND ';
      result += `${keys[i]} = `;
      result += helpers.appendVal(vals[i]);
    }
    return result;
  },
  appendOptions(options) {
    let result = '';
    if (options.ORDERBY) {
      const key = Object.keys(options.ORDERBY)[0];
      result += ` ORDER BY ${key} ${options.ORDERBY[key]}`;
    }
    if (options.LIMIT) {
      result += ` LIMIT ${options.LIMIT}`;
    }
    return result;
  },
  joinValues(vals) {
    return Object.values(vals).reduce((acc, curr, i) => {
      let result = acc;
      if (i !== 0) result += ', ';
      result += helpers.appendVal(curr);

      return result;
    }, '');
  },
};

class Model {
  constructor(table, columns) {
    this.table = table;
    this.columns = columns;
  }

  create(initValues) {
    let query = `INSERT INTO ${this.table} `;

    const keys = Object.keys(initValues).join(', ');
    const vals = helpers.joinValues(initValues);
    query += `(${keys}) VALUES (${vals})`;

    return db.any(`${query};`);
  }

  find(criteria = {}, options) {
    let query = `SELECT * FROM ${this.table}`;

    const keys = Object.keys(criteria);
    const vals = Object.values(criteria);
    if (keys.length > 0) query += helpers.appendCriteria(keys, vals);

    query += helpers.appendOptions(options);

    return db.any(`${query};`);
  }

  async findOne(criteria = {}, options) {
    const res = await this.find(criteria, Object.assign(options, { LIMIT: 1 }));
    return res[0];
  }

  update(criteria, newValues) {
    let query = `UPDATE ${this.table} `;

    const keys1 = Object.keys(newValues).join(', ');
    const vals1 = helpers.joinValues(newValues);
    query += `SET (${keys1}) = (${vals1})`;

    const keys2 = Object.keys(criteria);
    const vals2 = Object.values(criteria);
    query += helpers.appendCriteria(keys2, vals2);

    return db.any(`${query};`);
  }
}

module.exports = Model;
