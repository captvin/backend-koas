let ioInstance;

module.exports = {
  init: (server) => {
    const { Server } = require('socket.io');
    ioInstance = new Server(server, {
      cors: {
        origin: '*', // Sesuaikan dengan origin frontend Anda
        methods: ['GET', 'POST'],
      },
    });

    ioInstance.on('connection', (socket) => {
      // console.log(`Client connected: ${socket.id}`);

      socket.on('joinRoom', (token) => {
        socket.join(token); // Token digunakan sebagai nama room
      });

      socket.on('disconnect', () => {
        // console.log(`Client disconnected: ${socket.id}`);
      });
    });
  },

  getIO: () => {
    if (!ioInstance) {
      throw new Error('Socket.IO is not initialized');
    }
    return ioInstance;
  },
};