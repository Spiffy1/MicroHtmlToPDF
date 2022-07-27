import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConverterModule } from './converter/converter.module'
import { CoreModule } from './core/core.module'

@Module({
  imports: [ConverterModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
