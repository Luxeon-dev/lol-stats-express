// Retrieve the app initialized.
const app = require('./init-app');
const express = require('express');

const homeRouter = require('./routes/home');
const swaggerRouter = require('./routes/swagger');
const apiRouter = require('./routes/api');

app.use(homeRouter);
app.use(swaggerRouter);
app.use('/api', apiRouter);

// Map the public directory to serve static files from it.
app.use(express.static('public'));
// app.use('static', express.static('public'));
