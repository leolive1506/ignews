# Sobre App
- Stripe (pagamentos)
- FaunaDb (bando de dados)
	- Específico p aplicaoes serveless
		- Serveless -> cada rota vai ser executada em ambiente isolada
			- Maneira superficial, no Serveless so quando chamar que instancia a 'maquina virtual' executa, deu resultado, deleta 'maquina virtual'
	- Toda comunica~çao com faunadb e feita atraves http, como chamada rest
	- Poderia usar tbm o dynamodb

- Prismic CMS (Content Manage System)
	- Um painel adm pra cadastrar informaçoes e servir atraves de uma api

- Github -> autenticacao (OAuth)

# Fluxo Aplicacao
	- Home
		- Autenticacao
			- Dados github
		
	- Dps de autenticado pode fazer incricao (stripe)
	- Redirecionada p app e salva as informacoes de inscricao do user
	- Informacoes salvas no faunadb
	- Usuario pode consumir os posts
		- Prismic serve os posts

# Fundamentos Next
	- Framework React
	- React 
		- SPA (single-page application)
		
		- Browser (cliente)
			- Código React (bundle.js)
			- Construída pelo cliente e js
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
# Variaveis ambientes NextJS
- .env.local
  - Rodando projeto local 

- .env.test
- .env.development
- .env.production

- Variáveis ambientes que precisar ser publicas (não estão dentro pasta api, ou getServerSideProps, getStaticProps)
  - Começara com NEXT_PUBLIC_RESTO_DO_NOME

# Pq tem um preview do produto quando não tiver assinatura?
- Quando google for acesar o site ele não vai ter uma assinatura, logo não poderia anexar