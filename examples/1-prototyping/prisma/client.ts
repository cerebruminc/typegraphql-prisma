import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaBetterSqlite3(
  { url: "file:./prisma/dev.db" },
  { timestampFormat: "unixepoch-ms" },
);

const prisma = new PrismaClient({ adapter });

export { prisma, PrismaClient };
