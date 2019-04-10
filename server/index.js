const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();
const router = require('./config/routes.js');

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());

// static routing
app.use('/', express.static('../public'));
app.use('/static', express.static('assets'));

// api routing
app.use('/api', router);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
  console.warn(`app is listening to port ${app.get('port')}`);
});
