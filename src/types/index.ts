import { Request } from "express"
import { IncomingHttpHeaders } from "http"



export interface TypeRequestBody<T> extends Request {
    body: T,     
}


export interface TypeRequestQurey<T> extends Request<{}, {}, {}, T> {
    query: T
}


export interface TypeRequestParams<T> extends Request<T> {
    params: T
}

export interface TypeFiles  {
    img?: any,
    video?: any
}

export interface ReqHeader extends Request<{}, {}, {}, {}> {
    headers: IncomingHttpHeaders
}
