import { Result } from "./Result";

export class SuccessResult extends Result {

    constructor(message, data?) {
        if (data) {
            super(true, message, data)
        }
        else {
            super(true, message)
        }
    }

}