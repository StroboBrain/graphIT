



/**
 * returns the random x and y coordinates 
 */
function getRandomPosition(button, container) {
    let containerRect = container.getBoundingClientRect();
    let buttonRect = button.getBoundingClientRect();
    // Calculate a random position for the button
    let x = Math.random() * (containerRect.width - buttonRect.width);
    let y = Math.random() * (containerRect.height - buttonRect.height);
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
    button.style.position = 'absolute';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

/**
 * Creates the container with the buttons
 */
function createContainer(array){
    //Create a new container
    let container = document.createElement("div");
    container.className = "container";
    container.style.width = "80vw";
    container.style.height = "80vh";
    container.style.border = "1px solid black";
    container.style.padding = "2vw";

        for (let i = 0; i < array.length; i++) {
            let name = "button" + String(i);
            let button = document.createElement("button");
            button.setAttribute('id', name);
            button.textContent = array[i];
            button.className = 'equationButton';
            //TODO implement onclick()
            positionButton(container, button)
            container.appendChild(button);
        }
    return container
    }






