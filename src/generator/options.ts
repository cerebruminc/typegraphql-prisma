import { EmitBlockKind } from "./emit-block";

export type PrismaClientProvider = "prisma-client" | "prisma-client-js";

export interface ExternalGeneratorOptions {
  emitDMMF?: boolean;
  emitTranspiledCode?: boolean;
  simpleResolvers?: boolean;
  useOriginalMapping?: boolean;
  useUncheckedScalarInputs?: boolean;
  emitIdAsIDType?: boolean;
  emitOnly?: EmitBlockKind[];
  emitRedundantTypesInfo?: boolean;
  customPrismaImportPath?: string;
  contextPrismaKey?: string;
  useSimpleInputs?: boolean;
  omitInputFieldsByDefault?: string[];
  omitOutputFieldsByDefault?: string[];
  formatGeneratedCode?: boolean | "prettier" | "tsc";
  emitIsAbstract?: boolean;
}

export interface InternalGeneratorOptions {
  outputDirPath: string;
  prismaClientPath: string;
  prismaClientProvider?: PrismaClientProvider;
}

export interface GeneratorOptions
  extends Omit<ExternalGeneratorOptions, "emitOnly" | "contextPrismaKey">,
    InternalGeneratorOptions {
  blocksToEmit: EmitBlockKind[];
  contextPrismaKey: string;
  relativePrismaOutputPath: string;
  absolutePrismaOutputPath: string | undefined;
}
