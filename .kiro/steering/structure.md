# Project Structure

```
playground/
├── .kiro/
│   └── steering/
├── app/
│   ├── page.tsx
│   ├── experiments/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── deployments/
│   │   └── page.tsx
│   └── api/
├── components/
├── lib/
│   ├── constants.ts
│   ├── date.ts
│   ├── experiment.ts
│   ├── mockExperiments.ts
│   └── validation.ts
├── public/
├── tests/
├── package.json
└── README.md
```

## Conventions

- **Components**: Reusable UI components in `components/`
- **Lib**: Shared utilities, types, and mock data in `lib/`
- **Pages**: App Router pages in `app/`
- **Static**: Public assets in `public/`