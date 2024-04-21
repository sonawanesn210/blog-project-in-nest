export function successResponse(data?: any,message?:string){
    return {
        error: false,
        message: message,
        data: data
    }
}

export function errorResponse(message: string, data: any = null) {
    return {
        error: true,
        message: message,
        data: data
    };
}