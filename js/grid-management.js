function renderGrid(grid, boxes) {
    grid.innerHTML = ''; // Clear the grid
    boxes.forEach((boxData, index) => {
        const div = document.createElement('div');
        div.classList.add('box', boxData.color + (boxData.confirmed ? '-confirmed' : '-guess'));
        div.textContent = boxData.text;
        div.dataset.index = index;
        grid.appendChild(div);
        updateBoxClass(div, boxData); // Update class for color and confirmed state
    });
}

function swapBoxes(el1, el2, boxes) {
    const index1 = el1.dataset.index;
    const index2 = el2.dataset.index;

    const temp = boxes[index1];
    boxes[index1] = boxes[index2];
    boxes[index2] = temp;
}
