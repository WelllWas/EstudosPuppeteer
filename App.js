const express = require('express');
const app = express();
const Route = require('./Route');

app.use(express.json());
app.use('/bot', Route);

app.listen(3000);