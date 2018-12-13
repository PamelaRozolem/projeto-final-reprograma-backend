require('dotenv').config();
module.exports = 
{
    path: process.env.PATH_API || '/api',
    system: process.env.SYSTEM,
    appClientConfirm: process.env.APP_CONFIRM,
    appForgotPassword: process.env.APP_RESET,
    connectionDb: process.env.DB_HOST,
    secret: process.env.SECRET
}