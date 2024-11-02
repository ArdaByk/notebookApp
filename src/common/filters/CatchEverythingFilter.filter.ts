import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,

} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
    constructor(private httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message: any =
            exception instanceof HttpException
                ? exception.getResponse()
                : 'Internal server error';

        response.status(status).json({
            success: false,
            statusCode: status,
            message: message.message,
            timestamp: new Date().toISOString(),
        });
    }
}
