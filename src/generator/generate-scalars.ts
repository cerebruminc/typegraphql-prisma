import { SourceFile } from "ts-morph";
import {
  generateGraphQLScalarTypeImport,
  generatePrismaNamespaceImport,
} from "./imports";

import { GeneratorOptions } from "./options";

export function generateCustomScalars(
  sourceFile: SourceFile,
  options: GeneratorOptions,
) {
  generatePrismaNamespaceImport(sourceFile, options);
  generateGraphQLScalarTypeImport(sourceFile);
  sourceFile.addImportDeclaration({
    moduleSpecifier: "node:buffer",
    namedImports: ["Buffer"],
  });

  sourceFile.addStatements(/* ts */ `
    function parseByteValue(value: unknown): Uint8Array {
      if (typeof value !== "string") {
        throw new Error(\`[ByteError] Invalid argument: \${typeof value}. Expected a base64 string.\`);
      }
      const base64Pattern = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}(?:==)?|[A-Za-z0-9+/]{3}=?)?$/;
      if (!base64Pattern.test(value)) {
        throw new Error("[ByteError] Invalid argument. Expected a valid base64 string.");
      }
      const normalizedValue = value.replace(/=+$/, "");
      const buffer = Buffer.from(value, "base64");
      if (buffer.toString("base64").replace(/=+$/, "") !== normalizedValue) {
        throw new Error("[ByteError] Invalid argument. Expected a valid base64 string.");
      }
      return Uint8Array.from(buffer);
    }

    export const ByteScalar = new GraphQLScalarType<Uint8Array, string>({
      name: "Byte",
      description: "GraphQL Scalar representing the Prisma Bytes type as a base64 string.",
      serialize: (value: unknown) => {
        if (!(value instanceof Uint8Array)) {
          throw new Error(\`[ByteError] Invalid argument: \${Object.prototype.toString.call(value)}. Expected Uint8Array.\`);
        }
        return Buffer.from(value).toString("base64");
      },
      parseValue: parseByteValue,
      parseLiteral: ast => {
        if (ast.kind !== Kind.STRING) {
          throw new Error(\`[ByteError] Invalid AST kind: \${ast.kind}. Expected StringValue.\`);
        }
        return parseByteValue(ast.value);
      },
    });

    export const DecimalJSScalar = new GraphQLScalarType({
      name: "Decimal",
      description: "GraphQL Scalar representing the Prisma.Decimal type, based on Decimal.js library.",
      serialize: (value: unknown) => {
        if (!(Prisma.Decimal.isDecimal(value))) {
          throw new Error(\`[DecimalError] Invalid argument: \${Object.prototype.toString.call(value)}. Expected Prisma.Decimal.\`);
        }
        return (value as Prisma.Decimal).toString();
      },
      parseValue: (value: unknown) => {
        if (!(typeof value === "string")) {
          throw new Error(\`[DecimalError] Invalid argument: \${typeof value}. Expected string.\`);
        }
        return new Prisma.Decimal(value);
      },
    });
  `);
}
