const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
  collection: 'mySessions'
});
store.on('error', (err, next) => {
  return console.error(err);
  next();
});
app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
  }
}));

const connect = require('./schemas/index');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // true: qs module ? query-string module

app.use(indexRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(port, ()=> {
  console.log(`Server is running on ${port}`);
});