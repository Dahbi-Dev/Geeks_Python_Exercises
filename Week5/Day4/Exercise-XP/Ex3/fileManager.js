import fs from 'fs'


export const readFile = async() => {
    try {
        const content = await fs.readFileSync('Hello World.txt', 'utf8')
        console.log("File Was Readed")
        console.log(content)
    } catch (error) {
        console.error('Error reading file:', error);

    }

}

export const writeFile = async() => {
    try {
        await fs.writeFileSync("Bye World.txt", "Bye World !!")
        console.log("file was written!")        
    } catch (error) {
        console.error('Error writing file:', error);

    }

}

