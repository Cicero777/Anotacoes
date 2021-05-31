import React, { useState } from 'react';
import { AiTwotoneDelete, AiOutlineExclamationCircle } from "react-icons/ai";

import './style.css'
import './style-priority.css'
import api from '../../servicos/api'; 

function Anotacoes({ data, handleDelete, mudarPrioridade }){

   const [ mudarAnotacao, setMudarAnotacao ] = useState('')

   function handleEdit(e, priority){
      e.style.cursor = 'text';
      e.style.borderRadius = '5px';
   
      if(priority){
         e.style.boxShadow = '0 0 5px white';
      }else{
         e.style.boxShadow = '0 0 5px gray';
      }
   }

   async function salvarMudanca(e, anotacao){
      e.style.cursor = 'default';
      e.style.boxShadow = 'none';
      if( mudarAnotacao && mudarAnotacao != anotacao){
         await api.post('/conteudos/'+data._id,{
            anotacao: mudarAnotacao,
         });
      }
   }

   return(
      <>
         <li className={data.prioridade ? "info_bloco_notas-priority" : "info_bloco_notas"}>
            <div>
               <strong>{data.titulo}</strong>
               <div>
                  <AiTwotoneDelete 
                     size="20"
                     onClick={() => handleDelete(data._id)}
                  />
               </div>
            </div>
            <textarea 
               defaultValue={data.anotacao}
               onClick={e => handleEdit(e.target, data.priority)}
               onChange={e => setMudarAnotacao(e.target.value)}
               onBlur={e => salvarMudanca(e.target, data.anotacao)}
            />
            <span>
               <AiOutlineExclamationCircle 
                  size="20"
                  onClick={() => mudarPrioridade(data._id)}
               />

            </span>   
         </li>
      </>
   )

}

export default Anotacoes; 