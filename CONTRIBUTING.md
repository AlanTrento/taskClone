# Contribuindo

## Branches

- `main` — produção estável
- `feat/*` — novas funcionalidades
- `fix/*` — correções de bugs
- `refactor/*` — refatorações sem mudança funcional

## Commits

Padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adicionar criação de listas
fix: corrigir filtro por lista ativa
refactor: extrair useTaskLists hook
test: adicionar testes do CreateTaskUseCase
docs: atualizar README
```

## Pull Requests

1. Criar branch da `main`
2. Implementar mudanças
3. Rodar `npm run build && npm run lint && npm run test`
4. Abrir PR com descrição clara
5. Aguardar review

## Review Checklist

- [ ] Build sem erros
- [ ] ESLint sem warnings
- [ ] Testes passando
- [ ] TypeScript sem erros
- [ ] Fluxo: Presentation → Hook → ViewModel → UseCase → Repository
- [ ] Sem dependências invertidas
- [ ] Componentes com `memo()`
- [ ] Props tipadas

## Código

- Seguir convenções em `docs/Development.md`
- Não adicionar `any`
- Não quebrar Clean Architecture
- Preferir inline styles sobre CSS modules
- Usar tokens de estilo existentes
