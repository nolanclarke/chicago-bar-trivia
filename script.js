const bars = [
  {
    name: "Slippery Slope",
    image: "images/slippery-slope.jpg",
    hours: "Open till 2AM daily",
    specials: "$5 High Noons every Tuesday",
    website: "https://slipperyslopechicago.com"
  },
  {
    name: "Estelle's",
    image: "images/estelles.jpg",
    hours: "Open till 4AM weekends",
    specials: "$3 PBR + shot combo",
    website: "https://estelleschicago.com"
  },
  {
    name: "Smart Bar",
    image: "images/smartbar.jpg",
    hours: "Open 10PM–4AM",
    specials: "Half-price cover before 11PM",
    website: "https://smartbarchicago.com"
  },
  {
    name: "The Violet Hour",
    image: "images/the-violet-hour.jpg",
    hours: "Open 5PM–2AM",
    specials: "$10 signature cocktails on Mondays",
    website: "https://theviolethour.com"
  }
];

let currentQuestion = 0;
let score = 0;
let correctBar = null;

function getRandomBarOptions() {
  correctBar = bars[Math.floor(Math.random() * bars.length)];
  const others = bars.filter(b => b.name !== correctBar.name);
  const options = [correctBar.name, ...others.sort(() => 0.5 - Math.random()).slice(0, 3).map(b => b.name)];
  return options.sort(() => 0.5 - Math.random());
}

function loadBarTrivia() {
  if (currentQuestion >= 5) {
    showFinalScore();
    return;
  }

  document.getElementById("trivia-card").classList.remove("hidden");
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("final-screen").classList.add("hidden");

  const options = getRandomBarOptions();

  document.getElementById("bar-image").src = correctBar.image;
  document.getElementById("question-counter").textContent = `${currentQuestion + 1}/5`;

  const choiceContainer = document.querySelector(".choices");
  choiceContainer.innerHTML = "";

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = option;
    btn.onclick = () => {
      showResult(option === correctBar.name);
    };
    choiceContainer.appendChild(btn);
  });
}

function showResult(isCorrect) {
  document.getElementById("trivia-card").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  if (isCorrect) {
    score++;
    document.getElementById("result-msg").textContent = "✅ Correct!";
  } else {
    document.getElementById("result-msg").textContent = "❌ Wrong...";
  }

  document.getElementById("bar-name").textContent = correctBar.name;
  document.getElementById("bar-hours").textContent = `🕒 ${correctBar.hours}`;
  document.getElementById("bar-specials").textContent = `🍻 ${correctBar.specials}`;
  document.getElementById("bar-link").href = correctBar.website;
  document.getElementById("result-image").src = correctBar.image;

  currentQuestion++;

  setTimeout(() => {
    loadBarTrivia();
  }, 2000);
}

function showFinalScore() {
  document.getElementById("trivia-card").classList.add("hidden");
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("final-screen").classList.remove("hidden");

  document.getElementById("score-text").textContent = `You got ${score}/5 right!`;
}

function resetGame() {
  currentQuestion = 0;
  score = 0;
  loadBarTrivia();
}

window.onload = loadBarTrivia;