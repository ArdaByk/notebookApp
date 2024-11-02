import { Result } from "./Result";

export class ErrorResult extends Result {

    constructor(message, data?) {
        if (data) {
            super(false, message, data)
        }
        else {
            super(false, message)
        }
    }

}