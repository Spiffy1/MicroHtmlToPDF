import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleModule } from './google/google.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [GoogleModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
