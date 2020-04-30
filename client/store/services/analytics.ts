import axios from 'services/axios';
import { ServiceCreator } from '../models/action';

export const requestAnaltyics: ServiceCreator = action => axios
  .get(`/api/analytics/${action.payload}`);
