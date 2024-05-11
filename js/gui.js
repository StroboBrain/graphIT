
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
  function positionButton(container, button) {
    // Get the dimensions of the container and the button
    let containerWidth = container.offsetWidth;
    let containerHeight = container.offsetHeight;
    let buttonWidth = button.offsetWidth;
    let buttonHeight = button.offsetHeight;

    // Calculate a random position for the button
    let randomPosition = getRandomPosition(button, container);
    let x = randomPosition[0];
    let y = randomPosition[1];

    // Check for overlap with existing buttons in the container
    var buttons = container.getElementsByClassName('equationButton');
    for (var i = 0; i < buttons.length; i++) {
        // Get the left and top position of the existing button
        let existingButtonLeft = parseInt(buttons[i].style.left);
        let existingButtonTop = parseInt(buttons[i].style.top);

        if (x < existingButtonLeft + buttonWidth && x + buttonWidth > existingButtonLeft &&
            y < existingButtonTop + buttonHeight && y + buttonHeight > existingButtonTop) {
            // If there is an overlap, call the function again
            return positionButton(container, button);
        }
    }
    // If there is no overlap, position the button
    button.style.left = x + 'vw';
    button.style.top = y + 'vh';
}

/**
 * Creates the container with the buttons
 */
function createContainer(array,controller){
    //Create a new container
    let container = document.createElement("div");
    container.className = "container";
    container.style.width = "80%";
    container.style.height = "80%";
    container.style.border = "1px solid black";
    container.style.padding = "2vw";
    container.style.marginTop = "10%"

        for (let i = 0; i < array.length; i++) {
            let name = "button" + String(i);
            let button = document.createElement("button");
            button.style.width = "20%";
            button.style.boarderRadius = "50%";
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
            //TODO implement onclick()
            positionButton(container, button)
            container.appendChild(button);
        }
    return container
    }

    function createTextArea(){
        
        var textarea = document.createElement('div');
        textarea.style.width = "60%";
        textarea.style.float = "left";
        textarea.style.border = "1px solid black";
        textarea.setAttribute('id','textarea');
        textarea.textContent = "";
        return textarea
    }

    function createRedoButton(){
        var redoButton = document.createElement('button');
        redoButton.style.width = "30%";
        redoButton.style.float = "right";
        redoButton.className = 'redo-button';
        redoButton.textContent = 'Redo Button';
        //TODO onclick()
        return redoButton

    }
    function createGameParent(){
        let gameParent = document.createElement("div");
        gameParent.className = "wholeGame";
        gameParent.style.width = "90vw";
        gameParent.style.height = "90vh";
        gameParent.style.padding = "2vw";
        return gameParent
    }

    function feedback(correct){
        if (correct){
            document.body.style.background = "green";

        } else {
            document.body.style.background = "red";
        }
    }




