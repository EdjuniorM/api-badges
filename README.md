# API de Gerenciamento de Badges

Este projeto é uma API para gerenciamento de badges, construída com NestJS e Prisma ORM. A API segue os princípios do SOLID e utiliza várias técnicas e bibliotecas para garantir um código limpo, testável e escalável.

## Tecnologias Utilizadas

- **NestJS**: Um framework Node.js para construção de aplicações eficientes e escaláveis do lado do servidor.
- **Prisma**: Um ORM moderno para Node.js e TypeScript, que facilita o acesso ao banco de dados.
- **TypeScript**: Um superconjunto de JavaScript que adiciona tipagem estática ao código.
- **JWT**: JSON Web Tokens para autenticação segura.

## Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL (ou outro banco de dados suportado pelo Prisma)
- Docker (opcional, para execução em contêiner)

### Passos para Configuração

1. **Clone o Repositório**

   ```bash
   git clone <https://github.com/EdjuniorM/api-badges.git>
   cd <api-badges>
   ```

2. **Instale as Dependências**

   ```bash
   npm install
   ```

3. **Configuração do Ambiente**

   Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente. Um exemplo de arquivo `.env`:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
   JWT_SECRET="sua_chave_secreta"
   ```

4. **Prisma Migrate**

   Execute as migrações do Prisma para criar as tabelas no banco de dados.

   ```bash
   npx prisma migrate dev
   ```

5. **Prisma Generate**

   Gere o cliente Prisma para interagir com o banco de dados.

   ```bash
   npx prisma generate
   ```

6. **Prisma Seed**

   Popule o banco de dados com dados iniciais (opcional).

   ```bash
   npm run seed
   ```

7. **Execute a Aplicação**

   Inicie o servidor NestJS.

   ```bash
   npm run start:dev
   ```

## Princípios SOLID

A API segue os princípios do SOLID para garantir um código limpo, modular e fácil de manter:

- **S**ingle Responsibility Principle (Princípio da Responsabilidade Única)
- **O**pen/Closed Principle (Princípio do Aberto/Fechado)
- **L**iskov Substitution Principle (Princípio da Substituição de Liskov)
- **I**nterface Segregation Principle (Princípio da Segregação de Interface)
- **D**ependency Inversion Principle (Princípio da Inversão de Dependência)

## Links de Apoio

- [Configuração no NestJS](https://docs.nestjs.com/techniques/configuration)
- [Tipos e Parâmetros no OpenAPI](https://docs.nestjs.com/openapi/types-and-parameters)
- [Usando Prisma Client no NestJS](https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services)
- [Autenticação no NestJS](https://docs.nestjs.com/security/authentication)
- [Filtros de Exceção no NestJS](https://docs.nestjs.com/exception-filters)
- [Testes no NestJS](https://docs.nestjs.com/fundamentals/testing)

## Testes

Para executar os testes, utilize os comandos:

- **Testes Unitários**

  ```bash
  npm run test
  ```

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Para isso, siga os passos abaixo:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commite suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Envie para o repositório (`git push origin feature/nova-feature`)
5. Abra um Pull Request