import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import router from './config/routes';

const app: express.Application = express();

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/', express.static('../public'));
app.use('/static', express.static('assets'));

app.use('/api', router);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), (): void => {
  console.warn(`app is listening to port ${app.get('port')}`);
});
