var express = require('express');
const cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { invalidRouteHandler } = require('./middlewares')

//
dotenv.config();

const connectionString = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD ??= ""
);

mongoose.connect(connectionString).then(() => {
    console.log('successfully connected to DB');
});

//
var postRouter = require('./routes/post');
var postsRouter = require('./routes/posts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/post', postRouter);
app.use('/posts', postsRouter);

app.use(invalidRouteHandler);

//
module.exports = app;
