# Contributing

Thank you for contributing to `@cerebruminc/typegraphql-prisma`.

This repository is a community-maintained fork of
[`MichalLytek/typegraphql-prisma`](https://github.com/MichalLytek/typegraphql-prisma).

Contributions should remain compatible with existing generator configurations
unless a breaking change is intentional, necessary, and clearly documented.

## Before You Start

Before opening a pull request:

1. Search the existing issues and pull requests to avoid duplicating work.
2. Open an issue for significant features, breaking changes, or architectural
   changes before starting implementation.
3. Keep contributions focused on a single problem or improvement.

Small bug fixes, documentation corrections, and maintenance changes may be
submitted directly as pull requests.

## Development Setup

1. Fork the repository.

2. Clone your fork:

   ```sh
   git clone https://github.com/<your-username>/typegraphql-prisma.git
   cd typegraphql-prisma
   ```

3. Install dependencies:

   ```sh
   npm ci
   ```

4. Create a focused branch:

   ```sh
   git checkout -b fix/short-description
   ```

   Recommended branch prefixes include:

   * `feat/` for new features
   * `fix/` for bug fixes
   * `docs/` for documentation changes
   * `refactor/` for internal refactoring
   * `test/` for test-related changes
   * `chore/` for maintenance work

5. Make the smallest change necessary to solve the problem.

6. Add or update regression tests for behavior changes.

## Code Quality

Before submitting your changes, run:

```sh
npm run check:format
npm run check:type
npx jest --runInBand
npm run package:build
npm run package:verify
```

Database-backed integration tests require the PostgreSQL configuration used by
the CI workflow.

When your change affects database behavior, Prisma generation, generated
resolvers, or integration fixtures, run the relevant database-backed integration
tests as well.

Do not commit:

* Credentials, tokens, or local environment files
* Unrelated generated files
* Unnecessary dependency updates
* Debugging code or temporary files
* Formatting changes unrelated to the contribution

## Generated Files and Snapshots

This project generates TypeScript and GraphQL-related output.

When a change affects generated output:

1. Update the relevant tests and snapshots.
2. Review generated changes carefully.
3. Confirm that snapshots contain only expected differences.
4. Avoid committing generated files that are unrelated to the change.
5. Document user-visible changes to generated APIs or schemas.

## Commit Messages

This repository follows the
[Conventional Commits](https://www.conventionalcommits.org/) specification.

Use the following format:

```text
<type>(optional scope): <description>
```

Examples:

```text
feat(generator): support a new Prisma field type
fix(resolvers): preserve relation selections
docs(installation): clarify Prisma configuration
test(generator): add regression coverage for enums
chore(deps): update development dependencies
```

Common commit types include:

* `feat`: A new feature
* `fix`: A bug fix
* `docs`: Documentation-only changes
* `test`: Adding or updating tests
* `refactor`: Code changes that neither fix a bug nor add a feature
* `perf`: Performance improvements
* `build`: Changes to the build system or dependencies
* `ci`: Changes to CI configuration
* `chore`: Repository maintenance
* `revert`: Reverting a previous change

Commit descriptions should:

* Use the imperative mood
* Start with a lowercase letter
* Be concise and specific
* Avoid a trailing period

For example:

```text
fix(generator): handle multiple field comments
```

Avoid vague messages such as:

```text
fix stuff
update files
changes
work in progress
```

### Breaking Changes

Use an exclamation mark when a commit introduces a breaking change:

```text
feat(generator)!: require an explicit output path
```

Include a `BREAKING CHANGE` footer describing the impact and migration steps:

```text
feat(generator)!: require an explicit output path

BREAKING CHANGE: Generator configurations must now define an output path.
Add `output = "../generated/type-graphql"` to the generator block.
```

## Pull Requests

Pull requests should be focused, reviewable, and supported by appropriate tests.

Each pull request should:

* Explain what changed and why
* Link the related issue when applicable
* Describe user-visible behavior
* Describe compatibility implications
* List the exact validation commands that passed
* Include regression tests for behavior changes
* Update documentation when usage or generated output changes
* Clearly identify breaking changes and migration steps
* Contain only changes relevant to the proposal

Use closing keywords when the pull request resolves an issue:

```text
Closes #123
```

Before requesting review, confirm that:

* Formatting checks pass
* Type checks pass
* Tests pass
* Package build and verification pass
* Generated snapshots contain only expected changes
* Documentation is up to date
* No credentials or unrelated files are included

Draft pull requests are welcome for early feedback, but they should not be marked
ready for review until the implementation and validation steps are complete.

## Documentation

Update the documentation when a contribution changes:

* Installation or configuration
* Generator options
* Generated models, inputs, enums, scalars, or resolvers
* Supported Prisma, TypeGraphQL, TypeScript, or Node.js versions
* Package exports or public APIs
* Migration requirements

Documentation should include examples where they help users understand the new
behavior.

## Reporting Bugs

Use GitHub Issues for reproducible bugs.

A useful bug report should include:

* A clear description of the problem
* The expected behavior
* The actual behavior
* Minimal reproduction steps
* A minimal Prisma schema when applicable
* Relevant generator configuration
* Package versions
* Node.js and TypeScript versions
* Error messages or stack traces
* A reproduction repository when possible

Do not include secrets, credentials, or private project information.

## Feature Requests and Questions

Use GitHub Issues for concrete feature proposals.

Use GitHub Discussions for:

* General questions
* Usage guidance
* Ideas that are not yet fully specified
* Community support

Feature requests should describe the use case and expected behavior rather than
only proposing an implementation.

## Review Process

Maintainers may request changes related to:

* Backward compatibility
* Test coverage
* Generated output
* Public API design
* Documentation
* Commit history
* Pull request scope

Please respond to review comments and resolve conversations after the requested
changes have been addressed.

Maintainers may squash, rebase, or request that commits be reorganized before
merging.

## License

By contributing to this repository, you agree that your contributions will be
licensed under the repository’s existing license.
