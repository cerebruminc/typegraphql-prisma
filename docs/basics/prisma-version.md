---
title: Prisma version verification
sidebar_label: Prisma version check
sidebar_position: 4
---

## Checking installed Prisma version

`@cerebruminc/typegraphql-prisma` works only with selected versions of Prisma.
By default, it checks if the installed Prisma version matches the required one using semver rules.
When you try to use another version, such as a newly published major release (or a `dev` build), you will receive an error about the package version, for example:

```sh
Error: Looks like an incorrect version "8.0.0" of the Prisma packages has been installed.
'@cerebruminc/typegraphql-prisma' works only with selected versions, so please ensure
that you have installed a version of Prisma that meets the requirement: "^7.8.0".
Find out more about that requirement in docs:
https://cerebruminc.github.io/typegraphql-prisma/docs/basics/prisma-version
```

The reason of such restriction is that `@cerebruminc/typegraphql-prisma` heavily relies on the DMMF and Prisma generators feature which are not considered a public API, so that there's no guarantee about them having no breaking changes in minor releases.
In many previous releases, changes to Prisma and DMMF have significantly impacted the generator, causing it to produce invalid classes or fail entirely.

So in order to prevent users from creating issues on GitHub when they install the latest version of Prisma, such version check has been implemented and is performed by default. However, when you are sure what you're doing, you can lift the Prisma version restriction and try to use the generator with the newer Prisma version.

## Lifting Prisma version restriction

If you want or need to try other version of Prisma, you can use `SKIP_PRISMA_VERSION_CHECK` env variable to suppress that error:

```sh
SKIP_PRISMA_VERSION_CHECK=true npx prisma generate
```

This way there will be no Prisma version check performed and no error thrown. However, using this mode means you should reproduce any bug with a supported Prisma version before reporting it.
