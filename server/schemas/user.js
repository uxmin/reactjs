const mongoose = require('mongoose');
const { Schema } = mongoose;
const saltRounds = 10; // 암호화 할 자릿수

const userSchema = new Schema({
  id: {
    type: String,
    trim: true,
    required: true,
    index: true
  },
  password: {
    type: String,
    validate: [
      function(password){
        return password.length >= 8;
      },
      '8자리 이상의 비밀번호가 아님.'
    ]
  },
  username: {
    type: String,
    trim: true
  },
  keyBuf: {
    type: Buffer,
    trim: true,
    default: null
  },
  ivBuf: {
    type: [Number],
    trim: true,
    default: null
  },
  phone: {
    type: Number,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true
    // match: /.+\@.+@..+/
  },
  address: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['Admin','User'],
    default: 'User'
  },
  state: {
    type: Number,
    enum: [0, 1],
    default: 1
  }
});

module.exports = mongoose.model('User', userSchema);