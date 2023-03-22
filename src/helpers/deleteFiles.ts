import fs from 'fs'
import path from 'path' 
import { ApiError } from '../exception/ApiEroor'

interface Files {   
    img?: string
    video?: string
}

export const deleteFiles = (files: Files) => {   
    
    for (let i in files) {
        
        let key = i as keyof Files

        if (files[key]) {
            // Check if the file exists
            fs.stat(path.resolve(__dirname, '..', `static/${key}/${files[key]}`), (err) => {
                // if there is a file, delete it
                if (!err) {
                    fs.unlink(path.resolve(__dirname, '..', `static/${key}/${files[key]}`), (err) => {
                        if (err) {
                            throw err
                        }
                    })
                }
            })
        }
    }
    
 
}