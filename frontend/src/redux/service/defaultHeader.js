import axios from 'axios';
import { getAccessToken, getSessionUUID } from './../tokenStore';

export function defaultHeader() {
  const token = getAccessToken();
  const uuid = getSessionUUID();
  // axios.defaults.baseURL = process.env.REACT_APP_API_DOMAIN;
  if (process.env.NODE_ENV === 'production') {
    // server API
    axios.defaults.baseURL = 'http://localhost:3000';
  } else {
    axios.defaults.baseURL = 'http://localhost:3000';
  }
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['UUID'] = uuid;
  if (token !== null) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
}
