import app from './app';

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), (): void => {
  // eslint-disable-next-line no-console
  console.log(`app is listening to port ${app.get('port')}`);
});

export default app;
