
# Error Handling

## Objetivo

Padronizar tratamento de erros para facilitar futura integração com API.

## Regras

UseCases nunca exibem mensagens.

Repositories lançam erros tipados.

Hooks capturam erros.

Presentation decide como exibir.

## UI

Utilizar componentes do Ant Design:

- message.error
- Result
- Empty
- Spin

## Estados

Loading

Success

Empty

Error

## Futuro

Preparar ErrorBoundary global.

Criar AppError.

Criar NotFoundError.

Criar ValidationError.

Nunca utilizar alert().
