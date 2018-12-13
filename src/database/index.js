const mongoose = require('mongoose');
const Settings= require('../config/settings');

mongoose.connect(Settings.connectionDb,{useNewUrlParser:true});
mongoose.Promise = global.Promise;
// const dataBase = mongoose.connection;

// dataBase.on('error', console.error.bind(console,'connection'));
module.exports = mongoose;