const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

const connect = require('./schemas/index');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

connect();

app.use(cors());
app.use(indexRouter);
app.use('/user', userRouter);

app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
});