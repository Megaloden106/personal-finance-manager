DROP DATABASE IF EXISTS test;

CREATE DATABASE test;
\c test;

CREATE TABLE lookups (
  id SERIAL,
  type VARCHAR(255) NOT NULL,
  label VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE portfolios (
  id SERIAL,
  name VARCHAR(30) NOT NULL,
  brokerage VARCHAR(30) NOT NULL,
  is_retirement BOOLEAN,
  is_savings BOOLEAN,
  PRIMARY KEY (id),
  UNIQUE (name)
);

CREATE TABLE portfolio_data (
  id SERIAL,
  portfolio_id INT NOT NULL,
  date DATE NOT NULL,
  balance MONEY,
  deposit MONEY NOT NULL,
  withdrawal MONEY NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (portfolio_id) REFERENCES portfolios (id),
  UNIQUE (portfolio_id, date)
);
