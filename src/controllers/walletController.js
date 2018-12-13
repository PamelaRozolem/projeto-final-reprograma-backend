const express = require('express');
const authMiddleware = require('../middleware/auth');
const Wallet = require('../models/wallet');
const GenerateWallet = require('../core/generateWallet');
const Settings = require('../config/settings');
const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req,res)=>{
    try {
        const userId = req.userId;
        const pairKey = GenerateWallet.generate();
        const wallet = await Wallet.create({publicKey:pairKey.publicKey,privateKey:pairKey.privateKey, userId:userId});

        return res.send({wallet});
    } catch (error) {
        return res.status(400).send({error:'Não foi possivel processar a requisição'});
    }
});

router.get('/list',async (req,res)=>{
    try {
        const userId = req.userId;
        const wallet = await Wallet.find({userId:userId,status:true});

        return res.send({wallet});
    } catch (error) {
        return res.status(400).send({error:'Não foi possivel processar a requisição'});
    }

});

router.get('/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const userId = req.userId;
        const wallet = await Wallet.find({_id:id, userId:userId,status:true}); //await é para esperar o retorno 

        return res.send({wallet});

    } catch (error) {
        return res.status(400).send({error:'Não foi possivel processar a requisição'});
    }
});

router.delete('/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const userId = req.userId;
        const wallet = await Wallet.findByIdAndUpdate({_id:id, userId:userId},{$set:{status:false}},{new:true});

        return res.send({message:'excluido com sucesso'});

    } catch (error) {
        return res.status(400).send({error:'Não foi possivel processar a requisição'});
    }
    
})

module.exports = app => app.use(`${Settings.path}/wallet`, router);
