const api_key = "eed48a2dfcff2fe3b7614284"
const select = document.getElementById("select")
const select2 = document.getElementById("select2")
const result = document.getElementById("result")
const btn = document.getElementById("button")
const input = document.getElementById("input");
const erorr_container = document.getElementById("erorr-container");
const error_messaage = document.getElementById("error-message");
const success_container = document.getElementById("success-container");
const success_messaage = document.getElementById("success-message");
const spin = document.getElementById("spiner");




async function ExchangeRate(first, second, amount) {




    try {

        if (!isNaN(amount) && input.value.trim() !== "") {
            const res = await fetch(`https://v6.exchangerate-api.com/v6/${api_key}/pair/${first}/${second}/${amount}`)
            const data = await res.json()
            if (!res.ok) {
                console.error(`Error Fetching ${res.status}`)
            }

            spin.className = "none p-2"
            setTimeout(() => {
                success_container.className = "none flex justify-center my-2 mx-auto bg-green-500 h-15 p-2 rounded-lg "
                success_messaage.innerHTML = `Successfully Convert currency From ${first} To ${second}`
                console.log( `🟢 Successfully Convert currency From ${first} To ${second}`)
                spin.className = "hidden"
                result.innerHTML = data.conversion_result
            }, 1000)
        } else {
            console.log("🔴 Not a valid number");
            erorr_container.className = "none flex justify-center my-5 bg-red-500 h-10 p-2 rounded-lg "
            error_messaage.innerHTML = '🔴 Not a valid number or Empty input'
        }








    } catch (error) {
        console.error("Error Fetching data ", error.message)
    }
}

async function CreateCodes() {
    try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${api_key}/codes`)
        const data = await res.json()
        if (!res.ok) {
            console.error(`Error Fetching ${res.status}`)
        }

        data.supported_codes.forEach(element => {

            const fromOption = document.createElement("option")
            const toOption = document.createElement("option")
            fromOption.innerHTML = `${element[0]} - ${element[1]}`
            fromOption.value = element[0]
            fromOption.id = "fromOption"
            toOption.innerHTML = `${element[0]} - ${element[1]}`
            toOption.value = element[0]
            toOption.id = "toOption"

            select.appendChild(fromOption)
            select2.appendChild(toOption)



        });

    } catch (error) {
        console.error("Error Fetching data ", error.message)

    }
}


CreateCodes()






btn.addEventListener('click', () => {
    const first = select.value
    const second = select2.value
    const amount = Number(input.value)



    ExchangeRate(first, second, amount)
})


function Switch() {
    const temp = select.value;
    select.value = select2.value
    select2.value = temp ;

}