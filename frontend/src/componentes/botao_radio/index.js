import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

import './styles.css'

function Botao_radio({ valorSelecionado, handleChange}){

   const CustomRadio  = withStyles({
      root: {
         color: 'lightblue', '&$checked': {color: 'blue',},
      },
      checked: {},
   })((props) => <Radio color="default" { ... props} />);

   return (
   <>
      <div className="radioOpcoes">
         <div>
            <CustomRadio 
               checked={valorSelecionado == 'all'}
               onChange={e => handleChange(e.target)}
               value="all"
            />
            <spam>Todos</spam>
         </div>
      
         <div>
            <CustomRadio 
               checked={valorSelecionado == 'true'}
               onChange={e => handleChange(e.target)}
               value="true"
            />
            <spam>Prioridade</spam>
         </div>

         <div>
            <CustomRadio 
               checked={valorSelecionado == 'false'}
               onChange={e => handleChange(e.target)}
               value="false"
            />
            <spam>Normal</spam>
         </div>
      </div>
   </>
   )
}

export default Botao_radio;
