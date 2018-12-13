const Settings = require('../config/settings');

class TemplateRegister {
    
    static template(name,hash){
      console.log('template');
        return `<div style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4em;margin:0;padding:0;text-align:center">
        <table style="margin:0 auto;"width="400" cellspacing="0" cellpadding="0" border="0">
          <tbody>
            <tr>
              <td>
                <p>Olá <strong>${name},</strong></p>
                <p>Você esta próximo de fazer parte do nosso gerenciador de crypto carteiras.</p>
                <p>Para concluir seu cadastro clique no botão abaixo</p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <a href="${Settings.appClientConfirm}/${hash}"style="background-color:#f43d4c;border:1px solid #283645;padding:10px;border-radius:10px;color:white;text-decoration:none;cursor:pointer">Confirme</a>
              </td>
            </tr>
          </tbody>
        </table>
        </div>`;
    }
}


module.exports = TemplateRegister;