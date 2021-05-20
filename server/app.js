const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 환경변수 설정
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
switch(process.env.NODE_ENV){
  case 'test':
    dotenv.config(path.join(__dirname, '../env/test.env'));
    console.log('테스트모드'); break;
  case 'development':
    dotenv.config(path.join(__dirname, '../env/dev.env'));
    console.log('개발모드'); break;
  case 'production':
    dotenv.config(path.join(__dirname, '../env/prod.env'));
    console.log('배포모드'); break;
  default: console.log('모드가 설정되지 않았어요');
}

const app = express();
const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const connect = require('./schemas/index');
connect();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MongoDB Session
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
  collection: 'mySessions'
});
store.on('error', (err, next) => {
  return console.error(err);
  next();
});

// app.set('proxy', 1);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 미들웨어
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(morgan('dev'));                                                 // 추가적인 로그 (dev, combined, common, short, tiny)
app.use('/', express.static(path.join(__dirname, 'public')));           // 정적인 파일들을 제공 (public 폴더 내 css, js, 이미지 등 정적인 파일을 넣고 브라우저로 접근 가능)
app.use(express.json());                                                // 본문의 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));                       // 요청에 동봉된 쿠키를 해석해서 req.cookies 객체로 변환해주는 미들웨어
app.use(cors());
app.use(session({                       // [세션]
  resave: false,                        // 요청이 올 때 세션에 수정사항이 생기지 않더라도 세션을 다시 생성할 지 설정 (false를 권장하나 DB에 저장하려면 true)
  saveUninitialized: false,             // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할 지 설정
  secret: process.env.COOKIE_SECRET,    // 쿠키를 서명하는데 필요 (cookie-parser의 secret과 같게 설정하는 것이 좋음)
  store: store,                         // DB 저장 위치 (따로 설정하지 않으면 메모리에 저장됨. 서버를 재시작하면 초기화가 되기 때문에 보통 '레디스'를 이용해 세션 저장)
  cookie: {                             // 쿠키
    httpOnly: true,                       // 클라이언트에서 쿠키를 확인할 수 없음
    secure: false                         // https가 아닌 환경에서도 사용할 수 있음 (배포를 할 때는 true로 설정하는 것이 좋고, 이 경우에 별도의 프록시 설정이 필요!)
  },
  name: 'session-cookie'                // 세션 쿠키의 이름 (기본값: conect.sid)
}));

app.use((req, res, next) => {
  console.log('미들웨어 요청이 실행됩니다.');
  next();
});

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
app.listen(process.env.PORT, ()=> {
  console.log('Server is running on ' + process.env.PORT);
});