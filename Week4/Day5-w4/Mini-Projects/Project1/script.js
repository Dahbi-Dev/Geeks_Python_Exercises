 const robots = [{
         id: 1,
         name: 'Leanne Graham',
         username: 'Bret',
         email: 'Sincere@april.biz',
         image: 'https://robohash.org/1?200x200'
     },
     {
         id: 2,
         name: 'Ervin Howell',
         username: 'Antonette',
         email: 'Shanna@melissa.tv',
         image: 'https://robohash.org/2?200x200'
     },
     {
         id: 3,
         name: 'Clementine Bauch',
         username: 'Samantha',
         email: 'Nathan@yesenia.net',
         image: 'https://robohash.org/3?200x200'
     },
     {
         id: 4,
         name: 'Patricia Lebsack',
         username: 'Karianne',
         email: 'Julianne.OConner@kory.org',
         image: 'https://robohash.org/4?200x200'
     },
     {
         id: 5,
         name: 'Chelsey Dietrich',
         username: 'Kamren',
         email: 'Lucio_Hettinger@annie.ca',
         image: 'https://robohash.org/5?200x200'
     },
     {
         id: 6,
         name: 'Mrs. Dennis Schulist',
         username: 'Leopoldo_Corkery',
         email: 'Karley_Dach@jasper.info',
         image: 'https://robohash.org/6?200x200'
     },
     {
         id: 7,
         name: 'Kurtis Weissnat',
         username: 'Elwyn.Skiles',
         email: 'Telly.Hoeger@billy.biz',
         image: 'https://robohash.org/7?200x200'
     },
     {
         id: 8,
         name: 'Nicholas Runolfsdottir V',
         username: 'Maxime_Nienow',
         email: 'Sherwood@rosamond.me',
         image: 'https://robohash.org/8?200x200'
     },
     {
         id: 9,
         name: 'Glenna Reichert',
         username: 'Delphine',
         email: 'Chaim_McDermott@dana.io',
         image: 'https://robohash.org/9?200x200'
     },
     {
         id: 10,
         name: 'Clementina DuBuque',
         username: 'Moriah.Stanton',
         email: 'Rey.Padberg@karina.biz',
         image: 'https://robohash.org/10?200x200'
     }
 ];

 // const jsonRobots = JSON.stringify(robots)



 const main = document.createElement("main")
 main.id = "card-container"
 document.body.appendChild(main)
 robots.forEach((data, index) => {

     const img = document.createElement("img")
     img.alt = `Robot ${data.id}`
     img.height = "200"
     img.width = "200"

     const nameRobot = document.createElement("h2")
     const email = document.createElement("p")
     const card = document.createElement("div")
     card.classList.add("card")

     img.src = data.image
     nameRobot.textContent = data.name
     email.textContent = data.email

     main.appendChild(card)
     card.appendChild(img)
     card.appendChild(nameRobot)
     card.appendChild(email)
 })



 // search
 function search() {
     const input = document.getElementById("search-input").value.trim().toLowerCase()
     const found = robots.filter(data => data.name.toLowerCase().includes(input)  )
     main.innerHTML = "";



     found.forEach((data, index) => {

         const img = document.createElement("img")
         img.alt = `Robot ${data.id}`
         img.height = "200"
         img.width = "200"

         const nameRobot = document.createElement("h2")
         const email = document.createElement("p")
         const card = document.createElement("div")
         card.classList.add("card")

         img.src = data.image
         nameRobot.textContent = data.name
         email.textContent = data.email

         main.appendChild(card)
         card.appendChild(img)
         card.appendChild(nameRobot)
         card.appendChild(email)
     })







 }