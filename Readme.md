![integration logo](https://raw.githubusercontent.com/cerebruminc/typegraphql-prisma/main/img/integration.png)

[![npm](https://img.shields.io/npm/v/%40cerebruminc%2Ftypegraphql-prisma?logo=npm&color=%23CC3534)](https://www.npmjs.com/package/@cerebruminc/typegraphql-prisma)
[![CI](https://github.com/cerebruminc/typegraphql-prisma/actions/workflows/main.yml/badge.svg)](https://github.com/cerebruminc/typegraphql-prisma/actions/workflows/main.yml)

# `@cerebruminc/typegraphql-prisma`

Prisma generator that emits TypeGraphQL types and CRUD resolvers from a Prisma schema.

This is a community-maintained fork of
[`MichalLytek/typegraphql-prisma`](https://github.com/MichalLytek/typegraphql-prisma),
maintained by [Cerebrum Inc.](https://github.com/cerebruminc). It is not an
official Prisma or TypeGraphQL package.

## Installation

Install the maintained package as a development dependency:

```sh
npm install --save-dev @cerebruminc/typegraphql-prisma
```

The Prisma generator provider remains `typegraphql-prisma` for compatibility:

```prisma
generator typegraphql {
  provider = "typegraphql-prisma"
}
```

## Documentation

The installation guide, configuration reference, and feature documentation are
available at
[cerebruminc.github.io/typegraphql-prisma](https://cerebruminc.github.io/typegraphql-prisma/).

## Examples

Example projects are available in the
[`examples` directory](https://github.com/cerebruminc/typegraphql-prisma/tree/main/examples).

## Support

- Report bugs in [GitHub Issues](https://github.com/cerebruminc/typegraphql-prisma/issues).
- Ask questions and propose ideas in
  [GitHub Discussions](https://github.com/cerebruminc/typegraphql-prisma/discussions).
- Report security vulnerabilities according to the
  [security policy](https://github.com/cerebruminc/typegraphql-prisma/security/policy).

## Attribution

The original project was created by
[Michał Lytek](https://github.com/MichalLytek). This fork preserves the original
MIT license and copyright notice.
