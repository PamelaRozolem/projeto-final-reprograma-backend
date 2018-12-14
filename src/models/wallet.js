const mongoose = require('../database');

const walletSchema = new mongoose.Schema({
    publicKey : {type:String, require:true},
    privateKey: {type:String,require:true},
    userId: {type:String,require:true,select:false},
    status:{type:Boolean,default:true, select:false},
    createAt:{type:Date,default:Date.now}
});

const wallet = mongoose.model('Wallet', walletSchema);

module.exports = wallet;