interface Option {
  type?: string;
  columnName?: string;
  columnType?: string;
  defaultsTo?: any;
  require?: boolean;
}

interface Attribute {
  [variable: string]: Option;
}

interface Schema {
  tableName: string;
  attributes: Attribute;
}

export default class BaseModel {
  private schema: Schema;

  public constructor(schema: Schema) {
    this.schema = schema;

    const { attributes } = this.schema;
    const varNames = Object.keys(attributes);

    varNames.forEach((varName): void => {
      const { columnName } = attributes[varName];
      if (!columnName) {
        attributes[varName].columnName = varName;
      }
    });
  }

  public toDB(body: any): any {
    if (Array.isArray(body)) {
      return this.dbConvert(body);
    }

    return body.map((entry): any => this.dbConvert(entry));
  }

  public toClient(data: any | any[]): any | any[] {
    if (Array.isArray(data)) {
      return this.clientConvert(data);
    }

    return data.map((entry): any => this.clientConvert(entry));
  }

  private dbConvert(body: any | any[]): any | any[] {
    const { attributes } = this.schema;
    const varNames = Object.keys(attributes);
    const result = {};

    varNames.forEach((varName): void => {
      const { columnName } = attributes[varName];
      if (body[varName]) {
        result[columnName] = body[varName];
      }
    });

    return result;
  }

  private clientConvert(data: any): any {
    const { attributes } = this.schema;
    const varNames = Object.keys(attributes);
    const colNames = Object.values(attributes)
      .map((colName): string => colName.columnName);
    const result = {};

    colNames.forEach((colName, i): void => {
      if (data[colName]) {
        result[varNames[i]] = data[colName];
      }
    });

    return result;
  }
}

// const PortfolioModel = new BaseModel({
//   tableName: 'users',
//   attributes: {
//     dateCreated: {
//       type: 'timestamp',
//       columnName: 'date_created',
//     },
//     lastUpdated: {
//       type: 'timestamp',
//       columnName: 'last_updated',
//     },
//     name: {
//       type: 'string',
//     },
//     userId: {
//       type: 'number',
//       columnName: 'user_id',
//     },
//   },
// });

// const data = {
//   foo: 'bar',
//   dateCreated: new Date(),
//   lastUpdated: new Date(),
//   name: 'eddie',
//   userId: '1',
// };

// console.log(PortfolioModel.toDB(data));
// const modified = PortfolioModel.toDB(data);
// console.log(PortfolioModel.toClient(modified));
