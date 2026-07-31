# Arquitetura

## Princípios

- **Clean Architecture**: dependências apontam para dentro (Domain no centro)
- **DDD**: entidades ricas, repositórios como contratos, casos de uso orquestram lógica
- **Sem estado global**: ViewModels gerenciam estado via callbacks, sem Redux/Zustand

## Camadas

### Domain
Entidades puras e interfaces de repositório.

```
domain/
├── entities/
│   ├── Task.ts          # Interface + createTask + updateTask
│   └── TaskList.ts      # Interface + createTaskList + updateTaskList
└── repositories/
    ├── ITaskRepository.ts
    └── ITaskListRepository.ts
```

### Application
Casos de uso, DI, DTOs, Mappers.

```
application/
├── usecases/            # Get/Create/Update/Delete
├── di/Container.ts      # Injeção de dependência (singleton)
├── dto/TaskDTO.ts       # Formato de transferência
└── mappers/             # Conversão Entity ↔ DTO
```

### Infrastructure
Implementações concretas dos repositórios.

```
infrastructure/
├── repositories/
│   ├── MockTaskRepository.ts      # Dados em memória
│   ├── MockTaskListRepository.ts  # Dados em memória
│   ├── ApiTaskRepository.ts       # Stub para API futura
│   └── ApiTaskListRepository.ts   # Stub para API futura
└── factories/
    └── RepositoryFactory.ts       # Configura implementação
```

### Presentation
Componentes React, hooks, viewmodels.

```
presentation/
├── components/    # TaskCard, TaskList, TaskItem, etc.
├── hooks/         # useTasks, useTaskLists
├── viewmodels/    # TasksViewModel, TaskListsViewModel
└── layout/        # MainContent
```

## Fluxo de Dados

```
App.tsx
  → useTasks() / useTaskLists()
    → TasksViewModel / TaskListsViewModel
      → UseCase (Get/Create/Update/Delete)
        → ITaskRepository / ITaskListRepository
          → MockTaskRepository / ApiTaskRepository
```

## Regras

1. Domain nunca importa Application, Infrastructure ou Presentation
2. Application importa apenas Domain
3. Infrastructure implementa interfaces do Domain
4. Presentation importa apenas Application (via Hooks)
5. Nenhum componente React acessa Repository diretamente
6. Nenhuma regra de negócio fica na Presentation
