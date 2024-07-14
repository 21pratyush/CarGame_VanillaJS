//userScore updating/creation
export async function userScore(userScoreData) {
    try {
        const response = await fetch('http://localhost:3000/score/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userScoreData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Creation/Updation failed!');
        }

        const result = await response.json();
        console.log('Score submitted successfully:', result);

    } catch (error) {
        console.log('Error during score creation/updation!');
    }
}


