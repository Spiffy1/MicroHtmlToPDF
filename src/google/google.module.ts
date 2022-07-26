import { Module } from '@nestjs/common'
import { GoogleService } from './google.service'
import { GoogleController } from './google.controller'
import { CoreModule } from 'src/core/core.module'

@Module({
  imports: [CoreModule],
  controllers: [GoogleController],
  providers: [GoogleService],
})
export class GoogleModule {}
