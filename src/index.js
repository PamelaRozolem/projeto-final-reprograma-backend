/**
 * @name projeto-final-reprograma 
 * @version 0.0.1
 * @author Pamela Rozolem
 * @description Projeto para a apresentação final da turma de full-stack da instituição 
 * reprograma, criação de uma wallet para a blockckain.
 */


const express =  require('express'); 
const bodyParser = require('body-parser'); // transforma em json 
const cors = require('cors'); 

const app = express();
const corsOptions = {
    origin:"*",
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); // explicar para que serve 
require('./controllers/exempleController')(app);
require('./controllers/authController')(app);
require('./controllers/walletController')(app);

app.listen(process.env.PORT||5000);

module.exports = app;