const mongoose = require('mongoose');

const anotacoes_data_esquema = new mongoose.Schema({
   titulo: String,
   anotacao: String,
   prioridade: Boolean
});

module.exports = mongoose.model('Anotacoes', anotacoes_data_esquema);
