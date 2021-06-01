import axios from 'axios';
import { defaultHeader } from './defaultHeader';
import { createAxiosResponseInterceptor } from './createAxiosResponseInterceptor';

defaultHeader();
createAxiosResponseInterceptor();

export function registerAccount(params) {
  return axios.post('/register', params);
}

export function loginService(params) {
  return axios.post('/signin', params);
}

export function sendMSGService(params) {
  return axios.post('/messages', params);
}

export function logout() {
  return axios.delete('/signout');
}

export function getCurrentUser() {
  return axios.get('/my_account');
}
