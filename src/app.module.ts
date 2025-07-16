import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { CategoryModule } from './modules/category/category.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './modules/courses/courses.module';
import { AdminModule } from './modules/admin/admin.module';
import { MentorProfileModule } from './modules/mentor-profile/mentor-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[".env"]
    }),
    UsersModule, 
    CategoryModule, 
    CoreModule, 
    CoursesModule, 
    AdminModule, 
    MentorProfileModule
  ],

})
export class AppModule {}
