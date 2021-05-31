const anotacoes = require('../modelos/anotacoes_data');


module.exports = {
   async read (request, response){
      const prioridade = request.query;
      
      const prioridade_notas = await anotacoes.find(prioridade);
   
      return response.json(prioridade_notas);
   },

   async update(request, response){
      const { id } = request.params;

      const anotacao = await anotacoes.findOne({ _id : id});

      if(anotacao.prioridade){
         anotacao.prioridade = false;
      }else{
         anotacao.prioridade = true;
      }

      await anotacao.save();

      return response.json(anotacao);
   }

}