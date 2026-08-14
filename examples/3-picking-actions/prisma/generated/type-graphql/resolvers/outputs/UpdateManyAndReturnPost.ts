import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma/client";
import { UpdateManyAndReturnPostAuthorArgs } from "./args/UpdateManyAndReturnPostAuthorArgs";
import { User } from "../../models/User";

@TypeGraphQL.ObjectType("UpdateManyAndReturnPost", {})
export class UpdateManyAndReturnPost {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  published!: boolean;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  title!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  content!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  authorId!: string | null;

  author!: User | null;

  @TypeGraphQL.Field(_type => User, {
    name: "author",
    nullable: true
  })
  getAuthor(@TypeGraphQL.Root() root: UpdateManyAndReturnPost, @TypeGraphQL.Args() args: UpdateManyAndReturnPostAuthorArgs): User | null {
    return root.author;
  }
}
