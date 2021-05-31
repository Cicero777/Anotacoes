const { request, response } = require('express')
const anotacoes = require('../modelos/anotacoes_data')


module.exports = {

   async read(request, response) {
      const anotacao_lista = await anotacoes.find();
      return response.json(anotacao_lista);
   },

   async criacao(request, response) {
      const {titulo, anotacao, prioridade} = request.body;
      
      if(!titulo || !anotacao){
         return response.status(400).json({ error: "Necessário um título/anotação!"})
      }

      const criador_anotacao = await anotacoes.create({
         titulo,
         anotacao,
         prioridade
      });
      return response.json(criador_anotacao);
   },

   async deletar(request, response) {
      const { id } = request.params;

      const deletar_anotacao = await anotacoes.findOneAndDelete({ _id : id});

      if(deletar_anotacao){
         return response.json(deletar_anotacao)
      }

      return response.status(400).json({ error: "Não foi encontrado o registro para deletar!"})
   }
}