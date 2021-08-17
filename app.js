require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const paymentsRouter = require('./routes/payments');
const ordersRouter = require('./routes/orders');
const coursesRouter = require('./routes/courses');
const chaptersRouter = require('./routes/chapters');
const mediaRouter = require('./routes/media');
const tokenRouter = require('./routes/refresh_token');
const mentorRouter = require('./routes/mentors');
const lessonRouter = require('./routes/lesson');
const imageCourseRouter = require('./routes/imageCourses');
const myCourseRouter = require('./routes/myCourses');
const reviewRouter = require('./routes/reviews');
const webhookRouter = require('./routes/webhook');

const verifyToken = require('./middleware/verify-token');

const app = express();

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/media', mediaRouter);
app.use('/payments', paymentsRouter);
app.use('/orders', ordersRouter);
app.use('/courses', coursesRouter);
app.use('/chapters', chaptersRouter);
app.use('/refresh-tokens', tokenRouter);
app.use('/mentors', verifyToken, mentorRouter);
app.use('/lessons', verifyToken, lessonRouter);
app.use('/image-courses', verifyToken, imageCourseRouter);
app.use('/my-courses', verifyToken, myCourseRouter);
app.use('/reviews', verifyToken, reviewRouter);
app.use('/webhook', webhookRouter);

module.exports = app;