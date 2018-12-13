const jwt = require('jsonwebtoken');
const settings = require('../config/settings.js');

module.exports = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({error:'Token não encontrado'});
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).send({error:'Erro no token'});
    }

    const [scheme,token] = parts;  // atribuição via desestruturação 

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error:'Token mal formatado'});
    }

    jwt.verify(token,settings.secret,(error,decoded)=>{
        if(error){
            return res.status(401).send({error:'Token invalido'});
        }
        req.userId = decoded.id;

        return next();
    })
}