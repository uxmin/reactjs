const express = require('express');
const router = express.Router();

const User = require('../schemas/user');

router.post('/join', async (req, res, next) => {
  try{
    const createUser = await User.create({
      id: req.body.id,
      password: req.body.password,
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address
    })
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try{
    const selectUser = await User.findOne({
      id: req.body.id,
      password: req.body.password
    });
    console.log('selectUser', selectUser);
    res.json(selectUser);
  }catch(err){
    console.error(err);
    next(err);
  }
});

module.exports = router;