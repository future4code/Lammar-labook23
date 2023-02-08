import { CustomError } from "./CustomError";

export class InvalidDescription extends CustomError {
    constructor(){
        super(422, "The description must have at least 5 characters.")
    }
}

export class InvalidType extends CustomError {
    constructor(){
        super(422, "The type must be 'normal' or 'event'.")
    }
}
