export type MovieModel = {
    id: number,
    title: string,
    rating: number,
    status: 'Вышел' | 'Онгоинг' | 'Еще не вышел',
    releaseDate: string,
    description: string,
    video: string,
    img?: string,    
}

export type RaitingModel = {
    id: number 
}

