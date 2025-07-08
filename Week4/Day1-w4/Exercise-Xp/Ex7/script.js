// 🌟 Exercise 7 : Welcome


// John has just signed in to your website and you want to welcome him.

// 1- Create a Navbar in your HTML file.

// 2- In your js file, create a self invoking funtion that takes 1 argument: 
//    the name of the user that just signed in.

const user = (username) =>{
    console.log(`The user ${username} just signed in`)
    // create user message div
    const div = document.createElement("div")
    div.id = "container"
    div.className = "message"
    div.style.display = "none"
    div.style.justifyContent = "end"
    div.style.margin = "20px"
    div.style.gap = "20px"
    
    // username 
    const userText = document.createElement("p")
    userText.textContent = username
    userText.style.fontFamily = "sans-serif"
    div.appendChild(userText)
    
    
    
    
    // create user picture
    const img = document.createElement("img")
    img.src = "https://picsum.photos/200/300"
    img.id = "image"
    img.alt = "user_image"
    img.style.height = "40px"
    img.style.width = "40px"
    img.style.borderRadius = "20px"
    
    div.appendChild(img)
    
    
    document.getElementById("navbar").appendChild(div)

   

} 

 const div2 = document.createElement("div")
    div2.id = "signin"
    div2.style.display = "flex";
    div2.style.justifyContent = "center";
    div2.style.alignItems = "center";
    div2.style.height = "100vh"; // full screen height
    div2.style.backgroundColor = "#f0f0f0";



    const input = document.createElement("input")
    input.type = "text"
    


    const signin = document.createElement("button")
    signin.textContent= "Sign in"
    signin.style.backgroundColor = "white"
    signin.style.border = "1px solid black"
    signin.style.borderRadius = "8px"
    signin.style.fontSize  = "18px"
    signin.style.display = "flex"
    signin.style.cursor = "pointer"


    signin.onclick = function(){
        const username = input.value.trim()
        if (username) {
            user(username)
            document.getElementById("container").style.display = "flex"
            div2.style.display = "none"
        } else {
                    alert("Please enter your name.");

            
        }
    }
    
    div2.appendChild(input)
    document.body.appendChild(div2)
    div2.appendChild(signin)
    
    
    



// 3- The function should add a div in the nabvar, 
//    displaying the name of the user and his profile picture.