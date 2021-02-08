const express = require('express');
const router = express.Router();

const Post = require('../schemas/post');

router.get('/', async (req, res, next) => {
  try {
    const allPost = await Post.find({}).sort({date:-1});
    console.log(allPost);
    res.json(allPost);
  }catch(err) {
    console(err);
    next(err);
  }
});

router.get('/view/:_id', async (req, res, next) => {
  try {
    const selectPost = await Post.find({
      _id: req.params._id
    });
    console.log('selectPost', selectPost);
    res.json(selectPost);
  }catch(err) {
    console.log(err);
    next(err);
  }
});

router.post('/write', async (req, res, next) => {
  try {
    const createPost = await Post.create({
      username: req.body.username,
      subject: req.body.subject,
      content: req.body.content
    });
    console.log('createPost', createPost);
    res.redirect('/');
  }catch(err) {
    console.log(err);
    next(err);
  }
});

router.get('/delete/:_id', async (req, res, next) => {
  try{
    const deletePost = await Post.remove({
      _id: req.params._id
    });
    console.log('deletePost', deletePost);
    res.redirect('/');
  }catch(err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;