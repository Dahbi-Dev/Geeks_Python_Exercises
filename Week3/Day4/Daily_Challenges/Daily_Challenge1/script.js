document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("libform");
    const storySpan = document.getElementById("story");

    // Inputs
    const noun = document.getElementById("noun");
    const adjective = document.getElementById("adjective");
    const person = document.getElementById("person");
    const verb = document.getElementById("verb");
    const place = document.getElementById("place");

    // Story templates with placeholders
    const templates = [
        (n, a, p, v, pl) => `Once upon a time, ${p} went to ${pl} with a very ${a} ${n} who loved to ${v}.`,
        (n, a, p, v, pl) => `${p} couldn't believe their eyes when a ${a} ${n} appeared in ${pl} and started to ${v}.`,
        (n, a, p, v, pl) => `In ${pl}, a ${a} ${n} taught ${p} how to ${v} like a pro.`,
        (n, a, p, v, pl) => `Legend has it that ${p} still ${v}s the ${a} ${n} they found in ${pl}.`,
        (n, a, p, v, pl) => `No one expected ${p} to bring a ${a} ${n} to ${pl}, especially not one that could ${v}!`
    ];

    let lastInputs = {}; // Store last input for shuffling

    // Function to generate a story
    function generateStory(inputs) {
        const randomIndex = Math.floor(Math.random() * templates.length);
        return templates[randomIndex](...inputs);
    }

    // Submit handler
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const inputs = [
            noun.value.trim(),
            adjective.value.trim(),
            person.value.trim(),
            verb.value.trim(),
            place.value.trim()
        ];

        // Check for empty fields
        if (inputs.some(val => val === "")) {
            alert("Please fill in all the fields.");
            return;
        }

        lastInputs = inputs; // Save values for shuffling
        storySpan.textContent = generateStory(inputs);
    });

    // Add shuffle button
    const shuffleBtn = document.createElement("button");
    shuffleBtn.textContent = "Shuffle Story";
    shuffleBtn.type = "button";
    form.appendChild(shuffleBtn);

    shuffleBtn.addEventListener("click", () => {
        if (!lastInputs || Object.keys(lastInputs).length === 0) {
            alert("Please generate a story first!");
            return;
        }
        storySpan.textContent = generateStory(lastInputs);
    });
});
