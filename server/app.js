const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

const connect = require('./schemas/index');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');

connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //true: qs module ? query-string module
app.use(indexRouter);
app.use('/post', postRouter);

app.listen(port, ()=> {
  console.log(`Server is running on ${port}`);
});