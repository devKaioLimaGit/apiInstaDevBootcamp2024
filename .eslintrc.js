module.exports = {
    env: {
      // Define o ambiente em que o código está rodando. 
      // 'commonjs' habilita suporte a módulos CommonJS, 'es2021' permite usar recursos da versão ES2021,
      // e 'node' configura o ambiente para um projeto Node.js.
      commonjs: true,
      es2021: true,
      node: true,
    },
  
    extends: [
      // Herda as configurações padrão do Airbnb para JavaScript (sem React). 
      // Isso traz um conjunto de regras recomendadas, com foco na legibilidade e consistência do código.
      'airbnb-base',
    ],
  
    parserOptions: {
      // Define a versão do ECMAScript para a análise do código. 'ecmaVersion: 12' refere-se ao ECMAScript 2021.
      ecmaVersion: 12,
    },
  
    rules: {
      // Desabilita a regra que impede a reatribuição de parâmetros.
      // Isso pode ser útil em algumas situações, mas deve ser usado com cautela.
      'no-param-reassign': 'off',
  
      // Desabilita a regra que exige o uso de camelCase para variáveis e funções.
      // Isso permite o uso de outros estilos de nomenclatura (como snake_case, por exemplo).
      camelcase: 'off',
  
      // Define que o ESLint irá tratar como erro qualquer variável não utilizada,
      // mas vai ignorar a variável 'next' (comum em middleware do Express).
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  
      // Define que nenhuma linha de código pode ultrapassar 80 caracteres de comprimento.
      // Caso ultrapasse, o ESLint irá gerar um erro.
      'max-len': ['error', { code: 80 }],
    },
  };
  