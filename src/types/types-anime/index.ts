export interface iRequestBody {
    title: string
    status: 'Вышел' | 'Онгоинг' | 'Еще не вышел',
    releaseDate: string,
    description: string,
    linkPlayer: string,
}