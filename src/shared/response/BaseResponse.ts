export class BaseResponse {

    success: boolean = true;
    status: number;
    message: string;
    data?: any;

    constructor(message, status, data?) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

}