import { IsNotEmpty } from "class-validator";
import { Constants } from "src/common/constants/Constants.enum";

export class UpdateNoteDTO {
    @IsNotEmpty({ message: Constants.REQUIRED_FIELD })
    title: string;
    @IsNotEmpty({ message: Constants.REQUIRED_FIELD })
    content: string;
}