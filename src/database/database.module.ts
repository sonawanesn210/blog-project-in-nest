// database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('MONGO_URI'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
      }),
    ],
  })
  export class DatabaseModule {}
