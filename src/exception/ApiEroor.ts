

export class ApiError extends Error {
    readonly status: number  
    

    constructor(status: number, message: string) {
        super(message)
        this.status = status    
          
    }

    static BadRequest(message: string) {
        return new ApiError(400, message)
    }

    static NotFound(message: string) {
        return new ApiError(404, message)
    }

    static IsNotAdmin() {
        return new ApiError(403, 'You are not an administrator')
    }

    static UnauthorizedError() {
        return new ApiError(401, 'The user is not logged in')
    }
}