import { QueryResult } from 'pg';
import { pool } from '../database';

export interface Table {
  tableName: string;
  columns: Column[];
}

export interface Column {
  key: string;
  columnName: string;
}

export interface DataTransferObject {
  [key: string]: any;
}

export interface Entity {
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

  public async findAll(): Promise<DataTransferObject[]> {
    const query = this.getGETQuery();
    const { rows } = await pool.query(query);
    return this.convertEntitysToDTOs(rows);
  }

  public async add(dto: DataTransferObject): Promise<QueryResult> {
    const query = this.getPOSTQuery();
    const values = this.getParametizedValues(dto);
    return pool.query(query, values);
  }

  public async update(dto: DataTransferObject): Promise<DataTransferObject> {
    const query = this.getPATCHQuery(dto);
    const values = this
      .getParametizedValues(dto)
      .concat(dto.id);
    const { rows } = await pool.query(query, values);
    return this.convertEntitysToDTOs(rows)[0];
  }

  public getParametizedValues(dto: DataTransferObject): any[] {
    return this.columns.map(({ key }): any => (dto[key] !== undefined
      ? dto[key]
      : null));
  }

  public getMultipleParametizedValues(dtos: DataTransferObject[]): any[] {
    return dtos
      .map((dto): any[] => this.columns
        .map(({ key }): any => (dto[key] !== undefined
          ? dto[key]
          : null)))
      .flat(1);
  }

  public getGETQuery(): string {
    const table = this.tableName;
    const columns = this.columnNames.join(',');
    return `SELECT ${columns} FROM ${table};`;
  }

  public getPOSTQuery(): string {
    const table = this.tableName;
    const columns = this.columnNames.join(',');
    const values = this.columnNames
      .map((_, i): string => `$${i + 1}`)
      .join(',');
    return `INSERT INTO ${table}(${columns}) VALUES (${values});`;
  }

  public getMultiplePOSTQuery(count: number): string {
    const table = this.tableName;
    const columns = this.columnNames.join(',');
    const values = new Array(count)
      .fill(null)
      .map((_, i): string => this.columnNames
        .map((__, j): string => `$${(i * this.columnNames.length) + j + 1}`)
        .join(','))
      .join('),(');
    return `INSERT INTO ${table}(${columns}) VALUES (${values});`;
  }

  // TODO: Write sinple PUT query
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

  public getPATCHQuery(dto: DataTransferObject): string {
    const table = this.tableName;
    const props: string[] = [];
    this.columns.forEach(({ columnName, key }): void => {
      if (dto[key] !== undefined) {
        props.push(`${columnName} = $${props.length + 1}`);
      }
    });
    return `UPDATE ${table} SET ${props.join(',')} WHERE id = $${props.length + 1} RETURNING *;`;
  }

  // TODO: Write multiple PATCH query
  // public getMultiplePATCHQuery(dtos: DataTransferObject[], count: number): string {
  // }

  private convertEntitysToDTOs(entitys: Entity[]): DataTransferObject[] {
    return entitys.map((row: DataTransferObject): DataTransferObject => {
      const result: DataTransferObject = {};
      this.columns.forEach(({ columnName, key }): void => {
        result[key] = row[columnName];
      });
      return result;
    });
  }
}
