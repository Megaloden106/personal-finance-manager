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
  type VARCHAR(255) NOT NULL,
  label VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE portfolios (
  id SERIAL,
  -- userId INT NOT NULL,
  -- exchangeId INT,
  name VARCHAR(30) NOT NULL,
  brokerage VARCHAR(30) NOT NULL,
  -- balance MONEY NOT NULL,
  -- returns MONEY NOT NULL,
  -- isGroup BOOLEAN,
  is_retirement BOOLEAN,
  is_savings BOOLEAN,
  PRIMARY KEY (id),
  -- FOREIGN KEY (userId) REFERENCES users (id),
  -- FOREIGN KEY (exchangeId) REFERENCES lookups (id),
  UNIQUE (name)
);

CREATE INDEX portfolio_ids ON portfolios USING HASH (id);
-- CREATE INDEX portfolio_user_ids ON portfolios USING HASH (userId);

CREATE TABLE portfolio_data (
  id SERIAL,
  portfolio_id INT NOT NULL,
  date DATE NOT NULL,
  balance MONEY,
  deposit MONEY NOT NULL,
  withdrawal MONEY NOT NULL,
  -- returns MONEY NOT NULL,
  -- dividend MONEY NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (portfolio_id) REFERENCES portfolios (id),
  UNIQUE (portfolio_id, date)
);

CREATE INDEX portfolio_data_ids ON portfolio_data (portfolio_id);

-- CREATE TABLE requests (
--   id SERIAL,
--   type VARCHAR(30) NOT NULL,
--   details TEXT NOT NULL,
--   PRIMARY KEY (id)
-- );

-- INSERT INTO exchanges (company) VALUES ('Vanguard');
-- INSERT INTO exchanges (company) VALUES ('Robinhood');
-- INSERT INTO exchanges (company) VALUES ('E*Trade');
-- INSERT INTO exchanges (company) VALUES ('Charles Schwab');
-- INSERT INTO exchanges (company) VALUES ('TD Ameritrade');
-- INSERT INTO exchanges (company) VALUES ('T. Rowe Price');
-- INSERT INTO exchanges (company) VALUES ('Interatice Broker');
-- INSERT INTO exchanges (company) VALUES ('Trade Station');
-- INSERT INTO exchanges (company) VALUES ('eOption');
-- INSERT INTO exchanges (company) VALUES ('Chase');
-- INSERT INTO exchanges (company) VALUES ('Wells Fargo');
-- INSERT INTO exchanges (company) VALUES ('Ally Bank');
-- INSERT INTO exchanges (company) VALUES ('Health Equity');
-- INSERT INTO exchanges (company) VALUES ('Cryptocurrency');