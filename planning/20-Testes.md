
# Estratégia de Testes

## Ferramenta
- Vitest
- React Testing Library
- @testing-library/user-event

## Estrutura

src/
└── modules/
    └── task/
        ├── domain/__tests__/
        ├── application/__tests__/
        ├── presentation/components/__tests__/
        └── presentation/hooks/__tests__/

## Cobertura mínima

- Domain: 95%
- UseCases: 90%
- Hooks: 80%
- Componentes críticos: 80%

## Prioridade

1. Entities
2. UseCases
3. Repositories Mock
4. Hooks
5. Componentes

## Não testar

- Implementação do Ant Design
- Estilos
- CSS

## Critérios

Cada bug corrigido deve gerar um novo teste.
