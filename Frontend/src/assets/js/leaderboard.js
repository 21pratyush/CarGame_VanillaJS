import { fetchLeaderBoardScore } from "../../api/leaderBoardAPI.js";



let currentPage = 1;
const itemsPerPage = 5;
let leaderBoardData = [];



const leaderboardBody = document.getElementById('leaderboardBody');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');


// Fetch leaderboard data and initialize the table
async function initLeaderBoard() {
    leaderBoardData = await fetchLeaderBoardScore();
    displayPage(currentPage);
}

// Display the leaderboard page
function displayPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = leaderBoardData.slice(start, end);

    leaderboardBody.innerHTML = '';

    paginatedData.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${entry.userName}</td>
            <td>${entry.score}</td>
        `;
        leaderboardBody.appendChild(row);
    });

    prevButton.disabled = page === 1;
    nextButton.disabled = end >= leaderBoardData.length;
}

// Navigate to the previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
    }
}

// Navigate to the next page
function nextPage() {
    if ((currentPage * itemsPerPage) < leaderBoardData.length) {
        currentPage++;
        displayPage(currentPage);
    }
}

prevButton.addEventListener('click', prevPage);
nextButton.addEventListener('click', nextPage);

// Initialize the leaderboard on page load
document.addEventListener('DOMContentLoaded', initLeaderBoard);
