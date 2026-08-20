# ✅ Contribuindo com VITA

Bem-vindo à organização Github do projeto integrador: 

> _"Sistema para Identificação da Pinta Preta na Tangerina Ponkan, orientado por Visão Computacional"_ - AKA **VITA** _(Vision Intelligence for Tangerine Afflictions)_

Nossa equipe busca gerenciar a maior parte do desenvolvimento nesta organização, isso inclui código, documentação e divisão de tarefas.

A aceitação de contribuições está **restrita aos membros da organização**, mas qualquer pessoa pode visualizar e clonar nossos repositórios e projetos.

## Repositórios

Cada repositório guarda um componente importante do projeto, sendo acessíveis para qualquer membro.

- **vita-api**: Rest API em Express 
- **vita-database**: Bancos de dados MySQL e Redis 
- **vita-artifacts**: Diagramas, protótipos, imagens 
- **vita-paper**: Documentação acadêmica em LaTeX 
- **vita-app-web**: Aplicação web em React 
- **vita-app-mobile**: Aplicação mobile em React-Native 

## Projetos

Cada projeto representa um grupo de tarefas. Tarefas são criadas em forma de **Issues** do Github para um repositório específico. 

- **design**: Prototipação das interfaces web e mobile
- **paper**: Escrever e revisar LaTeX
- **back-end**: Desenvolver APIs e bancos de dados
- **front-end**: Desenvolver aplicações web e mobile

Cada issue é atribuída a 1 repositório e relacionada com 1+ membros. 

Provavelmente, **será criada uma branch remota** onde os membros irão resolver aquela tarefa.

## Guia de contribuição

_Ganhou uma nova issue? Recomendo seguir esse passo a passo._

1. Caso sua máquina não tenha uma cópia do repositório:

```
# baixa do github 
git clone <link do repositorio> 
```

2. Entre na branch correta:
```
# visualiza todas as branches remotas
git branch -r 

# troca de branch
git checkout <nome da branch> 

# visualiza sua branch atual
git branch 
```

3. Antes de mexer em qualquer coisa, atualize com as últimas mudanças:
```
# recomendo realizar esses 2 comandos na branch "main" e "dev" também

# baixa histórico remoto
git fetch 

# atualiza sua branch atual
git pull 

```

4. Depois de completar a tarefa, salve as alterações:

```
# verifica alterações
git status 

# prepara alteração para commit (staging)
git add <nome do arquivo ou pasta> 

# prepara todas as alterações feitas para commit
git add . 

# salva alteração com mensagem de texto
git commit -m "<mensagem do commit>" 
```

5. Quando tudo estiver salvo, envie para a mesma branch remota:
```
# envia histórico local para o Github
git push 
```

6. Ao completar a tarefa, abra uma Pull Request (PR) no Github:

- Em qualquer repositório, o Merge deve seguir a ordem: `<sua branch> → dev`
- Na descrição da PR, escreva um resumo do que foi feito

7. Aguarde a revisão da PR - ela poderá ser aceita (e seu trabalho será incluso na branch "dev") ou não (se houver erros ou pendências, será solicitado continuidade pelo chat do Github)

## Como escrever Issues e PRs 

Segue o padrão para escrita de Issues:

```
## Resumo 

Frase curta sobre o que precisa ser feito.

## Descrição 

Explicação detalhada sobre os componentes da tarefa:
- O que fazer
- Por que isso é importante
- Dicas
Seja específico e use checklists: faça o "passo a passo".
Se necessário, adicione links, anexos e códigos de exemplo.

## Relacionados

Marque com @ os membros relacionados à tarefa.

```

Segue o padrão para escrita de Pull Requests:

```
## Resumo 

Frase curta sobre o que você fez.

## Descrição 

Explicação detalhada sobre o seu código/documento:
- O que foi feito
- Como isso afeta o projeto
Seja específico e use listas.

Ao final, marque com @ o membro revisor.

```

## Prompt de contexto 

Cole o prompt abaixo antes de iniciar qualquer conversa de IA sobre o projeto. Ele deverá alimentar o chatbot com as principais informações que ela precisa saber antes de se aprofundar em uma dúvida específica.

```
## Identificação
 
- **Projeto:** Sistema para Identificação da Pinta Preta na Tangerina Ponkan, orientado por Visão Computacional
- **Sistema:** VITA (Vision Intelligence for Tangerine Afflictions)
- **Natureza:** Projeto acadêmico (não comercial)
## Objetivo principal
 
Identificar e monitorar infecções da doença Pinta Preta em pomares de tangerina Ponkan, combinando visão computacional, geolocalização e dados climáticos.
 
## Funcionalidades principais
 
1. Captura, tratamento e classificação de fotos dos frutos usando CNN
2. Mapa interativo com as áreas das infecções
3. Recomendação de práticas de manejo ideais, cruzando coordenadas geográficas com dados climáticos
## Stack tecnológica
 
- **Backend:** REST API, Node.js, Express.js, BullMQ, Redis
- **Banco de dados:** MySQL, Sequelize
- **Frontend web:** Next.js, React
- **Mobile:** React Native, Expo
- **IA/ML:** RNAs, CNNs, Python, FastAPI
- **Design:** Figma
- **Dados externos:** Geolocalização, dados climáticos
## Escopo de conteúdo do projeto
 
O projeto abrange, além do software:
- Software web e mobile
- Diagramas UML e de rede
- Modelagens de banco de dados
- Artigo acadêmico
- Landing page da equipe
- Modelo de negócios
## Plataformas e ferramentas de trabalho
 
Git, GitHub, MySQL Workbench, VS Code, Laragon, Ubuntu, Redis Insight
 
## Regras de condução da conversa
 
- **Não gerar código pronto**, a menos que seja pedido explicitamente. O uso da IA é para aprender a programar de forma limpa, escalável e segura, com base em técnicas profissionais.
- **Priorizar aprofundamento teórico**: usar perguntas para identificar lacunas de conhecimento antes de fechar uma solução.
- **Contexto acadêmico, não comercial**: recomendar técnicas profissionais, mas adequadas ao escopo e aos recursos de um projeto de fim de curso.
- **Idioma:** responder sempre em português brasileiro.
- **Assunções:** se faltarem detalhes ou houver dúvida sobre versões/atualizações mais recentes de alguma tecnologia, perguntar antes de assumir.
```