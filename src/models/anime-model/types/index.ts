export type AnimeModel = {
    id: number,
    title: string,
    rating: number,
    status: 'Вышел' | 'Онгоинг' | 'Еще не вышел',
    releaseDate: string,
    description: string,
    linkPlayer: string,
}

export type RaitingModel = {
    id: number 
}

