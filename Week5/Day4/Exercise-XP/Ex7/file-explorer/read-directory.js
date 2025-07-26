const fs = require('fs')
try {
fs.readdirSync('.').forEach(file => console.log(file))
    
} catch (error) {
    console.error(error)
}
