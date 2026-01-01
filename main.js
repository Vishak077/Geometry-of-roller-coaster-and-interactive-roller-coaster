// Speed control
const speedSlider = document.getElementById("speed");
speedSlider.addEventListener("input", () => {
    speed = parseFloat(speedSlider.value);
});

// Geometry facts
const facts = [
    "Clothoid curves are used to gradually change acceleration.",
    "Circular loops cause high G-forces at the bottom.",
    "Banked turns reduce lateral forces using geometry.",
    "Spline curves ensure smooth motion in real coasters."
];

document.getElementById("factBtn").addEventListener("click", () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById("fact").innerText = randomFact;
});
