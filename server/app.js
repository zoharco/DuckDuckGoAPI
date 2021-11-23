const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const indexRouter = require('./routes/index-routes');
const lastQueriesController = require('./routes/last-quries-routes');

app.use('/last-quries', lastQueriesController);
app.use('/', indexRouter);

app.listen(5000);