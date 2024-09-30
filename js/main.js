var boxes = [];
document.addEventListener('DOMContentLoaded', function () {
    feather.replace();
    const grid = document.getElementById('grid');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const sortBtn = document.getElementById('sort-btn');
    const clearBtn = document.getElementById('clear-btn');
    const datePicker = document.getElementById('date-picker');

    const apiUrl = 'https://mj3c9f7sje.execute-api.us-west-2.amazonaws.com/default/connections-scraper';

    // Function to fetch words from the API
    async function fetchWords(date = '') {
        try {
            const url = date ? `${apiUrl}?date=${date}` : apiUrl;
            const response = await fetch(url);
            const data = await response.json();

            // Assuming the API returns an array of words in the response
            return data;
        } catch (error) {
            console.error('Error fetching words:', error);
            return []; // Return an empty array if the API call fails
        }
    }

    // Function to initialize the game
    async function initializeGame(date = '') {
        var fetchedWords = await fetchWords(date);

        // If fetch fails, use default words and display an error message
        if (!fetchedWords || fetchedWords.hasOwnProperty("error") || fetchedWords.length === 0) {
            alert("Could not fetch data from NYT connections. Using default word list.");
            fetchedWords = defaultWords; // Fall back to the default words
        } else {
            console.log(fetchedWords);
        }

        // Convert fetchedWords or defaultWords into the required format for boxes
        const fetchedBoxes = fetchedWords.map((word, index) => ({
            boxId: index + 1, // Assign a unique boxId starting from 1
            text: word,
            color: "white", // Default color is white
            confirmed: false // Default confirmed state is false
        }));

        // Check if there are any words fetched and then render the grid
        boxes.length = 0; // Clear the existing boxes array
        boxes.push(...fetchedBoxes); // Populate boxes with fetched data
        renderGrid(grid, boxes); // Render the grid
    }


    // Get the current date in yyyy-mm-dd format
    const currentDate = getCurrentDateFormatted();
    datePicker.value = currentDate; // Set the date picker's value to today's date

    // Initial rendering of the game with today's date
    initializeGame(currentDate);

    // Attach shuffle functionality to the shuffle button
    shuffleBtn.addEventListener('click', function () {
        shuffleBoxes(grid, boxes);
    });

    // Attach sort functionality to the sort button
    sortBtn.addEventListener('click', function () {
        sortBoxes(grid, boxes);
    });

    // Attach clear functionality to the clear button
    clearBtn.addEventListener('click', function () {
        resetBoard(grid, boxes);
    });

    // Automatically fetch and load words when the date picker value changes
    datePicker.addEventListener('change', function () {
        const selectedDate = datePicker.value;
        if (selectedDate) {
            initializeGame(selectedDate); // Fetch words for the selected date
        } else {
            alert("Please select a valid date.");
        }
    });
});

function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const defaultWords = [
    "APPLE", "BANANA", "CHERRY", "ORANGE",
    "RABBIT", "CAT", "FROG", "TURTLE",
    "COKE", "SPRITE", "7-UP", "PEPSI",
    "MOUSE", "KEYBOARD", "MONITOR", "MIC"
];