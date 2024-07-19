// socket.js
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // 서버 URL과 포트가 올바른지 확인

export default socket;