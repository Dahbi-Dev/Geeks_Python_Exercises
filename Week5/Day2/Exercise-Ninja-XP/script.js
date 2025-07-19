// Exercise 1 : Giphy API #3
const container = document.getElementById("img-container")
const img = document.getElementById("image")
const find = document.getElementById('find')
const deleteGif = document.getElementById('delete')
const input = document.getElementById('input')


const searchName = input.value.toLocaleLowerCase()
const fetchGifs = async () => {
    const api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
    let searchName;



    try {
        searchName = input.value.toLocaleLowerCase()

        const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchName}&rating=g&api_key=${api_key}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()
        container.innerHTML = ""


        data.data.forEach(gif => {
            const img = document.createElement("img")
            img.id = "image"
            img.src = gif.images.original.url
            img.alt = "test"
            img.style.padding = "10px"
            img.style.height = "50px"
            img.style.maxWidth = "300px"
            img.style.flexWrap = "wrap"
            container.appendChild(img)





        })

    } catch (error) {
        console.error("Error fetching data:", error);

    }


}




function Reset() {
    input.value = ""
    container.innerHTML = ""

}




// Exercise2: Analyze #4


let resolveAfter2Seconds1 = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

let resolveAfter1Second1 = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

//The Promise.all() method returns a single Promise that fulfills when all of the promises passed as an iterable have been fulfilled.

let concurrentPromise = function () {
    console.log('==CONCURRENT START with Promise.all==');
    return Promise.all([resolveAfter2Seconds1(),
        resolveAfter1Second1()
    ]).then((messages) => {
        console.log(messages[0]);
        console.log(messages[1]);
    });
}

setTimeout(concurrentPromise, 1000)

// The concurrentPromise function starts both promises at the same time 
// and logs their results together after both resolve — total time: ~2 seconds.


// Exercise : 3 #5

let resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

let resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

let parallel = async function () {
    console.log('==PARALLEL with await Promise.all==');
    // Start 2 "jobs" in parallel and wait for both of them to complete
    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))(),
        (async () => console.log(await resolveAfter1Second()))()
    ]);
}

setTimeout(parallel, 5000)

// The parallel function starts both promises at the same time using async IIFEs and logs their results when each resolves — total time: ~2 seconds.


// Exercise 4 : Analyze #6

let resolveAfter2Seconds2 = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

let resolveAfter1Second2 = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

// This function does not handle errors. See warning below!
let parallelPromise = function () {
    console.log('==PARALLEL with Promise.then==');
    resolveAfter2Seconds2().then((message) => console.log(message));
    resolveAfter1Second2().then((message) => console.log(message));
}

setTimeout(parallelPromise, 13000)



// The parallelPromise function starts both promises at the same time and logs their messages as each resolves — first "fast" after 1s, then "slow" after 2s.