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
  const options = [correct.name, ...others.sort(() => 0.5 - Math.random()).slice(0, 3)];
  return {
    correct,
    options: options.sort(() => 0.5 - Math.random())
  };
}

function loadBarTrivia() {
  const { correct, options } = getRandomBarOptions();
  document.getElementById("bar-image").src = correct.image;
  document.getElementById("bar-name").textContent = correct.name;
  document.querySelector("#reveal p:nth-of-type(1)").textContent = `🕒 ${correct.hours}`;
  document.querySelector("#reveal p:nth-of-type(2)").textContent = `🍻 ${correct.specials}`;
  document.querySelector("#reveal a").href = correct.website;

  const choiceContainer = document.querySelector(".choices");
  choiceContainer.innerHTML = "";
  document.getElementById("reveal").classList.add("hidden");

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = option;
    btn.onclick = () => {
      document.getElementById("reveal").classList.remove("hidden");
      if (option === correct.name) {
        btn.style.backgroundColor = "green";
      } else {
        btn.style.backgroundColor = "red";
      }
    };
    choiceContainer.appendChild(btn);
  });
}

window.onload = loadBarTrivia;