# 26-Implementation-Tasks.md

# Objetivo

Gerar um documento único contendo todas as tarefas necessárias para
implementação do clone do Google Tasks seguindo a arquitetura e
especificações já definidas.

## Documentos obrigatórios

Antes de iniciar qualquer implementação, o agente deve ler
completamente:

- Todos os 23 arquivos de planning já existentes.
- `25-UI-Specification.md`.

Esses documentos são a fonte de verdade para arquitetura, UI, convenções
e regras.

## Estratégia de execução

O agente deve trabalhar em ordem sequencial.

Nunca iniciar uma tarefa antes de concluir a anterior.

Para cada tarefa:

1. Ler os documentos relevantes.
2. Criar apenas os arquivos previstos.
3. Compilar o projeto.
4. Corrigir erros de TypeScript.
5. Corrigir erros de ESLint.
6. Validar visualmente.
7. Somente então avançar.

---

# Regras Globais

1. Nunca pule tarefas.
2. Execute uma TASK por vez.
3. Não implemente funcionalidades futuras.
4. Não altere a arquitetura Clean Architecture + DDD.
5. Toda regra de negócio deve permanecer fora da camada Presentation.
6. Não utilize `any`.
7. Corrija erros de TypeScript e ESLint antes de avançar.
8. Valide visualmente cada alteração.

---

# FASE 1 — Setup e UI Estática

---

## TASK-001 — Validar documentação

### Objetivo
Ler completamente os arquivos 00–23 e o 25-UI-Specification.md.

### Fazer
- Entender arquitetura.
- Entender fluxo das camadas.
- Entender convenções.
- Entender especificação visual.

### Não fazer
- Escrever código.

### Critério de aceite
O agente compreende a arquitetura antes de iniciar.

---

## TASK-002 — Validar estrutura do projeto

### Objetivo
Confirmar React + Vite + TypeScript + Ant Design.

### Fazer
- Validar package.json
- Validar tsconfig
- Validar vite.config
- Validar eslint

### Critério
Projeto inicia sem erros.

---

## TASK-003 — Criar estrutura de pastas

Criar exatamente a estrutura definida no planning.

Não alterar nomes.

Criar apenas diretórios vazios quando necessário.

Validar imports.

---

## TASK-004 — Configurar Router

Criar AppRouter.

Utilizar React Router.

Criar rota inicial.

Nenhuma regra de negócio.

---

## TASK-005 — Configurar Theme

Criar ThemeProvider.

Implementar tokens.

Usar tema escuro definido no planning.

Nenhuma cor hardcoded fora dos tokens.

---

## TASK-006 — Criar AppLayout

### Responsabilidade

Organizar:

- Sidebar
- MainContent

Usar display:flex.

Sidebar fixa.

Main flex:1.

Sem lógica.

---

## TASK-007 — Criar TopBar

Implementar conforme UI Specification.

Componentes:

- Menu
- Logo
- Título
- Help
- Apps
- Avatar

Nenhuma ação real.

Somente layout.

---

## TASK-008 — Criar Sidebar

Implementar exatamente conforme UI Specification.

Componentes:

- CreateButton
- Navigation
- Lists
- Footer (caso previsto)

Não conectar dados.

Não usar hooks.

Critério de aceite:

- largura correta
- padding correto
- background correto
- responsivo conforme especificação

---

### Checklist Fase 1

- Projeto compila.
- Router funcionando.
- Theme funcionando.
- AppLayout criado.
- TopBar criada.
- Sidebar criada.
- Nenhum erro TypeScript.
- Nenhum warning ESLint.

---

## TASK-009 — Criar MainContent

### Objetivo
Criar o container principal responsável por hospedar o conteúdo da aplicação.

### Dependências
- TASK-001 até TASK-008

### Arquivos
- src/presentation/layout/MainContent/MainContent.tsx
- src/presentation/layout/MainContent/index.ts

### Implementação
- Criar componente sem lógica de negócio.
- O componente deve ocupar todo o espaço restante após a Sidebar.
- Centralizar horizontalmente o conteúdo.
- Aplicar padding conforme `25-UI-Specification.md`.

### Não fazer
- Não consumir Repository.
- Não utilizar hooks.
- Não criar estado.

### Critério de aceite
- Main ocupa toda a área disponível.
- Layout igual ao especificado.

---

## TASK-010 — Criar TaskCard

### Objetivo
Criar o card central onde todas as tarefas serão exibidas.

### Dependências
- TASK-009

### Arquivos
- presentation/components/TaskCard

### Implementação
- Largura mínima, ideal e máxima conforme UI Specification.
- Background, border-radius e padding iguais à especificação.
- Não adicionar dados reais.

### Critério de aceite
- Card centralizado.
- Dimensões corretas.

---

## TASK-011 — Criar Header do TaskCard

### Objetivo
Criar o cabeçalho do card.

### Componentes
- Título "Minhas tarefas"
- Botão de opções (3 pontos)

### Regras
- Apenas layout.
- Nenhuma ação implementada.

### Critério
Visual idêntico ao especificado.

---

## TASK-012 — Criar AddTaskRow

