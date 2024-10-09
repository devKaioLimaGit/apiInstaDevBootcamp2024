// Importa o módulo 'crypto' para realizar criptografia
const crypto = require("crypto");

// Define o algoritmo de criptografia e a chave secreta
const algorithm = "aes-256-ctr"; // Algoritmo AES no modo CTR
const secretKey = process.env.SECRET_CRYPTO; // A chave secreta deve ser definida como uma variável de ambiente
const iv = crypto.randomBytes(16); // Gera um vetor de inicialização aleatório de 16 bytes

// Função para criptografar um texto
const encrypt = (text) => {
    // Cria um objeto de cifra usando o algoritmo, chave secreta e IV
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    // Realiza a criptografia e concatena os resultados
    const encrypt = Buffer.concat([cipher.update(text.toString()), cipher.final()]);

    // Retorna o IV (em string) e o texto criptografado (em formato hexadecimal)
    return {
        iv: iv.toString('hex'), // Converte o IV para hexadecimal
        content: encrypt.toString('hex') // Converte o texto criptografado para hexadecimal
    };
}

// Função para descriptografar um hash
const decrypt = (hash) => {
    const [newIv, text] = hash.split(":"); // Divide o hash em IV e texto criptografado

    // Cria um objeto de descriptografia usando o algoritmo, chave secreta e IV fornecido
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(newIv, 'hex'));

    // Realiza a descriptografia e concatena os resultados
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(text, 'hex')), // Descriptografa o texto criptografado
        decipher.final() // Finaliza a descriptografia
    ]);

    // Retorna o texto descriptografado como uma string
    return decrypted.toString(); // Corrigido de 'decrypt.toString()' para 'decrypted.toString()'
}

// Exporta as funções 'encrypt' e 'decrypt' para uso em outros módulos
module.exports = {
    encrypt,
    decrypt
}
