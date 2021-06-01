// import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export function updateAuthStore(data) {
  const {auth} = data;
  if(auth) {
    setTokens(auth.token, auth.refresh_token);
  }
}

export function setTokens(token, refresh_token) {
  localStorage.setItem('demo_app_refresh_token', refresh_token);
  localStorage.setItem('demo_app_token', token);
}

export function setToken(token) {
  localStorage.setItem('demo_app_token', token);
}

export function getAccessToken() {
  return localStorage.getItem('demo_app_token');
}

export function getRefreshToken() {
  return localStorage.getItem('demo_app_refresh_token');
}

export function removeTokens() {
  localStorage.removeItem('demo_app_refresh_token');
  localStorage.removeItem('demo_app_token');
}

export function getSessionUUID() {
  let sessionUUID = sessionStorage.getItem("uuid");
  if(sessionUUID) {
    return sessionUUID;
  }

  // generate uuid
  sessionUUID = uuidv4();
  sessionStorage.setItem("uuid", sessionUUID);
  return sessionUUID;
}
