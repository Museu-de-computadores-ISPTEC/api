# API do museu de computadores do ISPTEC
Versão 0.0.1

## Coponentes

a presente API é dividida em camadas, cada uma responsável por um grupo de tarefas específicas.

> Contrllers: Esta camada, é responsável por abstrair as entidades da aplicação e manipular os models;

> Routers: Os routers, é a camada responsável por gerenciar um conjunto de rotas associadas a um controller que descrevem uma entidades ou grupos de entidades na aplicação;

> Models: É a camada responsável por comunicar direito com o SGBD (sistema de gerênciamento de banco de dados) e abrair as entidades em formas de objectos;

Cada uma das camadas citadas, possui um arquivo core situado na pasta core.

## Funcionalidades (Lado dos visitantes)

- [x] Esposições
    - [x] Registro de exposições
    - [x] Obtenção de exposições
    - [x] Remoção de exposições
    - [x] Atualização de uma exposição
    ------------------------------------
    - [] Registro de slide para uma exposição
    - [] Obtenção de slides de uma exposição
    - [] Remoção de slides de uma exposição
    - [] Atualização dos dados de um slide
    -------------------------------------
    - [] Registro de um sub-slide
    - [] Remoção de sub-slides
    - [] Obtenção de sub-slides
    - [] Atualização de sub-slides
    --------------------------------------
    - [] Revisção das funcionalidades
    - [] Testes das funcionalidades



## Organização da API

A seguir está descrito como a presente API está estruturada:

### Directórios
- dev
-- classes
-- controllers
-- core
-- db
-- interfaces
-- middlewares
-- models
-- routers
-- utilities
-- index.ts
- package.json
- README.md
- tsconfig.json

### Descrição dos directórios

- dev: Neste directório, está contido todo código em typescript da aplicação

-- classes: Neste directório, ficarão contidos, todas as classes de abstrações de serviços externos e internos auxiliares a aplicação. Exemplo: classe para manipulação de ficheiros, classe de gerenciamneto de emails etc. 

-- controller: Neste directório, ficarão contidos, todos os controllers da aplicação;

-- core: Neste directório, estão contidos os ficheiros core da aplicação;

-- db: Neste directório, estão contidos o arquivo de conexao com o SGBD e os models de abstração do banco de dados;

-- interfaces: Neste directório, ficarão contidas todas as interfaces typescript da aplicação;

-- middlewares: Neste directório, ficarão contidos todos os middlewares da aplicação;

-- models: Neste directório, ficarão contidos todos os models da aplicação, ou seja as abstrações do banco de dados;

-- routers: Neste directório, ficarão contidos todos os arquivos de rots da aplicação;

-- utilities: Neste directório, ficarão contidas todas as funções auxiliares da aplicação;

-- index.ts: Este é o arquivo main da aplicação, responsável por executar toda aplicação.

- package.json: Arquivo de configuração da aplicação

- README.md: arquivo de documentação do projecto

- tsconfig.json: arquivo de configuração do typescript

## Rotas da API

