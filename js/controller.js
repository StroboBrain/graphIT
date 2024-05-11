
class Controller {
    constructor(modeler) {
        this.modeler = modeler;  
        this.clickedElements = [];
    }



    // Function to call to get a new GO-array
    getNewTask()
    {
        return this.modeler.getNewPuzzle();
    }

    addClickedElement(element) {
      this.clickedElements.push(element);
      console.log(`Clicked elements: ${this.clickedElements}`);
      console.log(this.clickedElements)



    }
  }
