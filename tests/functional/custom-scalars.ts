import "reflect-metadata";

import { promises as fs } from "fs";

import generateArtifactsDirPath from "../helpers/artifacts-dir";
import { generateCodeFromSchema } from "../helpers/generate-code";
import createReadGeneratedFile from "../helpers/read-file";

describe("custom scalars", () => {
  it("should serialize and parse Prisma 7 Bytes values as base64", async () => {
    const outputDirPath = generateArtifactsDirPath("functional-custom-scalars");
    await fs.mkdir(outputDirPath, { recursive: true });

    await generateCodeFromSchema(
      /* prisma */ `
        model BinaryAsset {
          id      Int   @id @default(autoincrement())
          content Bytes
        }
      `,
      { outputDirPath },
    );

    const readGeneratedFile = createReadGeneratedFile(outputDirPath);
    const generatedFiles = [
      {
        path: "/scalars.ts",
        snapshotName: "scalars",
      },
      {
        path: "/models/BinaryAsset.ts",
        snapshotName: "BinaryAsset model",
      },
      {
        path: "/resolvers/inputs/BinaryAssetCreateInput.ts",
        snapshotName: "BinaryAssetCreateInput",
      },
      {
        path: "/resolvers/outputs/CreateManyAndReturnBinaryAsset.ts",
        snapshotName: "CreateManyAndReturnBinaryAsset",
      },
    ];

    for (const generatedFile of generatedFiles) {
      const source = await readGeneratedFile(generatedFile.path);

      expect(source).toMatchSnapshot(generatedFile.snapshotName);
    }

    const { ByteScalar } = require(`${outputDirPath}/scalars`);
    const serialized = ByteScalar.serialize(Uint8Array.from([1, 2, 3]));
    const parsed = ByteScalar.parseValue("AQID");

    expect(serialized).toBe("AQID");
    expect(parsed).toBeInstanceOf(Uint8Array);
    expect(Array.from(parsed)).toEqual([1, 2, 3]);
    expect(Array.from(ByteScalar.parseValue("AQI="))).toEqual([1, 2]);
    expect(Array.from(ByteScalar.parseValue("AQI"))).toEqual([1, 2]);
    for (const invalidValue of ["not base64", "=", "====", "AQID===="]) {
      expect(() =>
        ByteScalar.parseValue(invalidValue),
      ).toThrowErrorMatchingInlineSnapshot(
        `"[ByteError] Invalid argument. Expected a valid base64 string."`,
      );
    }
  });

  it("should import ByteScalar for Prisma Bytes list fields", async () => {
    const outputDirPath = generateArtifactsDirPath(
      "functional-custom-scalars-list",
    );
    await fs.mkdir(outputDirPath, { recursive: true });

    await generateCodeFromSchema(
      /* prisma */ `
        model BinaryAsset {
          id     Int     @id @default(autoincrement())
          chunks Bytes[]
        }
      `,
      { outputDirPath },
    );

    const readGeneratedFile = createReadGeneratedFile(outputDirPath);
    const generatedFiles = [
      {
        path: "/models/BinaryAsset.ts",
        snapshotName: "BinaryAsset model",
      },
      {
        path: "/resolvers/inputs/BinaryAssetCreatechunksInput.ts",
        snapshotName: "BinaryAssetCreatechunksInput",
      },
      {
        path: "/resolvers/outputs/CreateManyAndReturnBinaryAsset.ts",
        snapshotName: "CreateManyAndReturnBinaryAsset",
      },
    ];

    for (const generatedFile of generatedFiles) {
      const source = await readGeneratedFile(generatedFile.path);

      expect(source).toMatchSnapshot(generatedFile.snapshotName);
      expect(source).toContain("import { ByteScalar } from");
      expect(source).not.toContain("DecimalJSScalar");
      expect(source).toContain("_type => [ByteScalar]");
      expect(() => require(outputDirPath + generatedFile.path)).not.toThrow();
    }
  });
});
