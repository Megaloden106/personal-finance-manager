DROP DATABASE IF EXISTS portfolio_manager;

CREATE DATABASE portfolio_manager;
\c portfolio_manager;

-- CREATE TABLE users (
--   id SERIAL,
--   -- name VARCHAR(50) NOT NULL,
--   username VARCHAR(25) NOT NULL UNIQUE,
--   -- email VARCHAR(35) NOT NULL UNIQUE,
--   -- verified BOOLEAN,
--   password VARCHAR(128) NOT NULL,
--   salt VARCHAR(25) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE INDEX user_ids ON users USING HASH (id);
-- CREATE INDEX usernames ON users USING HASH (username);

CREATE TABLE lookups (
  id SERIAL,
  data_type VARCHAR(80) NOT NULL,
  label VARCHAR(80) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE portfolios (
  id SERIAL,
  -- userId INT NOT NULL,
  brokerage_id INT,
  name VARCHAR(80) NOT NULL,
  -- isGroup BOOLEAN,
  is_retirement BOOLEAN,
  is_savings BOOLEAN,
  PRIMARY KEY (id),
  -- FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (brokerage_id) REFERENCES lookups (id),
  UNIQUE (name)
);

CREATE INDEX portfolio_ids ON portfolios USING HASH (id);
-- CREATE INDEX portfolio_user_ids ON portfolios USING HASH (userId);

CREATE TABLE portfolio_data (
  id SERIAL,
  portfolio_id INT NOT NULL,
  date BIGINT NOT NULL,
  balance MONEY,
  deposit MONEY,
  withdrawal MONEY,
  -- returns MONEY NOT NULL,
  -- dividend MONEY NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (portfolio_id) REFERENCES portfolios (id),
  UNIQUE (portfolio_id, date),
  CONSTRAINT money_one_is_not_null CHECK (COALESCE(balance, deposit, withdrawal) IS NOT NULL)
);

CREATE INDEX portfolio_data_ids ON portfolio_data (portfolio_id);
CREATE INDEX portfolio_data_date ON portfolio_data (date);
