
# Domain

O Domain é a camada mais importante do projeto.

## Regras

- Não importar React.
- Não importar Ant Design.
- Não importar Browser APIs.
- Não acessar localStorage.
- Não acessar mocks.

## Entidades

### Task
Campos:
- id:string
- title:string
- description?:string
- completed:boolean
- starred:boolean
- listId:string
- createdAt:Date
- updatedAt:Date

### TaskList
- id
- name
- color
- icon

## Repository Contract

TaskRepository define somente interfaces.

Nunca implementar lógica nesta camada.

## Use Cases

- GetTasks
- GetTask
- CreateTask
- UpdateTask
- DeleteTask
- ToggleCompleted
- ToggleStar

Cada caso de uso deve possuir um único método execute().
