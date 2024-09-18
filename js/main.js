document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('grid');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const sortBtn = document.getElementById('sort-btn');
    const clearBtn = document.getElementById('clear-btn');
    
    // Initialize the boxes array with default properties
    boxes.forEach((boxData) => {
        boxData.color = "white"; // Default color
        boxData.confirmed = false; // Default state is not confirmed
    });

    // Initial rendering of the grid
    renderGrid(grid, boxes);

    // Attach shuffle functionality to the shuffle button
    shuffleBtn.addEventListener('click', function () {
        shuffleBoxes(grid, boxes);
    });

    sortBtn.addEventListener('click', function () {
        sortBoxes(grid, boxes);
    });

    clearBtn.addEventListener('click', function () {
        resetBoard(grid, boxes); // Reset the board
    });
});
