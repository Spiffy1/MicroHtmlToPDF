import { Module } from '@nestjs/common'
import { ConverterService } from './converter.service'
import { ConverterController } from './converter.controller'
import { CoreModule } from 'src/core/core.module'

@Module({
  imports: [CoreModule],
  controllers: [ConverterController],
  providers: [ConverterService],
})
export class ConverterModule {}
