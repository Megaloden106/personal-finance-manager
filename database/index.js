const Model = require('./model');

module.exports.User = new Model('users');
module.exports.Request = new Model('requests');
module.exports.Player = new Model('players');
module.exports.Stat = new Model('stats');
module.exports.League = new Model('leagues');
module.exports.Team = new Model('teams');
module.exports.Pick = new Model('picks');
module.exports.FPlayer = new Model('f_players');
module.exports.Transaction = new Model('transactions');
module.exports.Trade = new Model('trades');
module.exports.SalaryAdjustment = new Model('salary_adjustments');
module.exports.TradeSelection = new Model('trade_selections');
module.exports.Waiver = new Model('waivers');
module.exports.DFA = new Model('dfas');
module.exports.Draft = new Model('drafts');
