---
title: Configuration
sidebar_position: 2
---

## Creating generator block

After installation, update your `schema.prisma` file and add a TypeGraphQL generator below the Prisma Client generator:

```prisma {5-16}
datasource postgres {
  provider = "postgresql"
}

generator client {
  provider            = "prisma-client"
  output              = "../generated/prisma"
  moduleFormat        = "cjs"
  importFileExtension = ""
}

generator typegraphql {
  provider = "typegraphql-prisma"
  output   = "../generated/type-graphql"
}
```

The Prisma 7 `prisma-client` generator requires an explicit `output`. The TypeGraphQL output is also explicit here so both generated codebases can be compiled with your application. `typegraphql-prisma` automatically imports Prisma Client from the generated `client` module.

Prisma 7 moves the datasource URL to `prisma.config.ts`. For a schema at `prisma/schema.prisma`, a minimal configuration is:

```ts title=prisma.config.ts
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

Then run `npx prisma generate`.

:::note
The legacy `prisma-client-js` provider is still recognized for compatibility, but new Prisma 7 projects should use `prisma-client`.
:::

## Changing output folder

When you want to emit the generated files into a different folder, you can configure the default output folder via the `output` config option, e.g.:

```prisma {3}
generator typegraphql {
  provider = "typegraphql-prisma"
  output   = "../prisma/generated/type-graphql"
}
```

## Emitting transpiled code

By default, when the output path contains `node_modules`, the generated code is transpiled and consists of `*.js` and `*.d.ts` files that are ready to import in your code.

:::caution
Prisma 7's `prisma-client` generator emits TypeScript source files. When using that provider, keep the TypeGraphQL output outside `node_modules` and leave `emitTranspiledCode` disabled so your application compiles both generated codebases together.
:::

However, if you explicitly choose another folder outside `node_modules`, the generated code is emitted as raw TypeScript source files that you can compile and import like your other application source files.

You can override that behavior by explicitly setting `emitTranspiledCode` config option:

```prisma {4}
generator typegraphql {
  provider           = "typegraphql-prisma"
  output             = "../prisma/generated/type-graphql"
  emitTranspiledCode = true
}
```

## Formatting generated code

By default, the generated code is formatted by TypeScript compiler while emitting.

However, if you prefer some other code style, you can provide `formatGeneratedCode` generator option to format the codebase with [Prettier](https://prettier.io/):

```prisma {4}
generator typegraphql {
  provider            = "typegraphql-prisma"
  output              = "../prisma/generated/type-graphql"
  formatGeneratedCode = "prettier"
}
```

Prettier will look for the configuration file in your project tree and use it to format the generated code. If no config file detected, default settings will be applied.

:::caution
Be aware that formatting code by Prettier has a quite huge impact on the generation time, so use it with caution.
:::

If you git-ignore the generated files or you don't want to read the generated source code, you can ignore the generated code style and disable the formatting at all - by providing `false` value to `formatGeneratedCode` generator option:

```prisma {4}
generator typegraphql {
  provider            = "typegraphql-prisma"
  output              = "../prisma/generated/type-graphql"
  formatGeneratedCode = false
}
```

This way you can save even up to 33% of the generation process time.

:::info
When the generator is configured to emit transpiled code, the generated JS code is always formatted by TypeScript compiler and you can't change it to Prettier or disable the formatting by the `formatGeneratedCode` option.
:::
