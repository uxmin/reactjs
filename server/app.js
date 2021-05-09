const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const port = process.env.PORT || 3001;
const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const connect = require('./schemas/index');
connect();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MongoDB Session
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
  collection: 'mySessions'
});
store.on('error', (err, next) => {
  return console.error(err);
  next();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Session
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.set('proxy', 1);
app.use(session({
  saveUninitialized: true,              
  resave: true,                         // 저장여부 (false를 권장하나 DB에 저장하려면 true)
  secret: 'secret key',                 // 시크릿 키
  store: store,                         // DB 저장 위치
  cookie: {                             // 쿠키 
    maxAge: 1000 * 60 * 60 * 24 * 7,    // 1주일
    secure: true                        // 이 설정을 사용하는 경우 프록시 설정이 필요 (Https)
  } 
}));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 미들웨어
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*
// 에러 처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없어요.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.rendor('error');
});
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 라우터
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(indexRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 서버
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});     // header
  res.write('<h1>Hello, Node!</h1>');                                   // body
  res.end('<p>hello, server!</p>')
});
*/
app.listen(port, ()=> {
  console.log(`Server is running on ${port}`);
});