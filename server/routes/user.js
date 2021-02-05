const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json([
        {id: 1, username: 'kim', subject: '첫번째', content: 'Hello, React!'},
        {id: 2, username: 'Lee', subject: '두번째', content: 'Hello, Node!'}
    ]);
});

module.exports = router;