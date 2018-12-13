const bitcoin = require('bitcoinjs-lib');

class GenerateWallet {

    static generate(){
        try {
            const keyPair = bitcoin.ECPair.makeRandom();// gera duas chaves 
            const privateKey = keyPair.toWIF(); //obtem a chave privada
            const publicKey = keyPair.publicKey.toString('hex'); // obtem a chave publica

            return {
                publicKey:publicKey,
                privateKey:privateKey
            }
        } catch (error) {
            console.error('erro: erro em gerar a chave publica e privada na classe GenerateWallet no metodo generate');
        }
    }

    
      
};

module.exports = GenerateWallet;
