import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CreateManyAndReturnUserArgs } from "./args/CreateManyAndReturnUserArgs";
import { User } from "../../../models/User";
import { CreateManyAndReturnUser } from "../../outputs/CreateManyAndReturnUser";
import { transformInfoIntoPrismaSelect, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => User)
export class CreateManyAndReturnUserResolver {
  @TypeGraphQL.Mutation(_returns => [CreateManyAndReturnUser], {
    nullable: false
  })
  async createManyAndReturnUser(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyAndReturnUserArgs): Promise<CreateManyAndReturnUser[]> {
    return getPrismaFromContext(ctx).user.createManyAndReturn({
      ...args,
      ...transformInfoIntoPrismaSelect(info),
    });
  }
}
