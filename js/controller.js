// TODO Import GO Handler


// Dummy Class to test functions
class Modeler
{
    constructor (controller)
    {
        this.Controller = controller;
        this.Array1= ['3','+','2','-','1','=','4']
        this.Array2= ['5','+','4','+','1','=','10'] 
    }
    getNewPuzzle()
    {
        return this.Array1
    }
}

class Controller {
    constructor() {
      this.clickedElements = [];
    }


    // Function to call to get a new GO-array
    getNewTask()
    {
        return this.TaskCreater.getNewPuzzle();
    }

    addClickedElement(element) {
      this.clickedElements.push(element);
      console.log(`Clicked elements: ${this.clickedElements}`);
    }
  }



  
// class Viewer {
//     constructor(controller, elements) {
//       this.controller = controller;
//       this.elements = elements;
//       this.initializeClickListeners(); // inactive because no HTML connection jet
//     }

//     visualizedElements = createContainer(elements)
  
//     initializeClickListeners() {
//       this.elements.forEach((element, index) => {
//         element.addEventListener('click', () => {
//           this.elementClicked(index);
//         });
//       });
//     }
  
//     elementClicked(index) {
//       const element = this.elements[index];
//       // Notify the controller
//       this.controller.addClickedElement(element);
//     }
//   }
  

//   const TaskCreater = new Modeler();
//   const controller = new Controller();
//   const viewer = new Viewer(controller);
  



// class Controller
// {
//     // Create new GO-array
//     TaskCreater = new Modeler();

//      currentTask = this.getNewTask(); 




//     // Function to call to get a new GO-array
//     getNewTask()
//     {
//         return this.TaskCreater.getNewPuzzle();
//     }
    
// }
