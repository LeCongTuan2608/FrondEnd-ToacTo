import io from 'socket.io-client';

export const host = 'http://localhost:4000';
const socket = io(host, {
   autoConnect: false,
   // reconnection: false,
});

export default socket;
