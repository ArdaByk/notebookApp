import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from 'src/common/constants/Constants.enum';
import { Note, User } from 'src/shared/database/typeorm/entities';
import { ErrorResult } from 'src/shared/results/ErrorResult';
import { SuccessResult } from 'src/shared/results/SuccessResult';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {

    constructor(@InjectRepository(Note) readonly noteRepository: Repository<Note>, @InjectRepository(User) readonly userRepository: Repository<User>) { }

    async createNote(body, email) {

        const user = await this.userRepository.findOneBy({ email })

        const newNote = await this.noteRepository.create({ ...body, createdBy: user })
        await this.noteRepository.save(newNote);

        return new SuccessResult(Constants.NOTE_CREATED);

    }

    async updateNote(id, body, email) {

        const user = await this.userRepository.findOneBy({ email });
        const note = await this.noteRepository.findOne({
            where: { id },
            relations: ["createdBy"]
        });

        if (!note) {
            return new ErrorResult(Constants.NOTE_NOT_FOUND)
        }

        if (user.id != note.createdBy.id) {
            return new ErrorResult(Constants.ACCESS_DENIED)
        }

        await this.noteRepository.update(id, body);
        return new SuccessResult(Constants.NOTE_UPDATED);

    }

    async deleteNote(id, email) {

        const user = await this.userRepository.findOneBy({ email });

        const note = await this.noteRepository.findOne({ where: { id }, relations: ["createdBy"] })

        if (!note) {
            return new ErrorResult(Constants.NOTE_NOT_FOUND)
        }

        if (user.id != note.createdBy.id) {
            return new ErrorResult(Constants.ACCESS_DENIED)
        }

        await this.noteRepository.remove(note);
        return new SuccessResult(Constants.NOTE_DELETED);

    }

    async getMyNotes(email) {

        const user = await this.userRepository.findOneBy({ email });

        const myNotes = await this.noteRepository.findBy({ createdBy: user });
        return new SuccessResult(Constants.NOTES_LISTED, myNotes);

    }

}
