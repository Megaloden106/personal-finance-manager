import { pool } from '../database';

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

  public get columnNames(): (keyof E)[] {
    return this.columns.map(({ columnName }): keyof E => columnName);
  }

  public async findAll(): Promise<D[]> {
    const query = this.getGETQuery();
    const { rows } = await pool.query(query);
    return this.convertEntitysToDTOs(rows);
  }

  public async add(dto: D): Promise<D> {
    const query = this.getPOSTQuery(dto);
    const values = this.getParametizedValues(dto);
    const { rows } = await pool.query(query, values);
    return this.convertEntitysToDTOs(rows)[0];
  }

  public async update(id: number, dto: D): Promise<D> {
    const query = this.getPATCHQuery(dto);
    const values = this
      .getParametizedValues(dto)
      .concat(id);
    const { rows } = await pool.query(query, values);
    return this.convertEntitysToDTOs(rows)[0];
  }

  public getParametizedValues(dto: D): any[] {
    return this
      .getDefinedColumns(dto)
      .map(({ key }): any => (dto[key] !== undefined
        ? dto[key]
        : null));
  }

  public getMultipleParametizedValues(dtos: D[]): any[] {
    const values: any[] = [];
    dtos.forEach((dto): void => this
      .getDefinedColumns(dto)
      .forEach(({ key }): void => {
        if (dto[key] !== undefined) {
          values.push(dto[key]);
        }
      }));
    return values;
  }

  public getGETQuery(): string {
    const table = this.tableName;
    const columns = this.columnNames.join(',');
    return `SELECT ${columns} FROM ${table};`;
  }

  public getPOSTQuery(dto: D): string {
    const table = this.tableName;
    const columnNames = this
      .getDefinedColumns(dto)
      .map(({ columnName }): keyof E => columnName);
    const columns = columnNames.join(',');
    const values = columnNames
      .map((_, i): string => `$${i + 1}`)
      .join(',');
    return `INSERT INTO ${table}(${columns}) VALUES (${values}) RETURNING *;`;
  }

  public getMultiplePOSTQuery(dtos: D[]): string {
    const table = this.tableName;
    const columnNames = this
      .getDefinedColumns(dtos[0])
      .map(({ columnName }): keyof E => columnName);
    const columns = columnNames.join(',');
    const values = new Array(dtos.length)
      .fill(null)
      .map((_, i): string => columnNames
        .map((__, j): string => `$${(i * columnNames.length) + j + 1}`)
        .join(','))
      .join('),(');
    return `INSERT INTO ${table}(${columns}) VALUES (${values}) RETURNING *;`;
  }

  // TODO: Write single PUT query
  // public getPUTQuery(dto: any): string {
  //   const postQuery = this.getPOSTQuery().slice(0, -1);
  //   const patchQuery = this.getPATCHQuery(dto)
  //     .slice(0, -1)
  //     .replace(` ${this.tableName}`, '');
  //   return `${postQuery} ON CONFLICT (id) DO ${patchQuery};`;
  // }

  // TODO: Write multiple PUT query
  // public getMultiplePUTQuery(count: number): string {
  //   const postQuery = this.getMultiplePOSTQuery(count).slice(0, -1);
  //   return `${postQuery} ON CONFLICT DO UPDATE;`;
  // }

  public getPATCHQuery(dto: D): string {
    const table = this.tableName;
    const props: string[] = [];
    this.columns.forEach(({ columnName, key }): void => {
      if (key !== 'id' && dto[key] !== undefined) {
        props.push(`${columnName} = $${props.length + 1}`);
      }
    });
    return `UPDATE ${table} SET ${props.join(',')} WHERE id = $${props.length + 1} RETURNING *;`;
  }

  // TODO: Write multiple PATCH query
  // public getMultiplePATCHQuery(dtos: DataTransferObject[], count: number): string {
  // }

  private convertEntitysToDTOs(entitys: E[]): D[] {
    return entitys.map((row: E): D => {
      const result: unknown = {};
      this.columns.forEach(({ columnName, key }): void => {
        result[key] = row[columnName];
      });
      return result as D;
    });
  }

  private getDefinedColumns(dto: D): Column<E, D>[] {
    return this.columns
      .filter(({ key }): boolean => dto[key] !== undefined && key !== 'id');
  }
}
