export interface IResponseType<T = any> {
    data: T,
    code: number,
    msg: string
}