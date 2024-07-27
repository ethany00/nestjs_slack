import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {catchError, map, Observable} from "rxjs";

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
      // 전 부분
      return next.handle()
          .pipe(map((data)=>data === undefined ? null : data));
          //.pipe(catchError((err:any) => {})); // 에러트레킹도 가능
  }
}