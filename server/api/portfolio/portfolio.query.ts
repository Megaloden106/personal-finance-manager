class PortfolioQueries {
  public static findAll = `
    SELECT
      p.id as id,
      l.label as brokerage,
      p.name as name,
      p.is_retirement as is_retirement,
      p.is_savings as is_savings,
      COALESCE(pd.balance::NUMERIC::FLOAT8, 0) as balance,
      (
        SELECT SUM(deposit - withdrawal)::NUMERIC::FLOAT8
        FROM portfolio_data
        WHERE p.id = portfolio_id
      ) as cashflow
    FROM portfolios as p
    LEFT JOIN portfolio_data as pd
    ON p.id = pd.portfolio_id
    AND pd.id = (
      SELECT id
      FROM portfolio_data
      WHERE p.id = portfolio_id
      ORDER BY date DESC
      LIMIT 1
    )
    LEFT JOIN lookups as l
    ON p.brokerage_id = l.id;
  `;

  public static add = `
    INSERT INTO portfolios (name, brokerage_id, is_retirement, is_savings)
    SELECT $1, l.id, $3, $4
    FROM lookups as l
    WHERE l.label = $2
    AND l.data_type = 'brokerage';
  `;

  public static update = `
    UPDATE portfolios
    SET
      name = $2,
      brokerage_id = (
        SELECT id
        FROM lookups
        WHERE label = $3
        AND data_type = 'brokerage'
      ),
      is_retirement = $4,
      is_savings = $5
    WHERE id = $1;
  `;
}

export default PortfolioQueries;
