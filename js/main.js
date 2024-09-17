document.addEventListener('DOMContentLoaded', function () {
    const colors = ["white", "yellow", "green", "blue", "purple"];
    const grid = document.getElementById('grid');
    
    // Initialize the boxes array
    boxes.forEach((boxData, index) => {
        boxData.color = "white";
        boxData.confirmed = false;

        const div = document.createElement('div');
        div.classList.add('box', 'white-guess');
        div.textContent = boxData.text;
        div.dataset.index = index;

        // Attach events to the box
        attachBoxEvents(div, boxData, boxes, colors, grid);

        grid.appendChild(div);
    });
});
