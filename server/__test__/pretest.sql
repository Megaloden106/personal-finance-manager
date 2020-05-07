DROP DATABASE IF EXISTS test;

CREATE DATABASE test;
\c test;

CREATE TABLE lookups (
  id SERIAL,
  data_type VARCHAR(80) NOT NULL,
  label VARCHAR(80) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE portfolios (
  id SERIAL,
  brokerage_id INT,
  name VARCHAR(80) NOT NULL,
  is_retirement BOOLEAN,
  is_savings BOOLEAN,
  PRIMARY KEY (id),
  FOREIGN KEY (brokerage_id) REFERENCES lookups (id),
  UNIQUE (name)
);

CREATE TABLE portfolio_data (
  id SERIAL,
  portfolio_id INT NOT NULL,
  date BIGINT NOT NULL,
  balance MONEY,
  deposit MONEY,
  withdrawal MONEY,
  PRIMARY KEY (id),
  FOREIGN KEY (portfolio_id) REFERENCES portfolios (id),
  UNIQUE (portfolio_id, date),
  CONSTRAINT money_one_is_not_null CHECK (COALESCE(balance, deposit, withdrawal) IS NOT NULL)
);

INSERT INTO
  lookups (data_type, label)
VALUES
  ('brokerage', 'T Rowe Price'),
  ('brokerage', 'Vanguard'),
  ('brokerage', 'Health Equity');

INSERT INTO
  portfolios (name, brokerage_id, is_retirement, is_savings)
VALUES
  ('Summary', null, false, false),
  ('401(k)', 1, true, false);

INSERT INTO
  portfolio_data (portfolio_id, date, balance, deposit, withdrawal)
VALUES
  (1, 1588662000000, 1000, 1000, 0),
  (2, 1588662000000, 1000, 1000, 0),
  (1, 1588748400000, 1100.02, 0, 0),
  (2, 1588748400000, 1100.02, 0, 0);
