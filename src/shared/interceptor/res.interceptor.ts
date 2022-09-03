// 全局响应拦截器 --- 处理返回结果

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Response } from 'express'
import { map } from 'rxjs'

@Injectable()
export class ResInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const code = context.switchToHttp().getResponse<Response>().statusCode

    return next.handle().pipe(
      map((data) => ({
        code,
        data,
        message: '成功',
      })),
    )
  }
}
