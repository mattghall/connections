const boxManagementVersion = 1.0;

$(function() {
    $("#box-management-version-span").text(boxManagementVersion);
});

function toggleBoxColor(box, boxData, colors) {
    const currentIndex = colors.indexOf(boxData.color);
    boxData.color = colors[(currentIndex + 1) % colors.length]; // Cycle to the next color class
    updateBoxClass(box, boxData); // Update the box class
}

function toggleConfirmed(box, boxData) {
    boxData.confirmed = !boxData.confirmed; // Toggle confirmed state
    updateBoxClass(box, boxData); // Update the box class
}

function updateBoxClass(box, boxData) {
    const colorClass = boxData.color + (boxData.confirmed ? '-confirmed' : '-guess');
    const colors = ["white", "yellow", "green", "blue", "purple"];
    box.classList.remove(...colors.map(color => color + '-guess'), ...colors.map(color => color + '-confirmed')); // Remove all color classes
    box.classList.add(colorClass); // Add the correct color class based on confirmed state
    logMe("Color Update: " + box.textContent + " → " + boxData.color);
}

