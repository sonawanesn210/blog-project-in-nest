import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { LikesModule } from './likes/likes.module';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule,CommentsModule,CategoriesModule,DatabaseModule,LikesModule,PostModule,ProfileModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
