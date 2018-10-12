/* eslint-disable no-console */
var  express = require('express');
var constants = require('./config/constants')
var middleware = require('./config/middleware')
var dbconnection = require('./config/database')

const app = express();
middleware(app);

dbconnection.dbConnect();

const router = require('./routes/router')

app.use('/',router);


app.listen(constants.PORT, err => {
  if (err) {
      throw err;
  } else {
      console.log(`Server running on port: ${constants.PORT} `);
  }
});

