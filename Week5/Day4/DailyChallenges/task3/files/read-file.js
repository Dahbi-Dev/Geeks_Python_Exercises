import {readFileSync} from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


function ReadFile(){
    try {
    const content = readFileSync(`${__dirname}/file-data.txt`, 'utf8')
    console.log('file was read successfully!')
    console.log(content)
} catch (error) {
    console.error(error)
}
}

export default ReadFile