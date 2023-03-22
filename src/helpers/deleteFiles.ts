import fs from 'fs'
import path from 'path' 
import { ApiError } from '../exception/ApiEroor'

interface Files {   
    img?: string
    video?: string
}

export const deleteFiles = (files: Files) => {    
   
    if (files.img) {
        fs.unlink(path.resolve(__dirname, '..', `static/img/${files.img}`), (err) => {
            if (err) {
                throw err
            }
        })
    }  

    if (files.video) {
        fs.unlink(path.resolve(__dirname, '..', `static/video/${files.video}`), (err) => {
            if (err) {
                throw err
            }
        })  
    }
}