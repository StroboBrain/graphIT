class Modeler {
    /**
     * @constructor
     * @param {number} maxValue Maximal value of a single number in the equation
     */
    constructor(maxValue) {
        if (maxValue === undefined) {
            maxValue = 100;
        }
        this.maxValue = maxValue;

        // operators that can be used
        this.operators = ["+", "-"];

        // the puzzle to solve
        this.puzzle = new Array();
    }
    
    /**
     * This function creates an array containing a formula.
     * @param {number} [amountOfNumbers=3] The amount of numbers the formula should be constructed of
     * @returns {array} An array containing the formula - each number and operator as a single string in the array.
     * @example
     * // Returns ["3", "+", "4", "-"", "5", "+"", "9"]
     * createFormula(4);
     */
    createFormula(amountOfNumbers) {
        if (amountOfNumbers === undefined) {
            amountOfNumbers = 3
        }
        const formula = new Array();

        // Fill resulting array with numbers and operators
        for (let i = 0; i < amountOfNumbers - 1; i++) {
            formula.push(this.getRandomNumber());
            formula.push(this.getRandomOperator());
          }
        formula.push(this.getRandomNumber());
        console.log(this.getRandomOperator());
        return formula;
    }

    /**
     * This function creates a random number between 0 and maxValue
     * @returns {string} The random number converted to a string
     */
    getRandomNumber() {
        return Math.floor(Math.random() * this.maxValue).toString();
    }

    /**
     * This function a random operator defined in the array operators
     * @returns {string} a random operator
     */
    getRandomOperator() {
        return this.operators[Math.floor(Math.random() * this.operators.length)];
    }

    /**
     * This function creates a string out of an array containing a formula.
     * @param {array} arr An array conatining a formula
     * @returns {string} The formula as string
     * @example
     * // Returns "3 + 4 - 5 + 9"
     * formulaToString(["3", "+", "4", "-"", "5", "+"", "9"]);
     */
    formulaToString(arr) {
        let forumlaString = "";
        for (let i = 0; i < arr.length; i++) {
            forumlaString += arr[i] + " ";
        }
        return forumlaString;
    }

    /**
     * this function calculates the result of a formula
     * @param {array} formula An array containing the formula
     * @returns {number} The solution to the formula
     * @example
     * // Returns 11
     * solveFormula(["3", "+", "4", "-"", "5", "+"", "9"]);
     */
    solveFormula(formula) {
        let formulaString = this.formulaToString(formula);
        //console.log(formulaString);
        return eval(formulaString);
    }

    /**
     * This function returns an equation as an array which can then be used as puzzle
     * @param {number} amountOfNumbers The amount of numbers the formula should be constructed of
     * @returns {array} A new equation
     * @example
     * // Returns ["3", "+", "4", "-"", "5", "+"", "9", "=", "11"]
     * solveFormula(["3", "+", "4", "-"", "5", "+"", "9"]);
     */
    getNewPuzzle(amountOfNumbers) {
        // create formula and calculate its result
        let formula = this.createFormula(amountOfNumbers);
        let result = this.solveFormula(formula).toString();
        
        // add result to the formula
        this.puzzle = formula;
        this.puzzle.push("=");
        this.puzzle.push(result);
        
        return this.puzzle;
    }

}

// const myModeler = new Modeler(100);
// let solution = myModeler.getNewPuzzle(5);
// console.log(solution);
