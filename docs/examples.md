# Examples

In the GitHub repository you can find a few examples of using the TypeGraphQL Prisma integration:

:::info
The examples use Prisma 7 with `@cerebruminc/typegraphql-prisma@1.0.0`.
Use Node.js 20.19+, 22.12+, or 24+.
:::

1. **Prototyping** - the workflow of using the generator that creates TypeGraphQL artifacts from Prisma schema and creating a GraphQL schema with all CRUD operation

   https://github.com/cerebruminc/typegraphql-prisma/tree/main/examples/1-prototyping

2. **Basic** - demonstrating how you can create custom methods or custom fields

   https://github.com/cerebruminc/typegraphql-prisma/tree/main/examples/2-basic

3. **Picking Actions** - demonstrating how you can choose certain Prisma actions to be exposed in the GraphQL schema

   https://github.com/cerebruminc/typegraphql-prisma/tree/main/examples/3-picking-actions

4. **Nest JS** - showcase of combining `typegraphql-prisma` with `typegraphql-nestjs` to expose TypeGraphQL-Prisma2 artifacts as GraphQL schema using Nest JS

   https://github.com/cerebruminc/typegraphql-prisma/tree/main/examples/4-nest-js

To run an example, go to its subdirectory, install the dependencies (`npm i`),
generate both Prisma Client and the TypeGraphQL artifacts (`npm run generate`),
seed the SQLite database (`npm run seed`), and start the server (`npm start`).

Each subdirectory contains a `examples.gql` file with a predefined GraphQL queries that you can use in GraphQL Playground ([`http://localhost:4000`](http://localhost:4000)) and play with them by modifying it's shape and data.
