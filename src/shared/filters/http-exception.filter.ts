import { HttpException } from '@nestjs/common'
// 全局异常处理器 --- 统一错误格式

import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>()
    const req = host.switchToHttp().getRequest<Request>()

    const errData = {
      code: exception.getStatus(),
      message: exception.message ?? '服务器内部错误，请联系管理员解决',
      data: null,
      path: req.path,
      method: req.method,
      args: { ...req.body, ...req.params, ...req.query },
    }

    res.status(exception.getStatus()).send(errData)
  }
}
