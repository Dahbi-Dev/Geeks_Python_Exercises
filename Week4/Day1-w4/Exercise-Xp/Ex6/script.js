document.getElementById("Ex6").textContent = "Exercise 6"
// Exercise 6 : Fortune teller

function info ({numberChildren ,partner, Geo, Jobtitle }){
    console.log(`You will be a ${Jobtitle} in ${Geo}, and married to ${partner} with ${numberChildren} kids.`)
}
info({
    partner: "Ledia",
    numberChildren : 5,
    Jobtitle: "Full-Stack Developer",
    Geo: "Casablanca",
})