### Objetivo
Criar a linha "Adicionar uma tarefa".

### Implementação
- Ícone "+"
- Texto
- Hover
- Radius
- Espaçamentos

### Não fazer
- Não abrir modal.
- Não criar formulário.
- Não adicionar lógica.

### Critério
Linha pronta para integração futura.

---

## TASK-013 — Criar estrutura da TaskList

### Objetivo
Criar o componente responsável por renderizar a lista.

### Implementação
- Receber lista por props.
- Renderizar TaskItem.
- Não acessar Repository.

### Critério
Lista renderiza corretamente com dados mockados futuramente.

---

## TASK-014 — Criar TaskItem (estrutura)

### Objetivo
Criar a estrutura visual de um item de tarefa.

### Componentes
- Checkbox
- Título
- Descrição
- Área clicável

### Regras
- Nenhuma lógica.
- Nenhum estado.
- Apenas estrutura visual.

### Critério
TaskItem segue exatamente o UI Specification.

---

## TASK-015 — Criar Checkbox

### Objetivo
Criar um componente Checkbox reutilizável para tarefas.

### Dependências
- TASK-014

### Arquivos
- src/presentation/components/Checkbox/Checkbox.tsx
- src/presentation/components/Checkbox/index.ts

### Implementação
- Componente desacoplado.
- Aceitar propriedades:
  - checked
  - disabled
  - onChange
- Estilo conforme UI Specification.
- Preparar suporte para acessibilidade.

### Não fazer
- Não acessar Repository.
- Não conter regra de negócio.

### Critério de aceite
- Visual correto.
- Estados normal, hover e checked preparados.

---

## TASK-016 — Implementar tipografia

### Objetivo
Padronizar textos do TaskItem.

### Fazer
- Aplicar tokens de tipografia.
- Título e descrição conforme especificação.
- Não utilizar tamanhos hardcoded fora do tema.

### Critério
Todos os textos seguem Design Tokens.

---

## TASK-017 — Implementar espaçamentos

### Objetivo
Aplicar paddings, gaps e margens definidos no UI Specification.

### Fazer
- Ajustar Sidebar.
- Ajustar Main.
- Ajustar TaskCard.
- Ajustar TaskItem.

### Critério
Espaçamentos consistentes em toda a interface.

---

## TASK-018 — Implementar estados visuais

### Objetivo
Adicionar apenas estados visuais.

### Fazer
- Hover.
- Focus.
- Active.
- Disabled (quando aplicável).

### Não fazer
- Não implementar lógica funcional.

### Critério
Todos os componentes respondem visualmente conforme especificação.

---

## TASK-019 — Montar tela estática

### Objetivo
Integrar todos os componentes criados em uma única tela estática.

### Componentes obrigatórios
- AppLayout
- TopBar
- Sidebar
- MainContent
- TaskCard
- Header
- AddTaskRow
- TaskList
- TaskItem

### Critério
A interface deve estar visualmente completa, mesmo usando conteúdo estático.

---

## TASK-020 — Validar implementação da Fase 1

### Objetivo
Finalizar a primeira fase antes de iniciar integração de dados.

### Checklist obrigatório
- Layout corresponde ao 25-UI-Specification.md.
- Estrutura segue Clean Architecture.
- Nenhuma regra de negócio na Presentation.
- Projeto compila.
- ESLint sem erros.
- TypeScript sem erros.
- Imports organizados.
- Componentes reutilizáveis.

### Não continuar enquanto
- Houver erro de compilação.
- Existirem componentes incompletos.
- O layout divergir da especificação.

### Definition of Done — Fase 1
A interface base deve estar completamente construída, porém sem integração de dados. Toda a camada de apresentação deve estar pronta para receber ViewModels, Use Cases e Repositories nas próximas etapas.

---

# FASE 2 — Domain, Application e Infrastructure

---

## TASK-021 — Criar entidade Task

### Objetivo
Implementar a entidade principal do domínio.

### Arquivos
- src/domain/entities/Task.ts

### Responsabilidades
A entidade deve representar uma tarefa independente da interface.

### Atributos mínimos
- id
- title
- description
- completed
- dueDate
- listId
- createdAt
- updatedAt

### Regras
- Não importar React.
- Não importar Ant Design.
- Não depender da infraestrutura.

### Critério de aceite
A entidade compila sem dependências externas.

---

## TASK-022 — Criar entidade TaskList

### Objetivo
Representar uma lista de tarefas.

### Arquivos
- src/domain/entities/TaskList.ts

### Campos
- id
- name
- color
- order

### Critério
Nenhuma dependência da camada Presentation.

---

## TASK-023 — Criar contratos dos Repositories

### Objetivo
Definir contratos do domínio.

### Arquivos
- ITaskRepository.ts
- ITaskListRepository.ts

### Métodos
- getAll()
- getById()
- create()
- update()
- delete()

### Não fazer
Não implementar lógica.

---

## TASK-024 — Criar DTOs

### Objetivo
Padronizar comunicação entre camadas.

### Arquivos
- TaskDTO.ts
- TaskListDTO.ts

### Regras
DTOs não possuem comportamento.

---

