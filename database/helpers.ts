export default {
  getOptions({ limit, offset, sort }:): string {
    let query = '';
    if (limit) query += ` LIMIT ${limit}`;
    if (offset) query += ` OFFSET ${offset}`;
    if (sort) query += Array.isArray(sort) ? sort.join(', ') : sort;
    return query;
  },

  joinValues(vals: ):string {
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