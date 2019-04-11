const Model = require('./model');

module.exports.User = new Model('users');
module.exports.Exchange = new Model('exchanges');
module.exports.Portfolio = new Model('portfolios');
module.exports.PortfolioData = new Model('portfolio_datas');
module.exports.Request = new Model('requests');
