import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateNoteDTO } from './dto/createNoteDTO.dto';
import { Request, Response } from 'express';
import { UpdateNoteDTO } from './dto/updateNoteDTO.dto';
import { BaseResponse } from 'src/shared/response/BaseResponse';

@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {

    constructor(private readonly noteService: NotesService) { }

    @UsePipes(ValidationPipe)
    @Post("create")
    async createNote(@Body() body: CreateNoteDTO, @Req() req: Request) {

        const newNote = await this.noteService.createNote(body, req["user"].email);

        if (!newNote.success) {
            throw new BadRequestException(newNote.message)
        }

        return new BaseResponse(newNote.message, HttpStatus.CREATED);

    }

    @UsePipes(ValidationPipe)
    @Put("update/:id")
    async updateNote(@Body() body: UpdateNoteDTO, @Param("id") id: number, @Req() req: Request) {

        const updateNote = await this.noteService.updateNote(id, body, req["user"].email);

        if (!updateNote.success) {
            throw new BadRequestException(updateNote.message)
        }

        return new BaseResponse(updateNote.message, HttpStatus.OK);

    }

    @Delete("delete/:id")
    async deleteNote(@Param("id") id: number, @Req() req: Request) {

        const deleteNote = await this.noteService.deleteNote(id, req["user"].email);

        if (!deleteNote.success) {

            throw new BadRequestException(deleteNote.message);
        }


        return new BaseResponse(deleteNote.message, HttpStatus.OK);
    }

    @Get("my-notes")
    async getMyNotes(@Req() req: Request) {

        const notes = await this.noteService.getMyNotes(req["user"].email);

        if (!notes.success) {
            throw new BadRequestException(notes.message);
        }

        return new BaseResponse(notes.message, HttpStatus.OK, notes.data);

    }

}
