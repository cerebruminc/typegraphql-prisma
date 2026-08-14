import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpdateManyAndReturnUserArgs } from "./args/UpdateManyAndReturnUserArgs";
import { User } from "../../../models/User";
import { UpdateManyAndReturnUser } from "../../outputs/UpdateManyAndReturnUser";
import { transformInfoIntoPrismaSelect, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => User)
export class UpdateManyAndReturnUserResolver {
  @TypeGraphQL.Mutation(_returns => [UpdateManyAndReturnUser], {
    nullable: false
  })
  async updateManyAndReturnUser(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyAndReturnUserArgs): Promise<UpdateManyAndReturnUser[]> {
    return getPrismaFromContext(ctx).user.updateManyAndReturn({
      ...args,
      ...transformInfoIntoPrismaSelect(info),
    });
  }
}
