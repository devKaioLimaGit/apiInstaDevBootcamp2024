const { Validator, SchemaError } = require("jsonschema");  // Importa o Validator do jsonschema

const v = new Validator();  // Cria uma instância do validador

/**
 * Função de middleware para validar o corpo da requisição com base em um schema JSON.
 * @param {Object} schema - O schema JSON contra o qual a requisição será validada.
 */
const schemaValidator = (schema) => (req, res, next) => {
    // Valida o corpo da requisição contra o schema fornecido
    const result = v.validate(req.body, schema);

    // Verifica se a validação foi bem-sucedida
    if (!result.valid) {
        const errorMessages = [];  // Array para armazenar as mensagens de erro

        // Itera sobre os erros de validação e coleta as mensagens
        for (const item of result.errors) {
            errorMessages.push(item.message).replace('"',"").replace('"',"");
        }

        // Retorna uma resposta de erro com status 401 e as mensagens de erro
        return res.status(400).json({ SchemaError: errorMessages });
    }

    // Se a validação for bem-sucedida, chama o próximo middleware
    next();
};

// Exporta a função schemaValidator para ser usada em outras partes do código
module.exports = schemaValidator;
