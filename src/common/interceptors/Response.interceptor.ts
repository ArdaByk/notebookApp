import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { Response } from 'express';

export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const response = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
            map((data) => {

                response.status(data.status)

                if (data.data) {
                    return {
                        success: data.success,
                        message: data.message,
                        data: data.data,
                        timestamp: new Date().toISOString(),
                    };
                }
                else {
                    return {
                        success: data.success,
                        message: data.message,
                        timestamp: new Date().toISOString(),
                    };
                }

            }),
        );

    }
}