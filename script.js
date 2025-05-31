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
  document.getElementById("question-counter").classList.remove("hidden");
  showQuestion();
}

resetGame();