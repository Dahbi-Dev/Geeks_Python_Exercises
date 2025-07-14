const form = document.getElementById("form")
const output = document.getElementById("output")

form.addEventListener('submit' ,function(event){
    event.preventDefault()

    const formData = new FormData(form)
    const data = {}

    formData.forEach((value, key)=>{
        data[key] = value
    })

    const jsonString = JSON.stringify(data , null , 2)
    output.textContent = jsonString
})