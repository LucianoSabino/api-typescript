<h3 align="center"> Inicializando o Node e o Git</h3>

        npm init -y

        git init

-   Comandos para o git:

        -   `git add .` : seleciona todos os arquivos
        -   `git commit -m "colocar oq esta commitando"` : Vai fazer o commit

<h3 align="center"> Instalando dependencia</h3>

        yarn add express

        yarn add -D tsc typescript ts-node

        yarn add -D @types/express @types/node

        yarn add -D nodemon

-   No arquivo _package.json_ em _scripts_ e coloque:

          "dev": "nodemon --watch \"src/\" --exec \"node_modules/.bin/ts-node src/index.ts\" -e ts"

-   Depois coloque:

          "compilerOptions": {
              "module": "ESNext",
              "moduleResolution": "node",
              "target": "ESNext",
              "esModuleInterop": true,
              "skipLibCheck": true,
              "strict": true
          },
          "include": [
              "src"
          ]

-   Depois para inicializar o typescript:

          npx tsc --init

-   Criando variavel de ambiente. Execute esse comando

        yarn add -D dotenv

depois crie um arquivo na raiz do projeto `.env`

-   inicializando eslint:

          npx eslint --init

-   Depois crie um arquivo com o nome:

            .gitignore

e coloque

            _node_modules
            .env_

para o git iginorar esses arquivos.

-   Blibioteca para mensagem de erro:

          yarn add http-status-codes

<h3 align="center"> Biblioteca de validação YUP</h3>
Yup é um construtor de esquema para análise e validação de valor em tempo de execução.

        yarn add yup

<h5> Explicando um pouco do codigo (src/server/controller/cidade/create)</h5>

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/createValidation.png?raw=true)

Interfaces

-   ICidade: Define a estrutura de um objeto que representa uma cidade. Possui as propriedades nome (nome da cidade) e estado (estado da cidade).
-   IFilter: Define a estrutura de um objeto que representa um filtro. Possui a propriedade filter (critério de filtragem).
-   Validação

-   createValidation: Cria um esquema de validação para garantir que os dados recebidos nas requisições estejam no formato correto.
    Valida tanto o corpo da requisição (body) quanto os parâmetros da query (query).

-   Corpo da requisição: Verifica se o nome da cidade possui pelo menos 3 caracteres e se o estado possui exatamente 2 caracteres.
    Parâmetros da query: Verifica se o parâmetro filter possui pelo menos 3 caracteres.

<h5>(src/server/shared/middlewares/Validation)</h5>

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/validation.png?raw=true)

Define um middleware de validação reutilizável para aplicações.

Definições de Tipos:

-   TProperty: Define os possíveis locais onde a validação pode ser aplicada em uma requisição HTTP: corpo, cabeçalho, parâmetros ou query string.
-   TGetSchema: Representa uma função que recebe um esquema de validação e o retorna. É usada para criar esquemas de forma dinâmica.
-   TAllSchemas: Representa um objeto que mapeia cada TProperty a um esquema de validação correspondente.
-   TGetAllSchema: Representa uma função que recebe uma função TGetSchema e retorna um objeto parcial do tipo TAllSchemas. É responsável por gerar os esquemas de validação para todas as partes da requisição.
-   TValidation: Representa uma função que recebe uma função TGetAllSchema e retorna um middleware (RequestHandler). É a assinatura da nossa função de validação principal.

Função validation:

-   Entrada: Uma função getAllSchemas para gerar esquemas de validação.
-   Saída: Uma função middleware que valida requisições HTTP.

Funcionamento:

-   Geração de Esquemas: Chama getAllSchemas para obter os esquemas de validação para diferentes partes da requisição.
-   Inicialização do Objeto de Erros: Cria um objeto vazio errorsResult para armazenar os erros de validação.

