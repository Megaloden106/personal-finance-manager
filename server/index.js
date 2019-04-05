const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();
const router = require('./routes.js');

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/', express.static('punpmblic'));

app.use('/api', router);

app.set('port', process.env.PORT || 7070);

app.listen(app.get('port'), () => {
  console.warn(`app is listening to port ${app.get('port')}`);
});
