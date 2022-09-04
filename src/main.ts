import { HttpExceptionFilter } from './shared/filters/http-exception.filter'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResInterceptor } from './shared/interceptor/res.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ResInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000)
}
bootstrap()
