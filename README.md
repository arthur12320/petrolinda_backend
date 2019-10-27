# backend petrolinda

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
      database: 'petrolinda',   //<-- nome do banco que você criou
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
    esse endpoint recebe um body com o usuario, cria esse usuario e o salva no banco, ainda falta adicionar as outras propiedades do usuario e criar a pessoa relacionada aquele usuario.

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