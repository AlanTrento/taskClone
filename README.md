# Google Tasks Desktop Clone

Clone do Google Tasks Desktop construído com React + TypeScript + Vite seguindo Clean Architecture + DDD.

## Stack

- React 18, TypeScript, Vite
- Ant Design (UI), Tailwind CSS
- Vitest (testes)

## Quick Start

```bash
npm install
npm run dev
```

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview da build |
| `npm run lint` | ESLint |
| `npm run test` | Testes unitários |
| `npm run test:watch` | Testes em watch mode |

## Estrutura

```
src/
├── app/                          # Layout global
│   ├── layout/                   # AppLayout, Sidebar, TopBar
│   └── theme/                    # ThemeProvider (Ant Design dark)
├── modules/
│   └── task/                     # Módulo principal
│       ├── domain/               # Entidades + interfaces
│       │   ├── entities/         # Task, TaskList
│       │   └── repositories/     # ITaskRepository, ITaskListRepository
│       ├── application/          # Casos de uso + DI
│       │   ├── usecases/         # Get/Create/Update/Delete
│       │   ├── di/               # Container (DI)
│       │   ├── dto/              # Data Transfer Objects
│       │   └── mappers/          # Entity ↔ DTO
│       ├── infrastructure/       # Implementações
│       │   ├── repositories/     # MockTaskRepository, ApiTaskRepository
│       │   └── factories/        # RepositoryFactory
│       └── presentation/         # UI
│           ├── components/       # TaskCard, TaskList, TaskItem, etc.
│           ├── hooks/            # useTasks, useTaskLists
│           ├── viewmodels/       # TasksViewModel, TaskListsViewModel
│           └── layout/           # MainContent
├── shared/                       # Estilos, hooks, utils
│   ├── hooks/                    # useMediaQuery
│   └── styles/                   # typography, spacing, states, colors
└── test/                         # Setup de testes
```

## Arquitetura

Fluxo obrigatório:

```
Presentation → Hook → ViewModel → UseCase → Repository Interface → Repository
```

- **Domain**: entidades e interfaces (sem dependências externas)
- **Application**: casos de uso (depende apenas do Domain)
- **Infrastructure**: implementações dos repositórios
- **Presentation**: componentes React (depende apenas de Application via Hooks/ViewModels)

### Trocar Mock por API

```typescript
import { RepositoryFactory } from './modules/task/infrastructure/factories/RepositoryFactory';

// Usar mock (padrão)
RepositoryFactory.configure('mock');

// Usar API (stubs preparados)
RepositoryFactory.configure('api');
```

Nenhum UseCase ou componente React precisa ser alterado.

## Testes

```bash
npm run test        # Executa todos os testes
npm run test:watch  # Watch mode
```

Cobertura: Entities, UseCases, Mappers.

## Tema

Dark theme apenas. Cores:
- Background: `#202124`
- Surface: `#2b2c2f`
- Primary: `#8ab4f8`
- Text: `#e8eaed`

Especificação visual completa em `planning/25-UI-Specification.md`.
