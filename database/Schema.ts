import db from './database';

const regExp = /;|'|--|\/\*|\*\/|xp_|`/g;

enum Union {
  or = 'or',
  and = 'and',
}

enum Operation {
  lt = 'lt',
  '<' = '<',
  lte = 'lte',
  '<=' = '<=',
  gt = 'gt',
  '>' = '>',
  gte = 'gte',
  '>=' = '>=',
  'eq' = 'eq',
  '=' = '=',
  ne = 'ne',
  '!=' = '!=',
  btwn = 'btwn',
  nbtwn = 'nbtwn',
  like = 'like',
  nlike = 'nlike',
  ilike = 'ilike',
  nilike = 'nilike',
  startsWith = 'startsWith',
  endsWith = 'endsWith',
  substring = 'substring',
}

type Order = string | Schema | Model;

interface Option {
  limit?: number;
  offset?: number;
  order?: Order[]; // [Schema,] column,  direction
}

interface Query {
  attributes?: string[];
  include?: Model[];
  where?: any;
}

type Criteria = Query & Option;

interface Model extends Query {
  as?: string;
  model?: Schema;
  parent?: string; // parent tablename
  // where?: any; key = child, value = parent
}

export default class Schema {
  private tableName: string;
  private values: any[];
  private execute: Function;
  private sanitize: Function;
  private getOptions: Function;
  private getOperations: Function;

  public constructor(tableName: string) {
    this.tableName = tableName;
    this.values = [];

    this.execute = (query: string, values: string[]): Promise<any> => {
      this.values = [];
      if (values) {
        return db.any(query, values);
      }
      return db.any(query);
    };

    this.sanitize = (input): any => {
      if (typeof input === 'string') {
        return input.replace(regExp, '');
      }
      return input;
    };

    this.getOptions = ({ limit, offset, order }: Option): string => {
      let result = '';
      if (limit) {
        this.values.push(this.sanitize(limit));
        result += `\nLIMIT $${this.values.length}`;
      }
      if (offset) {
        this.values.push(this.sanitize(offset));
        result += `\nOFFSET $${this.values.length}`;
      }
      if (order) {
        if (order.length === 2) {
          result += `\nORDERBY ${this.sanitize(order.join(' '))}`;
        } else if (order.length > 2) {
          result += '\nORDERBY ';
          const sortBy = order.slice(-2).join(' ');
          const sorts: string[] = [];
          for (let i = 0; i < order.length - 2; i += 1) {
            if ((order[i] as Schema).tableName) {
              sorts.push(`${(order[i] as Schema).tableName}.${this.sanitize(sortBy)}`);
            } else {
              sorts.push(`${(order[i] as Model).as}.${this.sanitize(sortBy)}`);
            }
          }
          result += sorts.join(', ');
        }
      }
      return result;
    };

    this.getOperations = (column, condition): string[] => {
      if (typeof condition !== 'object') {
        return [`${column} = ${condition}`];
      }

      const operations = [];
      const keys: string[] = Object.keys(condition);
      const values: any[] = Object.values(condition)
        .map((value): any => this.sanitize(value));

      keys.forEach((operation: Operation | Union, i): void => {
        switch (operation) {
          case Operation['<']:
          case Operation.lt:
            this.values.push(values[i]);
            operations.push(`${column} < $${this.values.length}`);
            break;
          case Operation['<=']:
          case Operation.lte:
            this.values.push(values[i]);
            operations.push(`${column} <= $${this.values.length}`);
            break;
          case Operation['>']:
          case Operation.gt:
            this.values.push(values[i]);
            operations.push(`${column} > $${this.values.length}`);
            break;
          case Operation['>=']:
          case Operation.gte:
            this.values.push(values[i]);
            operations.push(`${column} >= $${this.values.length}`);
            break;
          case Operation['!=']:
          case Operation.ne:
            if (values[i] === null) operations.push(`${column} NOT NULL`);
            else {
              this.values.push(values[i]);
              operations.push(`${column} != $${this.values.length}`);
            }
            break;
          case Operation['=']:
          case Operation.eq:
            if (values[i] === null) operations.push(`${column} IS NULL`);
            else {
              this.values.push(values[i]);
              operations.push(`${column} = $${this.values.length}`);
            }
            break;
          case Operation.btwn:
            this.values.push(...values[i]);
            operations.push(`${column} BETWEEN $${this.values.length - 1} AND $${this.values.length}`);
            break;
          case Operation.nbtwn:
            this.values.push(...values[i]);
            operations.push(`${column} NOT BETWEEN $${this.values.length - 1} AND $${this.values.length}`);
            break;
          case Operation.like:
            this.values.push(values[i]);
            operations.push(`${column} LIKE $${this.values.length}`);
            break;
          case Operation.nlike:
            this.values.push(values[i]);
            operations.push(`${column} NOT LIKE $${this.values.length}`);
            break;
          case Operation.ilike:
            this.values.push(values[i]);
            operations.push(`${column} ILIKE $${this.values.length}`);
            break;
          case Operation.nilike:
            this.values.push(values[i]);
            operations.push(`${column} NOT ILIKE $${this.values.length}`);
            break;
          case Operation.startsWith:
            this.values.push(`${values[i]}%`);
            operations.push(`${column} LIKE $${this.values.length}`);
            break;
          case Operation.endsWith:
            this.values.push(`%${values[i]}`);
            operations.push(`${column} LIKE $${this.values.length}`);
            break;
          case Operation.substring:
            this.values.push(`%${values[i]}%`);
            operations.push(`${column} LIKE $${this.values.length}%`);
            break;
          default:
            operations.push(this.getConditions({
              [column]: values[i],
            }, operation as Union));
            break;
        }
      });

      return operations;
    };
  }

