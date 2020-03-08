import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import router from './config/routes';

const app: express.Application = express();

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static('../public'));
app.use('/static', express.static('assets'));
app.get('/favicon.ico', (req, res): void => {
  res.sendStatus(204);
});

app.use('/api', router);

// TODO: Move to react
const noAuthRoutes = ['/login', '/join', '/password-reset'];
app.get(noAuthRoutes, express.static('views/pages/noauth'));

app.use('*', express.static('../public'));

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), (): void => {
  console.warn(`app is listening to port ${app.get('port')}`);
});
