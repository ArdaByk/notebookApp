import { Body, Controller, Get, HttpStatus, Param, Post, ValidationPipe, UsePipes, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../auth/dto/CreateUserDTO.dto';
import { BaseResponse } from 'src/shared/response/BaseResponse';

@Controller('users')
export class UsersController {

    constructor(private userSerivce: UsersService) { }

    @Post("create")
    @UsePipes(ValidationPipe)
    async createUser(@Body() body: CreateUserDTO) {

        const newUser = await this.userSerivce.createUser(body);

        if (!newUser.success) {

            throw new BadRequestException(newUser.message);
        }

        return new BaseResponse(newUser.message, HttpStatus.CREATED);
    }

    @Get("get/:email")
    async getUser(@Param("email") email: string) {

        const user = await this.userSerivce.getUserByEmail(email);

        if (!user.success) {

            throw new BadRequestException(user.message);
        }

        return new BaseResponse(user.message, HttpStatus.OK, user.data);
    }

}
