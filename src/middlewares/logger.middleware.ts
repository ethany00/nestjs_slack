import {Injectable,Logger,NestMiddleware} from "@nestjs/common";
import {Request,Response,NextFunction} from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction) {
        // 1. 미들웨어에서 먼저 실행
        const {ip,method,originalUrl} = request;
        const userAgent = request.get('user-agent') || '';

        response.on('finish',()=>{
            // 3. 라우터 종료 후 실행
           const {statusCode} = response;
           const contentLength = response.get('content-length');
           // Logger.log() 이런식으로 사용해도되고, nest에선 콘솔로그 대신 로거를 사용/
           this.logger.log(
             `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
           );
        });
        // 2. 라우터 실행
        next();
    }
}