const dotenv = require('dotenv/config')
const mongoose = require('mongoose')
const express = require('express')
// const cors = require('cors')

const dbConnect = require('../dbconnect')

// dotenv()
// dbConnect.connectMongo()

const app = express()

server = app.listen(3003, () => {
  console.log(`  Service processor start on port: ${3003}`);
});

app.get('/', (req, res) => {
  res.send('OK') 
})

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  }
})

require('./routers/socket.router')(io);