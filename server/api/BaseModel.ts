export interface Table<E, D> {
  tableName: string;
  columns: Column<E, D>[];
}

export interface Column<E, D> {
  key: keyof D;
  columnName: keyof E;
}

export class BaseModel<E, D> {
  protected tableName: string;
  protected columns: Column<E, D>[];

  public constructor({ tableName, columns }: Table<E, D>) {
    this.tableName = tableName;
    this.columns = columns;
  }

  public getParametizedValues(dto: D): (D[keyof D])[] {
    return this.columns
      .filter(({ key }): boolean => dto[key] !== undefined || key !== 'id')
      .map(({ key }): D[keyof D] => dto[key]);
  }

  public convertEntitysToDTOs(entitys: E[]): D[] {
    return entitys.map((row: E): D => {
      const result: unknown = {};
      this.columns.forEach(({ columnName, key }): void => {
        result[key] = row[columnName];
      });
      return result as D;
    });
  }
}
