
var sudoku = [];//main guy

var numbers = ['1','2','3','4','5','6','7','8','9'];
var rowsHash = [];
var columnsHash = [];
var boxesHash = [];
var solved = false;
var count = 0;
function initializeHash()
{
    for(let i=0;i<9;i++)
    {
        let rowHash = [];
        let columnHash = [];
        let boxHash = [];
        for(let j=0;j<9;j++)
        {
            rowHash[numbers[j]] = false;
            columnHash[numbers[j]] = false;
            boxHash[numbers[j]] = false;
        }
        rowHash[0] = 0;
        columnHash[0] = 0;
        boxHash[0] = 0;
        rowsHash[i] = rowHash;
        columnsHash[i] = columnHash;
        boxesHash[i] = boxHash;
    }
}


//function that solves and returns the solved sudoku
function sudokuSolver()
{
    let maxR = -1;
    let maxC = -1;
    let maxFilled = -1;
    for(let r=0;r<9;r++)
    {
        for(let c=0;c<9;c++)
        {
            if(sudoku[r][c] == '0')//cell is unoccupied
            {
                let b = parseInt(Math.floor(r/3)*3 + Math.floor(c/3));
                let nR = rowsHash[r][0];
                let nC = columnsHash[c][0];
                let nB = boxesHash[b][0];
                if(maxFilled < (nR+nC+nB))
                {
                    maxFilled = parseInt(nR+nC+nB);
                    maxR = r;
                    maxC = c;
                }
            }
        }
    }
    if(maxFilled == -1)
        return true;
    let maxB = parseInt(Math.floor(maxR/3)*3 + Math.floor(maxC/3));
    for(let k=1;k<=9;k++)
    {
        if(rowsHash[maxR][k] || columnsHash[maxC][k] || boxesHash[maxB][k])//check validity of insertion
            continue;
                    
        sudoku[maxR][maxC] = k.toString();
        count++;
        rowsHash[maxR][k] = columnsHash[maxC][k] = boxesHash[maxB][k] = true;
        rowsHash[maxR][0]++;
        columnsHash[maxC][0]++;
        boxesHash[maxB][0]++;
        //document.getElementById((r+1).toString() + (c+1).toString()).innerHTML = k;
        //await new Promise(res => { setTimeout(res, 1000); });
        if(sudokuSolver()) 
            return true;
                    
        rowsHash[maxR][k] = columnsHash[maxC][k] = boxesHash[maxB][k] = false;
        rowsHash[maxR][0]--;
        columnsHash[maxC][0]--;
        boxesHash[maxB][0]--;

        sudoku[maxR][maxC] = '0';   
    }
             
    return false;
}


