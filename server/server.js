const httpServer = require('http').createServer();

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:1234',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (client) => {
  client.emit('init', { data: 'hello world' });
});

httpServer.listen(3000);
