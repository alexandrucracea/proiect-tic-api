//aici avem importate toate middleware-uri

require('express-async-errors'); //vrem express
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express(); //folosim express
const helmet = require('helmet'); //ceva librarie de mesaje
const router = require('./router');
const setupCors = require('./cors/setup-cors');
const { speedLimiter } = require('./middleware');
const cors = require("cors");

const { initializeFirestore } = require('./functions');
initializeFirestore();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// custom cors config
app.use(cors());  //cors = cross origin resource sharing -> fara el nu poti face requesturi in afara localhostului

// add speed limiter for all requests
app.use(speedLimiter);

// route everything
app.use(router);

module.exports = app;