## TASK-025 — Criar Mappers

### Objetivo
Converter DTO <-> Entity.

### Arquivos
- TaskMapper.ts
- TaskListMapper.ts

### Critério
Conversão bidirecional funcionando.

---

## TASK-026 — Criar UseCase GetTasks

### Objetivo
Buscar todas as tarefas utilizando apenas o contrato do Repository.

### Arquivos
- application/usecases/GetTasksUseCase.ts

### Fluxo
UseCase -> Repository Interface

Nunca:
UseCase -> MockRepository

---

## TASK-027 — Criar UseCase CreateTask

### Objetivo
Centralizar criação de tarefas.

### Regras
Toda validação de negócio deve ocorrer aqui.

---

## TASK-028 — Criar UpdateTaskUseCase

### Objetivo
Centralizar toda atualização de tarefas.

### Dependências
- TASK-021 até TASK-027

### Arquivos
- src/application/usecases/UpdateTaskUseCase.ts

### Passos
1. Receber a entidade Task.
2. Validar dados obrigatórios.
3. Chamar apenas a interface ITaskRepository.
4. Retornar a entidade atualizada.

### Não fazer
- Não acessar MockRepository diretamente.
- Não importar React.

### Critério de aceite
UseCase desacoplado da infraestrutura.

---

## TASK-029 — Criar DeleteTaskUseCase

### Objetivo
Remover tarefas utilizando apenas o contrato do repositório.

### Arquivos
- src/application/usecases/DeleteTaskUseCase.ts

### Fluxo
Presentation → ViewModel → DeleteTaskUseCase → ITaskRepository

### Critério
Nenhuma dependência da camada Infrastructure.

---

## TASK-030 — Criar GetTaskListsUseCase

### Objetivo
Buscar todas as listas disponíveis.

### Arquivos
- src/application/usecases/GetTaskListsUseCase.ts

### Regras
- Retornar coleção tipada.
- Não ordenar dados na Presentation.

---

## TASK-031 — Implementar MockTaskRepository

### Objetivo
Criar implementação temporária do contrato ITaskRepository.

### Arquivos
- src/infrastructure/repositories/MockTaskRepository.ts

### Responsabilidades
- Simular chamadas assíncronas.
- Retornar dados mockados.
- Implementar todos os métodos da interface.

### Não fazer
- Não utilizar fetch().
- Não acessar APIs externas.

### Critério
Todos os métodos retornam Promise.

---

## TASK-032 — Implementar MockTaskListRepository

### Objetivo
Criar implementação mock para listas.

### Arquivos
- src/infrastructure/repositories/MockTaskListRepository.ts

### Critério
Implementa integralmente ITaskListRepository.

---

## TASK-033 — Criar fábrica de Repositories

### Objetivo
Centralizar a criação das implementações.

### Arquivos
- src/infrastructure/factories/RepositoryFactory.ts

### Implementação
- Expor instâncias dos repositórios.
- Facilitar futura troca para ApiRepository.

### Critério
Nenhuma camada superior conhece implementações concretas.

---

## TASK-034 — Configurar Injeção de Dependências

### Objetivo
Disponibilizar os Repositories para os UseCases.

### Arquivos
- src/application/di/container.ts (ou equivalente definido no planning)

### Passos
1. Registrar MockTaskRepository.
2. Registrar MockTaskListRepository.
3. Criar instâncias dos UseCases.
4. Exportar dependências.

### Não fazer
- Não instanciar repositórios dentro dos componentes React.

### Critério de aceite
Toda dependência é resolvida em um único ponto.

---

## TASK-035 — Criar TasksViewModel

### Objetivo
Criar o ViewModel responsável por orquestrar o estado das tarefas.

### Dependências
- TASK-021 até TASK-034

### Arquivos
- src/presentation/viewmodels/TasksViewModel.ts

### Responsabilidades
- Expor lista de tarefas.
- Expor estado de carregamento.
- Expor estado de erro.
- Invocar UseCases.
- Não renderizar componentes.

### Métodos mínimos
- loadTasks()
- createTask()
- updateTask()
- deleteTask()

### Não fazer
- Não importar componentes React.
- Não acessar MockRepository diretamente.

### Critério de aceite
Toda interação ocorre exclusivamente através dos UseCases.

---

## TASK-036 — Criar TaskListsViewModel

### Objetivo
Gerenciar as listas de tarefas.

### Arquivos
- src/presentation/viewmodels/TaskListsViewModel.ts

### Responsabilidades
- Carregar listas.
- Selecionar lista ativa.
- Expor estado para a UI.

### Critério
Nenhuma lógica de apresentação.

---

## TASK-037 — Criar hook useTasks

### Objetivo
Disponibilizar o TasksViewModel para os componentes React.

### Arquivos
- src/presentation/hooks/useTasks.ts

### Implementação
1. Instanciar o ViewModel através do container.
2. Expor estado reativo.
3. Encapsular chamadas aos métodos públicos.

### Não fazer
- Não criar regras de negócio.
- Não acessar Repository.

### Critério de aceite
Componentes utilizam apenas o hook.

---

## TASK-038 — Criar hook useTaskLists

