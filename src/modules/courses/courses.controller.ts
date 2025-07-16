import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UploadedFiles,
  UseInterceptors,
  ParseFilePipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post("create")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateCourseDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'banner', maxCount: 1 },
        { name: 'introVideo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/courses',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      }
    )
  )
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFiles()
    files: {
      banner?: Express.Multer.File[];
      introVideo?: Express.Multer.File[];
    }
  ) {
    const banner = files?.banner?.[0]?.filename;
    const introVideo = files?.introVideo?.[0]?.filename;
    return this.coursesService.create({
      ...createCourseDto,
      banner,
      introVideo,
    });
  }

  @Get("getAll")
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch('updateOne/:id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete('deleteOne/:id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
