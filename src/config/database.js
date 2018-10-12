var mongoose = require('mongoose');
var constants = require('./constants');

// Set up mongoose connection

module.exports.dbConnect = ()=>{ 
const mongoDB = constants.MONGO_URL
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}