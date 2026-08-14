import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma/client";

@TypeGraphQL.InputType("NullableStringFieldUpdateOperationsInput", {})
export class NullableStringFieldUpdateOperationsInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  set?: string | undefined;
}
