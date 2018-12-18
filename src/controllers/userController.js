const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');
const Settings = require('../config/settings');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) =>{
    try {
        const userId = req.userId;
        const user = await User.findOne({_id:userId});
        return res.json({user});
        
    } catch (error) {
        return res.status(500).send({error:'Não foi possivel processar a requisição'});
    }
   
});

 module.exports = app => app.use(`${Settings.path}/user`, router);
