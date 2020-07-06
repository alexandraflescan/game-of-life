import * as React from 'react';
import '../App.css';

function Cell(props:any){
    return(
<td className={`cell ${props.status ? 'alive' : ''}`  }
key={props.thisKey} 
onClick={props.clickMe}></td>
    )
 
}

export default Cell