declare type IResponseType<T = any> = {
    data: T
    code: number
    msg: string
}