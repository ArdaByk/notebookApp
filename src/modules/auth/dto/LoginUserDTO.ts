import { IsNotEmpty, Length, Matches } from "class-validator";
import { Constants } from "src/common/constants/Constants.enum";

export class LoginUserDTO {
    @IsNotEmpty({message: Constants.EMAIL_REQUIRED})
    @Matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        {
            message: Constants.EMAIL_INVALID
        }
    )
    email: string;
    @IsNotEmpty({message: Constants.PASSWORD_REQUIRED})
    password: string;
}