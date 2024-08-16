/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        let game = games[i];
        let gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Total Money Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Total Backers: ${game.backers.toLocaleString()} </p>
        `;
        gamesContainer.appendChild(gameCard);

    }



}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
// set the inner HTML using a template literal and toLocaleString to get a number with commas
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;




// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Calculate the number of games
const numGames = GAMES_JSON.length;

// Set the inner HTML of the gamesCard
gamesCard.innerHTML = `${numGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    // Log the number of unfunded games
    console.log(unfundedGames.length);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);

    console.log(fundedGames.length);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const secondnumUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;



// create a string that explains the number of unfunded games using the ternary operator

const description = `
    <p>${secondnumUnfundedGames === 1 ? 'There is 1 unfunded game' : `There are ${secondnumUnfundedGames} unfunded games`} remaining to be funded.</p>
    <p>${numGames} games have raised a total of $${totalRaised.toLocaleString('en-US')}.</p>
`;


// create a new DOM element containing the template string and append it to the description container
const pElement = document.createElement("p");
pElement.innerHTML = description;
descriptionContainer.appendChild(pElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;
const firstGameName = firstGame.name.split(' ')[0];
const secondGameName = secondGame.name.split(' ')[0];


// create a new element to hold the name of the top pledge game, then append it to the correct element

// Grab containers

// Create new elements
const firstGameElement = document.createElement('p');
const secondGameElement = document.createElement('p');

// Set text content
firstGameElement.textContent = ` ${firstGame.name}`;
secondGameElement.textContent = ` ${secondGame.name}`;

// Append elements to containers
firstGameContainer.appendChild(firstGameElement);
secondGameContainer.appendChild(secondGameElement);

// do the same for the runner up item

// Get the search bar element
// JavaScript to toggle dropdown menu visibility
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu-button');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const searchBar = document.getElementById('search-bar');
    const gamesContainer = document.getElementById("games-container");
    let selectedParam = 'name'; // Default parameter

    // Create and style the "Game not found" message element
    const noGamesMessage = document.createElement('p');
    noGamesMessage.textContent = 'Game not found';
    noGamesMessage.classList.add('no-games-message');
    noGamesMessage.style.display = 'none'; // Hide by default
    gamesContainer.appendChild(noGamesMessage);

    // Toggle dropdown menu visibility on button click
    menuButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent the click event from propagating to the document
        dropdownMenu.classList.toggle('hidden');
    });

    // Function to handle parameter selection
    const dropdownLinks = document.querySelectorAll("#dropdown-menu a");

    dropdownLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default link behavior
            const param = this.getAttribute("data-param");
            if (['name', 'description'].includes(param)) {
                selectedParam = param;
                searchBar.setAttribute("data-search-param", selectedParam);
                searchBar.setAttribute("placeholder", `Search by ${selectedParam}...`);
            }
            dropdownMenu.classList.add("hidden");
        });
    });

    // Close the dropdown menu if clicked outside
    document.addEventListener('click', function (event) {
        if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });

    // Function to filter games based on search input and selected parameter
    function filterGamesBySearch(query) {
        deleteChildElements(gamesContainer);

        // Convert query to lowercase for case-insensitive search
        const searchQuery = query.toLowerCase();

        // Filter games based on the selected parameter and fuzzy search query
        const filteredGames = GAMES_JSON.filter(game => {
            const gameField = game[selectedParam].toLowerCase();
            return gameField.includes(searchQuery);
        });

        if (filteredGames.length === 0) {
            const noResultsMessage = document.createElement("p");
            noResultsMessage.textContent = "Game not found :( Please refine your search query.";
            gamesContainer.appendChild(noResultsMessage);
        } else {
            // Add filtered games to the page
            addGamesToPage(filteredGames);
        }
    }


    // Add an event listener to the search bar
    searchBar.addEventListener('input', (event) => {
        filterGamesBySearch(event.target.value);
    });
});
