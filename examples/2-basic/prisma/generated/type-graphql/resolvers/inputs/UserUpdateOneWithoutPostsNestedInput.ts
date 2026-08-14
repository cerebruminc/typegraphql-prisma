import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma/client";
import { UserCreateOrConnectWithoutPostsInput } from "../inputs/UserCreateOrConnectWithoutPostsInput";
import { UserCreateWithoutPostsInput } from "../inputs/UserCreateWithoutPostsInput";
import { UserUpdateToOneWithWhereWithoutPostsInput } from "../inputs/UserUpdateToOneWithWhereWithoutPostsInput";
import { UserUpsertWithoutPostsInput } from "../inputs/UserUpsertWithoutPostsInput";
import { UserWhereInput } from "../inputs/UserWhereInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpdateOneWithoutPostsNestedInput", {})
export class UserUpdateOneWithoutPostsNestedInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutPostsInput, {
    nullable: true
  })
  create?: UserCreateWithoutPostsInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutPostsInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutPostsInput | undefined;

  @TypeGraphQL.Field(_type => UserUpsertWithoutPostsInput, {
    nullable: true
  })
  upsert?: UserUpsertWithoutPostsInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereInput, {
    nullable: true
  })
  disconnect?: UserWhereInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereInput, {
    nullable: true
  })
  delete?: UserWhereInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateToOneWithWhereWithoutPostsInput, {
    nullable: true
  })
  update?: UserUpdateToOneWithWhereWithoutPostsInput | undefined;
}
