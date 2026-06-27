# Contributing to SaaS Kit

Thank you for your interest in contributing! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a new branch: `git checkout -b feature/my-feature`
4. Install dependencies: `pnpm install`
5. Make your changes
6. Run tests: `pnpm test`
7. Commit and push
8. Open a Pull Request

## Development

```bash
# Start development
pnpm dev

# Run linting
pnpm lint

# Run type checking
pnpm tsc --noEmit

# Run tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation
- `style:` — Formatting
- `refactor:` — Code refactoring
- `test:` — Tests
- `chore:` — Maintenance

## Pull Requests

- Keep PRs focused on a single feature/fix
- Include tests for new features
- Update documentation as needed
- Ensure all CI checks pass

## Code Style

- TypeScript strict mode
- ESLint + Prettier
- Tailwind CSS for styling
- Follow existing patterns

## Questions?

Open an issue or join our Discord community.
