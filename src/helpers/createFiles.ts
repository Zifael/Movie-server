import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { ApiError } from '../exception/ApiEroor'
import { TypeFiles } from '../types'


interface IFiles {
    img?: string
    video?: string
}

export const createFiles = (files: TypeFiles) => {        

    const objectFiles: IFiles = {}

    const {img} = files
    // creating an image
    if (img) {
        const fileNameImage = uuidv4() + '.jpg'    
        img.mv(path.resolve(__dirname, '..', 'static/img', fileNameImage))
        objectFiles.img = fileNameImage
    }
   

    const {video} = files
    // creating a video
    if (video) {        
        if (video.name.split('.')[1] !== 'mp4') {
            throw ApiError.BadRequest('Данный файл не являтся видео')
        }
        const fileNameVideo = uuidv4() + '.mp4'
        video.mv(path.resolve(__dirname, '..', 'static/video', fileNameVideo))
        objectFiles.video = fileNameVideo
    }
   
    return objectFiles
}