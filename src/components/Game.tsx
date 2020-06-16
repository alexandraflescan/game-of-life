 import React, {useState} from 'react';

function Game(){

const initiateTable = () => {
    const tableSize = 50;
    let table = [];
    
    for (let i = 0; i < tableSize; i ++ ){
        let columns = [];
        for (let j = 0; j < tableSize; j ++ ){    
            columns.push(
                {
                alive: Math.floor(Math.random() * 2),
                neighbours: {
                    upLeft: null,
                    upRight: null,
                    upMiddle: null,
                    left: null,
                    right: null,
                    downLeft: null,
                    downRight: null,
                    downMiddle: null
                    }, 
                key: j + 'unique'
               }
            )
        }
          
        table.push(columns) 
            
    }
    return table;

}

const wholeTable = initiateTable();
const [columnState, setColumnState] = useState(wholeTable as any);
   


const cellClickHandler = () => {
    console.log('clicked')
}


const createTable = (columnState: any) => {
    let domTable =[];
for (let i = 0; i <= columnState.length; i ++ ){
    let tableColumns = [];
    for (let j = 0; j < columnState.length; j++) {
        tableColumns.push(<td onClick={cellClickHandler} key={columnState[j].key}></td>);
     }
     domTable.push(<tr>{tableColumns}</tr>);
}
return domTable;
}

const currentTable = createTable(columnState);

    return (<div className="game-container">
             <table>{currentTable}</table>             
        </div>
    );
}


export default Game;
