 import React, {useState} from 'react';
 import Cell from './Cell'
 import '../App.css'


 const tableSize = 10;
function Game(){
const initiateTable = (tableSize: any) => {

    let table = [];
    let keyCounter = 0;
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
                id: keyCounter ++
               }
            )
        }
          
        table.push(columns) 
            
    }
   
    return table;

}

const wholeTable = initiateTable(tableSize);

const [columnState, setColumnState] = useState(wholeTable as any);


const getNeighbours = (elementClicked:any,  row:any, column: any, tableSize: any) => {
    console.log(elementClicked)
    let neighbours = {};

//populate neighbours
if (row === 0 && column === 0) {
    neighbours = { 
        right: columnState[row][column+1],   
        downRight: columnState[row+1][column+1],
        downMiddle: columnState[row+1][column],
        }
} 
else if (row === 0 && column == tableSize - 1){
 neighbours = { 
    left: columnState[row][column-1],  
    downLeft: columnState[row+1][column-1],
    downMiddle: columnState[row+1][column],
    } 
}
    else if (row === tableSize -1 && column === 0){
        neighbours = {           
            upRight: columnState[row-1][column+1],
            upMiddle: columnState[row-1][column],
            right: columnState[row][column+1],
            }
    }
    else if (row == tableSize - 1 && column == tableSize -1 ){
        neighbours = { 
            upLeft: columnState[row-1][column-1],           
            upMiddle: columnState[row-1][column],
            left: columnState[row][column-1],
            }
        }
        else if(row == 0 && (column !== 0 || column !== tableSize -1)){
            neighbours = { 
                left: columnState[row][column-1],
                right: columnState[row][column+1],
                downLeft: columnState[row+1][column-1],
                downRight: columnState[row+1][column+1],
                downMiddle: columnState[row+1][column],
                }
            }
            else if(row == tableSize  - 1&& (column !== 0 || column !== tableSize -1)){
                neighbours = { 
                upLeft: columnState[row-1][column-1],
                upRight: columnState[row-1][column+1],
                upMiddle: columnState[row-1][column],
                left: columnState[row][column-1],
                right: columnState[row][column+1]
                }
            }
     else {
        neighbours = { 
            upLeft: columnState[row-1][column-1],
            upRight: columnState[row-1][column+1],
            upMiddle: columnState[row-1][column],
            left: columnState[row][column-1],
            right: columnState[row][column+1],
            downLeft: columnState[row+1][column-1],
            downRight: columnState[row+1][column+1],
            downMiddle: columnState[row+1][column],
            }
        }

//update table
let newTable = [...columnState];
newTable[row][column] = {
    ...columnState[row][column],
    neighbours: neighbours
}
    setColumnState(
        newTable 
    )
  
//set rules
function checkNeighbours(elementClicked :any) {
    
    const isAlive = (elementClicked:any) => {
        if (elementClicked.alive === 1) return true;
        return false;
    }
    let alive = 0;
    let lifeStatus = elementClicked.alive;

    const thisNeighbours =  Object.values(neighbours)
    thisNeighbours.forEach(function(arrayItem: any) {
        if (arrayItem.alive === 1) alive ++

    })

        // FOR ALIVE CELL
        if (isAlive(lifeStatus)) {
        // if aliveNeighbours < 2 => kill cell
        if(alive < 2){
            lifeStatus = 0;
        }
        // if aliveNeighbours 2/3 survive 
        else if (alive === 2 || alive === 3){
            lifeStatus = lifeStatus;
        }
        // if aliveNeighbours > 3 dead
        else if(alive > 3){
            lifeStatus = 0;
        }
    }
         // FOR DEAD CELL
     
      else{
             // if aliveNeighbours === 3 => cell becomes alive
          if (alive === 3) {
            lifeStatus = 1;
          }
      }
      
        
       return lifeStatus;
      
}
checkNeighbours(elementClicked)

 

}
//method to trigger change




const createTable = (columnState: any) => {
    let domTable =[];
    
for (let i = 0; i < columnState.length; i++ ){
    let tableColumns = [];
    for (let j = 0; j < columnState.length; j++) {
        tableColumns.push(<Cell 
            clickMe={() =>  getNeighbours(columnState[i][j], i, j, tableSize)} 
            status = {columnState[i][j].alive}
            thisKey={columnState[i][j].id}>
            </Cell>);
     }
     domTable.push(<tr>{tableColumns}</tr>);
}

return domTable;
}

const currentTable = createTable(columnState);

    return (<div className="game-container">
             <table><tbody>{currentTable}</tbody></table>             
        </div>
    );
}


export default Game;
