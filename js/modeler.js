class Modeler {
    /**
     * @constructor
     * @param {number} [maxValue=100] Maximal value of a single number in the equation
     * @param {array} [operators=["+", "-", "*", "/"]] An array containing the operators that should be used in the equations.
     *                                                 Allowed operators: ["+", "-", "*", "/"]
     * @example
     * new Modeler(4, ["+", "-", "*", "/"]);
     */
    constructor(maxValue, operators) {
        if (maxValue === undefined) {
            maxValue = 100;
        }
        this.maxValue = maxValue;

        // operators that can be used
        if (operators === undefined) {
            operators = ["+", "-", "*", "/"];
        }
        this.operators = operators;

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
        formula.push(this.getRandomNumber());
        for (let i = 1; i < amountOfNumbers - 1; i++) {
            let operator = this.getRandomOperator();
            // If the operation is division, then calculate the result of the last punctuation results
            // if this result has a divisor, then take one of them as the next number
            // otherwise, take another operator (resp. go one iteration back)
            // This must be done so that no floating point results occur
            if (operator == "/") {
                // get formula until last - or +
                let lastPositionPlus = formula.lastIndexOf("+");
                let lastPositionMinus = formula.lastIndexOf("-");
                let lastPosition = Math.max(lastPositionMinus, lastPositionPlus);
                let tempResult = eval(this.formulaToString(formula.slice(lastPosition + 1, formula.length)));
                // get divisors of this subformula
                let divisors = this.divisors(tempResult);
                // if divisors found, take one of them randomly as next number
                if (divisors.length > 0) {
                    let num = divisors[Math.floor(Math.random() * divisors.length)];
                    formula.push(operator);
                    formula.push(num.toString());
                }
                // if no divisor is found, do another iteration (until another operator is taken randomly)
                else {
                    i = i - 1;
                    continue;
                }
            }
            // for the other operators, the problem of resulting floating point values can be ignored
            else {
                formula.push(operator);
                formula.push(this.getRandomNumber());
            }
          }
        return formula;
    }

    /**
     * This function returns all divisors of an integer including itself
     * @param {number} integer an aritrary integer
     * @returns {array} An array containing all divisors of the input integer
     * @example
     * // [2, 4]
     * divisors(4);
     */
    divisors(integer) {
        let divisors = [];
        for (let i = 2; i <= integer; i++) {
            if (integer % i == 0) {
                divisors.push(i)
            }
        }
        return divisors;
    };

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

    /**
     * this function checks if an equation is correct
     * @param {array} result an Array containing an equation
     * @returns {bool} true if the left and right sides of the equals sign give the same result
     * @example
     * // Returns true
     * checkResult(["3", "+", "4", "-"", "5", "+"", "9", "=", "11"]);
     */
    checkResult(result) {
        console.log("CheckResult: " + result);
        let index = result.indexOf("=");
        let left = this.formulaToString(result.slice(0, index));
        let right = this.formulaToString(result.slice(index + 1, result.length));
        let resultLeft = eval(left);
        let resultRight = eval(right);
        let check = resultLeft == resultRight;
        return check;
    }
}




// const myModeler = new Modeler();

// let puzzle = myModeler.getNewPuzzle(5);
// console.log(puzzle);

// let result = ['44', '+', '13', '=', '57'];
// console.log(myModeler.checkResult(result));

// console.log(myModeler.divisors(20));

