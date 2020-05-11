/* eslint-disable import/no-extraneous-dependencies */
import '../../dotenv.config';
import { Server } from 'http';
import supertest, { SuperTest, Test } from 'supertest';
import app from '../../app';
import { pool } from '../../database';
import { PortfolioDatumDTO } from './portfolio-data.model';
import { getSumMoney } from './portfolio.model';

describe('Portfolio Controller', (): void => {
  let server: Server;
  let request: SuperTest<Test>;

  let defaultPortfolios = [
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

  const defaultPortfolioData: PortfolioDatumDTO[] = [
    {
      id: 2,
      date: 1588662000000,
      balance: 1000,
      deposit: 1000,
      withdrawal: 0,
    }, {
      id: 4,
      date: 1588748400000,
      balance: 1100.02,
      deposit: 0,
      withdrawal: 0,
    },
  ];

  const dataHSA: PortfolioDatumDTO[] = [
    {
      date: Date.parse(new Date('10/31/2019').toDateString()),
      balance: 1000,
      deposit: 1000,
    }, {
      date: Date.parse(new Date('11/30/2019').toDateString()),
      balance: 1580,
      deposit: 500,
    },
  ];

  const data401k: PortfolioDatumDTO[] = [
    {
      portfolioId: 2,
      date: Date.parse(new Date('5/10/2020').toDateString()),
      balance: 1052.89,
      deposit: 0,
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

  test('should add datum from a POST /api/portfolio', async (done): Promise<void> => {
    const rothIRA = {
      name: 'Roth IRA',
      brokerage: 'Vanguard',
      isRetirement: true,
      isSavings: false,
    };

    defaultPortfolios = defaultPortfolios.concat({
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
      .expect(200, defaultPortfolios)
      .end(done);
  });

  // TODO: get valid 4xx error code once error handling is completed
  test('should receive 500 for invalid body from a POST /api/portfolio', async (done): Promise<void> => {
    request
      .post('/api/portfolio')
      .send({})
      .expect(500)
      .end(done);
  });

  test('should update datum from a PATCH /api/portfolio', async (done): Promise<void> => {
    const hsa = {
      id: 3,
      name: 'HSA',
      brokerage: 'Health Equity',
      isRetirement: true,
      isSavings: true,
    };

    defaultPortfolios[2] = {
      ...hsa,
      balance: 0,
      returns: 0,
    };

    await request
      .patch('/api/portfolio')
      .send(hsa)
      .expect(200);

    request
      .get('/api/portfolio')
      .expect('Content-Type', /json/)
      .expect(200, defaultPortfolios)
      .end(done);
  });

  // TODO: get valid 4xx error code once error handling is completed
  test('should receive 500 for invalid body from a PATCH /api/portfolio', async (done): Promise<void> => {
    request
      .patch('/api/portfolio')
      .send({})
      .expect(500)
      .end(done);
  });

  test('should retrieve data in date desc order from a GET /api/portfolio/:id', (done): void => {
    request
      .get('/api/portfolio/2')
      .expect('Content-Type', /json/)
      .expect(200, defaultPortfolioData)
      .end(done);
  });

  // TODO: get valid 4xx error code once error handling is completed
  test('should receive 500 for invalid id from a GET /api/portfolio/:id', async (done): Promise<void> => {
    request
      .get('/api/portfolio/invalid')
      .expect(500)
      .end(done);
  });

  test('should add data from a POST /api/portfolio/:id', async (done): Promise<void> => {
    await request
      .post('/api/portfolio/3')
      .send(dataHSA)
      .expect(201);

    const expectedResponse = dataHSA.map((datum, i): PortfolioDatumDTO => {
      delete datum.portfolioId;
      return {
        id: i + 5,
        ...datum,
        withdrawal: null,
      };
    });

    request
      .get('/api/portfolio/3')
      .expect('Content-Type', /json/)
      .expect(200, expectedResponse)
      .end(done);
  });

  // TODO: get valid 4xx error code once error handling is completed
  test('should receive 500 for invalid param from a POST /api/portfolio/:id', async (done): Promise<void> => {
    request
      .post('/api/portfolio/3')
      .send({})
      .expect(500)
      .end(done);
  });

  test('should properly update summary values after a POST /api/portfolio/:id', async (done): Promise<void> => {
    const balanceHSA = dataHSA[dataHSA.length - 1].balance;
    const returnsHSA = dataHSA
      .reduce((acc, curr): number => getSumMoney(acc, -curr.deposit), balanceHSA);
    defaultPortfolios[0].balance = getSumMoney(defaultPortfolios[0].balance, balanceHSA);
    defaultPortfolios[0].returns = getSumMoney(defaultPortfolios[0].returns, returnsHSA);
    defaultPortfolios[2].balance = balanceHSA;
    defaultPortfolios[2].returns = returnsHSA;

    request
      .get('/api/portfolio')
      .expect('Content-Type', /json/)
      .expect(200, defaultPortfolios)
      .end(done);
  });

  test('should add data from a POST /api/portfolio/data', async (done): Promise<void> => {
    await request
      .post('/api/portfolio/data')
      .send(data401k)
      .expect(201);

    const balanceHSA = defaultPortfolios[2].balance;
    const returnsHSA = defaultPortfolios[2].returns;
    const balance401k = data401k[data401k.length - 1].balance;
    const returns401k = defaultPortfolioData
      .concat(data401k)
      .reduce((acc, curr): number => getSumMoney(acc, -curr.deposit), balance401k);
    defaultPortfolios[0].balance = getSumMoney(balanceHSA, balance401k);
    defaultPortfolios[0].returns = getSumMoney(returnsHSA, returns401k);
    defaultPortfolios[1].balance = balance401k;
    defaultPortfolios[1].returns = returns401k;

    request
      .get('/api/portfolio')
      .expect('Content-Type', /json/)
      .expect(200, defaultPortfolios)
      .end(done);
  });

  // TODO: get valid 4xx error code once error handling is completed
  test('should receive 500 for invalid param from a POST /api/portfolio/data', async (done): Promise<void> => {
    request
      .post('/api/portfolio/data')
      .send({})
      .expect(500)
      .end(done);
  });

  test('should add or update data from a PUT /api/portfolio/:id', async (done): Promise<void> => {
    dataHSA.push({
      date: Date.parse(new Date('12/31/2019').toDateString()),
      balance: 2196,
      deposit: 500,
    });

    await request
      .put('/api/portfolio/3')
      .send(dataHSA)
      .expect(201);

    const balance401k = defaultPortfolios[1].balance;
    const returns401k = defaultPortfolios[1].returns;
    const balanceHSA = dataHSA[dataHSA.length - 1].balance;
    const returnsHSA = dataHSA
      .reduce((acc, curr): number => getSumMoney(acc, -curr.deposit), balanceHSA);
    defaultPortfolios[0].balance = getSumMoney(balance401k, balanceHSA);
    defaultPortfolios[0].returns = getSumMoney(returns401k, returnsHSA);
    defaultPortfolios[2].balance = balanceHSA;
    defaultPortfolios[2].returns = returnsHSA;

    request
      .get('/api/portfolio')
      .expect('Content-Type', /json/)
      .expect(200, defaultPortfolios)
      .end(done);
  });

  // TODO: get valid 4xx error code once error handling is completed
  test('should receive 500 for invalid param from a PUT /api/portfolio/:id', async (done): Promise<void> => {
    request
      .put('/api/portfolio/3')
      .send({})
      .expect(500)
      .end(done);
  });

  test('should add or update data from a PUT /api/portfolio/:id', async (done): Promise<void> => {
    dataHSA.push({
      portfolioId: 3,
      date: Date.parse(new Date('1/27/2020').toDateString()),
      balance: 2234.75,
      deposit: 0,
    });

    data401k.push({
      portfolioId: 2,
      date: Date.parse(new Date('5/20/2020').toDateString()),
      balance: 1123.52,
      deposit: 0,
    });

    const data = data401k.concat(dataHSA[3]);

    await request
      .put('/api/portfolio/data')
      .send(data)
      .expect(201);

    const balance401k = data401k[data401k.length - 1].balance;
    const returns401k = defaultPortfolioData
      .concat(data401k)
      .reduce((acc, curr): number => getSumMoney(acc, -curr.deposit), balance401k);
    const balanceHSA = dataHSA[dataHSA.length - 1].balance;
    const returnsHSA = dataHSA
      .reduce((acc, curr): number => getSumMoney(acc, -curr.deposit), balanceHSA);
    defaultPortfolios[0].balance = getSumMoney(balance401k, balanceHSA);
    defaultPortfolios[0].returns = getSumMoney(returns401k, returnsHSA);
    defaultPortfolios[1].balance = balance401k;
    defaultPortfolios[1].returns = returns401k;
    defaultPortfolios[2].balance = balanceHSA;
    defaultPortfolios[2].returns = returnsHSA;

    request
      .get('/api/portfolio')
      .expect('Content-Type', /json/)
      .expect(200, defaultPortfolios)
      .end(done);
  });

  // TODO: get valid 4xx error code once error handling is completed
  test('should receive 500 for invalid param from a PUT /api/portfolio/data', async (done): Promise<void> => {
    request
      .put('/api/portfolio/data')
      .send({})
      .expect(500)
      .end(done);
  });
});
