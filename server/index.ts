import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import router from './config/routes';

const app: express.Application = express();

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());

// static file
app.use('/static', express.static('assets'));

// no auth
const noAuthRoutes = ['/login', '/join', '/password-reset'];
app.get(noAuthRoutes, express.static('views/pages/noauth'));

// auth required
const authRoutes = ['/', '/portfolio', '/table', '/allocation'];
authRoutes.forEach((route): void => {
  app.use(route, express.static('../public'));
});

// api routes
app.use('/api', router);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), (): void => {
  console.warn(`app is listening to port ${app.get('port')}`);
});
