import axios from '@/services/axios';
import { ServiceCreator } from '../models/action';

export const requestPortfolioList: ServiceCreator = () => axios.get('/api/portfolio');

export const requestSelectedPortfolio: ServiceCreator = action => axios
  .get(`/api/portfolio/${action.payload.id}`, action.meta);
