import axios from 'services/axios';

export const requestUserData = () => axios.get('/api/user');
