// 🌟 Exercise 1 : Giphy API
// 🌟 Exercise 2 : Giphy API

const container = document.getElementById("container")

// const fetchGiphy = async (searchName) => {
//     container.innerHTML = "";
//     let limit;
//     let offset;

//     if (searchName === 'sun') {
//         // i change variable value to limit 10 gifs and start position is 2
//         limit = 10;
//         offset = 2;


//     } else {
//         console.error("error handling the variables values")
//     }

//     const loadingDiv = document.createElement("div");
//     loadingDiv.className = "text-center text-gray-600 p-4";
//     loadingDiv.textContent = "Loading...";
//     container.appendChild(loadingDiv);

//     try {
//         const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchName}&rating=g&limit=${limit}&offset=${offset}&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My`)


//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();



//         container.removeChild(loadingDiv);
//         console.clear();





//         data.data.forEach((gif) => {
//             const box = document.createElement("div");
//             box.className = "w-full sm:w-1/2 md:w-1/3 p-2 bg-white rounded shadow";
//             const img = document.createElement("img");
//             img.src = `https://media1.giphy.com/media/${gif.id}/giphy.gif`;
//             img.className = "w-full h-auto object-contain";
//             box.appendChild(img);
//             container.appendChild(box);
//             console.log(gif)
//         });



//     } catch (error) {
//         container.removeChild(loadingDiv);
//         container.textContent = "Failed to load GIFs.";
//         console.error("Error fetching data:", error);
//     }
// }

// // 🌟 Exercise 3 : Async function

// const starsShips = async () => {
//     try {
//         const response = await fetch("https://www.swapi.tech/api/starships/9/")
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         console.log(data.result)

//     } catch (error) {
//         console.error("Error fetching data:", error);

//     }

// }
// starsShips()


// 🌟 Exercise 4: Analyze
function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling');
    let result = await resolveAfter2Seconds();
    console.log(result);
}

asyncCall();

// Analyse : 
// The asyncCall function logs "calling",
//  waits 2 seconds for a promise to resolve, then logs "resolved".