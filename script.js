const bars = [
  {
    name: "Slippery Slope",
    image: "https://via.placeholder.com/300x200?text=Slippery+Slope",
    hours: "Open till 2AM daily",
    specials: "$5 High Noons every Tuesday",
    website: "https://slipperyslopechicago.com"
  },
  {
    name: "Estelle's",
    image: "https://via.placeholder.com/300x200?text=Estelle's",
    hours: "Open till 4AM weekends",
    specials: "$3 PBR + shot combo",
    website: "https://estelleschicago.com"
  },
  {
    name: "Smart Bar",
    image: "https://via.placeholder.com/300x200?text=Smart+Bar",
    hours: "Open 10PM–4AM",
    specials: "Half-price cover before 11PM",
    website: "https://smartbarchicago.com"
  },
  {
    name: "The Violet Hour",
    image: "https://via.placeholder.com/300x200?text=The+Violet+Hour",
    hours: "Open 5PM–2AM",
    specials: "$10 signature cocktails on Mondays",
    website: "https://theviolethour.com"
  }
];

function getRandomBarOptions() {
  const correct = bars[Math.floor(Math.random() * bars.length)];
  const others = bars.filter(b => b.name !== correct.name);
  const options = [correct.name, ...others.sort(() => 0.5 - Math.random()).slice(0, 3).map(b => b.name)];
  return {
    correct,
    options: options.sort(() => 0.5 - Math.random())
  };
}

function loadBarTrivia() {
  const { correct, options } = getRandomBarOptions();

  // Setup trivia view
  document.getElementById("trivia-card").classList.remove("hidden");
  document.getElementById("result-screen").classList.add("hidden");

  document.getElementById("bar-image").src = correct.image;

  const choiceContainer = document.querySelector(".choices");
  choiceContainer.innerHTML = "";

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = option;
    btn.onclick = () => {
      showResult(option === correct.name, correct);
    };
    choiceContainer.appendChild(btn);
  });
}

function showResult(isCorrect, bar) {
  document.getElementById("trivia-card").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  document.getElementById("result-msg").textContent = isCorrect ? "✅ Correct!" : "❌ Wrong...";
  document.getElementById("bar-name").textContent = bar.name;
  document.getElementById("bar-hours").textContent = `🕒 ${bar.hours}`;
  document.getElementById("bar-specials").textContent = `🍻 ${bar.specials}`;
  document.getElementById("bar-link").href = bar.website;
  document.getElementById("result-image").src = bar.image;
}

window.onload = loadBarTrivia;