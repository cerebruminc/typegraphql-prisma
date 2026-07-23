import "reflect-metadata";
import { promises as fs } from "fs";
import path from "path";
import util from "util";
import childProcess from "child_process";
import { buildSchema } from "type-graphql";
import { graphql } from "graphql";
import pg from "pg";

import generateArtifactsDirPath from "../helpers/artifacts-dir";
import { getDirectoryStructureString } from "../helpers/structure";

const exec = util.promisify(childProcess.exec);

describe("generator integration", () => {
  let cwdDirPath: string;
  let schema: string;
  const databaseUrl =
    process.env.TEST_DATABASE_URL ??
    "postgresql://user:password@localhost:5432/typegraphql-prisma";
  const execInFixture = (command: string) =>
    exec(command, {
      cwd: cwdDirPath,
      env: {
        ...process.env,
        DATABASE_URL: databaseUrl,
      },
    });

  beforeEach(async () => {
    cwdDirPath = generateArtifactsDirPath("functional-integration");
    await fs.mkdir(cwdDirPath, { recursive: true });

    schema = /* prisma */ `
      datasource db {
        provider = "postgresql"
      }

      generator client {
        provider            = "prisma-client"
        output              = "./generated/client"
        moduleFormat        = "cjs"
        importFileExtension = ""
      }

      generator typegraphql {
        provider = "node ../../../src/cli/dev.ts"
        output   = "./generated/type-graphql"
      }

      enum Color {
        RED
        GREEN
        BLUE
      }

      model User {
        id     Int      @id @default(autoincrement())
        name   String?
        posts  Post[]
      }

      model Post {
        uuid      String  @id @default(cuid())
        content   String
        author    User    @relation(fields: [authorId], references: [id])
        authorId  Int
        color     Color
        payload   Bytes?
      }
    `;
    await fs.writeFile(path.join(cwdDirPath, "schema.prisma"), schema);
    await fs.writeFile(
      path.join(cwdDirPath, "prisma.config.ts"),
      `import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
`,
    );
  });

  it("should generate TypeGraphQL classes files to the output folder by running `prisma generate`", async () => {
    await execInFixture("npx prisma generate");
    // console.log(prismaGenerateResult);

    const directoryStructureString = getDirectoryStructureString(
      cwdDirPath + "/generated/type-graphql",
    );

    expect(directoryStructureString).toMatchSnapshot("files structure");
  }, 60000);

  it("should reject the transpiled default output with the TypeScript-only prisma-client generator", async () => {
    await fs.writeFile(
      path.join(cwdDirPath, "schema.prisma"),
      schema.replace('        output   = "./generated/type-graphql"\n', ""),
    );

    await expect(execInFixture("npx prisma generate")).rejects.toThrow(
      /cannot emit transpiled JavaScript that imports it/,
    );
  }, 60000);

  it("should be able to use generate TypeGraphQL classes files to generate GraphQL schema", async () => {
    await execInFixture("npx prisma generate");
    // console.log(prismaGenerateResult);
    const {
      UserCrudResolver,
      PostCrudResolver,
      UserRelationsResolver,
      PostRelationsResolver,
    } = require(cwdDirPath + "/generated/type-graphql");
    await buildSchema({
      resolvers: [
        UserCrudResolver,
        PostCrudResolver,
        UserRelationsResolver,
        PostRelationsResolver,
      ],
      validate: false,
      emitSchemaFile: cwdDirPath + "/schema.graphql",
    });
    const graphQLSchemaSDL = await fs.readFile(cwdDirPath + "/schema.graphql", {
      encoding: "utf8",
    });

    expect(graphQLSchemaSDL).toMatchSnapshot("graphQLSchemaSDL");
  }, 60000);

  it("should be able to generate TypeGraphQL classes files without any type errors", async () => {
    const tsconfigContent = {
      compilerOptions: {
        target: "ES2021",
        module: "commonjs",
        lib: ["ES2021"],
        strict: true,
        skipLibCheck: true,
        esModuleInterop: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        forceConsistentCasingInFileNames: true,
      },
    };
    const typegraphqlfolderPath = path.join(
      cwdDirPath,
      "generated",
      "type-graphql",
    );

    await execInFixture("npx prisma generate");
    // console.log(prismaGenerateResult);
    await fs.writeFile(
      path.join(typegraphqlfolderPath, "tsconfig.json"),
      JSON.stringify(tsconfigContent),
    );
    const tscResult = await exec("npx tsc --noEmit", {
      cwd: typegraphqlfolderPath,
    });

    expect(tscResult.stdout).toHaveLength(0);
    expect(tscResult.stderr).toHaveLength(0);
  }, 60000);

  it("should properly fetch the data from DB using PrismaClient while queried by GraphQL schema", async () => {
    await execInFixture("npx prisma generate");
    // console.log(prismaGenerateResult);
    // drop database before migrate
    const adminDatabaseUrl = new URL(databaseUrl);
    const dbName = decodeURIComponent(adminDatabaseUrl.pathname.slice(1));
    if (!dbName) {
      throw new Error("TEST_DATABASE_URL must include a database name");
    }
    adminDatabaseUrl.pathname = "/postgres";
    const pgClient = new pg.Client({
      connectionString: adminDatabaseUrl.toString(),
    });
    await pgClient.connect();
    await pgClient.query(
      `DROP DATABASE IF EXISTS ${pg.escapeIdentifier(dbName)}`,
    );
    await pgClient.query(`CREATE DATABASE ${pg.escapeIdentifier(dbName)}`);
    await pgClient.end();

    await execInFixture("npx prisma migrate dev --name init");
    // console.log(prismaMigrateResult);
    const { PrismaPg } = require("@prisma/adapter-pg");
    const { PrismaClient } = require(cwdDirPath + "/generated/client/client");
    const prisma = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: databaseUrl,
      }),
    });

    const testUser1 = await prisma.user.create({ data: { name: "test1" } });
    const testUser2 = await prisma.user.create({
      data: {
        name: "test2",
        posts: {
          create: [
            {
              color: "RED",
              content: "post content",
              payload: Uint8Array.from([1, 2, 3]),
            },
          ],
        },
      },
    });
    await prisma.user.create({ data: { name: "not test" } });

    const {
      UserCrudResolver,
      PostCrudResolver,
      UserRelationsResolver,
      PostRelationsResolver,
    } = require(cwdDirPath + "/generated/type-graphql");
    const graphQLSchema = await buildSchema({
      resolvers: [
        UserCrudResolver,
        PostCrudResolver,
        UserRelationsResolver,
        PostRelationsResolver,
      ],
      validate: false,
    });

    const query = /* graphql */ `
      query {
        users(
          where: {
            name: {
              startsWith: "test"
            }
          }
          orderBy: {
            id: asc
          }
        ) {
          id
          name
          posts {
            content
            color
            payload
            author {
              name
            }
          }
        }
      }
    `;
    const { data, errors } = await graphql({
      schema: graphQLSchema,
      source: query,
      contextValue: { prisma },
    });
    await prisma.$disconnect();

    expect(errors).toBeUndefined();
    expect(data).toMatchSnapshot("graphql data");
    expect(data?.users).toHaveLength(2);
  }, 100000);
});
