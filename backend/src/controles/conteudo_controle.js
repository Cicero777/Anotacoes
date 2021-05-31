const Anotacoes = require('../modelos/anotacoes_data');


module.exports = {
   async update(request, response){
      const { id } = request.params;
      const { anotacao } = request.body;
   
      const anotacoes = await Anotacoes.findOne({ _id : id });

      if (anotacao){
         anotacoes.anotacao = anotacao;
         await anotacoes.save();
      }

      return response.json(anotacoes);
   }
}