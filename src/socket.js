import io from 'socket.io-client';

export const host = 'http://localhost:4000';
// export const host = 'https://web-social-2c4s.onrender.com';
const socket = io(host, {
   autoConnect: false,
   // reconnection: false,
});

export default socket;
