# O que foi feito

[x] Página de login funcionando de verdade: frontend/src/pages/login/login.html agora envia os dados por fetch pro backend e redireciona pro /painel se o login der certo.
[x] Sessão de usuário: adicionado express-session. Login válido grava req.session.usuarioId; a rota /painel está protegida pelo middleware authMiddleware.js (exigirLogin) — quem não estiver logado é redirecionado pro /login automaticamente.
[x] Cadastro de usuário: nova rota POST /cadastro (backend/cadastro.js), salvando na tabela usuario.
[x] Página de painel com calendário: frontend/src/pages/painel/ agora tem um calendário mensal (painel.html, style.css, script.js). Dá pra clicar num dia e adicionar tarefas do tipo Tarefa (verde), Prova (vermelho) ou Atividade (azul), com opção de repetir toda semana no mesmo dia. Uma lista lateral mostra todas as tarefas do mês, ordenadas por data.
[x] Tarefas no banco de dados: nova rota backend/tarefas.js (GET, POST, DELETE /tarefas), protegida por login, salvando na tabela tarefas. O calendário busca e salva tudo via API — não usa mais localStorage.
[x] Banco de dados migrado para a nuvem (Aiven, plano free): antes cada colaborador tinha um MySQL local isolado (dados não compartilhados). Agora todo mundo aponta pro mesmo banco na nuvem, então cadastros e tarefas aparecem pra todos, e continuam salvos mesmo com o PC desligado.
[x] .gitignore criado, protegendo node_modules/ e .env.

# O que você precisa fazer pra rodar o projeto agora

- Rodar npm install (pra pegar express-session, bcrypt/mysql2, dotenv, etc, se ainda não tiver).

- Criar um arquivo .env dentro de backend:
  dotenv

   DB_HOST=
   DB_PORT=
   DB_USER=
   DB_PASSWORD=
   DB_DATABASE=defaultdb
   SESSION_SECRET=

[x] As tabelas usuario e tarefas já existem no banco da Aiven — não precisa recriar, só conectar.

# Pendências / próximos passos

Senhas ainda são salvas em texto puro na tabela usuario (sem hash). Trocar por bcrypt antes de usar em produção de verdade.
O backend (node server.js) ainda precisa ser rodado manualmente por alguém — o site não está hospedado publicamente ainda. Só o banco de dados está sempre online.