import { BaseModel, Table } from '../BaseModel';

export interface LookupEntity {
  id: number;
  data_type: string;
  label: string;
}

export interface LookupDTO {
  id?: number;
  dataType: string;
  label: string;
}

const lookupTable: Table<LookupEntity, LookupDTO> = {
  tableName: 'lookups',
  columns: [
    { key: 'id', columnName: 'id' },
    { key: 'dataType', columnName: 'data_type' },
    { key: 'label', columnName: 'label' },
  ],
};

export const LookupModel = new BaseModel<LookupEntity, LookupDTO>(lookupTable);
