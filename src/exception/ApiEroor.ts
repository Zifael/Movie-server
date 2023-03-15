

export class ApiError extends Error {
    readonly status: number  
    

    constructor(status: number, message: string) {
        super(message)
        this.status = status    
          
    }

    static BadRequest(message: string) {
        return new ApiError(400, message)
    }
}