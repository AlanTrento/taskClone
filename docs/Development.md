# Guia de Desenvolvimento

## Pré-requisitos

- Node.js 18+
- npm 9+

## Setup

```bash
npm install
npm run dev
```

Acessa `http://localhost:5173`.

## Estrutura de um novo UseCase

1. Criar `src/modules/task/application/usecases/NovoUseCase.ts`
2. Definir interface de request/response
3. Implementar lógica usando repositório (via interface)
4. Registrar no `Container.ts`
5. Criar teste em `__tests__/`

## Estrutura de um novo Componente

1. Criar pasta em `src/modules/task/presentation/components/NovoComponente/`
2. Criar componente com `memo()`
3. Props tipadas
4. Exportação nomeada: `export const NovoComponente = memo(function NovoComponente() {})`

## Estilos

- Usar tokens de `src/shared/styles/` (typography, spacing, states, colors)
- Inline styles (não CSS modules)
- Tema escuro fixo

## Testes

```bash
npm run test        # Executa uma vez
npm run test:watch  # Watch mode
```

Cada teste deve:
- Ser independente
- Usar mocks para dependências externas
- Testar cenários de sucesso e erro

## Convenções

- Nomes: PascalCase para componentes/classes, camelCase para funções/variáveis
- Imports: barrel exports via `index.ts`
- Components: `memo()` + exportação nomeada
- Hooks: `use` prefix
- ViewModels: `*ViewModel` suffix
- UseCases: `*UseCase` suffix
