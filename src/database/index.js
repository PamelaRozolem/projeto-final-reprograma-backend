const mongoose = require('mongoose');
const Settings= require('../config/settings');

mongoose.connect(Settings.connectionDb,{useNewUrlParser:true});
mongoose.Promise = global.Promise;

module.exports = mongoose;