Itera e Valida:
Valida a parte correspondente da requisição usando schema.validateSync.
Captura erros de validação e extrai as mensagens de erro.
Adiciona as mensagens de erro ao errorsResult.
Tratamento de Resultados:
Se não houver erros, chama next() para passar para o próximo middleware.
Se houver erros, retorna uma resposta com status 400 (Bad Request) e os detalhes dos erros.

<h3 align="center"> Teste para Api</h3>
Jest é um poderoso framework de testes JavaScript de código aberto
Qualque duvida esta no [video](https://youtu.be/G6Lo8wk4Y5w?si=0Lm1hyt72u474iMg)

Instale essas biblioteca:

        yarn add jest ts-jest @types/jest
        yarn add -D supertest @types/supertest

Depois inicie:

        yarn jest --init

No arquivo _jest.config.ts_ coloque:

        coverageReporters: ["json"],
        setupFilesAfterEnv: ["./tests/jest.setup.ts"],
        testMatch: ["<rootDir>/tests/**/*.test.ts"],
        transform: {
            "^.+\\.(ts|tsx)$": "ts-jest",
        },

Depois crie uma psata _tests_ dentro dela um arquivo _jest.setup.ts_ vai conter:

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/jest1.png?raw=true)

No arquivo _tsconfig.json_ depois de _compilerOptions_ coloque:

        "exclude": ["./jest.config.ts", "./node_modules", "./tests", "./build"]

Colocar no _.gitignore_:

        /coverage

-   Exemplo de um teste para criar ciadade

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/test.png?raw=true)

Na hora de executar os teste rodar o comando:

        yarn test

Assim foi feito para todas as rotas.

<h3 align="center"> Deploy da API Express no Render</h3>

[Site Render](https://render.com/)
[Video explicativo](https://youtu.be/hgCASoTp0XY?si=q1lHVePlOiR_Jmzf)

<h3 align="center"> Banco de dados</h3>
OBS: SE atente aos caminhos dos arquivos e comandos.

<h5> Utilizando Knex.js </h5>
Knex.js é uma biblioteca para Node.js que facilita a interação com bancos de dados relacionais. Em outras palavras, ele é um query builder, ou seja, uma ferramenta que constrói consultas SQL de forma mais intuitiva e organizada, eliminando a necessidade de escrever as consultas manualmente.

-   Instalando as blibioteca:

          yarn add knex

<h5> Utilizando o banco de dados Sqlite </h5>

-   Instalando as blibioteca:

          yarn add sqlite3

<<<<<<< HEAD
-   No arquivo _database/Knex/knexfile.ts_ esta as configuração de conexão do banco de dados.
=======
  <h5>No arquivo _database/Knex/Environement.ts_ esta as configuração de conexão do banco de dados.</h5>
>>>>>>> df967770124eac96f5628dbab29b54a10ad4f793

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/knexC.png?raw=true)

Tendo tres tipos de conexão

-   test so para quando for rodar os testes assim os dados seram apagados depois
-   Produção quando estiver no servidor
-   Desenvolvimento

  <h5>No arquivo _database/Knex/index.ts_ esta passando as configuração de conexão e alternando entre elas</h5>

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/knexCIndex.png?raw=true)
<<<<<<< HEAD

<h5> Fazendo as migrações </h5>

-   Execute esse comando para criar um arquivo de migração:

          yarn knex --knexfile ./src/server/database/Knex/knexfile.ts migrate:make test

Depois so fazer as configurações de tabelas, Exemplo:

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/extable.png?raw=true)

Depois no arquivo _package.json_ coloque:

        "knex:rollback-all": "knex --knexfile ./src/server/database/Knex/knexfile.ts migrate:rollback --all",
        "knex:rollback": "knex --knexfile ./src/server/database/Knex/knexfile.ts migrate:rollback",
        "knex:migrate": "knex --knexfile ./src/server/database/Knex/knexfile.ts migrate:latest",
        "knex:seed": "knex --knexfile ./src/server/database/Knex/knexfile.ts seed:run",

Depois so rodar o comando:

        yarn knex:migrate
=======
>>>>>>> df967770124eac96f5628dbab29b54a10ad4f793
