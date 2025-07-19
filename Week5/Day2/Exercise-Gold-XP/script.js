// Exercise 1 : Giphy API #2
const img = document.getElementById("img")
const container = document.getElementById("container")

const fetchGifs = async (search) => {
    const api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
    let tag = search

    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=${tag}`)


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()

        img.innerHTML = ""


        img.src = data.data.images.original.url;
        img.alt = `${data.data.id}`
        container.appendChild(img)



    } catch (error) {
        console.error("Error fetching data:", error);

    }
}





// Exercise 2 : Analyze #2

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

let sequentialStart = async function () {
    console.log('==SEQUENTIAL START==');
    const slow = await resolveAfter2Seconds();
    console.log(slow);
    const fast = await resolveAfter1Second();
    console.log(fast);
}

sequentialStart()



// The sequentialStart function logs start, 
// waits 2 seconds for the slow promise, logs its result, 
// then waits 1 second for the fast promise,
//  and logs that too — total time: ~3 seconds.






// Exercise 3 : Analyze #3

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

let concurrentStart = async function () {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds2();
    const fast = resolveAfter1Second2();
    console.log(await slow);
    console.log(await fast);
}

setTimeout(concurrentStart, 4000)



// The concurrentStart function starts both promises at the same time, 
// then awaits them in order — output comes after ~2 seconds: "slow", 
// then "fast".



// Exercise 4 : Modify fetch with Async/Await
const urls = [
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/albums"
];

const getData = async function () {
    try {
       const response = await Promise.all(urls.map(async url=>{
            const res = await fetch(url)
            return res.json()
        }))

        const [ users, posts, albums] = response
      
        console.log('users', users);
        console.log('posts', posts);
        console.log('albums', albums);
    } catch (error) {
        throw new Error("ooooooops" , error)

    }

}

getData()