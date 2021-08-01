const mongoose = require('mongoose')

exports.connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.error(err))

  if (process.env.NODE_ENV == 'development') {
    mongoose.set('debug', true);
  }
}