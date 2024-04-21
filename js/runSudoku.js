
/**
     *To run this class, the sudoku.js libary is needed, because it is old, it has no exports
     */


     /**
      * the SudokuMain class holds a Puzzle and SudokuTable object. Where the Puzzle holds the numbers of a sudoku and the SudokuTable the html representation.
      */
class SudokuMain {
    constructor(){
        this.puzzle = new Puzzle("easy");
        this.sudokuTable = new SudokuTable(this.puzzle);
    }
    // Function that is run, when the check solution button is pressed.
    checkSolution(){
        this.checkUserNumbers();
        let feedback = "please try harder";1
        if (this.isSolved()){
            feedback = "we have a winner";
        }
        this.changeCheckFeedBack(feedback);
    }

    isSolved(){
        return this.puzzle.isSolved();
    }

    changeCheckFeedBack(feedback){
        let feedbackBox = document.getElementById('checkFeedBack');
        feedbackBox.innerHTML = feedback;
        feedbackBox.style.display = 'flex';

    }

        // checks all the number and colors the button accordingly. Removes the pressable function if it is correct.
        /*
        * generates a new puzzle with the current difficulty
        * @precondition: difficultyLevel is a valid difficulty
        * @postcondition: puzzle and solutions will be updated
        * @param {*} difficultyLevel 
         * @returns currentPuzzle object
        */
        

        checkUserNumbers(){
            let buttonToCheck = document.getElementsByClassName('sudokuButtonPressable');
            for(let i = 0; i < buttonToCheck.length; i++){
                let button = buttonToCheck[i];
                let check = this.puzzle.getSolutionAsGrid();
                //button.id[11] is the x axis an 12 is the y axis, because Button.id = SudokuFieldxy
                if (check[button.id[11]][button.id[12]] === button.textContent){
                    button.style.backgroundColor = 'green'; //set the background to green
                    button.onclick = null; // button can't be pressed anymore
                } else {
                    if (button.textContent!=='?'){
                        button.style.backgroundColor = 'red'; // red if you made a mistake
                    }        
                }
            }
        }

        getSudokuTable(){
            return this.sudokuTable.getSudokuHTMLTable();
            
        }

        updateDifficulty(difficultyLevel){
            this.puzzle = newPuzzle(difficultyLevel);
            this.sudokuTable = new SudokuTable(this.puzzle);
        }

         //this function is called when a button is pressed in the sudoku
         updateSudokuNumber(button){
            //switch case to update the button content on click.
            switch (button.textContent){
                case '?':
                    button.textContent="1";
                    break;
                case '9':
                    button.textContent="?";
                    break;
                default:
                    console.assert(button.textContent>=1&&button.textContent<=8);
                    button.textContent= parseInt(button.textContent) + 1;
            }
            let xAxis = button.id[11];
            let yAxis = button.id[12];
            this.puzzle.changeNumberCurrentPuzzle(xAxis,yAxis,button.textContent);
        
    }


    


}
/**
     * The puzzle object holds the current values for the sudoku, difficulty and solution
     * Initialize all the variable in the constructor to give a better overview
     */
class Puzzle {
    constructor(difficultyLevel){
        this.difficulty = difficultyLevel;
        this.currentPuzzleAsString;
        this.currentPuzzleAsGrid;
        this.currentPuzzleAsString;
        this.currentPuzzleSolutionAsGrid;
        this.currentPuzzleSolutionAsString;
        this.updatePuzzle(difficultyLevel);
        console.log(this);
    }

    /**
     * generates a new puzzle with the current difficulty
     * @precondition: difficultyLevel is a valid difficulty
     * @postcondition: puzzle and solutions will be updated
     * @param {*} difficultyLevel 
     * @returns currentPuzzle object
     */

    updatePuzzle(difficultyLevel){
        this.currentPuzzleAsString = sudoku.generate(difficultyLevel);
        this.currentPuzzleAsGrid = sudoku.board_string_to_grid(this.currentPuzzleAsString);
        this.currentPuzzleSolutionAsString = sudoku.solve(sudoku.board_grid_to_string(this.currentPuzzleAsGrid));
        this.currentPuzzleSolutionAsGrid = sudoku.board_string_to_grid(this.currentPuzzleSolutionAsString);
    }


    getSolutionAsGrid(){
        return this.currentPuzzleSolutionAsGrid;
    }
    getSolutionAsString(){
        return this.currentPuzzleSolutionAsGrid;
    }
    getCurrentPuzzleAsGrid(){
        return this.currentPuzzleAsGrid;
    }
    getCurrentPuzzleAsString(){
        return this.currentPuzzleAsString;
    }
    /**
     * @precondition: only gets passed valid squares and numbers 1-9 or a "?"
     * @postcondition: puzzle and solutions will be updated
     * 
     * @param {int 0-8} x Axis 
     * @param {int 0-8} y Axis
     * @param {int 1-9 or ?} number 
     */
    changeNumberCurrentPuzzle(x,y,number){
        this.currentPuzzleAsGrid[x][y] = number==="?"? "." : number;
        this.currentPuzzleAsString = sudoku.board_grid_to_string(this.currentPuzzleAsGrid);
        console.log(this.currentPuzzleAsGrid);

    }

    isSolved(){
        return this.currentPuzzleAsString===this.currentPuzzleSolutionAsString;
    }


}


   




class SudokuTable{
    constructor(Puzzle){
        this.table = document.createElement('table');
        this.createBoard(Puzzle, this.table);
    }

    createBoard(Puzzle, table){
        table.innerHTML = ''; //We always want to reset the table
        let puzzleValues = Puzzle.getCurrentPuzzleAsGrid();
        //filles the table with the coresponding buttons
        for (var i = 0; i < 9; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < 9; j++) {
                var name = "SudokuField" + i + j;
                var button = document.createElement('button');
                button.id = name;
                button.classList.add("sudokuButton");
                // sudoku.js libary uses a . for an empty square, replace it with a ?
                button.textContent = puzzleValues[i][j] === "." ?  "?" : puzzleValues[i][j];
                //Only add a button to change, if it was not set at the beginning
                if (button.textContent==="?"){
                    button.classList.add("sudokuButtonPressable");
                    button.style.background = '#ADD8E6';
                    button.onclick = function() {
                        sudokuObject.updateSudokuNumber(this);
                    };
                }
                row.appendChild(button);
            }
            table.appendChild(row);
        }
    }

  

    //get the coordinates of a button by extractin the information form the id
    xCoordinates (button){
        return button.id[11];
    }
    yCoordinates(button){
        return button.id[12];
    }

    getSudokuHTMLTable(){
        return this.table;
    }
}


//create a puzzle object, well be refactored in a different class in the futur
var sudokuObject = new SudokuMain();
function updateDifficulty(difficultyLevel){
    sudokuObject.updateDifficulty(difficultyLevel);
    console.log("updated Difficulty to",difficultyLevel);
}










 