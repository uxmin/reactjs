const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.end('index');
});

module.exports = router;