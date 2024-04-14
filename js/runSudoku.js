function createBoard(table, currentPuzzle){
    //creates the initial board
    for (var i = 0; i < 9; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < 9; j++) {
            var name = "SudokuField" + i + j;
            var button = document.createElement('button');
            button.id = name;
            button.className = "sudokuButton";
            button.textContent = currentPuzzle[i][j] === "." ?  "?" : currentPuzzle[i][j];
            //Only add a button to change, if it was not set at the beginning
            if (button.textContent==="?"){
                button.style.background = '#ADD8E6';
                button.onclick = function() {
                    updateSudokuNumber(this);
                };
            }
            row.appendChild(button);
        }
        table.appendChild(row);
    }

}

function updateSudokuNumber(button){
    //switch case to update the button content on click.
    switch (button.textContent){
        case '?':
            button.textContent="1";
            break;
        case '9':
            button.textContent="?";
            break;
        default:
            button.textContent= parseInt(button.textContent) + 1;
    }
    let temp1 = button.id[11]
    let temp2 = button.id[12]
    //update the puzzle to . if the button is " " or the number
    currentPuzzle[temp1][temp2]=button.textContent==='?'? "." : button.textContent;
    console.log(currentPuzzle);
}


// Function that is run, when the check solution button is pressed.
function checkSolution(gridToCheck, currentPuzzle){
    let checking = sudoku.board_grid_to_string(gridToCheck);
    console.log('checking');
    document.getElementById('checkMessage').style.display = 'flex';
    if (checking===currentPuzzleSolution) {
        document.getElementById('checkMessage').textContent = 'Winner!';
    } else {
        document.getElementById('checkMessage').textContent = 'Try harder!';
    }

}



 