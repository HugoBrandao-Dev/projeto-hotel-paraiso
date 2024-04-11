# Projeto Pokemon

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Descrição
Projeto de __portifólio__, criado com base em outro projeto de front-end, desenvolvido no curso de 
__Flexbox__ da plataforma [Node Studio Treinamentos](https://www.nodestudio.com.br/).

[Projeto front-end original](https://github.com/HugoBrandao-Dev/flexbox-node-studios/tree/master/projeto)

## Objetivo 
Tem por finalidade testar minhas habilidades com as tecnologias mais avançadas de desenvolvimento __FRONT-END__, como Vue.js, Bulma e etc.
Além disso, contará com o __BACK-END__ (API), que será desenvolvido.

## Tecnologias

### Framework(s)
* Vue JS 2: Framework JavaScript, usado desde o projeto base;
* Bulma: Framework CSS para facilitar na estilização dos novos elementos da página.

### API(s) e Webservice(s)
* [Country State City](https://countrystatecity.in/): __API__ para a listagem de países, seus estados e suas cidades;
* [ViaCEP](https://viacep.com.br/): __Webservice__ para busca de informações de endereços (bairro, rua, DDD, etc.) dentro do Brasil, a partir do CEP.

### Outra(s)
* Vue-router: Ferramenta para criação de rotas para as seções do site;
* Vue-imask: Pacote para utilização de máscaras nos campos do input;
* Axios: Cliente HTTP, para consumo de API, como a do IBGE, que permite fazer buscas por endereços (através do CEP), UFs e etc;
* ValidatorJS: Biblioteca para validação dos campos dos formulários e filtros de buscas.

## Observações

## Bugs

## Possíveis melhorias futuras
### Linguagem
* Exportar/enviar a linguagem do navegador para o BACK-END, para que hajam verificações dos campos dos formulários corretamente.

### Usuários, Apartamento e Reservas
* Colocar opções de compartilhamento da página da reserva que o usuário está visualizando;
* Colocar uma máscara dinâmica para o número de telefone;
* Criar modals de sucesso na criação, atualização e deleção onde faltam;
* Calcular quantos dias existem entre o início e o fim da reserva.

### Estado/Cidade
* Implementar métodos de validação do estado e da cidade, no componente/formulário de cadastro de um novo cliente.

### Telefone
* Implementar método de validação do telefone, no componente/formulário de cadastro de um novo cliente.