//functions that deals with the html
function takeInput(event)
{
    let inputsList = ['0','1','2','3','4','5','6','7','8','9']
    if(!solved)
    {
        let element = event.target;
        element.style.backgroundColor = 'rgb(226, 128, 89)';
        element.style.color = "white";
        let value = parseInt(element.value);
        value = (value+1)%10;
        // console.log(value)
        if(value != 0)    
            element.innerHTML = inputsList[value];

        else
            {
                let idDigits = event.target.id.split('');
                let r = parseInt(idDigits[0]) - 1;
                let c = parseInt(idDigits[1]) - 1;
                let b = parseInt(Math.floor(r/3)*3 + Math.floor(c/3));
                if(b & 1 == 1)
                    element.style.backgroundColor = '#90dcff';
                else    
                    element.style.backgroundColor = 'white';
                
                element.style.color = "#0091EA";
                element.innerHTML = '';
            }

        element.value = value;
    }
}
function solveSudoku()
{
    initializeHash();
    for(let i=1;i<=9;i++)
    {
        let sudokuRow = [];
        let rowElem = document.getElementById("row" + i);
        let inputs = rowElem.getElementsByTagName("button");
        for(let j=0;j<9;j++)
        {
            let value = inputs[j].value;
            if(value == '0')
                sudokuRow[j] = '0';
            else    
            {
                let b = parseInt(Math.floor((i-1)/3)*3 + Math.floor(j/3));
                // console.log("B: "+b);
                sudokuRow[j] = value;
                if(!(rowsHash[i-1][value]||columnsHash[j][value]||boxesHash[b][value]))
                {
                    inputs[j].style.backgroundColor = 'rgb(226, 128, 89)';
                    rowsHash[i-1][value] = true;
                    rowsHash[i-1][0]++;
                    columnsHash[j][value] = true;
                    columnsHash[j][0]++;
                    boxesHash[b][value] = true;
                    boxesHash[b][0]++;
                }                    
                else 
                {
                    inputs[j].style.backgroundColor = "rgb(209, 86, 86)";
                    inputs[j].style.color = "white";
                    displayError();
                    return;
                }
               
            }
        }
        sudoku[i-1] = sudokuRow;
    }
    displaySolution();
}
function displayError()
{
    let errorMessage = document.createElement("div")

    errorMessage.setAttribute("id","errorDialog")

    errorMessage.innerHTML = `<span>ENTER VALID INPUTS</span>
            <button class="errorDialogButton" onclick="removeErrorMessage()">OKAY</button>`

    document.getElementsByTagName("body")[0].appendChild(errorMessage);
}

async function removeErrorMessage()
{
    //await sleep(200);
    let errorMessage = document.getElementById("errorDialog");
    errorMessage.remove();
}

var timer;
var i = 1;
var j = 0;

function displaySolution()
{
    var startTime = performance.now()            
    if(sudokuSolver())    
        timer = setInterval(solutionFiller,100);
    var endTime = performance.now()

    document.getElementById("solveButton").removeAttribute("onclick");
    document.getElementById("solveButton").innerHTML = `Execution took ${endTime - startTime} milliseconds`
    solved = true;
}

function solutionFiller()
{
    if(i>9)
    {
        console.log("timeout cleared");
        clearTimeout(timer);
        return;
    }

    let rowElem = document.getElementById("row" + i);
    let outputs = rowElem.getElementsByTagName("button");

    outputs[j].value = sudoku[i-1][j];
    outputs[j].innerHTML = sudoku[i-1][j];
    outputs[j].removeAttribute("onclick");

    j++;
    i = i + Math.floor(j/9);
    j = j%9;
}







// OLD LOGIC

// function sudokuSolver()
// {
//     let maxR = -1;
//     let maxC = -1;
//     let maxFilled = 0;
//     for(let r=0;r<9;r++)
//     {
//         for(let c=0;c<9;c++)
//         {
//             if(sudoku[r][c] == '0')//cell is unoccupied
//             {
//                 let b = parseInt(Math.floor(r/3)*3 + Math.floor(c/3));
//                 for(let k=1;k<=9;k++)
//                 {
//                     if(rowsHash[r][k] || columnsHash[c][k] || boxesHash[b][k])//check validity of insertion
//                         continue;
                    
//                     sudoku[r][c] = k.toString();
//                     rowsHash[r][k] = columnsHash[c][k] = boxesHash[b][k] = true;
//                     rowsHash[r][0]++;
//                     columnsHash[c][0]++;
//                     boxesHash[b][0]++;
//                     //document.getElementById((r+1).toString() + (c+1).toString()).innerHTML = k;
//                     //await new Promise(res => { setTimeout(res, 1000); });
//                     if(sudokuSolver()) 
//                         return true;
                    
//                     rowsHash[r][k] = columnsHash[c][k] = boxesHash[b][k] = false;
//                     rowsHash[r][0]--;
//                     columnsHash[c][0]--;
//                     boxesHash[b][0]--;
//                 }
//                 sudoku[r][c] = '0';                
//                 return false;
//             }
//         }
//     }
//     return true;
// }