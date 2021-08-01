const EventSocket = require('../constants/eventsocket.contant');
const BROWSER_CLIENTS = {};
const PROCESSOR_CLIENTS = {};

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log('New client connected');

    socket.on(EventSocket.SOURCE, payload => {
      console.log('Connected to 1', payload);
      if (payload == 'browser')
          BROWSER_CLIENTS[socket.id] = socket;
      else if (payload == 'processor')
          PROCESSOR_CLIENTS[socket.id] = socket;
    });

    socket.on(EventSocket.MEASUREMENT_RESULT, (packet) => {
      for (let i in BROWSER_CLIENTS)
        BROWSER_CLIENTS[i].emit(EventSocket.MEASUREMENT_RESULT, packet)
    })

    socket.on(EventSocket.MONITOR_PARAMETER, (packet) => {
      for (let i in PROCESSOR_CLIENTS)
        PROCESSOR_CLIENTS[i].emit(EventSocket.MONITOR_PARAMETER, packet)
    })
  });
};
