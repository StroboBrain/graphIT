
/**
 * returns the random x and y coordinates 
 */
function getNumberFromString(str) {
    let numStr = str.replace(/\D/g, '');
    return Number(numStr);
}

function getRandomPosition(button, container) {
    // Calculate a random position for the button
    let containerWidth = getNumberFromString(container.style.width);
    let containerHeight = getNumberFromString(container.style.height);
    let buttonWidth = getNumberFromString(button.style.width);
    let buttonHeight = getNumberFromString(button.style.height);
    let x = Math.random() * (containerWidth - buttonWidth);
    let y = Math.random() * (containerHeight - buttonHeight);
    return [x, y];
  }

  /**
   * Avoids collision for the buttons
   */
function positionButtons(container) {
    var buttons = container.children;
    //create an array with possible positions
    let positions = [];
    for (let k = 0; k<8;k++){
        for (let l = 0; l<8;l++){
            positions.push([2+k*10,10+l*10]);
        }
    }
    
    
    for (let i = 0; i<buttons.length; i++){
        let randomIndex = Math.floor(Math.random() * positions.length);
        let randomElement = positions.splice(randomIndex, 1)[0];
        // Remove the item at the random index
        positions = positions.filter(item => item !== randomElement);
        buttons[i].style.left = "" + randomElement[0] +'%';
        buttons[i].style.top = "" + randomElement[1] +'%';
    }
}
  


/**
 * Creates the container with the buttons
 */
function createContainer(controller,container){
    console.log(controller);
    let array = controller.getNewTask(3);
    console.log(array);

    let buttons = document.getElementsByClassName("equationButton")

    for (var i = buttons.length - 1; i >= 0; --i) {
        buttons[i].remove();
      }

    //Create a new container    
    // let container = document.createElement("div");
    container.className = "container";
    container.setAttribute('id', "buttonContainer");
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.border = "1px solid black";
    container.style.float = "bottom";
    
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
        let name = "button" + String(i);
        let button = document.createElement("button");
        button.style.minWidth = "100px";
        button.style.minHeight = "100px";
        button.style.borderRadius = '50%';
        button.style.display = 'block';
        button.style.boxSizing = 'border-box';
        button.style.fontSize = "200%";
        button.setAttribute('id', name);
        button.textContent = array[i];
        button.className = 'equationButton';
        button.onclick = function() {
            console.log(button.textContent);
            controller.addClickedElement(button.textContent)
            button.disabled = true;
            button.style.backgroundColor= "grey";
            textarea = document.getElementById("textarea");
            textarea.textContent += button.textContent;
            }
            container.appendChild(button);
        }
    console.log(container);
    positionButtons(container);
        
    return container
    }

    function createTextArea(){
        
        var textarea = document.createElement('div');
        textarea.style.width = "60%";
        textarea.style.height = "5%";
        textarea.style.float = "left";
        textarea.style.border = "1px solid black";
        textarea.style.minHeight = "60px";
        textarea.setAttribute('id','textarea');
        textarea.style.fontSize = "200%";
        textarea.textContent = "";
        return textarea
    }

    function createRedoButton(controller,container){
        var redoButton = document.createElement('button');
        redoButton.style.minHeight = "60px";
        redoButton.style.width = "30%";
        redoButton.style.height = "5%";
        redoButton.style.float = "right";
        redoButton.className = 'redo-button';
        redoButton.style.border = "1px solid black";
        redoButton.textContent = 'Redo';
        redoButton.style.fontSize = "100%";
        redoButton.onclick = function(){ 
            createContainer(controller,container);
            redoButton.textContent = "Reload";
            controller.clickedElements = []
            textarea = document.getElementById("textarea");

            textarea.textContent = "";
            document.body.style.background = "white";
        }

        return redoButton

    }
    function createGameParent(){
        let gameParent = document.createElement("div");
        gameParent.className = "wholeGame";
        gameParent.style.width = "90vw";
        gameParent.style.height = "90vh";
        gameParent.style.minWidth = "400px";
        gameParent.style.minHeight = "800px";
        return gameParent
    }

    function feedback(correct){
        var redoButton = document.getElementsByClassName('redo-button')[0];

        if (correct){
            document.body.style.background = "green";
            redoButton.textContent = "Great! Next puzzle";


        } else {
            document.body.style.background = "red";
            redoButton.textContent = "Try a new puzzle";

        }
    }




