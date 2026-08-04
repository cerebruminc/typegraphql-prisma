import { GeneratorOptions } from "@prisma/generator-helper";
import { getDMMF, parseEnvValue } from "@prisma/internals";
import { promises as asyncFs } from "fs";
import path from "path";

import generateCode from "../generator/generate-code";
import removeDir from "../utils/removeDir";
import {
  ExternalGeneratorOptions,
  InternalGeneratorOptions,
  PrismaClientProvider,
} from "../generator/options";
import { ALL_EMIT_BLOCK_KINDS } from "../generator/emit-block";
import {
  parseStringBoolean,
  parseStringArray,
  parseStringEnum,
  parseString,
} from "./helpers";

export async function generate(options: GeneratorOptions) {
  const outputDir = parseEnvValue(options.generator.output!);

  const supportedClientProviders: PrismaClientProvider[] = [
    "prisma-client",
    "prisma-client-js",
  ];
  const prismaClientGenerator = supportedClientProviders
    .map(provider =>
      options.otherGenerators.find(
        generator => parseEnvValue(generator.provider) === provider,
      ),
    )
    .find(generator => generator !== undefined);
  if (!prismaClientGenerator) {
    throw new Error(
      "The TypeGraphQL generator requires a Prisma Client generator. " +
        'Add a generator using provider = "prisma-client" to your Prisma schema.',
    );
  }
  if (!prismaClientGenerator.output) {
    throw new Error(
      `The ${parseEnvValue(prismaClientGenerator.provider)} generator must define an output path.`,
    );
  }
  const prismaClientProvider = parseEnvValue(
    prismaClientGenerator.provider,
  ) as PrismaClientProvider;
  const prismaClientPath = parseEnvValue(prismaClientGenerator.output);

  const generatorConfig = options.generator.config;
  // TODO: make this type `?-` and `| undefined`
  const externalConfig: ExternalGeneratorOptions = {
    emitDMMF: parseStringBoolean(generatorConfig.emitDMMF),
    emitTranspiledCode: parseStringBoolean(generatorConfig.emitTranspiledCode),
    simpleResolvers: parseStringBoolean(generatorConfig.simpleResolvers),
    useOriginalMapping: parseStringBoolean(generatorConfig.useOriginalMapping),
    useUncheckedScalarInputs: parseStringBoolean(
      generatorConfig.useUncheckedScalarInputs,
    ),
    emitIdAsIDType: parseStringBoolean(generatorConfig.emitIdAsIDType),
    emitOnly: parseStringArray(
      generatorConfig.emitOnly,
      "emitOnly",
      ALL_EMIT_BLOCK_KINDS,
    ),
    useSimpleInputs: parseStringBoolean(generatorConfig.useSimpleInputs),
    emitRedundantTypesInfo: parseStringBoolean(
      generatorConfig.emitRedundantTypesInfo,
    ),
    customPrismaImportPath: parseString(
      generatorConfig.customPrismaImportPath,
      "customPrismaImportPath",
    ),
    contextPrismaKey: parseString(
      generatorConfig.contextPrismaKey,
      "contextPrismaKey",
    ),
    omitInputFieldsByDefault: parseStringArray(
      generatorConfig.omitInputFieldsByDefault,
      "omitInputFieldsByDefault",
    ),
    omitOutputFieldsByDefault: parseStringArray(
      generatorConfig.omitOutputFieldsByDefault,
      "omitOutputFieldsByDefault",
    ),
    formatGeneratedCode:
      parseStringBoolean(generatorConfig.formatGeneratedCode) ??
      parseStringEnum(
        generatorConfig.formatGeneratedCode,
        "formatGeneratedCode",
        ["prettier", "tsc"] as const,
      ),
    emitIsAbstract: parseStringBoolean(generatorConfig.emitIsAbstract) ?? false,
  };
  const emitsTranspiledCode =
    externalConfig.emitTranspiledCode ?? outputDir.includes("node_modules");
  if (prismaClientProvider === "prisma-client" && emitsTranspiledCode) {
    throw new Error(
      'The Prisma 7 "prisma-client" generator emits TypeScript source files, ' +
        "so TypeGraphQL cannot emit transpiled JavaScript that imports it. " +
        'Configure the TypeGraphQL generator output outside "node_modules" ' +
        "and set emitTranspiledCode = false.",
    );
  }

  await asyncFs.mkdir(outputDir, { recursive: true });
  await removeDir(outputDir, true);

  const prismaClientDmmf = await getDMMF({
    datamodel: options.datamodel,
  });
  const internalConfig: InternalGeneratorOptions = {
    outputDirPath: outputDir,
    prismaClientPath,
    prismaClientProvider,
  };

  if (externalConfig.emitDMMF) {
    await Promise.all([
      asyncFs.writeFile(
        path.resolve(outputDir, "./dmmf.json"),
        JSON.stringify(options.dmmf, null, 2),
      ),
      asyncFs.writeFile(
        path.resolve(outputDir, "./prisma-client-dmmf.json"),
        JSON.stringify(prismaClientDmmf, null, 2),
      ),
    ]);
  }

  // TODO: replace with `options.dmmf` when the spec match prisma client output
  await generateCode(prismaClientDmmf, {
    ...externalConfig,
    ...internalConfig,
  });
  return "";
}
