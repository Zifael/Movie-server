import { Request } from "express"
import { FileArray } from "express-fileupload"
import { TypeRequestBody } from "."

export interface IMovie {
    title: string
    description: string      
    releaseDate: string 
    status: 'Вышел' | 'Еще не вышел',
    idGenre: number[]       
}

export interface IQueryMovie {
    genre: string | string[]
    limit: number
    page: number
}

export interface IUpdateMovie {
    id: number
    title: string
    description?: string      
    releaseDate?: string 
    status?: 'Вышел' | 'Онгоинг' | 'Еще не вышел',
    idGenre?: number[],       
}







