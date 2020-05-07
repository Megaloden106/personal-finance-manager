/* eslint-disable import/no-extraneous-dependencies */
import '../../dotenv.config';
import { Server } from 'http';
import supertest, { SuperTest, Test } from 'supertest';
import app from '../../app';
import { pool } from '../../database';

describe('Lookup Controller', (): void => {
  let server: Server;
  let request: SuperTest<Test>;

  const defaultLookups = [
    { id: 1, label: 'T Rowe Price' },
    { id: 2, label: 'Vanguard' },
    { id: 3, label: 'Health Equity' },
  ];

  beforeAll((done): void => {
    server = app.listen(done);
    request = supertest.agent(server);
  });

  afterAll((done): void => {
    pool.end();
    server.close(done);
  });

  test('should retrieve data from a GET /api/lookup/brokerage', (done): void => {
    request
      .get('/api/lookup/brokerage')
      .expect('Content-Type', /json/)
      .expect(200, defaultLookups)
      .end(done);
  });
});
