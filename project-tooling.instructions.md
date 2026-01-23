---
applyTo: "**/*"
---

## Tooling
- Use npm (this repo uses package-lock.json).
- For installs in CI/automation, prefer `npm ci`.
- Use existing scripts:
  - `npm run lint`
  - `npm run build`
  - `npm run dev` for local development
- Do not introduce pnpm/yarn or new lockfiles.