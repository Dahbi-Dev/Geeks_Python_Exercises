const api_key = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';

const form = document.getElementById("form");
const input = document.getElementById("input");
const container = document.getElementById("container");
const deleteAllBtn = document.getElementById("delete");
const manyButton = document.getElementById("many");
const next = document.getElementById("next");
const prev = document.getElementById("previous");

let offset = 0;
const limit = 5;
let query = "";

// Fetch One Random GIF
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const category = input.value;

  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=${category}`);
    const data = await response.json();

    const wrapper = document.createElement("div");
    wrapper.className = "relative";

    const img = document.createElement("img");
    img.src = data.data.images.original.url;
    img.className = "size-64 shadow-xl border rounded-lg";

    const delBtn = document.createElement("button");
    delBtn.textContent = "DELETE";
    delBtn.className = "absolute top-2 right-2 bg-red-600 text-white p-1 rounded";
    delBtn.addEventListener("click", () => {
      wrapper.remove();
    });

    wrapper.appendChild(img);
    wrapper.appendChild(delBtn);
    container.appendChild(wrapper);

    input.value = "";

  } catch (err) {
    console.error("Error fetching random GIF:", err);
  }
});

// Fetch Many GIFs by Search
manyButton.addEventListener("click", async (e) => {
  e.preventDefault();
  query = input.value;
  offset = 0;
  await fetchMany();
});

async function fetchMany() {
  try {
    container.innerHTML = "";

    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=${limit}&offset=${offset}`);
    const data = await response.json();

    data.data.forEach(gif => {
      const img = document.createElement("img");
      img.src = gif.images.original.url;
      img.className = "size-64 shadow-xl border rounded-lg";
      container.appendChild(img);
    });

  } catch (error) {
    console.error("There is an error:", error);
  }
}

// Pagination
next.addEventListener("click", () => {
  offset += limit;
  fetchMany();
});

prev.addEventListener("click", () => {
  if (offset >= limit) {
    offset -= limit;
    fetchMany();
  }
});

// Delete All
deleteAllBtn.addEventListener('click', (e) => {
  e.preventDefault();
  container.innerHTML = "";
  input.value = "";
  console.clear();
});
