import { PartialType } from '@nestjs/swagger';
import { CreateLessonFileDto } from './create-lesson_file.dto';

export class UpdateLessonFileDto extends PartialType(CreateLessonFileDto) {}
