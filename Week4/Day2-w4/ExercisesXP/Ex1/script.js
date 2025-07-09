
const ol = document.getElementById("ol")

const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

colors.forEach(function(colors, index){
    index += 1

    choices = `#${index} choice is ${colors}.`
    const item = document.createElement("li")
    item.textContent = `choice is ${colors}.`
    ol.appendChild(item)
    console.log(choices)
    if (colors == "Violet") {
        console.log(`Yeah and it index is ${index} in the array`)
    } else {
        console.log("No...")
    }
})