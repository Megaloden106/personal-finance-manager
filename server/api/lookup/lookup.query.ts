class LookupQueries {
  public static findAll = 'SELECT id, label FROM lookups WHERE data_type = $1;';
}

export default LookupQueries;
