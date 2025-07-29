const axios = require('axios')
const chalk = require('chalk')

const fetchData = async () =>{
    try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
        console.log(chalk.green.bold("Posts Fetched !!!"))
        return  res.data
        
        console.log(data)
    } catch (error) {
        console.log(chalk.red.bold(`Error ${error}`))
    }
}

module.exports = fetchData