  public create(data): Promise<any> {
    let query = `INSERT INTO ${this.tableName}`;

    const keys: string[] = Object.keys(data);
    this.values = Object.values(data)
      .map((value): any => this.sanitize(value));
    const sqlParameters: string[] = this.values.map((value, i): string => `$${i + 1}`);

    query += `(${keys.join(', ')}) VALUES(${sqlParameters.join(', ')})`;
    return this.execute(`${query};`, this.values);
  }

  public find(criteria?: Criteria): Promise<any> {
    if (!criteria || Object.entries(criteria).length === 0) {
      return this.execute(`SELECT  * FROM ${this.tableName};`);
    }
    let query = 'SELECT ';
    const { where, include, attributes } = criteria;

    // ATTRIBUTES | SELECT $1, $2 FROM
    if (include || attributes) {
      const result: string[] = this.getAttributes(criteria);
      query += result.length > 0
        ? result.join(', ')
        : '*';
    } else {
      query += '*';
    }
    query += ` FROM ${this.tableName}`;

    // JOINS | JOIN ON _ = $1
    if (include) {
      include.forEach((joinTable): void => {
        this.getJoins(joinTable);
      });
    }

    // CONDITIONS | WHERE _ = $1
    query += `\nWHERE ${this.getConditions(where || criteria)}`;


    // OPTIONS | LIMIT OFFSET SORTBY
    if (where) {
      query += this.getOptions(criteria);
    }

    return this.execute(`${query};`, this.values);
  }

  public async findOne(criteria?: Criteria): Promise<any> {
    const result = criteria && criteria.where
      ? await this.find({ ...criteria, limit: 1 })
      : await this.find({ where: criteria, limit: 1 });
    return result[0];
  }

  public update(data: Criteria, criteria: Criteria): Promise<any> {
    let query = `UPDATE ${this.tableName} `;
    const { where } = criteria;

    const newKeys: string[] = Object.keys(data)
      .map((key): string => this.sanitize(key));
    const newValues: any[] = Object.values(data)
      .map((value): string => this.sanitize(value));
    const sqlParameters: string[] = newValues.map((value: string, i: number): string => `${i}`);

    // (...columns) VALUES (...$_)
    query += `(${newKeys.join(', ')}) VALUES (${sqlParameters.join(', ')})`;

    // CONDITIONS | where _ = $1
    query += `\nWHERE ${this.getConditions(where || criteria)}`;

    return this.execute(`${query};`, newValues);
  }

  private getAttributes({
    model,
    attributes,
    include,
    as,
  }: Model): string[] {
    const result: string[] = [];
    let name: string;

    if (as) {
      name = as;
    } else if (model) {
      name = model.tableName;
    } else {
      name = this.tableName;
    }

    if (attributes) {
      attributes.forEach((attribute: string): void => {
        result.push(`${name}.${attribute}`);
      });
    }

    if (include) {
      include.forEach((joinTable: Model): void => {
        result.push(...this.getAttributes(joinTable));
      });
    }

    return result;
  }

  private getJoins({
    model: { tableName },
    as,
    include,
    where,
    parent,
  }: Model): string[] {
    const result: string[] = [];
    const parentName = parent || this.tableName;
    const key = Object.keys(where)[0];
    const value = Object.values(where)[0];
    const hasAs = !!as;

    const joinQuery = hasAs
      ? `\nJOIN ${tableName} as ${as} ON ${as}.${key} = ${parentName}.${this.sanitize(value)}`
      : `\nJOIN ${tableName} ON ${tableName}.${key} = ${parentName}.${this.sanitize(value)}`;
    result.push(` ${joinQuery}`);

    if (include) {
      include.forEach((joinTable: Model): void => {
        result.push(...this.getJoins({
          ...joinTable,
          parent: as || tableName,
        }));
      });
    }

    return result;
  }

  private getConditions(where, union: Union = Union.and): string {
    const result = [];

    const keys: string[] = Object.keys(where);
    const values: any[] = Object.values(where)
      .map((value): any => this.sanitize(value));

    keys.forEach((key, i): void => {
      if (key === Union.or) {
        result.push(this.getConditions(values[i], Union.or));
      } else if (key === Union.and) {
        result.push(this.getConditions(values[i]));
      } else { // key = column
        result.push(...this.getOperations(key, values[i]));
      }
    });

    return result.join(`\n${union.toUpperCase()} `);
  }
}

// const League = new Schema('leagues');
// const Player = new Schema('players');
// const Team = new Schema('teams');

// League.find({
//   where: {
//     or: {
//       title: {
//         like: 'Boat%',
//       },
//       description: {
//         like: '%boat%',
//       },
//     },
//   },
//   attributes: ['a', 'b', 'c'],
//   include: [{
//     model: Player,
//     as: 'p',
//     attributes: ['d', 'e'],
//     where: { foo: 'bar' },
//     include: [{
//       model: Team,
//       attributes: ['f'],
//       where: { foo: 'whoo' },
//     }],
//   }],
//   limit: 5,
//   offset: 6,
//   order: [League, Player, 'foo', 'DESC--'],
// });

// League.create({
//   foo: 'bar',
//   apple: 5,
// });
