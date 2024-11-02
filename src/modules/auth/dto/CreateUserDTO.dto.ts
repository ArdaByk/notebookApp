import { IsNotEmpty, Length, Matches } from "class-validator";
import { Constants } from "src/common/constants/Constants.enum";

export class CreateUserDTO {
    @IsNotEmpty({message: Constants.NAME_REQUIRED})
    @Length(5, 10)
    username: string;
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