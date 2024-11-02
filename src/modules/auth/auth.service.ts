import { Injectable, UseFilters } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './dto/LoginUserDTO';
import * as bcrypt from "bcrypt"
import { ErrorResult } from 'src/shared/results/ErrorResult';
import { CatchEverythingFilter } from 'src/common/filters/CatchEverythingFilter.filter';
import { SuccessResult } from 'src/shared/results/SuccessResult';
import { Constants } from 'src/common/constants/Constants.enum';

@UseFilters(CatchEverythingFilter)
@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async register(body: CreateUserDTO) {

        const newUser = await this.userService.createUser(body);

        if (!newUser.success) {
            return new ErrorResult(newUser.message);
        }

        const token = await this.generateToken(body)

        return new SuccessResult(Constants.USER_CREATED_SUCCESS, token);
    }

    async login(body: LoginUserDTO) {

        const { email, password } = body;

        const checkUser = await this.userService.getUserByEmail(email)

        if (!checkUser.success) {
            return new ErrorResult(checkUser.message);
        }

        const isMatch = await bcrypt.compare(password, checkUser.data.passwordHash);

        if (!isMatch) {
            return new ErrorResult(checkUser.message);
        }

        const token = await this.generateToken(body);
        return new SuccessResult(Constants.LOGIN_SUCCESS, token);

    }

    private async generateToken(body) {

        const payload = {
            username: body.username,
            email: body.email
        }

        const token = await this.jwtService.signAsync(payload);
        return token
    }

}
