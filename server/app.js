const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/tasks');
//const authRouter = require('./routes/auth');
//const userRouter = require('./routes/users');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./utils/limiter');
const path = require('path');

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://stafeeva.site',
    'http://admin.stafeeva.site',
    'http://test.stafeeva.site',
    'https://stafeeva.site',
    'https://admin.stafeeva.site',
    'https://test.stafeeva.site'
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
  credentials: true,
};

const { PORT = 3005 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/todo', {
  useNewUrlParser: true
});

app.use(express.static(path.join(__dirname, './public')));

//app.use(cors());
app.use(limiter);
app.use(helmet());
app.use('*', cors(options));
app.use(bodyParser.json());

app.use('/', router);
/* app.use('/', authRouter);
app.use('/', userRouter); */

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
