const mongoose = require('../database');

const confirmationSchema = new mongoose.Schema({
    userId:{type:String},
    hash:{type:String},
    createAt:{type:Date,default:Date.now}
});


const userConfirmation = mongoose.model('confirmation', confirmationSchema);

module.exports = userConfirmation;