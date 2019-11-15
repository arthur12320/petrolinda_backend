# backend PetroLinda

esse é o backend do projeto, primeiramente algumas coisas qe vc vai
precisar modificar pra ele pegar no seu PC:

## modificações

1. eu tive que rodar esse comando no mysql workbench pra o backend poder se loggar, podemos tentar modificar a conexão depois para não precisar mas por agora é a solução mais facil

    ```mysql
      ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
    ```

2. você vai ter que modificar o arquivo /db/db.js com as configurações corretas para o seu banco:

    ```js
    {
      host: 'localhost',        //<-- host do servidor onde seu banco está localizado
      user: 'root',             //<-- user que você vai usar pra loggar !!deve rodar o comando um com esse usuario!!
      password: 'password',     //<-- a senha do usuario !!essa senha deve ser o 'password' do comando 1
      database: 'PetroLinda',   //<-- nome do banco que você criou
    }
    ```

3. instale node nesse link: https://nodejs.org/en/

4. lembre de rodar esse comando para instalar as depêndencias

    ```sh
    npm install
    ```

5. para iniciar o servidor rode este comando

    ```sh
    npm start
    ```



## endpoints 

esses são os endpoints que podem ser acessados no servidor.

### /authentication 

esses endpoints são responsaveis pelo sitema de login

- POST /authentication/signup:

    esse endpoint recebe um body com o usuario, cria esse usuario e o salva no banco eretorna o JWT desse usuario, ainda falta  criar a pessoa relacionada aquele usuario.

    - body:

        ```json
        {
          "login":"bla",
          "senha":"123",
          "nome":"blabla",
          "CPF":"1111111111",
          "id_posto":"215532"
        }
        ```
    
    - resposta:

        ```json
        {
          "token":"dnhsadsagdg8ue3782y782w3"
        }
        ```

- POST /authentication/login:

    esse endpoint recebe um body com o usuario verifica se a senha é valida e se for retorna um JWT .

    - body:

        ```json
        {
          "login":"bla",
          "senha":"123"
        }
        ```
    
    - resposta:

        ```json
        {
          "token":"dnhsadsagdg8ue3782y782w3"
        }
        ```


- GET /authentication/testjwt:

    esse endpoint foi feito pra testar a autenticação com jwt que sera adicionada a outros endpoints depois, nele você pode passar um JWT no parametro de Authorization da header e se o JWT for valido ele retornara o objeto usuario do usuario de onde aquele JWT veio.

    - header:

        ```json
         "Authorization":"dnhsadsagdg8ue3782y782w3"
        ```
      
    - resposta:

        ```json
          "login":"bla",
          "senha":"123",
          "pessoa_CPF":"46553465238",
          "posto_razao_social":"blabla"
        ```

### /users

esses endpoitns são destinados para acesso de informações dos usuarios

- GET /users

    endpoint vai retornar objeto com informações de todos usuarios da tabela usuarios

    - resposta:

        ```json
        {
          "nome": "ble",
          "login": "bin",
          "pessoa_cpf": "3",
          "posto_razao_social": "posto1"
        }
        ```

- DELETE /users/:login

    endpoint vai excluir o usuario com login igual aos provido na URL


### /stations

    endpoints fcados nas funcionalidades relcionadas aos postos 

- GET /stations
    
    endpoint vai retornar array de todos os postos listando so itens abaixo:

    - resposta:

        ```json
        [
          {
            "id":"sdas",
            "razao_social":"sadsaa",
            "nome_fantasia":"dnasjkdbsaj",
            "longitude":438274823,
            "latitude":3424327423,
            "bandeira":"shell"
          }
        ]
        ``` 


### /bandeiras

    endpoints focados nas funcionalidades de bandeiras 

- GET /bandeiras
    
    endpoint vai retornar array de todas as bandeiras criadas

    - resposta:

        ```json
        [
          {
            "id":1,
            "nome":"shell"
          },
          {
            "id":2,
            "nome":"ipiranga"
          }
        ]
        ``` 


### /abastecimento

    endpoints focados em abastecimentos 

- POST /abastecimento
    
    endpoint vai criar um novo abastecimento
        
    - body:

      ```json
        {
          "placa":"BRA2E19",
          "valorLitro":23.34,
          "litrosAbastecidos":34.12,
          "id_tanque":1
        }
      ```
        
        
    - resposta:

        - sucesso:

            ```json
            {
              "message": "abastecimento adicionado"
            }
            ```