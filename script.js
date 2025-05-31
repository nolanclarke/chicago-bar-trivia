const bars = [
  {
    name: "Slippery Slope",
    image: "images/slippery-slope.jpg",
    neighborhood: "Wicker Park",
    hours: "Open till 2AM Daily",
    specials: "$5 High Noons, $6 Tequila Shots",
    link: "https://www.slipperyslope.com"
  },
  {
    name: "Smart Bar",
    image: "images/smartbar.jpg",
    neighborhood: "Lakeview",
    hours: "10PM - 4AM (5AM Sat)",
    specials: "Underground house music, $8 cover",
    link: "https://www.smartbarchicago.com"
  },
  {
    name: "The Violet Hour",
    image: "images/the-violet-hour.jpg",
    neighborhood: "Wicker Park",
    hours: "5PM - Midnight",
    specials: "Award-winning cocktails, upscale vibes",
    link: "https://www.theviolethour.com"
  },
  {
    name: "Estelle's",
    image: "images/estelles.jpg",
    neighborhood: "Wicker Park",
    hours: "Open till 4AM",
    specials: "$6 Beer + Shot Combo, Pool Table",
    link: "https://www.estelleschicago.com"
  }
];

let currentQuestion = 0;
let score = 0;
let shuffledBars = [];

function shuffleArray(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function showQuestion() {
  document.getElementById("trivia-card").classList.remove("hidden");
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("final-screen").classList.add("hidden");
  document.getElementById("question-counter").textContent = `${currentQuestion + 1}/5`;

  const correctBar = shuffledBars[currentQuestion];
  const otherBars = bars.filter(bar => bar.name !== correctBar.name);
  const choices = shuffleArray([correctBar, ...shuffleArray(otherBars).slice(0, 3)]);
  const choicesContainer = document.querySelector(".choices");
  choicesContainer.innerHTML = "";

  document.getElementById("bar-image").src = correctBar.image;

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.name;
    btn.classList.add("choice");
    btn.onclick = () => handleAnswer(choice.name === correctBar.name, correctBar);
    choicesContainer.appendChild(btn);
  });
}

function handleAnswer(isCorrect, bar) {
  document.getElementById("trivia-card").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  document.getElementById("result-msg").textContent = isCorrect ? "Correct!" : "Incorrect!";
  document.getElementById("result-image").src = bar.image;
  document.getElementById("bar-name").textContent = bar.name;
  document.getElementById("bar-neighborhood").textContent = `📍 ${bar.neighborhood}`;
  document.getElementById("bar-hours").textContent = bar.hours;
  document.getElementById("bar-specials").textContent = bar.specials;
  document.getElementById("bar-link").href = bar.link;

  if (isCorrect) score++;

  document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < 5) {
    showQuestion();
  } else {
    showFinalScreen();
  }
}

function showFinalScreen() {
  document.getElementById("trivia-card").classList.add("hidden");
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("question-counter").classList.add("hidden");
  document.getElementById("final-screen").classList.remove("hidden");
  document.getElementById("score-text").textContent = `You got ${score}/5 right!`;
}

function resetGame() {
  shuffledBars = shuffleArray(bars).slice(0, 5);
  currentQuestion = 0;
  score = 0;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
  document.getElementById("question-counter").classList.remove("hidden");
  showQuestion();
}

document.getElementById("start-btn").addEventListener("click", resetGame);

// SOUNDTRACK
const tracks = [
  'https://api.soundcloud.com/tracks/2086033833',
  'https://api.soundcloud.com/tracks/2083466883',
  'https://api.soundcloud.com/tracks/2068036764',
  'https://api.soundcloud.com/tracks/2061421784'
];
const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
const audioPlayer = document.createElement("iframe");
audioPlayer.src = `https://w.soundcloud.com/player/?url=${randomTrack}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false&loop=true`;
audioPlayer.width = "0";
audioPlayer.height = "0";
audioPlayer.allow = "autoplay";
audioPlayer.frameBorder = "no";
document.body.appendChild(audioPlayer);