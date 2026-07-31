
# 25-UI-Specification.md

# Objetivo

Este documento substitui a necessidade de uma imagem de referência.

O agente deve seguir esta especificação literalmente. Quando existir conflito entre criatividade e este documento, este documento vence.

---

# Viewport

Tela de referência:

1920 x 1080

A aplicação ocupa 100% da largura e 100% da altura da viewport.

Não existe scroll horizontal.

Existe apenas scroll vertical na Sidebar e no conteúdo principal.

Background da aplicação:

#202124

---

# Estrutura Geral

```
App
├── TopBar
├── Sidebar (280px)
└── Main
    └── TaskCard
        ├── Header
        ├── AddTaskRow
        ├── TaskList
        └── CompletedSection
```

Layout principal:

display:flex

Sidebar fixa à esquerda.

Main ocupa todo o espaço restante.

---

# TopBar

Altura: 64px

Background igual ao fundo da aplicação.

Padding horizontal: 16px

Itens:

Esquerda:
- Menu Hamburger (24x24)
- Logo circular azul (32x32)
- Texto "Tarefas"

Direita:
- Ajuda
- Apps
- Avatar

Todos alinhados verticalmente.

Gap entre elementos: 16px.

---

# Sidebar

Largura fixa: 280px

Altura: calc(100vh - 64px)

Padding:
- Top: 12px
- Left: 8px
- Right: 8px
- Bottom: 16px

Display:
flex
column

Gap entre blocos: 24px

Background: #202124

---

# Botão Criar

Dimensões:
104px x 54px

Radius:
16px

Background:
#303134

Padding:
16px

Conteúdo:

[ + ]  Criar

Gap: 12px

Hover:
Background #3C4043

Nunca aumentar escala.

Nunca adicionar sombra.

---

# Menu Principal

Itens:

Todas as tarefas

Com estrela

Cada item:

Altura:
40px

Padding horizontal:
16px

Radius:
20px

Display:
flex

Ícone 20x20

Gap:
12px

Item selecionado:

Background:
#0B57D0

Texto branco

Ícone branco

Itens não selecionados:

Texto:
#E8EAED

Hover:
#303134

---

# Seção Listas

Título:

Listas

Fonte:
14px

Peso:
600

Cor:
#BDC1C6

Abaixo:

Minhas tarefas

Contador alinhado à direita.

Depois:

Criar nova lista

---

# Área Principal

Display:flex

justify-content:center

align-items:flex-start

Padding-top:
32px

Padding-bottom:
32px

---

# Card Principal

Largura ideal:
680px

Largura máxima:
720px

Largura mínima:
620px

Background:
#171717

Radius:
16px

Padding:
20px

Sem borda.

Sombra discreta.

---

# Cabeçalho do Card

Linha horizontal.

Esquerda:
Título "Minhas tarefas"

Direita:
Ícone de três pontos.

Título:

22px

Peso:
500

Cor:
#FFFFFF

---

# Linha "Adicionar uma tarefa"

Altura:
40px

Display:flex

Gap:
12px

Ícone:
20px

Cor:
#8AB4F8

Texto:
Adicionar uma tarefa

Hover:
Background #232425

Radius:
8px

---

# Lista de Tarefas

Gap entre tarefas:
8px

Cada item ocupa toda largura do card.

---

# TaskItem

Altura mínima:
44px

Padding:
6px 8px

Radius:
8px

Display:flex

align-items:flex-start

Gap:
12px

Hover:

Background:
#232425

Transition:
150ms

Nunca alterar tamanho.

---

# Checkbox

20x20

Circular.

Border:
2px solid #9AA0A6

Quando marcado:

Background verde.

Ícone check branco.

---

# Título da tarefa

Fonte:
14px

Peso:
500

Cor:
#E8EAED

Máximo:
2 linhas

---

# Descrição

Fonte:
12px

Cor:
#9AA0A6

Margem superior:
2px

Máximo:
2 linhas

---

# Sessão Concluídas

Último elemento do card.

Linha horizontal.

Ícone seta.

Texto:

Concluídas (563)

Altura:
40px

Hover:
#232425

Preparar expansão futura.

---

# Scroll

Sidebar:
overflow-y:auto

Main:
overflow-y:auto

TaskCard:
sem scroll próprio.

---

# Responsividade

>=1440px:
Card 680px.

1024px-1439px:
Card 620px.

<1024px:
Sidebar recolhível.

<768px:
Sidebar fechada por padrão.

---

# Espaçamentos

Header → Botão Criar: 24px

Criar → Menu: 32px

Menu → Listas: 28px

Título → Adicionar tarefa: 20px

Adicionar tarefa → Lista: 16px

Entre tarefas: 8px

Padding interno do Card: 20px

---

# Critérios Visuais

A interface deve transmitir:

- Simplicidade
- Muito espaço negativo
- Pouco contraste
- Cores escuras
- Poucas bordas
- Bordas arredondadas
- Hierarquia clara
- Ícones discretos
- Animações mínimas

Não adicionar elementos extras.

Não inventar botões.

Não alterar a disposição dos componentes.

Toda implementação deve seguir esta especificação exatamente.
