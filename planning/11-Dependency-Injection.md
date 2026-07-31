
# Dependency Injection

A Presentation nunca instancia repositories.

Fluxo:

Factory
↓

Repository
↓

UseCase
↓

Hook

Quando trocar Mock por API apenas a Factory deve mudar.
