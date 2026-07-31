
# Arquitetura

Camadas:

Presentation

↓

Application

↓

Domain

↑

Infrastructure

## Responsabilidades

Presentation: UI.
Application: orquestra casos de uso.
Domain: regras de negócio.
Infrastructure: implementações de repositories.

Toda dependência aponta para o Domain.
