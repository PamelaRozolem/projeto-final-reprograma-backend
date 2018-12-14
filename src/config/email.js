require('dotenv').config();
module.exports = {
    host: process.env.HOST,
    port: process.env.PORT_EMAIL,
    secure:false,
    auth:{
        user: `${process.env.USER_EMAIL}`,
        pass: `${process.env.EMAIL_PASS}`
    },
    tls:{
        "rejectUnauthorized":true
    }
}