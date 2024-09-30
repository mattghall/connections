let draggedElement = null;

// Handle touch start (similar to drag start)
function handleTouchStart(e) {
    e.preventDefault(); // Prevent the default touch behavior (scrolling)
    draggedElement = e.target; // Store the element being touched
    draggedElement.classList.add('dragging');
}

// Handle touch move (we won’t need much here for swapping)
function handleTouchMove(e) {
    e.preventDefault(); // Prevent scrolling or default behavior
    const touchLocation = e.touches[0];
    const targetElement = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);

    // Highlight the element being touched
    if (targetElement && targetElement !== draggedElement) {
        targetElement.classList.add('overlapping');
    }
}

// Handle touch end (similar to drop)
function handleTouchEnd(e) {
    e.preventDefault(); // Prevent the default touch behavior
    const touchLocation = e.changedTouches[0];
    const targetElement = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);

    // Swap elements if valid drop target
    if (targetElement && draggedElement !== targetElement) {
        swapBoxes(draggedElement, targetElement, boxes);
    }

    // Clean up styles
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
    }
    if (targetElement) {
        targetElement.classList.remove('overlapping');
    }

    draggedElement = null; // Clear the dragged element
}

function handleDragStart(e) {
    draggedElement = e.target; // Track the dragged element
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.box').forEach(box => box.classList.remove('overlapping'));
}

function handleDragOver(e) {
    e.preventDefault(); // Allow dropping
    if (e.target !== draggedElement) {
        e.target.classList.add('overlapping');
    }
}

function handleDragLeave(e) {
    e.preventDefault();
    if (e.target !== draggedElement) {
        e.target.classList.remove('overlapping');
    }
}

function handleDrop(e, draggedElement, boxes, grid) {
    e.preventDefault();
    const targetElement = e.target;

    if (draggedElement !== targetElement) {
        // Swap the boxes based on boxId
        swapBoxes(draggedElement, targetElement, boxes);
    }
    targetElement.classList.remove('overlapping');
    renderGrid(grid, boxes); // Re-render the grid after swapping
}

function attachBoxEvents(div, boxData, boxes, grid) {
    div.addEventListener('click', function () {
        if (!boxData.confirmed) {
            toggleBoxColor(div, boxData, ["white", "yellow", "green", "blue", "purple"]); // Left-click: toggle color if not confirmed
        }
    });

    div.addEventListener('contextmenu', function (e) {
        e.preventDefault(); // Right-click: prevent context menu
        toggleConfirmed(div, boxData); // Toggle confirmed state
    });

    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragend', handleDragEnd);
    div.addEventListener('dragover', handleDragOver);
    div.addEventListener('dragleave', handleDragLeave);
    div.addEventListener('drop', function (e) {
        handleDrop(e, draggedElement, boxes, grid); // Handle the drop event
    });
    // Attach touch events for mobile
    div.addEventListener('touchstart', handleTouchStart);
    div.addEventListener('touchmove', handleTouchMove);
    div.addEventListener('touchend', handleTouchEnd);
}
