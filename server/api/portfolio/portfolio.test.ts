/* eslint-disable import/no-extraneous-dependencies */
import '../../dotenv.config';
import supertest from 'supertest';
import app from '../../app';
import { client } from '../../database';
import PortfolioModel, { PortfolioDTO } from './portfolio.model';
import portfoliosSeed from '../../assets/data/portfolios.seed.json';

const request = supertest(app);
const tableName = 'portfolios';

describe('Portfolio Controller', (): void => {
  const rothIRA = {
    name: 'Roth IRA',
    brokerage: 'Vanguard',
    isRetirement: true,
    isSavings: false,
  };

  beforeAll(async (): Promise<void> => {
    const query = PortfolioModel.getMultiplePOSTQuery(portfoliosSeed);
    const values = PortfolioModel.getMultipleParametizedValues(portfoliosSeed as PortfolioDTO[]);
    await client.query(query, values);
  });

  afterAll(async (): Promise<void> => {
    await client.query(`DELETE FROM ${tableName}`);
    await client.end();
  });

  test('should retrieve data from a get request', (done): void => {
    request
      .get('/api/portfolio')
      .expect('Content-Type', /json/)
      .expect((res): void => {
        res.body.forEach((datum: PortfolioDTO): void => {
          delete datum.id;
        });
      })
      .expect(200, portfoliosSeed)
      .end(done);
  });

  test('should add data from a post request', async (done): Promise<void> => {
    await request
      .post('/api/portfolio')
      .send(rothIRA)
      .expect('Content-Type', /json/)
      .expect((res): void => {
        delete res.body.id;
      })
      .expect(201, rothIRA);

    request
      .get('/api/portfolio')
      .expect('Content-Type', /json/)
      .expect((res): void => {
        res.body.forEach((datum: PortfolioDTO): void => {
          delete datum.id;
        });
      })
      .expect(200, portfoliosSeed.concat(rothIRA))
      .end(done);
  });

  test('should update data from a patch request', async (done): Promise<void> => {
    const hsa = {
      id: portfoliosSeed.length + 1,
      name: 'HSA',
      brokerage: 'Health Equity',
      isRetirement: false,
      isSavings: true,
    };

    await request
      .patch('/api/portfolio')
      .send(hsa)
      .expect('Content-Type', /json/)
      .expect(200, hsa);

    delete hsa.id;

    request
      .get('/api/portfolio')
      .expect('Content-Type', /json/)
      .expect((res): void => {
        res.body.forEach((datum: PortfolioDTO): void => {
          delete datum.id;
        });
      })
      .expect(200, portfoliosSeed.concat(hsa))
      .end(done);
  });
});
