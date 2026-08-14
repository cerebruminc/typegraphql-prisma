import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpdateManyAndReturnPostArgs } from "./args/UpdateManyAndReturnPostArgs";
import { Post } from "../../../models/Post";
import { UpdateManyAndReturnPost } from "../../outputs/UpdateManyAndReturnPost";
import { transformInfoIntoPrismaSelect, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Post)
export class UpdateManyAndReturnPostResolver {
  @TypeGraphQL.Mutation(_returns => [UpdateManyAndReturnPost], {
    nullable: false
  })
  async updateManyAndReturnPost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyAndReturnPostArgs): Promise<UpdateManyAndReturnPost[]> {
    return getPrismaFromContext(ctx).post.updateManyAndReturn({
      ...args,
      ...transformInfoIntoPrismaSelect(info),
    });
  }
}
