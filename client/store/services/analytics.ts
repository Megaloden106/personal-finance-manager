import axios from '@/services/axios';
import { ServiceCreator } from '../models/action';

export const requestAnaltyicsTotal: ServiceCreator = action => axios
  .get(`/api/analytics/total/${action.payload}`);

export const requestAnaltyicsAnnualize: ServiceCreator = action => axios
  .get(`/api/analytics/annualize/${action.payload}`);

export const requestAnaltyicsPastYear: ServiceCreator = action => axios
  .get(`/api/analytics/past-year/${action.payload}`);
