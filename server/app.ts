import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import './dotenv.config';
import router from './api/routes';

const app = express();

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

export default app;
