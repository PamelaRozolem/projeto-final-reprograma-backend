const nodeMailer = require('nodemailer');
const ConfigEmail = require('../config/email');
const Settings = require('../config/settings');

class Email {

        constructor(email, template){
            this.transporter = nodeMailer.createTransport(ConfigEmail);    
            this.options = {
                from: ConfigEmail.auth.user,
                to: email,
                    subject: Settings.system,
                    text: 'Confirmacao de Registro',
                    html: template
            };
        }

        sendEmail(){
         return this.transporter.sendMail(this.options,(error,info)=>{
             if(error){
                     console.error('erro ao enviar o email',error);
             }
         });

    }
}

module.exports = Email;