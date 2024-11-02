import { Controller, UsePipes, ValidationPipe, Post, Body, HttpStatus, BadRequestException, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/CreateUserDTO.dto';
import { LoginUserDTO } from './dto/LoginUserDTO';
import { BaseResponse } from 'src/shared/response/BaseResponse';

@Controller('auth')
export class AuthController {

    constructor(readonly authService: AuthService) { }

    @Post("register")
    @UsePipes(ValidationPipe)
    async register(@Body() body: CreateUserDTO) {

        const registerUser = await this.authService.register(body);

        if (!registerUser.success) {

            throw new BadRequestException(registerUser.message)
        }

        return new BaseResponse(registerUser.message, HttpStatus.OK, registerUser.data)
    }


    @Post("login")
    @UsePipes(ValidationPipe)
    async login(@Body() body: LoginUserDTO,) {

        const loginUser = await this.authService.login(body);
        if (!loginUser.success) {

            throw new BadRequestException(loginUser.message)
        }

        return new BaseResponse(loginUser.message, HttpStatus.OK, loginUser.data)
    }

}
