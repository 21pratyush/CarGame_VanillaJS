
async function fetchLeaderBoardScore() {
    try {
        const response = await fetch('http://localhost:3000/score/getLeaderBoardScore', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to get response of userScore!');
        }

        const result = await response.json();
        // console.log("Fetched data: ", result);
       
        // Extracting and structuring the data for UI
        let leaderBoardData = result.data.map(item => ({
            userName: item.user.userName,
            score: item.score
        }));

        return leaderBoardData;

    } catch (error) {
        console.log("Error while fetching scores for leaderBoard", error);
    }

}

export { fetchLeaderBoardScore };