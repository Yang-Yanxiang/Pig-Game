/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var currentPlayer, scores, roundScore, isPlaying;

var score0 = document.querySelector('#score-0');
var score1 = document.querySelector('#score-1');
var currentScore0 = document.querySelector('#current-0');
var currentScore1 = document.querySelector('#current-1');
var playerPanel0 = document.querySelector('.player-0-panel');
var playerPanel1 = document.querySelector('.player-1-panel');
var diceDom = document.querySelector('.dice');
var btnRoll = document.querySelector('.btn-roll');
var btnNew = document.querySelector('.btn-new');
var btnHold = document.querySelector('.btn-hold');

function init() {
  currentPlayer = 0;
  scores = [0, 0];
  roundScore = 0;
  isPlaying = true;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  playerPanel0.classList.remove('active');
  playerPanel1.classList.remove('active');
  playerPanel0.classList.remove('winner');
  playerPanel1.classList.remove('winner');
  playerPanel0.classList.add('active');
  diceDom.style.display = 'none';
}

init();

btnRoll.addEventListener('click', function() {
  if (isPlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    roundScore += dice;
    if (dice !== 1) {      
      document.querySelector('#current-' + currentPlayer).textContent = roundScore;
      diceDom.src = 'dice-' + dice + '.png';
      diceDom.style.display = 'block';
    } else {
      changePlayer();
    }
  }
});

function changePlayer() {
  roundScore = 0;
  document.querySelector('#current-' + currentPlayer).textContent = 0;
  diceDom.style.display = 'none';
  currentPlayer = currentPlayer === 0? 1: 0;
  playerPanel0.classList.toggle('active');
  playerPanel1.classList.toggle('active');
}

btnHold.addEventListener('click', function() {
  if (isPlaying) {
    scores[currentPlayer] += roundScore;
    document.querySelector('#score-' + currentPlayer).textContent = scores[currentPlayer];
    if (scores[currentPlayer] >= 20) {
      isPlaying = false;
      document.querySelector('#name-' + currentPlayer).textContent = 'Winner';
      var winnerPanel = document.querySelector('.player-' + currentPlayer + '-panel');
      winnerPanel.classList.remove('active');
      winnerPanel.classList.add('winner');
      diceDom.style.display = 'none';
    } else {
      changePlayer();
    }
  }
});

btnNew.addEventListener('click', init);