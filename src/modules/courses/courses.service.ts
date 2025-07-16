import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const { name, about, price, level, categoryId, mentorId, published } = createCourseDto;
    createCourseDto.banner = `http://localhost:15975/uploads/${createCourseDto.banner}`
    createCourseDto.introVideo = `http://localhost:15975/uploads/${createCourseDto.introVideo}`

    return await this.prisma.course.create({
      data: {...createCourseDto},
    });
  }

  async findAll() {
    return await this.prisma.course.findMany();
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      // include: {
      //   category: true,
      //   mentor: true,
      // },
    });

    if (!course) {
      throw new NotFoundException(`Kurs topilmadi (id: ${id})`);
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, banner?: string, introVideo?: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Kurs topilmadi (id: ${id})`);
    }

    return await this.prisma.course.update({
      where: { id },
      data: {
        ...updateCourseDto,
        banner: banner ?? course.banner,
        introVideo: introVideo ?? course.introVideo,
      },
    });
  }

  async remove(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Kurs topilmadi (id: ${id})`);
    }

    return await this.prisma.course.delete({
      where: { id },
    });
  }
}
