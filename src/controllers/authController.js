const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const settings = require('../config/settings.js');
const Settings = require('../config/settings');
const User = require('../models/user');
const UserConfirmation = require('../models/userConfirmation');
const Email = require('../core/email');
const TemplateRegister = require('../core/templateRegister');
const TemplateForgotPassword = require('../core/templateForgotPassword');

const router = express.Router();

router.post('/authenticate', async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email:email, status:true}).select('password');
    if(!user){
        return res.status(400).send({error:'Usuario não encontrado'});
    }

    if(!await bcrypt.compare(password,user.password)){
        return res.status(400).send({error:'Senha invalida'});
    }

    user.password = undefined;

    const token = jwt.sign({id:user.id}, settings.secret,{expiresIn:86400});

    res.send({token});
});

router.post('/register', async (req,res)=>{
    const email = req.body.email;
    try {

        if(await User.findOne({email})){
            return res.status(400).send({error:'usuario já existente'})
        }

        const user = await User.create(req.body);
       
        if(user.email){
            const hashCripto = await crypto.randomBytes(20).toString('hex');
            const confirmation = await UserConfirmation.create({userId: user._id,hash: hashCripto});
            const template = TemplateRegister.template(user.name, hashCripto);
            const mailer = new Email(user.email, template);
            mailer.sendEmail();    
        }
       
        return res.send({
            message:'Acesse seu email para confirmar sua autenticação'
        });
        
    } catch (error) {
        return res.status(400).send({error:'Não foi possivel processar a requisição'});
    }
});

router.post('/confirm/:token',async (req,res)=>{
    try {
        const token = req.params.token;
        const userConfirmation = await UserConfirmation.findOne({hash:token});

        if(!userConfirmation){
            return res.status(400).send({error:'Token invalido'});
        }

        const user = await User.findByIdAndUpdate({_id:userConfirmation.userId},{$set:{status:true}},{new:true});
        const confirmationDelete = await UserConfirmation.deleteOne({userId:userConfirmation.userId});
        
        return res.send({messege:'Usuario confirmado com sucesso'});
    } catch (error) {
        return res.status(400).send({error:'Não foi possivel processar a requisição'});
    }
    
});

    router.post('/forgot_password',async (req,res)=>{
        const {email} = req.body;
        try {
            const userModel = await User.findOne({email});

            if(!userModel)
                return res.status(400).send({error:'Usuario não encontrado'});

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours()+1);
            await User.findByIdAndUpdate(userModel._id,{$set:{passwordResetToken:token,passwordResetExpires:now}});
            const mailer = new Email(userModel.email,TemplateForgotPassword.template(userModel.name,token));
            mailer.sendEmail();

            return res.send({message:'Acesse seu email para confirmar sua autenticação'});
        } catch (error) {
            return res.status(400).send({error:'Não foi possivel processar a requisição'});
        }
    });

    router.put('/reset_password',async (req,res)=>{
        const {email,token,password} = req.body;
        try {
            const user = await User.findOne({email}).select('+passwordResetExpires passwordResetToken');
            if(!user)
                return res.status(400).send({error:'Usuario não encontrado'});

            if(token !== user.passwordResetToken) 
                return res.status(400).send({error:'Token invalido'});
                
            if(new Date()> user.passwordResetExpires)
                return res.status(400).send({error:'Token expirado'});

            user.password = password;
            await user.save();
                return res.send({message:'Senha alterada com sucesso'});
        } catch (error) {
            return res.status(400).send({error:'Não foi possivel processar a requisição'});
        }
    });



module.exports = app => app.use(`${Settings.path}/auth`, router);
