import { userScore } from "../../api/scoreAPI.js";


const Score = document.querySelector(".Score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const PowerBtn = document.querySelector("#power");

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};
let player = { speed: 5 };
let TopScore = localStorage.getItem("TopScore") || 0;


//timer-feature for setting difficulty level
let timerInterval;
let timerValue = 0;

const enemyCarImages = {
  bike: "url('../assets/images/bike.png')",
  car: "url('../assets/images/car.png')",
  truck: "url('../assets/images/truck.png')",
};

Score.innerHTML = `Top Score: ${TopScore}`;
function resetTimer() {
  clearInterval(timerInterval);
  timerValue = 0;
  player.speed = 5;
  // console.log(player.speed);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timerValue++;
    // console.log("Current time:", timerValue);

    //speed-checks
    if (timerValue >= 4) player.speed = 8;
    if (timerValue >= 8) player.speed = 10;
    if (timerValue >= 12) player.speed = 12;
    if (timerValue >= 16) player.speed = 15;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

//power-features
let IsPowerBtnClicked = false;

PowerBtn.addEventListener("click", () => {
  IsPowerBtnClicked = true;
  // console.log("clicked");
  PowerBtn.style.background = "green";
  setTimeout(() => {
    IsPowerBtnClicked = false;
    PowerBtn.style.background = "red";
    // console.log("unclicked");
  }, 8000);
});

// Add event listener for keydown events
document.addEventListener("keydown", function (event) {
  // Check if the pressed key is the Spacebar
  if (event.code === "Space") {
    event.preventDefault(); // Prevent default action if needed
    IsPowerBtnClicked = true;
    // console.log("clicked");
    PowerBtn.style.background = "green";
    setTimeout(() => {
      IsPowerBtnClicked = false;
      PowerBtn.style.background = "red";
      // console.log("unclicked");
    }, 8000);
  }

  if (event.code === "Enter") {
    event.preventDefault(); // Prevent default action if needed
    start();
  }
});

const keydownfun = (e) => {
  if (e.key == "ArrowUp") {
    keys.ArrowUp = true;
  } else if (e.key == "ArrowDown") {
    keys.ArrowDown = true;
  } else if (e.key == "ArrowLeft") {
    keys.ArrowLeft = true;
  } else if (e.key == "ArrowRight") {
    keys.ArrowRight = true;
  }
  // console.log(keys);
};
const keyupfun = (e) => {
  // console.log(e.key);
  if (e.key == "ArrowUp") {
    keys.ArrowUp = false;
  } else if (e.key == "ArrowDown") {
    keys.ArrowDown = false;
  } else if (e.key == "ArrowLeft") {
    keys.ArrowLeft = false;
  } else if (e.key == "ArrowRight") {
    keys.ArrowRight = false;
  }
};
function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  // console.log("arect",aRect);
  // console.log("brect",bRect);

  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.left > bRect.right ||
    aRect.right < bRect.left
  );
}
function moveLine() {
  let lines = document.querySelectorAll(".roadline");
  // console.log(lines);
  lines.forEach((item) => {
    // console.log(item.y);
    if (item.y >= 800) {
      item.y = 10;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function moveCar(car) {
  let enemycar = document.querySelectorAll(".enemycar");
  // console.log(car);
  enemycar.forEach((item) => {
    if (isCollide(car, item)) {
      // console.log(item.getBoundingClientRect());
      // console.log(car.getBoundingClientRect());
      // console.log("COLLIDE");

      if (!IsPowerBtnClicked) {
        player.start = false;
        stopTimer();
        // console.log(timerValue);
        startScreen.innerText = `Your Score is ${player.score}, Press 'Enter' To Start`;

        if (player.score > TopScore) {
          localStorage.setItem("TopScore", player.score);
          TopScore = player.score;

          //Score updation
          if (isLoggedIn) {
            try {
              const scoreData = {
                userName: localStorage.getItem('userName'),
                score: localStorage.getItem('TopScore')
              }

              userScore(scoreData);
            } catch (error) {
              console.log("error in updation/creation of userScore!", error);
            }
          }
        }
        startScreen.classList.remove("hide");
        // score.classList.add("hide");
        // gameArea.classList.add('hide');
      }
    }
    if (item.y >= 750) {
      item.y = item.y - 800;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed - 2;
    item.style.top = item.y + "px";
  });
}

let lastScoreUpdateTime = 0; // Tracking the last time the score was updated

function gameplay() {
  if (player.start) {
    moveLine();
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    if (keys.ArrowUp && player.y > road.top + 80) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 70) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed;
    }
    let car = document.querySelector(".car");
    moveCar(car);
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    window.requestAnimationFrame(gameplay);

    const currentTime = Date.now();
    if (currentTime - lastScoreUpdateTime >= 250) {
      player.score++;
      Score.innerText = "Score: " + player.score;
      lastScoreUpdateTime = currentTime;
    }
  }
}
function start() {
  // gameArea.classList.remove('hide');
  startScreen.classList.add("hide");
  // score.classList.remove("hide");
  gameArea.innerHTML = "";
  player.start = true;
  resetTimer();
  startTimer();
  player.score = 0;

  for (let i = 0; i <= 5; i++) {
    let roadline = document.createElement("div");
    roadline.setAttribute("class", "roadline");
    roadline.y = 150 * i;
    roadline.style.top = 150 * i + "px";
    gameArea.append(roadline);
  }
  for (let i = 0; i <= 3; i++) {
    let enemycar = document.createElement("div");
    enemycar.setAttribute("class", "enemycar");
    enemycar.y = (i + 1) * 350 * -1;
    enemycar.style.top = 150 * i + "px";
    const vehicleTypes = ["car", "bike", "truck"];
    const randomVehicleType =
      vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
    // console.log(randomVehicleType);
    enemycar.style.backgroundImage = enemyCarImages[randomVehicleType];
    // console.log(enemyCarImages[randomVehicleType])
    enemycar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.append(enemycar);
  }
  let car = document.createElement("div");
  car.setAttribute("class", "car");

  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  gameArea.append(car);
  window.requestAnimationFrame(gameplay);
}
document.addEventListener("keydown", keydownfun);
document.addEventListener("keyup", keyupfun);
startScreen.addEventListener("click", () => {
  start();
});



// -------------BACKEND-CONNECTION-------------
//Authorization
const isLoggedIn = localStorage.getItem('isLoggedIn');
let clientStoredTopScored, dbStoredTopScored;

//after login userAuthorization features
if (isLoggedIn) {
  document.getElementById('logoutButton').style.display = 'block';
  document.getElementById('loginButton').style.display = 'none';


  //userScore syncing DB server and Client server logic
  async function fetchUserScore() {
    try {
      const response = await fetch('http://localhost:3000/score/getScore', {
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
      console.log("Fetched data: ", result);

      clientStoredTopScored = localStorage.getItem('TopScore') ?? 0;

      console.log("Client server TopScore -> ", clientStoredTopScored);

      dbStoredTopScored = result.data.userScore ?? 0;
      console.log("DB server TopScore ->", dbStoredTopScored);

      if (dbStoredTopScored > clientStoredTopScored) {
        TopScore = result.data.userScore, localStorage.setItem("TopScore", result.data.userScore);
        console.log("Success while syncing the DB to Client TopScore!");
        Score.innerHTML = `Top Score: ${TopScore}`;

      } else if (clientStoredTopScored > dbStoredTopScored) {
        //Client TopScore is higher than DB server TopScore
        try {
          const scoreData = {
            userName: localStorage.getItem('userName'),
            score: localStorage.getItem('TopScore')
          }
          userScore(scoreData);
          console.log("Success while syncing the Client to the DB TopScore!");
        } catch (error) {
          console.log("error in syncing Client to DB server of userTopScore!", error);
        }
      }
      //both DB server and Client server TopScore are same using fetch only(optimized load balancing for the backend!) 
      else {
        console.log("DB TopScore and Client TopScore are same!");
      }

    } catch (error) {
      console.log("Error fetching userScore: ", error);
    }
  }

  fetchUserScore();
}


//LOGOUT
async function logoutUser() {
  try {
    const response = await fetch('http://localhost:3000/welcome/logout', {
      method: 'POST',
      credentials: 'include', // Include cookies in the request
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    const result = await response.json();
    console.log('Logout successful:', result);

    if (dbStoredTopScored == clientStoredTopScored) {
      localStorage.removeItem('TopScore');
      localStorage.removeItem('userName');
      //TopScore removed from the localStorage after syncing
    } else {
      localStorage.removeItem('userName');
    }
    window.location.href = '/welcome';

  } catch (error) {
    console.error('Error during logout:', error);
  }
}

document.getElementById('logoutButton').addEventListener('click', async (e) => {
  e.preventDefault();
  await logoutUser();
  localStorage.removeItem('isLoggedIn');
});



//LEADERBOARD 
const leaderBoardBTN = document.getElementById('leaderBoardButton');
function routeLeaderBoard() {
  window.location.href = '/score/leaderBoard';
}
leaderBoardBTN.addEventListener('click', routeLeaderBoard);