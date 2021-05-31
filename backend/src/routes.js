const express = require('express');
const routes = express.Router();

const anotacao_controle = require('./controles/anotacao_controle');
const prioridade_controle = require('./controles/prioridade_controle');
const conteudo_controle = require('./controles/conteudo_controle');

//Rota anotaçôes
routes.post('/anotacoes', anotacao_controle.criacao);
routes.get('/anotacoes', anotacao_controle.read);
routes.delete('/anotacoes/:id', anotacao_controle.deletar);

//Rota prioridades
routes.get('/prioridades', prioridade_controle.read);
routes.post('/prioridades/:id', prioridade_controle.update);

//Rota conteúdo
routes.post('/conteudos/:id', conteudo_controle.update);

module.exports = routes;