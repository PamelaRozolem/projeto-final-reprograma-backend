const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
 router.get('/exemple',(req, res) =>{
    try {
      const id = req.query.id;
      const name = req.query.name;
      const page = req.query.page;
    
      console.log(page);
      console.log(name);
      console.log(id);
     return res.json({status:'executado com sucesso'});
        
    } catch (error) {
        return res.status(500).send({error:'Não foi possivel processar a requisição'});
    }
   
});
 router.post('/exemple',(req, res)=>{
    try {
        return res.json({status:'executado com sucesso'});
           
       } catch (error) {
           return res.status(500).send({error:'Não foi possivel processar a requisição'});
       }
});
 module.exports = app => app.use('/api', router)
