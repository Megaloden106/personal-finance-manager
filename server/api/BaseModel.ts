export interface Table<E, D> {
  tableName: string;
  columns: Column<E, D>[];
}

export interface Column<E, D> {
  key: keyof D;
  columnName: keyof E;
  nullable?: boolean;
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
      .map((column): D[keyof D] => this.checkValueCallback(column, dto));
  }

  public getDefinedParametizedValues(dto: D): (D[keyof D])[] {
    return this.columns
      .filter(({ key }): boolean => dto[key] !== undefined)
      .map((column): D[keyof D] => this.checkValueCallback(column, dto));
  }

  public convertEntitiesToDTOs(entitys: E[]): D[] {
    return entitys.map((row: E): D => {
      const result: unknown = {};
      this.columns.forEach(({ columnName, key }): void => {
        result[key] = row[columnName];
      });
      return result as D;
    });
  }

  private checkValueCallback({ key, nullable }: Column<E, D>, dto: D): D[keyof D] {
    if (dto[key] === undefined && nullable) {
      return null;
    }
    if (dto[key] === undefined) {
      throw new Error('Invalid Request Body');
    }
    return dto[key];
  }
}
