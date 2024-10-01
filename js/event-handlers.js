const eventHandlersVersion = 1.0;

$(function () {
    $("#event-handlers-version-span").text(eventHandlersVersion);
});

let draggedElement = null;

function handleTouchStart(e) {
    logMe("Touch start: " + e.target.textContent);
    e.preventDefault(); // Prevent the default touch behavior (scrolling)
    draggedElement = e.target; // Store the element being touched
    draggedElement.classList.add('dragging');
}

function handleTouchMove(e) {
    logMe("Touch move: " + e.target.textContent);
    e.preventDefault(); // Prevent scrolling or default behavior
    const touchLocation = e.touches[0];
    const targetElement = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);

    // Highlight the element being touched
    if (targetElement && targetElement !== draggedElement) {
        targetElement.classList.add('overlapping');
    }
}

function handleTouchEnd(e) {
    logMe("Touch end: " + e.target.textContent);
    e.preventDefault(); // Prevent the default touch behavior
    const touchLocation = e.changedTouches[0];
    const targetElement = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);
    if(!targetElement) {
        cleanupAfterDrag();
        return;}
    if (!targetElement.classList.contains("box")) {
        logMe("Dragged into no-mans land... ignoring");
        cleanupAfterDrag();
        return;
    }
    // Swap elements if valid drop target
    if (targetElement && draggedElement !== targetElement) {
        swapBoxes(draggedElement, targetElement, boxes);
    } else {
        logMe("This was a click not a touch");
        var div = e.target;
        toggleBoxColor(div, boxes[div.dataset.boxId - 1], ["white", "yellow", "green", "blue", "purple"]);
    }
    cleanupAfterDrag();

}

function cleanupAfterDrag() {
    $(".box").removeClass("dragging");
    $(".box").removeClass("overlapping");
    draggedElement = null; // Clear the dragged element
}

function handleDragStart(e) {
    logMe("Drag start: " + e.target.textContent);
    draggedElement = e.target; // Track the dragged element
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    logMe("Drag end: " + e.target.textContent);
    e.target.classList.remove('dragging');
    document.querySelectorAll('.box').forEach(box => box.classList.remove('overlapping'));
}

function handleDragOver(e) {
    logMe("Drag over: " + e.target.textContent);
    e.preventDefault(); // Allow dropping
    if (e.target !== draggedElement) {
        e.target.classList.add('overlapping');
    }
}

function handleDragLeave(e) {
    logMe("Drag leave: " + e.target.textContent);

    e.preventDefault();
    if (e.target !== draggedElement) {
        e.target.classList.remove('overlapping');
    }
}

function handleDrop(e, draggedElement, boxes, grid) {
    logMe("Drop: " + e.target.textContent);
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
        logMe("Click: " + div.textContent);
        if (!boxData.confirmed) {
            toggleBoxColor(div, boxData, ["white", "yellow", "green", "blue", "purple"]);
        }
    });

    // div.addEventListener('contextmenu', function (e) {
    //     e.preventDefault(); // Right-click: prevent context menu
    //     toggleConfirmed(div, boxData); // Toggle confirmed state
    // });

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
