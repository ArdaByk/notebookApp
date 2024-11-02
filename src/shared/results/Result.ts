export class Result {

    success: string;
    message: string;
    data?: any

    constructor(success, message, data?) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

}