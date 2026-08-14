import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UserWhereInput } from "../../../inputs/UserWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyUserArgs {
  @TypeGraphQL.Field(_type => UserWhereInput, {
    nullable: true
  })
  where?: UserWhereInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  limit?: number | undefined;
}
