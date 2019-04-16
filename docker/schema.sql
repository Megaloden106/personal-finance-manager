DROP DATABASE IF EXISTS fantasy_tracker;

CREATE DATABASE fantasy_tracker;
\c fantasy_tracker;

CREATE TABLE users (
  id SERIAL,
  admin BOOLEAN NOT NULL,
  name VARCHAR(50) NOT NULL,
  username VARCHAR(25) NOT NULL UNIQUE,
  email VARCHAR(35) UNIQUE,
  verified BOOLEAN,
  password VARCHAR(128) NOT NULL,
  salt VARCHAR(25) NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX user_ids ON users USING HASH (id);
CREATE INDEX username ON users USING HASH (username);


CREATE TABLE requests (
  id SERIAL,
  user_id INTEGER NOT NULL,
  type VARCHAR(30) NOT NULL,
  details TEXT NOT NULL,
  complete BOOLEAN NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE INDEX request_ids ON requests USING HASH (id);


CREATE TABLE players (
  id SERIAL,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(35) NOT NULL,
  team VARCHAR(3) NOT NULL,
  acquired BOOLEAN NOT NULL,
  status VARCHAR(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX player_ids ON players USING HASH (id);


CREATE TABLE stats (
  player_id INTEGER NOT NULL,
  year INTEGER NOT NULL,
  position VARCHAR(2) NOT NULL,
  games INTEGER NOT NULL,
  at_bats INTEGER NOT NULL,
  inns_pitched INTEGER NOT NULL,
  games_started INTEGER NOT NULL,
  FOREIGN KEY (player_id) REFERENCES players (id),
);


CREATE TABLE leagues (
  id SERIAL,
  premium BOOLEAN,
  owner INTEGER NOT NULL,
  sub_owner1 INTEGER NOT NULL,
  sub_owner2 INTEGER NOT NULL,
  sub_owner3 INTEGER NOT NULL,
  name VARCHAR(30) NOT NULL,
  salary BOOLEAN NOT NULL ,
  teams INTEGER NOT NULL,
  active_roster INTEGER NOT NULL,
  major_roster INTEGER NOT NULL,
  minor_roster INTEGER NOT NULL,
  -- [C, 1B, 2B, SS, 3B, CI, MI, OF, UTIL, SP, RP] count
  position_count JSONB NOT NULL,
  required_pos JSONB,

  PRIMARY KEY (id)
  FOREIGN KEY (owner) REFERENCES users (id),
  FOREIGN KEY (sub_owner1) REFERENCES users (id),
  FOREIGN KEY (sub_owner2) REFERENCES users (id),
  FOREIGN KEY (sub_owner3) REFERENCES users (id)
);

CREATE INDEX league_ids ON leagues USING HASH (id);


CREATE TABLE teams (
  id SERIAL,
  user_id INTEGER NOT NULL,
  league_id INTEGER NOT NULL,
  name VARCHAR(30) NOT NULL,
  salary_cap MONEY NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (league_id) REFERENCES leagues (id)
);


CREATE TABLE picks (
  id SERIAL,
  team_id INTEGER NOT NULL,
  draft VARCHAR(5) NOT NULL,
  round INTEGER NOT NULL,
  year INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (team_id) REFERENCES teams (id),
);

CREATE INDEX pick_id ON picks USING HASH (id);


CREATE TABLE f_players (
  team_id INTEGER NOT NULL,
  player_id INTEGER NOT NULL,
  salary MONEY,
  contract_length INTEGER,
  contract_options VARCHAR(1),
  ml_options INTEGER,
  options_used BOOLEAN,
  arbitration BOOLEAN,
  -- active, major, minor, il-10, il-60, p_minors, fin_ob
  roster_status VARCHAR(8),
  acquired VARCHAR(30) NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams (id),
  FOREIGN KEY (player_id) REFERENCES players (id)
);


CREATE TABLE transactions (
  id SERIAL,
  team_id INTEGER NOT NULL,
  f_player_id INTEGER NOT NULL,
  action VARCHAR(20) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (team_id) REFERENCES teams (id),
  FOREIGN KEY (f_player_id) REFERENCES f_players (id)
);

CREATE INDEX transaction_id ON transactions USING HASH (id);


CREATE TABLE trades (
  id SERIAL,
  team_id1 INTEGER NOT NULL,
  team_id2 INTEGER NOT NULL,
  team_id3 INTEGER NOT NULL,
  team_id4 INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (team_id1) REFERENCES teams (id),
  FOREIGN KEY (team_id2) REFERENCES teams (id),
  FOREIGN KEY (team_id3) REFERENCES teams (id),
  FOREIGN KEY (team_id4) REFERENCES teams (id)
);

CREATE INDEX trade_id ON trades USING HASH (id);


CREATE TABLE salary_adjustments (
  id SERIAL,
  f_player_id INTEGER,
  amount MONEY NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (f_player_id) REFERENCES f_players (id),
);

CREATE INDEX salary_adjustment_ids ON salary_adjustments USING HASH (id);


CREATE TABLE trade_selections (
  team_id INTEGER NOT NULL,
  trade_id INTEGER NOT NULL,
  f_player_id INTEGER,
  pick_id INTEGER,
  salary_adjustment_id INTEGER,
  FOREIGN KEY (team_id1) REFERENCES teams (id),
  FOREIGN KEY (trade_id) REFERENCES trades (id),
  FOREIGN KEY (f_player_id) REFERENCES f_players (id),
  FOREIGN KEY (pick_id) REFERENCES picks (id),
  FOREIGN KEY (salary_adjustment_id) REFERENCES salary_adjustments (id),
);


CREATE TABLE waivers (
  id SERIAL,
  team_id INTEGER NOT NULL,
  f_player_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX waiver_id ON waivers USING HASH (id);


CREATE TABLE dfas (
  id SERIAL,
  team_id INTEGER NOT NULL,
  f_player_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX dfa_ids ON dfas USING HASH (id);


CREATE TABLE drafts (
  id SERIAL,
  PRIMARY KEY (id)
);
