# TODO - Correção de Falhas App Escola

## Backend
- [x] Criar `.env` com `SESSION_SECRET`
- [x] Corrigir `database.js` (import "mysql2")
- [x] Corrigir imports e registrar `cadastro.js` como Router
- [x] Registrar `/cadastro` no `Router.js`
- [x] Adicionar `"type": "module"` e script `start` no `package.json`
- [x] Corrigir `login.js` (import com extensão .js + validação de credenciais)

## Frontend
- [x] Corrigir caminho CSS no `painel.html`
- [x] Remover tags HTML duplicadas em `painel.html` e `login.html`

## Testes
- [x] Validar que o servidor inicia sem erros
- [x] Validar login válido (200) e inválido (401)
