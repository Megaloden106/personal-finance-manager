export interface Table {
  tableName: string;
  columns: Column[];
}

export interface Column {
  columnName: string;
}

export interface DataTransferObject {
  [key: string]: any;
}

export class BaseModel {
  protected tableName: string;
  protected columns: Column[];
  protected columnNames: string[];

  public constructor({ tableName, columns }: Table) {
    this.tableName = tableName;
    this.columns = columns;
    this.columnNames = columns.map(({ columnName }): string => columnName);
  }

  protected getParametizedValues(dto: DataTransferObject): any[] {
    return this.columns.map(({ columnName }): any => dto[columnName] || null);
  }

  protected getMultipleParametizedValues(dtos: DataTransferObject[]): any[] {
    return dtos
      .map((dto): any[] => this.columns
        .map(({ columnName }): any => dto[columnName] || null))
      .flat(1);
  }

  protected getPOSTQuery(): string {
    const table = this.tableName;
    const columns = this.columnNames.join(',');
    const values = this.columnNames
      .map((_, i): string => `${i + 1}`)
      .join(',');
    return `INSERT INTO ${table}(${columns}) VALUES (${values})`;
  }

  protected getMultiplePOSTQuery(count: number): string {
    const table = this.tableName;
    const columns = this.columnNames.join(',');
    const values = new Array(count)
      .fill(null)
      .map((_, i): string => this.columnNames
        .map((__, j): string => `${(i * this.columnNames.length) + j + 1}`)
        .join(','))
      .join('),(');
    return `INSERT INTO ${table}(${columns}) VALUES (${values})`;
  }

  protected getPUTQuery(): string {
    return `${this.getPOSTQuery()} ON CONFLICT DO UPDATE`;
  }

  protected getMultiplePUTQuery(count: number): string {
    return `${this.getMultiplePOSTQuery(count)} ON CONFLICT DO UPDATE`;
  }
}
