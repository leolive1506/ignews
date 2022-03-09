Api rules
- rotas no app que comportam como app backend

Sobre App
- Stripe (pagamentos)
- FaunaDb (bando de dados)
	- Espec�fico p aplica�oes serveless
		- Serveless -> cada rota vai ser executada em ambiente isolada
			- Maneira superficial, no Serveless so quando chamar que instancia a 'maquina virtual' executa, deu resultado, deleta 'maquina virtual'
	- Toda comunica�ao com faunadb e feita atraves http, como chamada rest
	- Poderia usar tbm o dynamodb

- Prismic CMS (Content Manage System)
	- Um painel adm pra cadastrar informa�oes e servir atraves de uma api

- Github -> autenticacao (OAuth)

- Fluxo Aplicacao
	- Home
		- Autenticacao
			- Dados github
		
	- Dps de autenticado pode fazer incricao (stripe)
	- Redirecionada p app e salva as informacoes de inscricao do user
	- Informacoes salvas no faunadb
	- Usuario pode consumir os posts
		- Prismic serve os posts

- Fundamentos Next
	- Framework React
	- React 
		- SPA (single-page application)
		
		- Browser (cliente)
			- C�digo React (bundle.js)
			- Constru�da pelo cliente e js
			- Sem js habilidatado nao existe aplicacao
	- Next
		- SSR (server-side-rendering)
		- Cliente
			- Acessa e em vez ir codigo react vai pro nextjs (servidor nodejs)
			- Servidor node 
				- acessa codigo react
				- Faz as chamadas api
				- React interpreta resposta, constroi interface
				- Interface é devolvida pro server node
				- Server node devolve interface pro browser

			- Com SSR
				- Alguns motores de busca acessao  pelo js desabilitado
				- Com React pode nao indexar bem
					- Ou nao esperam chamadas api
				- Com SSR Browser aguarda resultado servidor next
		- Nexjs
