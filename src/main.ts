import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/Response.interceptor';
import { CatchEverythingFilter } from './common/filters/CatchEverythingFilter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);

  const catchEverythingFilter = new CatchEverythingFilter(httpAdapterHost);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(catchEverythingFilter);

  await app.listen(3000);
}
bootstrap();
