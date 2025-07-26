import {  copyFileSync } from 'fs'


try {
    copyFileSync('source.txt' , 'destination.txt')
      console.log('File was copied!');

} catch (error) {
    console.error(error)
}