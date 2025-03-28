# Sistema de Autenticação com Express e JWT

Este projeto é um sistema de autenticação e login utilizando Node.js, Express, MongoDB, JWT (JSON Web Tokens), e Prettier/ESLint para formatação e linting do código. A API inclui endpoints para registro de usuários, login e acesso a rotas protegidas.

## Índice

- [Descrição](#descrição)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Documentação da API](#documentação-da-api)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Descrição

Este projeto é uma API RESTful que fornece funcionalidades de autenticação e autorização para aplicações web. Ele utiliza JWT para autenticação e protege rotas específicas, garantindo que apenas usuários autenticados possam acessá-las. Além disso, o projeto inclui validação de entrada de dados, rate limiting, logs e documentação Swagger.

## Pré-requisitos

- Node.js (v14.0.0 ou superior)
- MongoDB (local ou Atlas)
- npm (v6.0.0 ou superior)

## Instalação

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Crie o arquivo `.env`:**

   Copie o arquivo `.env.example` e renomeie-o para `.env`. Preencha as variáveis de ambiente com os valores apropriados.

   ```env
   PORT=3333
   JWT_SECRET=seu_jwt_secret
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

## Configuração

1. **Conexão com o MongoDB:**

   Certifique-se de que o URI de conexão com o MongoDB está correto e que as credenciais de autenticação estão configuradas corretamente.

2. **Configuração do ESLint e Prettier:**

   O projeto inclui configurações para ESLint e Prettier. Para executar o linter e o formater, use os seguintes comandos:

   ```sh
   npm run lint
   npm run lint:fix
   npm run format
   ```

## Uso

1. **Inicie o servidor:**

   ```sh
   npm run dev
   ```

2. **Acesse a documentação Swagger:**

   Abra o navegador e vá para `http://localhost:3333/api-docs` para explorar e testar os endpoints da API.

### Documentação da API

#### Endpoints

- **POST /api/auth/register**
  - **Descrição:** Registra um novo usuário.
  - **Corpo da Solicitação:**
    ```json
    {
      "username": "user1",
      "email": "user1@example.com",
      "password": "password1",
      "confirmPassword": "password1"
    }
    ```
  - **Respostas:**
    - **201 Created:** Usuário registrado com sucesso.
    - **400 Bad Request:** Dados de entrada inválidos.
    - **500 Internal Server Error:** Erro interno do servidor.

- **POST /api/auth/login**
  - **Descrição:** Faz login de um usuário e retorna um token JWT.
  - **Corpo da Solicitação:**
    ```json
    {
      "username": "user1",
      "password": "password1"
    }
    ```
  - **Respostas:**
    - **200 OK:** Login bem-sucedido.
      ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
      ```
    - **401 Unauthorized:** Credenciais inválidas.
    - **500 Internal Server Error:** Erro interno do servidor.

- **GET /api/protected**
  - **Descrição:** Acessa uma rota protegida.
  - **Cabeçalhos:**
    - **Authorization:** `Bearer <token>`
  - **Respostas:**
    - **200 OK:** Acesso à rota protegida bem-sucedido.
      ```json
      {
        "message": "Esta é uma rota protegida"
      }
      ```
    - **401 Unauthorized:** Token inválido ou ausente.
    - **500 Internal Server Error:** Erro interno do servidor.

### Contribuição

Contribuições são bem-vindas! Siga estas etapas para contribuir:

1. **Fork o repositório.**
2. **Crie uma branch para sua feature:**

   ```sh
   git checkout -b feature/nome-da-feature
   ```

3. **Faça commit das suas mudanças:**

   ```sh
   git commit -m 'Adiciona nova feature'
   ```

4. **Push para a sua branch:**

   ```sh
   git push origin feature/nome-da-feature
   ```

5. **Abra um Pull Request.**

### Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Se tiver mais perguntas ou precisar de ajuda, sinta-se à vontade para abrir uma issue no repositório. Boa sorte com seu projeto! 🚀
