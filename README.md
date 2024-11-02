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
