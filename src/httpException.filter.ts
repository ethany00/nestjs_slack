import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

// 인터셉터는 컨트롤러,서비스 앞뒤에서 실행되고 exceptionfilter는 무조건 컨트롤러 뒤에서 실행
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const err = exception.getResponse() as
            | { message: any; statusCode: number }
            | { error: string; statusCode: 400; message: string[] }; // class-validator 타이핑

        if (typeof err !== 'string' && err.statusCode === 400) {
            // class-validator 에러
            return response.status(status).json({
                success: false,
                code: status,
                data: err.message,
            });
        }

        response.status(status).json({
            success: false,
            code: status,
            data: err.message,
        });
    }
}