// const initOptions = {
//   query(event) {
//     console.error('QUERY:', event.query);
//   },
//   error(error, event) {
//     if (event.cn) {
//       console.error('CN:', event.cn);
//       console.error('EVENT:', error.message || error);
//     }
//   },
// };

// const pgp = require('pg-promise')(initOptions);

// const cn = {
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: 'portfolio_manager',
// };

// module.exports = pgp(cn);

// mock pg-promise
export default {
  any: async (query: string, values?: string[]): Promise<any> => Promise.resolve({
    query,
    values,
  }),
};
