import { PortfolioDatumDTO } from './portfolio-data.model';

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
        SELECT SUM(
          COALESCE(deposit::NUMERIC::FLOAT8, 0) -
          COALESCE(withdrawal::NUMERIC::FLOAT8, 0)
        )
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

  public static findIds = 'SELECT id FROM portfolios;';
  public static getWithSummaryId = 'WITH p AS (SELECT id FROM portfolios WHERE name = \'Summary\')';
  public static getWithAll = 'WITH p AS (SELECT id FROM portfolios)';

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

  public static findData = `
    SELECT
      id,
      date::NUMERIC::FLOAT8,
      balance::NUMERIC::FLOAT8,
      deposit::NUMERIC::FLOAT8,
      withdrawal::NUMERIC::FLOAT8
    FROM portfolio_data
    WHERE portfolio_id = $1
    ORDER BY date ASC;
  `;

  public static findAllDataExceptSummaryAfterTargetDate = `
    ${PortfolioQueries.getWithSummaryId}
    SELECT
      portfolio_id,
      date::NUMERIC::FLOAT8,
      balance::NUMERIC::FLOAT8,
      deposit::NUMERIC::FLOAT8,
      withdrawal::NUMERIC::FLOAT8
    FROM portfolio_data
    WHERE date >= (
      SELECT MIN(pd2.date) as date
      FROM (
        SELECT portfolio_id
        FROM portfolio_data
        WHERE portfolio_id <> (SELECT id FROM p)
        GROUP BY portfolio_id
      ) as pd1
      LEFT JOIN LATERAL (
        SELECT date
        FROM portfolio_data
        WHERE portfolio_id = pd1.portfolio_id
        AND date <= $1
        ORDER BY date ASC
        LIMIT 1
      ) as pd2 ON true
    )
    AND portfolio_id <> (SELECT id FROM p)
    ORDER BY date ASC;
  `;

  public static conflictUpdateData = `
    ON CONFLICT (portfolio_id, date)
    DO UPDATE SET
      balance = excluded.balance,
      deposit = excluded.deposit,
      withdrawal = excluded.withdrawal;
  `;

  public static addData(dtos: PortfolioDatumDTO[]): string {
    const text = `
      INSERT INTO portfolio_data (portfolio_id, date, balance, deposit, withdrawal)
      VALUES
    `;
    const values = dtos
      .map((_, i): string => new Array(5)
        .fill(null)
        .map((__, j): string => `$${i * 5 + j + 1}`)
        .join(','))
      .join('),(');
    return `${text} (${values});`;
  }

  public static upsertDataById(dtos: PortfolioDatumDTO[]): string {
    const text = PortfolioQueries
      .addData(dtos)
      .slice(0, -1);
    return `${text}${PortfolioQueries.conflictUpdateData}`;
  }

  // public static upsertDataByIdOrName(dtos: PortfolioDatumDTO[]): string {
  //   const text = `
  //     INSERT INTO portfolio_data (portfolio_id, date, balance, deposit, withdrawal)
  //     VALUES
  //   `;
  //   const values = dtos
  //     .map((_, i): string => new Array(5)
  //       .fill(null)
  //       .map((__, j): string => {
  //         const count = i * 5 + j + 1;
  //         if (i === 0 && !dtos[i].portfolioId && dtos[i].portfolioName) {
  //           return `(SELECT id FROM p WHERE name = $${count})`;
  //         }
  //         return `$${count}`;
  //       })
  //       .join(','))
  //     .join('),(');
  //   return `
  //     ${PortfolioQueries.getWithAll}
  //     ${text}
  //     (${values})
  //     ${PortfolioQueries.conflictUpdateData}
  //   `;
  // }

  public static addDataForSummaryUpsert(dtos: PortfolioDatumDTO[]): string {
    let count = 0;
    const text = `
      INSERT INTO portfolio_data (portfolio_id, date, balance, deposit, withdrawal)
      VALUES
    `;
    const values = dtos
      .map((): string => new Array(5)
        .fill(null)
        .map((_, i): string => {
          if (i === 0) {
            return '(SELECT id FROM p)';
          }
          count += 1;
          return `$${count}`;
        })
        .join(','))
      .join('),(');
    return `${text} (${values});`;
  }

  public static upsertDataForSummary(dtos: PortfolioDatumDTO[]): string {
    const text = PortfolioQueries
      .addDataForSummaryUpsert(dtos)
      .slice(0, -1);
    return `${PortfolioQueries.getWithSummaryId}${text}${PortfolioQueries.conflictUpdateData}`;
  }
}

export default PortfolioQueries;
