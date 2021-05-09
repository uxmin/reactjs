const express = require('express');
const session = require('express-session');
const { scrypt, randomFill, createCipheriv, createDecipheriv, scryptSync } = require('crypto');
const router = express.Router();

// 내가 만든 모듈
const User = require('../schemas/user');
const login = require('../modules/login');
// 공통 객체 선언
const algorithm = 'aes-192-cbc';      // 암호화방식 - ? - Mode (AES 암호화 방식은 Default Mode가 cbc)
const keyword = 'I am password';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 회원가입
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/join', async (req, res, next) => {
  try{
    // 비밀번호 암호화
    const password = req.body.password;
    console.log('입력된 비밀번호:\n>>', password);
    scrypt(keyword, 'salt', 24, (err, key) => {
      if (err) throw err;
      randomFill(new Uint8Array(16), (err, iv) => {
        if (err) throw err;
        const cipher = createCipheriv(algorithm, key, iv);
        console.log('*', typeof(key), key, '\n*', typeof(iv), iv);
        let encrypted = cipher.update(password, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        console.log('암호화된 비밀번호:\n>>', encrypted);
        const createUser = User.create({
          id: req.body.id,
          password: encrypted,
          keyBuf: key,
          ivBuf: Object.values(iv),
          username: req.body.username,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address
        }).then(console.log('회원가입 완료'));
      });
    });
    res.status(200);
  }catch(err){
    res.status(500);
    console.error(err);
    next(err);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 로그인
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
router.post('/login', async (req, res, next) => {
  try{
    const selectUser = await User.findOne({ id: req.body.id });
    console.log('유저정보:\n', typeof(selectUser), '\n', selectUser);
    const password = selectUser.password;
    const key = selectUser.keyBuf;
    const iv = new Uint8Array(selectUser.ivBuf);

    const decipher = createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(password, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    // console.log('복호화된 비밀번호:\n', decrypted);

    if(req.body.password == decrypted){
      console.log('비밀번호 일치');
      res.json(selectUser.id);
    }else{
      res.status(500);
    }
  }catch(err){
    console.error(err);
    next(err);
  }
});
/*
// Express
router.post('/login', async (req, res, next) => {
  session = req.session;
  try{
    const selectUser = await User.findOne({
      id: req.body.id,
      password: req.body.password
    });
    if(selectUser != null){
      session.id = selectUser.id;
      res.json(selectUser);
    }else{
      res.status(500).send('회원 정보없음');
    }
  }catch(err){
    console.error(err);
    next(err);
  }
});
*/

module.exports = router;