require('dotenv').config();
module.exports = {
    host: process.env.HOST,
    port: process.env.PORT_EMAIL,
    secure:false,
    auth:{
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls:{
        "rejectUnauthorized":true
    }

}