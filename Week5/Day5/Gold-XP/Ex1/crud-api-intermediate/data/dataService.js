const axios = require('axios')
const chalk = require('chalk')

const fetchData = async () =>{
    try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
        console.log(chalk.green.bold("function Fetched Successfully"))
        return  res.data
    } catch (error) {
        console.log(`Error ${error}`)
        console.log(chalk.red.bold("Field To Fetch"))
    }
}
 
module.exports = fetchData