### Objetivo
Disponibilizar as listas para a interface.

### Arquivos
- src/presentation/hooks/useTaskLists.ts

### Responsabilidades
- Carregar listas.
- Expor lista ativa.
- Expor métodos públicos.

---

## TASK-039 — Integrar MainContent ao TasksViewModel

### Objetivo
Substituir dados estáticos por dados vindos do ViewModel.

### Passos
1. Remover mocks internos dos componentes.
2. Utilizar useTasks().
3. Carregar tarefas ao montar a tela.
4. Renderizar TaskList usando o estado do ViewModel.

### Fluxo obrigatório

Presentation
→ Hook
→ ViewModel
→ UseCase
→ Repository Interface
→ MockRepository

### Não fazer
- Não chamar Repository dentro do componente.

### Critério de aceite
A UI exibe dados mockados utilizando a arquitetura completa.

---

## TASK-040 — Validar integração da arquitetura

### Objetivo
Garantir que todas as camadas estejam corretamente conectadas.

### Checklist técnico

- Presentation depende apenas de Hooks/ViewModels.
- ViewModels dependem apenas de UseCases.
- UseCases dependem apenas de Interfaces.
- Infrastructure implementa Interfaces.
- MockRepository pode ser substituído futuramente sem alterar a Presentation.

### Validação manual

- A aplicação inicia normalmente.
- A lista de tarefas é carregada.
- Não existem imports cruzando camadas.
- TypeScript sem erros.
- ESLint sem warnings.

### Definition of Done — Fase 2

A arquitetura Clean Architecture + DDD está funcional.

Fluxo validado:

UI
→ Hook
→ ViewModel
→ UseCase
→ Repository Interface
→ MockRepository

A interface continua desacoplada da infraestrutura e preparada para futura substituição por ApiTaskRepository.

---

# FASE 3 — UI Interativa

---

## TASK-041 — Implementar estado de Loading

### Objetivo
Exibir feedback visual enquanto as tarefas são carregadas.

