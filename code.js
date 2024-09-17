document.addEventListener('DOMContentLoaded', function () {
    const colors = ["white", "yellow", "green", "blue", "purple"];
    
    const grid = document.getElementById('grid');
    let draggedElement = null;
    let targetElement = null;

    // Function to update the box class based on color state and confirmed state
    function updateBoxClass(box, boxData) {
      const colorClass = boxData.color + (boxData.confirmed ? '-confirmed' : '-guess');
      box.classList.remove(...colors.map(color => color + '-guess'), ...colors.map(color => color + '-confirmed')); // Remove all color classes
      box.classList.add(colorClass); // Add the correct color class based on confirmed state
    }

    // Prevent right-click menu and handle right-click to toggle confirmed state
    grid.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });

    // Create the grid and populate it with the boxes from board.js
    boxes.forEach((boxData, index) => {
      // Assign default color class to "white-guess" and confirmed state to false
      boxData.color = "white";
      boxData.confirmed = false;

      const div = document.createElement('div');
      div.classList.add('box', 'white-guess');
      div.draggable = true;
      div.textContent = boxData.text;
      div.dataset.index = index;

      // Add left-click event to cycle through the colors (only if not confirmed)
      div.addEventListener('click', function () {
        if (!boxData.confirmed) {
          const currentIndex = colors.indexOf(boxData.color);
          boxData.color = colors[(currentIndex + 1) % colors.length]; // Cycle to the next color class
          updateBoxClass(div, boxData); // Update the box class
        }
      });

      // Add right-click event to toggle confirmed state
      div.addEventListener('contextmenu', function (e) {
        e.preventDefault(); // Prevent the default context menu
        boxData.confirmed = !boxData.confirmed; // Toggle confirmed state
        updateBoxClass(div, boxData); // Update the box class
      });

      // Add drag event listeners
      div.addEventListener('dragstart', handleDragStart);
      div.addEventListener('dragend', handleDragEnd);
      div.addEventListener('dragover', handleDragOver);
      div.addEventListener('dragleave', handleDragLeave);
      div.addEventListener('drop', handleDrop);

      grid.appendChild(div);
    });

    // Drag start event
    function handleDragStart(e) {
      draggedElement = e.target;
      e.target.classList.add('dragging');
    }

    // Drag end event
    function handleDragEnd(e) {
      e.target.classList.remove('dragging');
      draggedElement = null;
      $('.box').removeClass('overlapping');
    }

    // Drag over event (prevents default to allow dropping, also adds shadow to the target)
    function handleDragOver(e) {
      e.preventDefault();
      if (e.target !== draggedElement) {
        e.target.classList.add('overlapping');
      }
    }

    // Drag leave event (removes shadow if not dragged over)
    function handleDragLeave(e) {
      e.preventDefault();
      if (e.target !== draggedElement) {
        e.target.classList.remove('overlapping');
      }
    }

    // Handle drop event (swap boxes and remove shadow)
    function handleDrop(e) {
      e.preventDefault();
      targetElement = e.target;

      if (draggedElement !== targetElement) {
        swapBoxes(draggedElement, targetElement);
      }
      targetElement.classList.remove('overlapping');
    }

    // Swap the dragged element with the drop target
    function swapBoxes(el1, el2) {
      const index1 = el1.dataset.index;
      const index2 = el2.dataset.index;

      const temp = boxes[index1];
      boxes[index1] = boxes[index2];
      boxes[index2] = temp;

      renderGrid(); // Re-render the grid after swapping
    }

    // Re-render grid (use this if needed for future features like shuffle)
    function renderGrid() {
      grid.innerHTML = ''; // Clear the grid
      boxes.forEach((boxData, index) => {
        const div = document.createElement('div');
        div.classList.add('box', boxData.color + (boxData.confirmed ? '-confirmed' : '-guess'));
        div.textContent = boxData.text;
        grid.appendChild(div);
      });
    }
});
