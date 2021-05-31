
import React, {useState, useEffect} from "react";

//    Conceitos

// Componente
// Propriedade
// Estado

import api from './servicos/api'

import './app.css'
import './global.css'
import './barra_lateral.css'
import './main.css'

import Anotacoes from './componentes/anotacoes'
import Botao_radio from "./componentes/botao_radio";

function App() {

  const [valorSelecionado, setValorSelecionado] = useState('all')
  const [titulo, setTitulos] = useState('')
  const [anotacao, setAnotacao] = useState('')
  const [todasAnotacoes, setTodasAnotacoes] = useState([])

  useEffect(() => {
    getTodasAnotacoes();  
  }, [])

  async function getTodasAnotacoes(){
    const response = await api.get('/anotacoes');
    setTodasAnotacoes(response.data)
  }
  
  async function carregarAnotacoes(opcao){
    const params = {prioridade: opcao};
    const response = await api.get('/prioridades', {params});
    if(response){
      setTodasAnotacoes(response.data);
    }
  }

  function handleChange(e){
    setValorSelecionado(e.value);
    if(e.checked && e.value != 'all'){
      carregarAnotacoes(e.value);
    }else{
      getTodasAnotacoes();
    }
  }

  async function handleDelete(id){
    const anotacaoDeletada = await api.delete('/anotacoes/'+id)
    
    if(anotacaoDeletada){
      setTodasAnotacoes(todasAnotacoes.filter(anotacao => anotacao._id != id));
    }
  
  }

  async function mudarPrioridade(id){
    const anotacao = await api.post('/prioridades/'+id);
    if(anotacao && valorSelecionado != 'all'){
      carregarAnotacoes(valorSelecionado);
      
    }else if(anotacao){
      getTodasAnotacoes();
    }
  }

  async function handleSubmit(e){
    e.preventDefault();

    const response = await api.post('/anotacoes', {
      titulo,
      anotacao,
      prioridade: false
    })

    setTitulos('')
    setAnotacao('')

    if(valorSelecionado != 'all'){
      getTodasAnotacoes();
    }else{
      setTodasAnotacoes([... todasAnotacoes, response.data]);
    }
    setValorSelecionado('all')
  }

  //mudar a cor do botão salvar
  useEffect(() => {
    function enableSubmitButton(){
      let btn = document.getElementById('btn_submit')
      btn.style.background = 'lightblue'
      if(titulo && anotacao){
        btn.style.background = "blue"
      } 
    }
    enableSubmitButton()
  }, [titulo, anotacao])

  return (
    <div id="app">
    
      <aside>
        <strong>Caderno de notas</strong>

        <form onSubmit={handleSubmit}>

          <div className='input-block'>
            <label htmlFor='title'>Título da anotação</label>
            <input 
              required
              maxLength='30'
              value = {titulo}
              onChange = {e => setTitulos(e.target.value)}
            />
          </div>

          <div className='input-block'>
            <label htmlFor='nota'>Anotações</label>
            <textarea
              required
              value = {anotacao}
              onChange = {e => setAnotacao(e.target.value)}
            />
          </div>

          <button id="btn_submit" type="submit">Salvar</button>
        </form>
        < Botao_radio 
          valorSelecionado={valorSelecionado}
          handleChange={handleChange}
        />
      </aside>

      <main>
        <ul>
          {todasAnotacoes.map(data =>(
            <Anotacoes 
              data={data}
              handleDelete={handleDelete}
              mudarPrioridade={mudarPrioridade}
            />

          ))}
          
        </ul>
      </main>
    
    </div>
  );
}

export default App;
