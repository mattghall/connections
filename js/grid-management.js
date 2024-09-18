function renderGrid(grid, boxes) {
    grid.innerHTML = ''; // Clear the grid
    boxes.forEach((boxData) => {
        const div = document.createElement('div');
        div.classList.add('box', boxData.color + (boxData.confirmed ? '-confirmed' : '-guess'));
        div.textContent = boxData.text;
        div.dataset.boxId = boxData.boxId; // Use boxId to uniquely identify the box
        div.draggable = true;

        // Attach events to the box
        attachBoxEvents(div, boxData, boxes, grid);

        grid.appendChild(div);
    });
}

function swapBoxes(el1, el2, boxes) {
    const boxId1 = el1.dataset.boxId;
    const boxId2 = el2.dataset.boxId;

    const index1 = boxes.findIndex(box => box.boxId == boxId1);
    const index2 = boxes.findIndex(box => box.boxId == boxId2);

    // Swap the two boxes in the array
    const temp = boxes[index1];
    boxes[index1] = boxes[index2];
    boxes[index2] = temp;

    // Re-render the grid after swapping
    renderGrid(document.getElementById('grid'), boxes);
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleBoxes(grid, boxes) {
    shuffleArray(boxes); // Shuffle the boxes array
    renderGrid(grid, boxes); // Re-render the grid after shuffling
}

function sortBoxes(grid, boxes) {
    const sortedBoxes = [];
    
    // Separate boxes by color
    const yellowBoxes = boxes.filter(box => box.color === 'yellow');
    const greenBoxes = boxes.filter(box => box.color === 'green');
    const blueBoxes = boxes.filter(box => box.color === 'blue');
    const purpleBoxes = boxes.filter(box => box.color === 'purple');
    const whiteBoxes = boxes.filter(box => box.color === 'white');
    
    // Helper function to fill a row with a specific color and fill with whites if needed
    function fillRowWithColor(colorBoxes, rowSize) {
        const row = [...colorBoxes]; // Clone the array
        const remainingSlots = rowSize - colorBoxes.length;
        if (remainingSlots > 0) {
            row.push(...whiteBoxes.splice(0, remainingSlots)); // Fill the remaining slots with white boxes
        }
        return row;
    }
    
    // Push sorted rows into sortedBoxes
    sortedBoxes.push(...fillRowWithColor(yellowBoxes, 4)); // Yellow row
    sortedBoxes.push(...fillRowWithColor(greenBoxes, 4));  // Green row
    sortedBoxes.push(...fillRowWithColor(blueBoxes, 4));   // Blue row
    sortedBoxes.push(...fillRowWithColor(purpleBoxes, 4)); // Purple row

    // Re-render the grid with the sorted boxes
    renderGrid(grid, sortedBoxes);
}

function resetBoard(grid, boxes) {
    // Reset each box to its default state
    boxes.forEach(box => {
        box.color = "white"; // Reset color to white
        box.confirmed = false; // Reset confirmed to false
    });

    // Re-render the grid with the reset boxes
    renderGrid(grid, boxes);
}
