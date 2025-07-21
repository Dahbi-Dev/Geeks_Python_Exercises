const box = document.getElementById("box");
const message = document.getElementById("message");
const button = document.getElementById("findBtn");
let personNumber = 1;
let planetNumber = 1;

function loadPerson() {
    message.innerHTML = `
        <div class="loader"></div>
        <div>Loading...</div>
      `;
}

button.addEventListener("click", fetchPerson);

async function fetchPerson() {
    console.clear()

    try {
        const response = await fetch(`https://www.swapi.tech/api/people/${personNumber}`)
        const data = await response.json();
        console.log(data)

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        loadPerson();
        const response2 = await fetch(`https://www.swapi.tech/api/planets/${planetNumber}`)
        const data2 = await response2.json()
        console.log(data2)

         if (!response2.ok) {
            throw new Error("Network response was not ok");
        }
        


        setTimeout(() => {
            personNumber += 1;
            planetNumber += 1;
            message.innerHTML = `
            <p>Name : ${data.result.properties.name}</p>
            <p>Height : ${data.result.properties.height} Cm</p>
            <p>Gender : ${data.result.properties.gender}</p>
            <p>Birth Year : ${data.result.properties.birth_year}</p>
            <p>Home World : ${data2.result.properties.name}</p>
            
            `
        }, 1500)



    } catch (error) {
        message.innerHTML = "Oh No! That person isnt available";
        console.error("Error fetching data:", error);
    }


}