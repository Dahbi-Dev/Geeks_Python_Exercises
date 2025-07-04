const planets = [
  { name: "mercury", moons: 0 },
  { name: "venus", moons: 0 },
  { name: "earth", moons: 1 },
  { name: "mars", moons: 2 },
  { name: "jupiter", moons: 79 },
  { name: "saturn", moons: 83 },
  { name: "uranus", moons: 27 },
  { name: "neptune", moons: 14 }
];

const section = document.querySelector(".listPlanets");

planets.forEach((planet, index) => {
  const planetDiv = document.createElement("div");
  planetDiv.classList.add("planet", planet.name);
  planetDiv.textContent = planet.name.charAt(0).toUpperCase() + planet.name.slice(1);
  section.appendChild(planetDiv);

  for (let i = 0; i < planet.moons; i++) {
    const moon = document.createElement("div");
    moon.classList.add("moon");
    const angle = (i / planet.moons) * 360;
    const radius = 60 + (i * 3) % 50;
    const rad = angle * (Math.PI / 180);
    moon.style.left = 50 + radius * Math.cos(rad) + "px";
    moon.style.top = 50 + radius * Math.sin(rad) + "px";
    planetDiv.appendChild(moon);
  }
});
