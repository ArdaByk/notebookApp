import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/database/typeorm/entities';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../auth/dto/CreateUserDTO.dto';
import { Constants } from 'src/common/constants/Constants.enum';
import { ErrorResult } from 'src/shared/results/ErrorResult';
import { SuccessResult } from 'src/shared/results/SuccessResult';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) readonly userRepository: Repository<User>) { }

    async createUser(body: CreateUserDTO) {

        const { username, email, password } = body;

        const checkUser = await this.userRepository.findOneBy({ email: body.email })

        if (checkUser) {
            return new ErrorResult(Constants.USER_ALREADY_EXISTS);
        }

        const newUser = await this.userRepository.create({ username, email, passwordHash: password });
        const user = await this.userRepository.save(newUser);

        return new SuccessResult(Constants.USER_CREATED_SUCCESS, user);

    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOneBy({ email })

        if (!user) {
            return new ErrorResult(Constants.USER_NOT_FOUND);
        } else {
            return new SuccessResult(Constants.USER_LISTED, user);
        }


    }

}
