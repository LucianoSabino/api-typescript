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

    
- Blibioteca para mensagem de erro:

        yarn add http-status-codes 


<h3 align="center"> Biblioteca de validação YUP</h3>
Yup é um construtor de esquema para análise e validação de valor em tempo de execução.

        yarn add yup

<h5> Explicando um pouco do codigo (src/servser/controller/cidade/create)</h5>

![imagem de arquitetura do projeto](https://camo.githubusercontent.com/0b12d5e1fa9228bfcc8c3a1379a41df22f977fcec7b492639ae8fa624cd4ebfb/68747470733a2f2f696d6775722e636f6d2f6b356d58466f5a2e706e67)

Interfaces

- ICidade: Define a estrutura de um objeto que representa uma cidade. Possui as propriedades nome (nome da cidade) e estado (estado da cidade).
- IFilter: Define a estrutura de um objeto que representa um filtro. Possui a propriedade filter (critério de filtragem).
- 
Validação

- createValidation: Cria um esquema de validação para garantir que os dados recebidos nas requisições estejam no formato correto.
Valida tanto o corpo da requisição (body) quanto os parâmetros da query (query).

- Corpo da requisição: Verifica se o nome da cidade possui pelo menos 3 caracteres e se o estado possui exatamente 2 caracteres.
Parâmetros da query: Verifica se o parâmetro filter possui pelo menos 3 caracteres.

![imagem de arquitetura do projeto](https://camo.githubusercontent.com/0b12d5e1fa9228bfcc8c3a1379a41df22f977fcec7b492639ae8fa624cd4ebfb/68747470733a2f2f696d6775722e636f6d2f6b356d58466f5a2e706e67)

Define um middleware de validação reutilizável para aplicações.

Definições de Tipos:

- TProperty: Define os possíveis locais onde a validação pode ser aplicada em uma requisição HTTP: corpo, cabeçalho, parâmetros ou query string.
  
- TGetSchema: Representa uma função que recebe um esquema de validação e o retorna. É usada para criar esquemas de forma dinâmica.
  
- TAllSchemas: Representa um objeto que mapeia cada TProperty a um esquema de validação correspondente.
  
- TGetAllSchema: Representa uma função que recebe uma função TGetSchema e retorna um objeto parcial do tipo TAllSchemas. É responsável por gerar os esquemas de validação para todas as partes da requisição.
  
- TValidation: Representa uma função que recebe uma função TGetAllSchema e retorna um middleware (RequestHandler). É a assinatura da nossa função de validação principal.

Função validation:

- Entrada: Uma função getAllSchemas para gerar esquemas de validação.
- Saída: Uma função middleware que valida requisições HTTP.
  
Funcionamento:

- Geração de Esquemas: Chama getAllSchemas para obter os esquemas de validação para diferentes partes da requisição.
  
- Inicialização do Objeto de Erros: Cria um objeto vazio errorsResult para armazenar os erros de validação.
  
Itera e Valida:
Valida a parte correspondente da requisição usando schema.validateSync.
Captura erros de validação e extrai as mensagens de erro.
Adiciona as mensagens de erro ao errorsResult.
Tratamento de Resultados:
Se não houver erros, chama next() para passar para o próximo middleware.
Se houver erros, retorna uma resposta com status 400 (Bad Request) e os detalhes dos erros.
