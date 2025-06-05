const bars = [
  {
    name: "Slippery Slope",
    image: "images/slippery-slope.jpg",
    neighborhood: "Wicker Park",
    hours: "Open till 2AM Daily",
    specials: "$5 High Noons, $6 Tequila Shots",
    link: "https://www.slipperyslope.com",
    description: "Fun dance floor and great energy every night."
  },
  {
    name: "Smart Bar",
    image: "images/smartbar.jpg",
    neighborhood: "Lakeview",
    hours: "10PM - 4AM (5AM Sat)",
    specials: "Underground house music, $8 cover",
    link: "https://www.smartbarchicago.com",
    description: "Legendary electronic music spot beneath Metro."
  },
  {
    name: "The Violet Hour",
    image: "images/the-violet-hour.jpg",
    neighborhood: "Wicker Park",
    hours: "5PM - Midnight",
    specials: "Award-winning cocktails, upscale vibes",
    link: "https://www.theviolethour.com",
    description: "Hidden entrance, speakeasy-style with fancy drinks."
  },
  {
    name: "Estelle's",
    image: "images/estelles.jpg",
    neighborhood: "Wicker Park",
    hours: "Open till 4AM",
    specials: "$6 Beer + Shot Combo, Pool Table",
    link: "https://www.estelleschicago.com",
    description: "Late-night classic with a chill crowd."
  }
];

let currentQuestion = 0;
let score = 0;
let shuffledBars = [];

function shuffleArray(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function updateProgress() {
  const percent = ((currentQuestion) / 5) * 100;
  document.getElementById("progress-fill").style.width = `${percent}%`;
  document.getElementById("progress-fill-result").style.width = `${percent}%`;
}

function showQuestion() {
  document.getElementById("main-content").classList.remove("hidden");
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("final-screen").classList.add("hidden");
  document.getElementById("my-bars-screen").classList.add("hidden");

  const correctBar = shuffledBars[currentQuestion];
  const otherBars = bars.filter(bar => bar.name !== correctBar.name);
  const choices = shuffleArray([correctBar, ...shuffleArray(otherBars).slice(0, 3)]);
  const choicesContainer = document.querySelector(".choices");
  choicesContainer.innerHTML = "";

  document.getElementById("bar-image").src = correctBar.image;
  document.getElementById("question-neighborhood").textContent = `📍 ${correctBar.neighborhood}`;

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.name;
    btn.classList.add("choice");
    btn.onclick = () => handleAnswer(choice.name === correctBar.name, correctBar);
    choicesContainer.appendChild(btn);
  });

  updateProgress();
}

function handleAnswer(isCorrect, bar) {
  document.getElementById("main-content").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  document.getElementById("result-msg").textContent = isCorrect ? "Correct!" : "Incorrect!";
  document.getElementById("result-image").src = bar.image;
  document.getElementById("bar-name").textContent = bar.name;
  document.getElementById("bar-neighborhood").textContent = `📍 ${bar.neighborhood}`;
  document.getElementById("bar-hours").textContent = bar.hours;
  document.getElementById("bar-specials").textContent = bar.specials;
  document.getElementById("bar-description").textContent = bar.description;
  document.getElementById("bar-link").href = bar.link;

  document.getElementById("save-btn").onclick = () => saveBar(bar.name);

  if (isCorrect) score++;
  updateProgress();
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
  document.getElementById("main-content").classList.add("hidden");
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("final-screen").classList.remove("hidden");
  document.getElementById("score-text").textContent = `You got ${score}/5 right!`;
}

function resetGame() {
  shuffledBars = shuffleArray(bars).slice(0, 5);
  currentQuestion = 0;
  score = 0;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("main-content").classList.remove("hidden");
  updateProgress();
  showQuestion();
}

function goToStart() {
  document.getElementById("final-screen").classList.add("hidden");
  document.getElementById("my-bars-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}

// Save bar to localStorage
function saveBar(barName) {
  let saved = JSON.parse(localStorage.getItem("savedBars")) || [];
  if (!saved.includes(barName)) {
    saved.push(barName);
    localStorage.setItem("savedBars", JSON.stringify(saved));
  }
}

// Load My Bars list
function loadSavedBars() {
  const saved = JSON.parse(localStorage.getItem("savedBars")) || [];
  const container = document.getElementById("saved-bars-list");
  container.innerHTML = "";

  saved.forEach(name => {
    const bar = bars.find(b => b.name === name);
    if (bar) {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${bar.name}</strong><br>📍 ${bar.neighborhood}<br>${bar.description}`;
      container.appendChild(p);
    }
  });
}

// Navigation
document.getElementById("start-btn").addEventListener("click", () => {
  resetGame();
});

document.getElementById("next-btn").addEventListener("click", nextQuestion);

document.getElementById("my-bars-btn").addEventListener("click", () => {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("my-bars-screen").classList.remove("hidden");
  loadSavedBars();
});

document.getElementById("back-home-btn").addEventListener("click", () => {
  document.getElementById("my-bars-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
});