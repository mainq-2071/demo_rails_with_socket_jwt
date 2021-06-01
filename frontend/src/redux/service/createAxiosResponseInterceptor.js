import axios from 'axios';
import { getRefreshToken, setTokens } from '../tokenStore';

export function createAxiosResponseInterceptor() {
  // for multiple requests
  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {

    const originalRequest = error.config;

    const refreshToken = getRefreshToken();
    if (refreshToken && error.response && error.response.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject});
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        }).catch(err => {
          return err;
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
         axios.post('/refresh_token', { refresh_token: refreshToken })
          .then(({data}) => {
            const newToken = data.auth.token;
            const newRefreshToken = data.auth.refresh_token;
            setTokens(newToken, newRefreshToken);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
            originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
            processQueue(null, newToken);
            resolve(axios(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .then(() => { isRefreshing = false; });
      });
    }

    return Promise.reject(error);
  });
}
