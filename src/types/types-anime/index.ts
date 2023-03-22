export interface IAnime {
    title: string
    description: string      
    releaseDate: string 
    status: 'Вышел' | 'Онгоинг' | 'Еще не вышел',
    idGenre: number[]       
}

export interface IQueryAnime {
    genre: string | string[]
    limit: number
    page: number
}

export interface IUpdateAnime {
    id: number
    title: string
    description?: string      
    releaseDate?: string 
    status?: 'Вышел' | 'Онгоинг' | 'Еще не вышел',
    idGenre?: number[],       
}


export interface IFilesAnime {
    img?: string
    video?: string
}