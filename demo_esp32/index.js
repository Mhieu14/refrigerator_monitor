const io = require('socket.io-client')

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   

const getRandom = (a, b) => {
  return a + (b-a)*Math.random()
}

const loop = async (socket) => {
  while(1) {
    await sleep(10000)
    const package = {
      time: new Date(),
      humidity: getRandom(40, 50),
      temperature: getRandom(10, 15)
    }
    socket.emit('measurement_result', package)
    // console.log('Measure result: ', package);
  }
}

const startConnection = async (socket) => {
    await socket.emit('source', 'processor')
    loop(socket)
    socket.on('monitor_parameter', (package) => {
      console.log('Monitor parameter change: ', package);
    })
}
 
try {
  const socket = io("http://localhost:3003");
  startConnection(socket)
} catch (error) {
  console.log(error)
}

