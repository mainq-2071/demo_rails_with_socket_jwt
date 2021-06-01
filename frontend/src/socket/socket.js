import { io } from "socket.io-client";

import { getAccessToken } from './../redux/tokenStore';
const token = getAccessToken();
console.log(token)
const SOCKET_URL = 'localhost:3333';
const socket = io(SOCKET_URL, {
  auth: {
    token: token
  }
});

var count_retry = 0;
socket.on("connect_error", (err) => {
  if (err.message === 'invalid_token' && count_retry < 3) {
    const token = getAccessToken();
    // Fetch refresh token here
    socket.auth.token = token;

    socket.connect();
    count_retry++
  } else if(!socket.auth.token) {
    const token = getAccessToken();
    socket.auth.token = token;
    socket.connect();
  }
});

export default socket;