### Arquivos
- presentation/components/TaskList/*
- presentation/viewmodels/TasksViewModel.ts

### Passos
1. Expor `loading` no ViewModel.
2. Consumir `loading` através do hook `useTasks`.
3. Exibir Skeleton/Placeholder conforme UI Specification.
4. Ocultar lista enquanto o carregamento estiver ativo.

### Não fazer
- Não usar timers artificiais na UI.
- Não criar lógica de carregamento no componente.

### Critério de aceite
O usuário percebe claramente quando os dados estão sendo carregados.

---

## TASK-042 — Implementar estado Empty

### Objetivo
Exibir uma mensagem amigável quando não existirem tarefas.

### Implementação
- Renderizar componente Empty.
- Manter o botão "Adicionar uma tarefa" visível.
- Seguir a identidade visual do projeto.

### Critério
Nenhum erro é exibido quando a coleção está vazia.

---

## TASK-043 — Implementar estado Error

### Objetivo
Apresentar falhas de carregamento sem quebrar a interface.

### Passos
1. Expor `error` no ViewModel.
2. Criar componente de erro reutilizável.
3. Exibir botão de tentar novamente.

### Critério
A aplicação permanece utilizável após uma falha.

---

## TASK-044 — Integrar AddTaskRow

### Objetivo
Conectar o componente AddTaskRow ao método `createTask()`.

### Fluxo obrigatório
AddTaskRow
→ useTasks()
→ TasksViewModel
→ CreateTaskUseCase
→ Repository

### Não fazer
- Não acessar Repository diretamente.

### Critério
O componente dispara apenas ações do ViewModel.

---

## TASK-045 — Atualizar TaskList de forma reativa

### Objetivo
Garantir que alterações no estado reflitam automaticamente na interface.

### Implementação
- Atualizar lista após criação.
- Atualizar lista após exclusão.
- Atualizar lista após edição.

### Critério
Nenhum refresh manual é necessário.

---

## TASK-046 — Integrar Checkbox

### Objetivo
Marcar tarefas como concluídas.

### Fluxo
Checkbox
→ useTasks
→ TasksViewModel
→ UpdateTaskUseCase

### Critério
O estado visual acompanha o estado do domínio.

---

## TASK-047 — Validar UX da tela principal

### Checklist
- Loading correto.
- Empty correto.
- Error correto.
- Lista atualiza automaticamente.
- Componentes continuam desacoplados.
- Sem erros TypeScript.
- ESLint limpo.

---

## TASK-048 — Implementar edição de tarefa

### Objetivo
Permitir alterar título e descrição utilizando o fluxo arquitetural correto.

### Dependências
- TASK-041 até TASK-047

### Arquivos
- presentation/components/TaskItem/*
- presentation/hooks/useTasks.ts
- presentation/viewmodels/TasksViewModel.ts

### Fluxo obrigatório
TaskItem
→ useTasks()
→ TasksViewModel
→ UpdateTaskUseCase
→ ITaskRepository

### Critério de aceite
A edição atualiza a UI sem recarregar a página.

---

## TASK-049 — Implementar exclusão de tarefa

### Objetivo
Remover uma tarefa mantendo a sincronização da interface.

### Passos
1. Disparar ação pelo componente.
2. Chamar deleteTask() do ViewModel.
3. Atualizar estado local.
4. Re-renderizar a lista.

### Não fazer
- Não manipular arrays diretamente no componente.

### Critério
A tarefa desaparece imediatamente após a confirmação.

---

## TASK-050 — Implementar seção "Concluídas"

### Objetivo
Separar visualmente tarefas concluídas das pendentes.

### Regras
- Exibir cabeçalho "Concluídas".
- Permitir expandir/recolher.
- Manter ordenação consistente.

### Critério
Somente tarefas concluídas aparecem na seção.

---

## TASK-051 — Implementar ordenação da lista

### Objetivo
Garantir uma ordem previsível de exibição.

### Ordem sugerida
1. Pendentes.
2. Concluídas.
3. Data de criação (quando aplicável).

### Critério
A ordenação não é realizada pelos componentes React.

---

## TASK-052 — Implementar rolagem

### Objetivo
Adicionar scroll quando a quantidade de tarefas exceder a área disponível.

### Regras
- Sidebar permanece fixa.
- Cabeçalho permanece visível.
- Apenas a lista deve rolar.

### Critério
Layout permanece estável.

---

## TASK-053 — Refinar acessibilidade

### Objetivo
Melhorar navegação por teclado e leitores de tela.

### Implementação
- Labels apropriados.
- aria-* quando necessário.
- Ordem correta de foco.
- Componentes acessíveis.

### Critério
A interface pode ser utilizada apenas com teclado.

---

## TASK-054 — Validar comportamento da interface

### Checklist
- Criar tarefa.
- Editar tarefa.
- Excluir tarefa.
- Marcar como concluída.
- Visualizar seção "Concluídas".
- Scroll funcional.
- Navegação por teclado.
- Sem erros TypeScript.
- Sem warnings ESLint.

---

## TASK-055 — Implementar Responsividade

### Objetivo
Garantir que a interface funcione corretamente em diferentes larguras de tela.

### Dependências
- TASK-041 até TASK-054

### Arquivos
- AppLayout
- Sidebar
- MainContent
- TaskCard
- TopBar

### Passos
1. Definir breakpoints conforme UI Specification.
2. Ajustar largura da Sidebar.
3. Garantir que o MainContent utilize o espaço restante.
4. Evitar overflow horizontal.
5. Validar resolução desktop e tablet.

### Não fazer
- Não alterar a estrutura da arquitetura.
- Não duplicar componentes para mobile.

### Critério de aceite
A interface permanece utilizável e consistente em todos os breakpoints definidos.

---

## TASK-056 — Otimizar Renderização

### Objetivo
Reduzir renderizações desnecessárias da interface.

### Implementação
- Utilizar memoização apenas quando justificar.
- Evitar recriação de funções em renderizações frequentes.
- Revisar dependências de hooks.

### Não fazer
- Não otimizar prematuramente.
- Não comprometer a legibilidade do código.

### Critério de aceite
A UI permanece fluida com listas maiores.

---

## TASK-057 — Padronizar Componentes

### Objetivo
Garantir consistência entre todos os componentes da Presentation.

### Checklist
- Exportações padronizadas.
- Props tipadas.
- Nomenclatura consistente.
- Componentes reutilizáveis.
- Remover duplicações.

### Critério
Todos os componentes seguem as convenções definidas no planning.

---

## TASK-058 — Refatorar Presentation

### Objetivo
Eliminar código redundante antes da próxima fase.

### Passos
1. Revisar imports.
2. Remover código morto.
3. Consolidar componentes reutilizáveis.
4. Revisar organização das pastas.

### Critério
A camada Presentation permanece limpa e desacoplada.

---

## TASK-059 — Revisar Fluxo Completo

### Objetivo
Validar que todas as interações seguem a arquitetura.

### Fluxo obrigatório

Presentation
→ Hook
→ ViewModel
→ UseCase
→ Repository Interface
→ MockRepository

### Verificações
- Nenhum componente acessa Repository.
- Nenhum UseCase depende de implementação concreta.
- Nenhuma regra de negócio está na UI.

### Critério
Fluxo validado em todas as funcionalidades.

---

## TASK-060 — Validação Final da Fase 3

### Objetivo
Encerrar a implementação da camada de apresentação.

### Checklist Técnico

- Layout compatível com o UI Specification.
- Componentes reutilizáveis.
- Responsividade validada.
- Loading, Empty e Error funcionando.
- Criação de tarefas funcional.
- Edição funcional.
- Exclusão funcional.
- Marcação de conclusão funcional.
- Tipagem completa.
- ESLint sem warnings.
- TypeScript sem erros.

### Definition of Done

A camada Presentation está completa, organizada e integrada à arquitetura Clean Architecture + DDD, utilizando apenas dados mockados.

Está pronta para evoluir para funcionalidades adicionais sem necessidade de alterar a estrutura existente.

---

# FASE 4 — Gerenciamento de Listas

---

## TASK-061 — Implementar carregamento de listas

### Objetivo
Carregar as listas de tarefas na inicialização da aplicação.

### Dependências
- TASK-021 até TASK-060

### Arquivos
- presentation/viewmodels/TaskListsViewModel.ts
- presentation/hooks/useTaskLists.ts
- presentation/components/Sidebar/*

### Fluxo obrigatório
Sidebar
→ useTaskLists()
→ TaskListsViewModel
→ GetTaskListsUseCase
→ ITaskListRepository
→ MockTaskListRepository

### Critério de aceite
As listas são carregadas automaticamente quando a aplicação inicia.

---

## TASK-062 — Integrar Sidebar às listas

### Objetivo
Renderizar dinamicamente as listas no menu lateral.

### Passos
1. Remover itens estáticos.
2. Consumir useTaskLists().
3. Exibir nome e cor da lista.
4. Destacar a lista ativa.

### Não fazer
- Não manter listas fixas no componente.
- Não acessar Repository diretamente.

### Critério
A Sidebar reflete exatamente o estado do ViewModel.

---

## TASK-063 — Implementar seleção da lista ativa

### Objetivo
Permitir alternar entre listas.

### Implementação
- Armazenar lista selecionada no ViewModel.
- Atualizar MainContent ao trocar de lista.
- Preservar estado da seleção.

### Critério de aceite
Somente as tarefas da lista ativa são exibidas.

---

## TASK-064 — Filtrar tarefas por lista

### Objetivo
Exibir apenas tarefas pertencentes à lista selecionada.

### Fluxo
Sidebar
→ ViewModel de listas
→ ViewModel de tarefas
→ GetTasksUseCase

### Regras
- O filtro deve ocorrer antes da renderização.
- Componentes não realizam filtragem.

### Critério
A UI sempre exibe o conjunto correto de tarefas.

---

## TASK-065 — Validar sincronização entre listas e tarefas

### Objetivo
Garantir que mudanças de lista atualizem imediatamente a tela.

### Checklist
- Troca rápida entre listas.
- Atualização sem refresh.
- Nenhum estado inconsistente.
- Loading tratado corretamente.

### Definition of Done

A Sidebar controla completamente a navegação entre listas utilizando apenas Hooks, ViewModels e UseCases.

---

## TASK-066 — Implementar CreateTaskListUseCase

### Objetivo
Permitir a criação de novas listas de tarefas.

### Arquivos
- src/application/usecases/CreateTaskListUseCase.ts

### Fluxo
Presentation
→ useTaskLists()
→ TaskListsViewModel
→ CreateTaskListUseCase
→ ITaskListRepository

### Critério de aceite
A criação ocorre sem dependência de implementação concreta.

---

## TASK-067 — Integrar criação de listas na Sidebar

### Objetivo
Adicionar ação "Nova lista".

### Passos
1. Criar botão.
2. Abrir formulário simples.
3. Validar nome.
4. Chamar createList() do ViewModel.

### Não fazer
- Não instanciar Repository.
- Não adicionar regra de negócio ao componente.

### Critério
A Sidebar atualiza automaticamente após a criação.

---

## TASK-068 — Implementar edição de listas

### Objetivo
Permitir alterar nome e propriedades da lista.

### Fluxo
Sidebar
→ useTaskLists()
→ TaskListsViewModel
→ UpdateTaskListUseCase
→ ITaskListRepository

### Critério
A alteração é refletida imediatamente na interface.

---

## TASK-069 — Implementar exclusão de listas

### Objetivo
Remover listas preservando a consistência da aplicação.

### Regras
- Confirmar a ação.
- Selecionar outra lista válida após exclusão.
- Atualizar tarefas exibidas.

### Critério
Nenhum estado inválido permanece na UI.

---

## TASK-070 — Implementar ordenação das listas

### Objetivo
Exibir listas conforme o atributo `order`.

### Implementação
- Ordenação realizada na camada Application ou ViewModel.
- Componentes apenas renderizam.

### Critério
A ordem é previsível e consistente.

---

## TASK-071 — Melhorar persistência Mock

### Objetivo
Simular comportamento de uma API.

### Implementação
- Métodos assíncronos.
- Simular latência.
- Persistir estado em memória durante a execução.

### Não fazer
- Não utilizar APIs reais.
- Não alterar contratos.

### Critério
Todos os casos de uso funcionam sobre o MockRepository.

---

## TASK-072 — Validar gerenciamento de listas

### Checklist
- Criar lista.
- Editar lista.
- Excluir lista.
- Alternar listas.
- Ordenação correta.
- Atualização automática da Sidebar.
- TypeScript sem erros.
- ESLint sem warnings.

### Definition of Done

O gerenciamento completo de listas funciona utilizando apenas:

Presentation
→ Hooks
→ ViewModels
→ UseCases
→ Interfaces
→ MockRepositories

---

## TASK-073 — Padronizar tratamento de erros

### Objetivo
Centralizar o tratamento de exceções em ViewModels e UseCases.

### Arquivos
- application/*
- presentation/viewmodels/*

### Implementação
1. Capturar erros nos UseCases quando necessário.
2. Propagar mensagens para os ViewModels.
3. Expor estado `error` para a UI.
4. Nunca lançar erros diretamente para componentes React.

### Critério de aceite
Todos os erros são tratados de forma consistente.

---

## TASK-074 — Melhorar feedback ao usuário

### Objetivo
Exibir mensagens de sucesso, aviso e erro de maneira uniforme.

### Implementação
- Centralizar notificações.
- Evitar mensagens duplicadas.
- Seguir o padrão visual definido no Theme.

### Critério
Todas as operações retornam feedback apropriado.

---

## TASK-075 — Preparar ApiTaskRepository

### Objetivo
Criar a estrutura base da implementação futura.

### Arquivos
- infrastructure/repositories/ApiTaskRepository.ts
- infrastructure/repositories/ApiTaskListRepository.ts

### Regras
- Implementar apenas a estrutura.
- Não realizar chamadas HTTP reais.
- Implementar as interfaces existentes.

### Critério
A troca entre Mock e API poderá ocorrer apenas alterando a configuração da DI.

---

## TASK-076 — Atualizar RepositoryFactory

### Objetivo
Preparar a fábrica para suportar múltiplas implementações.

### Implementação
- Definir ponto único de configuração.
- Permitir alternância entre MockRepository e ApiRepository.
- Não alterar os UseCases.

### Critério
Nenhuma camada superior precisa conhecer a implementação concreta.

---

## TASK-077 — Revisar contratos

### Objetivo
Garantir que todas as implementações respeitam as interfaces.

### Checklist
- ITaskRepository
- ITaskListRepository
- DTOs
- Mappers
- UseCases

### Critério
Todos os contratos permanecem compatíveis.

---

## TASK-078 — Revisar dependências entre camadas

### Objetivo
Validar a direção das dependências.

### Verificações
- Domain não depende de outras camadas.
- Application depende apenas do Domain.
- Infrastructure implementa contratos.
- Presentation depende apenas da Application.

### Critério
Nenhuma dependência invertida.

---

## TASK-079 — Executar validação técnica completa

### Checklist
- Build de produção.
- Teste de compilação.
- ESLint.
- TypeScript.
- Imports não utilizados.
- Estrutura de pastas.
- Convenções de nomenclatura.

### Critério
Projeto pronto para evolução.

---

## TASK-080 — Encerrar Fase 4

### Definition of Done

A aplicação possui:

- Arquitetura Clean Architecture + DDD preservada.
- Repositórios desacoplados.
- Preparação para API.
- Gerenciamento de listas funcional.
- UI integrada aos ViewModels.
- Nenhuma dependência direta da infraestrutura.

---

# FASE 5 — Qualidade e Entrega

---

## TASK-081 — Configurar testes unitários

### Objetivo
Preparar a infraestrutura de testes para Domain e Application.

### Arquivos
- vitest.config.*
- src/tests/unit/*

### Escopo
- Entidades
- UseCases
- Mappers
- ViewModels (quando aplicável)

### Regras
- Cada teste deve ser independente.
- Não acessar APIs.
- Utilizar mocks para dependências externas.

### Critério de aceite
Os testes executam sem alterar o estado da aplicação.

---

## TASK-082 — Criar testes dos UseCases

### Objetivo
Validar o comportamento dos casos de uso.

### Casos mínimos
- GetTasksUseCase
- CreateTaskUseCase
- UpdateTaskUseCase
- DeleteTaskUseCase
- GetTaskListsUseCase

### Critério
Cada caso de uso possui cenários de sucesso e erro.

---

## TASK-083 — Criar testes dos ViewModels

### Objetivo
Garantir que os ViewModels exponham corretamente os estados da interface.

### Validar
- loading
- error
- tasks
- taskLists
- seleção de lista

### Critério
Estados atualizados corretamente após cada operação.

---

## TASK-084 — Criar testes dos componentes principais

### Objetivo
Validar a camada Presentation.

### Componentes
- Sidebar
- MainContent
- TaskCard
- TaskList
- TaskItem

### Verificações
- Renderização
- Props
- Eventos
- Estados

### Critério
Todos os componentes renderizam corretamente com dados mockados.

---

## TASK-085 — Revisar cobertura de testes

### Objetivo
Garantir cobertura mínima definida no planning.

### Checklist
- Domain
- Application
- Presentation

### Critério de aceite
Todos os fluxos críticos possuem testes automatizados.

---

## TASK-086 — Otimizar desempenho da aplicação

### Objetivo
Melhorar a eficiência da interface sem alterar o comportamento funcional.

### Arquivos
- presentation/components/*
- presentation/hooks/*
- presentation/viewmodels/*

### Passos
1. Revisar re-renderizações desnecessárias.
2. Aplicar memoização somente quando houver benefício comprovado.
3. Revisar dependências de hooks.
4. Eliminar cálculos repetitivos durante a renderização.

### Não fazer
- Não adicionar otimizações complexas sem necessidade.
- Não comprometer a legibilidade.

### Critério de aceite
A interface permanece fluida com grande quantidade de tarefas.

---

## TASK-087 — Auditoria da arquitetura

### Objetivo
Garantir que todas as dependências respeitam a Clean Architecture.

### Checklist
- Domain não importa Application.
- Application não importa Presentation.
- Infrastructure implementa apenas contratos.
- Presentation depende apenas de Hooks e ViewModels.
- Não existem imports cruzando camadas.

### Critério
Arquitetura consistente e desacoplada.

---

## TASK-088 — Refatoração final

### Objetivo
Eliminar redundâncias antes da entrega.

### Passos
1. Remover código morto.
2. Consolidar utilitários.
3. Padronizar nomenclaturas.
4. Revisar organização das pastas.
5. Garantir exportações consistentes.

### Critério
Código limpo e fácil de manter.

---

## TASK-089 — Atualizar documentação técnica

### Objetivo
Documentar a arquitetura e os principais fluxos.

### Arquivos
- README.md
- docs/Architecture.md
- docs/Development.md

### Conteúdo mínimo
- Estrutura de pastas.
- Fluxo da arquitetura.
- Como executar.
- Como testar.
- Como substituir MockRepository por ApiRepository.

### Critério
Um novo desenvolvedor consegue iniciar o projeto apenas lendo a documentação.

---

## TASK-090 — Criar guia de contribuição

### Objetivo
Padronizar futuras contribuições.

### Conteúdo
- Convenções de código.
- Estratégia de branches.
- Padrão de commits.
- Fluxo de Pull Requests.
- Processo de revisão.

### Critério
O projeto possui um guia claro para colaboradores.

---

## TASK-091 — Auditoria de qualidade

### Checklist
- ESLint sem warnings.
- TypeScript sem erros.
- Build de produção executa.
- Testes aprovados.
- Componentes reutilizáveis.
- Nenhum TODO pendente.

### Critério
Projeto considerado tecnicamente estável.

---

## TASK-092 — Preparar release candidata

### Objetivo
Congelar funcionalidades e validar a versão candidata.

### Passos
1. Executar todos os testes.
2. Gerar build.
3. Revisar documentação.
4. Confirmar checklist técnico.
5. Registrar versão candidata.

### Definition of Done

A aplicação está pronta para a validação final do projeto.

---

## TASK-093 — Executar checklist funcional

### Objetivo
Validar todas as funcionalidades implementadas.

### Checklist
- Criar tarefa.
- Editar tarefa.
- Excluir tarefa.
- Concluir tarefa.
- Alternar listas.
- Criar lista.
- Editar lista.
- Excluir lista.
- Loading, Empty e Error funcionando.

### Critério de aceite
Todos os fluxos executam sem falhas.

---

## TASK-094 — Executar checklist visual

### Objetivo
Comparar a interface com o `25-UI-Specification.md`.

### Validar
- Espaçamentos.
- Tipografia.
- Ícones.
- Cores.
- Bordas.
- Hover.
- Focus.
- Responsividade.

### Critério
A interface segue a especificação visual.

---

## TASK-095 — Validar arquitetura

### Objetivo
Garantir conformidade com Clean Architecture + DDD.

### Verificações
- Domain isolado.
- Application depende apenas do Domain.
- Infrastructure implementa interfaces.
- Presentation utiliza apenas Hooks e ViewModels.
- Nenhum Repository é acessado diretamente pela UI.

---

## TASK-096 — Preparar migração para API

### Objetivo
Confirmar que a troca para ApiRepository exige apenas alteração na configuração da DI.

### Critério
Nenhum UseCase ou componente React precisa ser alterado.

---

## TASK-097 — Revisar documentação final

### Arquivos
- README.md
- docs/*
- Planning

### Critério
Toda decisão arquitetural está documentada.

---

## TASK-098 — Gerar versão final

### Objetivo
Criar a versão pronta para entrega.

### Checklist
- Build de produção.
- Testes aprovados.
- Lint aprovado.
- Tipagem aprovada.

---

## TASK-099 — Auditoria final

### Validar
- Sem código morto.
- Sem TODO/FIXME.
- Imports organizados.
- Estrutura de pastas consistente.
- Convenções respeitadas.

### Critério
Projeto apto para manutenção.

---

## TASK-100 — Definition of Done do Projeto

### O projeto é considerado concluído quando:

- A interface reproduz fielmente o Google Tasks Desktop conforme `25-UI-Specification.md`.
- Todo o fluxo segue:
  Presentation → Hook → ViewModel → UseCase → Repository Interface → Repository.
- Não existe regra de negócio na camada Presentation.
- Todas as funcionalidades utilizam dados mockados através dos contratos.
- Os MockRepositories podem ser substituídos por ApiRepositories sem alterar a UI.
- Build de produção executa com sucesso.
- ESLint não apresenta warnings.
- TypeScript não apresenta erros.
- Testes essenciais estão aprovados.
- A documentação está completa.

---

# ENTREGA FINAL

Antes de encerrar o projeto confirme:

- [ ] Todas as TASK-001 até TASK-100 foram concluídas.
- [ ] Todos os checklists foram validados.
- [ ] A arquitetura permanece íntegra.
- [ ] O projeto está preparado para evolução futura.
- [ ] O código está pronto para revisão e publicação.

**Fim do documento `26-Implementation-Tasks.md`.**
