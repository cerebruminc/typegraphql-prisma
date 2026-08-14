import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregatePostArgs } from "./args/AggregatePostArgs";
import { CreateManyAndReturnPostArgs } from "./args/CreateManyAndReturnPostArgs";
import { CreateManyPostArgs } from "./args/CreateManyPostArgs";
import { CreateOnePostArgs } from "./args/CreateOnePostArgs";
import { DeleteManyPostArgs } from "./args/DeleteManyPostArgs";
import { DeleteOnePostArgs } from "./args/DeleteOnePostArgs";
import { FindFirstPostArgs } from "./args/FindFirstPostArgs";
import { FindFirstPostOrThrowArgs } from "./args/FindFirstPostOrThrowArgs";
import { FindManyPostArgs } from "./args/FindManyPostArgs";
import { FindUniquePostArgs } from "./args/FindUniquePostArgs";
import { FindUniquePostOrThrowArgs } from "./args/FindUniquePostOrThrowArgs";
import { GroupByPostArgs } from "./args/GroupByPostArgs";
import { UpdateManyAndReturnPostArgs } from "./args/UpdateManyAndReturnPostArgs";
import { UpdateManyPostArgs } from "./args/UpdateManyPostArgs";
import { UpdateOnePostArgs } from "./args/UpdateOnePostArgs";
import { UpsertOnePostArgs } from "./args/UpsertOnePostArgs";
import { transformInfoIntoPrismaArgs, transformInfoIntoPrismaSelect, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";
import { Post } from "../../../models/Post";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregatePost } from "../../outputs/AggregatePost";
import { CreateManyAndReturnPost } from "../../outputs/CreateManyAndReturnPost";
import { PostGroupBy } from "../../outputs/PostGroupBy";
import { UpdateManyAndReturnPost } from "../../outputs/UpdateManyAndReturnPost";

@TypeGraphQL.Resolver(_of => Post)
export class PostCrudResolver {
  @TypeGraphQL.Query(_returns => AggregatePost, {
    nullable: false
  })
  async aggregatePost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregatePostArgs): Promise<AggregatePost> {
    return getPrismaFromContext(ctx).post.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async createManyPost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyPostArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => [CreateManyAndReturnPost], {
    nullable: false
  })
  async createManyAndReturnPost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyAndReturnPostArgs): Promise<CreateManyAndReturnPost[]> {
    return getPrismaFromContext(ctx).post.createManyAndReturn({
      ...args,
      ...transformInfoIntoPrismaSelect(info),
    });
  }

  @TypeGraphQL.Mutation(_returns => Post, {
    nullable: false
  })
  async createOnePost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateOnePostArgs): Promise<Post> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyPost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteManyPostArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => Post, {
    nullable: true
  })
  async deleteOnePost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteOnePostArgs): Promise<Post | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => Post, {
    nullable: true
  })
  async findFirstPost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstPostArgs): Promise<Post | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => Post, {
    nullable: true
  })
  async findFirstPostOrThrow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstPostOrThrowArgs): Promise<Post | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => [Post], {
    nullable: false
  })
  async posts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManyPostArgs): Promise<Post[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => Post, {
    nullable: true
  })
  async post(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniquePostArgs): Promise<Post | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => Post, {
    nullable: true
  })
  async getPost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniquePostOrThrowArgs): Promise<Post | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => [PostGroupBy], {
    nullable: false
  })
  async groupByPost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByPostArgs): Promise<PostGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyPost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyPostArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => [UpdateManyAndReturnPost], {
    nullable: false
  })
  async updateManyAndReturnPost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyAndReturnPostArgs): Promise<UpdateManyAndReturnPost[]> {
    return getPrismaFromContext(ctx).post.updateManyAndReturn({
      ...args,
      ...transformInfoIntoPrismaSelect(info),
    });
  }

  @TypeGraphQL.Mutation(_returns => Post, {
    nullable: true
  })
  async updateOnePost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOnePostArgs): Promise<Post | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => Post, {
    nullable: false
  })
  async upsertOnePost(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertOnePostArgs): Promise<Post> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).post.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
