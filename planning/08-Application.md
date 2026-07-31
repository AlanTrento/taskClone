
# Application

Responsável por orquestrar o Domain.

## Regras

- Nunca acessar mocks.
- Nunca acessar componentes.
- Recebe Repository por injeção.

## Factories

Criar factories para instanciar UseCases.

Objetivo:
Evitar new espalhado pela aplicação.

## ViewModels

Transformar entidades em modelos de exibição quando necessário.

Nunca alterar entidades do domínio diretamente.
