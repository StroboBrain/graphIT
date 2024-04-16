
var difficulty = "easy";
var currentPuzzleSolution;
var currentPuzzle = newPuzzle();


//is called when a difficulty button is pressed
function updateDifficulty(difficultyLevel){
    difficulty = difficultyLevel;
    console.log("difficulty set to", difficulty);
    newPuzzle();
    createTable();
    
}

//generates a new puzzle with the current difficulty
function newPuzzle(){
    currentPuzzle = sudoku.generate(difficulty);
    currentPuzzleSolution = sudoku.solve(currentPuzzle);
    console.log(currentPuzzle);
    currentPuzzle = sudoku.board_string_to_grid(currentPuzzle);
    return currentPuzzle;
}

//resets the table and loads it with a new Sudoku
function createTable(){
    table = document.getElementById('sudokuTable');
    table.innerHTML = '';
    createBoard(currentPuzzle,table);
    
}

function createBoard(puzzle, table){
    //filles the table with the right buttons
   
    for (var i = 0; i < 9; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < 9; j++) {
            var name = "SudokuField" + i + j;
            var button = document.createElement('button');
            button.id = name;
            button.className = "sudokuButton";
            button.textContent = puzzle[i][j] === "." ?  "?" : puzzle[i][j];
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

//this function is called when a button is pressed in the sudoku
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
    document.getElementById('checkFeedBack').style.display = 'flex';
    if (checking===currentPuzzleSolution) {
        document.getElementById('checkFeedBack').innerHTML = "Winner!";
    } else {
        document.getElementById('checkFeedBack').innerHTML = "Try harder!";
    }

}






 