import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CreateManyAndReturnPostArgs } from "./args/CreateManyAndReturnPostArgs";
import { Post } from "../../../models/Post";
import { CreateManyAndReturnPost } from "../../outputs/CreateManyAndReturnPost";
import { transformInfoIntoPrismaSelect, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Post)
export class CreateManyAndReturnPostResolver {
  @TypeGraphQL.Mutation(_returns => [CreateManyAndReturnPost], {
    nullable: false
  })
  async createManyAndReturnPost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyAndReturnPostArgs): Promise<CreateManyAndReturnPost[]> {
    return getPrismaFromContext(ctx).post.createManyAndReturn({
      ...args,
      ...transformInfoIntoPrismaSelect(info),
    });
  }
}
