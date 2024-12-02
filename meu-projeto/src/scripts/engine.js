const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000, // = 1ms
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  action: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(coutnDown, 1000),
  },
};

function coutnDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.action.countDownTimerId);
    clearInterval(state.action.timerId);
    alert("Game Over! O Seu resultado foi: " + state.values.result);
  }
 
}


function playSound(){
  let audio = new Audio("../src/audios/hit.m4a");
  audio.volume = 0.2
  audio.play();
}


function randomSquare() {
  // Percorre cada square (veja quais são no HMTL) e remove a classe "enemy", caso alguém tenha.
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

// function moveEnemy() {
//   // Guardando dentro da variável o intervelo de tempo para a imagem se
//   state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
// }

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
      }
    });
  });
}

// função que vai inicializar as outras funções
function init() {
  addListenerHitBox();
}

init();
