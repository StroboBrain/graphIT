/**
 * Controller class responsible for handling user interactions and coordinating with the modeler.
 */
class Controller {
    /**
     * Creates a new Controller instance.
     * @param {Modeler} modeler - The modeler instance to be used by the controller.
     */
    constructor(modeler) {
        this.modeler = modeler;  
        this.clickedElements = [];
        this.currentTask = [];
    }

    /**
     * Retrieves a new GO-array task from the modeler.
     * @param {number} nbOfElements - The number of elements in the GO-array task.
     * @returns {Array} - An array representing the new GO-array task.
     */
    getNewTask(nbOfElements) {
        this.currentTask = this.modeler.getNewPuzzle(nbOfElements)
        return this.currentTask
    }

    /**
     * Adds the clicked element to the list of clicked elements and logs the updated list.
     * @param {any} element - The element that was clicked.
     */
    addClickedElement(element) {
        this.clickedElements.push(element);
        console.log(`Clicked elements: ${this.clickedElements}`);

        if(this.currentTask.length === this.clickedElements.length){
            let resultValid = this.modeler.checkResult(this.clickedElements);
            console.log(resultValid);
            feedback(resultValid);
        }
    }
}