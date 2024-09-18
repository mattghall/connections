let draggedElement = null; // Declare draggedElement globally

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
}
