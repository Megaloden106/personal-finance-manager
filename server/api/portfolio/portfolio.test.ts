/* eslint-disable import/no-extraneous-dependencies */
import '../../dotenv.config';
import { Server } from 'http';
import supertest, { SuperTest, Test } from 'supertest';
import app from '../../app';
import { pool } from '../../database';

describe('Portfolio Controller', (): void => {
  let server: Server;
  let request: SuperTest<Test>;

  const defaultPortfolios = [
    {
      id: 1,
      name: 'Summary',
      brokerage: null,
      isRetirement: false,
      isSavings: false,
      balance: 1100.02,
      returns: 100.02,
    }, {
      id: 2,
      name: '401(k)',
      brokerage: 'T Rowe Price',
      isRetirement: true,
      isSavings: false,
      balance: 1100.02,
      returns: 100.02,
    },
  ];

  beforeAll((done): void => {
    server = app.listen(done);
    request = supertest.agent(server);
  });

  afterAll((done): void => {
    pool.end();
    server.close(done);
  });

  test('should retrieve data from a GET /api/portfolio', (done): void => {
    request
      .get('/api/portfolio')
      .expect('Content-Type', /json/)
      .expect(200, defaultPortfolios)
      .end(done);
  });

  test('should add data from a POST /api/portfolio', async (done): Promise<void> => {
    const rothIRA = {
      name: 'Roth IRA',
      brokerage: 'Vanguard',
      isRetirement: true,
      isSavings: false,
    };

    const expectResult = defaultPortfolios.concat({
      id: 3,
      ...rothIRA,
      balance: 0,
      returns: 0,
    });

    await request
      .post('/api/portfolio')
      .send(rothIRA)
      .expect(201);

    request
      .get('/api/portfolio')
      .expect('Content-Type', /json/)
      .expect(200, expectResult)
      .end(done);
  });

  test('should update data from a PATCH /api/portfolio', async (done): Promise<void> => {
    const hsa = {
      id: 3,
      name: 'HSA',
      brokerage: 'Health Equity',
      isRetirement: true,
      isSavings: true,
    };

    const expectResult = defaultPortfolios.concat({
      ...hsa,
      balance: 0,
      returns: 0,
    });

    await request
      .patch('/api/portfolio')
      .send(hsa)
      .expect(200);

    request
      .get('/api/portfolio')
      .expect('Content-Type', /json/)
      .expect(200, expectResult)
      .end(done);
  });
});
