const mongoose = require('../database');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {type:String,require:true},
    email:{type:String,require:true,unique:true,lowercase:true},
    password:{type:String,require:true,select:false}, //so retorna qual eu pedir a senha 
    passwordResetToken:{type:String,select:false},
    status:{type:Boolean,default:false},
    createAt:{type:Date,default:Date.now},
    passwordResetExpires:{type:Date,select:false}
});

userSchema.pre('save', async function (next) {
     const password = this.password;
     hash = await bcrypt.hash(password,10);
     this.password = hash;
        next();
   
});

const user = mongoose.model('User', userSchema);

module.exports = user;