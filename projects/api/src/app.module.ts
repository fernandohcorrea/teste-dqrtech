import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configModuleOptions from 'src/_config/config-options';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightsModule } from './knights/knights.module';
import databases from 'src/_config/databases';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MongooseModule.forRootAsync(databases.dqrtech),
    KnightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
