const httpServer = require('http').createServer();
const { createGameState, gameLoop } = require('./game');
const { FRAME_RATE } = require('./constants');

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:1234',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (client) => {
  const state = createGameState();

  startGameInterval(client, state);
});

function startGameInterval(client, state) {
  const intervalId = setInterval(() => {
    const winner = gameLoop(state);
    if (!winner) {
      client.emit('gameState', JSON.stringify(state));
    } else {
      client.emit('gameOver');
      clearInterval(intervalId);
    }
  }, 1000 / FRAME_RATE);
}

httpServer.listen(3000);
