# Labook

## 🔗 Link do Deploy
https://lammar-labook23.onrender.com

## 🔗 Link para acessar os endpoints do Postman
https://documenter.getpostman.com/view/22376488/2s935mt5kn

## 💻 Funcionalidades

### Sign Up

- Cria um novo usuário. O email deve ser único, senão uma mensagem de erro irá aparecer e não irá criar.
- O usuário deverá passar o name, email e password através do body.
- Após criar o usuário, será gerado um token de autenticação.

### Login

- Faz o login do usuário na aplicação.
- O usuário deverá passar o email e password de um usuário já cadastrado através do body.
- Após o login, será gerado um token de autenticação.

### Create Post

- Cria um novo post.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado.
- O usuário deverá passar photo, description e type através do body.
- O type deverá ser "normal" ou "event".

### Create Friendship

- Cria uma nova amizade.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado.
- O usuário deverá passar o friendId através do body.

### Like Post

- O usuário pode curtir o mesmo post apenas uma vez.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado.
- O usuário deverá passar o postId através do body.

### Comment Post

- O usuário pode comentar no mesmo post quantas vezes quiser.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado.
- O usuário deverá passar postId e message através do body.

### Delete Friendship

- Deleta uma amizade.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado.
- O usuário deverá passar o friendId através do path params.

### Dislike Post

- O usuário pode dar dislike em algum post que já foi curtido por ele.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado.
- O usuário deverá passar o postId através do path params.

### Get Post By Id

- Retorna as informações do post desejado.
- O id do post deve ser passado por path params.

### Get Post By Type

- Retorna todos os posts de acordo com o type.
- O type do post deve ser passado por query e deve ser "normal" ou "event".

### Get User Feed

- Retorna os posts do feed do usuário.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado.
- Os posts estão paginados de 5 em 5, e o usuário pode escolher a página colocando o valor do page por query.
