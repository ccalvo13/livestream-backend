import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {

  constructor(private prisma: PrismaService) {}

  create(file: File) {
    return this.prisma.file.create({
      data: file,
    });
  }

  findAll(file: File): Promise<File[]> {
    return this.prisma.file.findMany();
  }

  findOne(id: any): Promise<File> {
    return this.prisma.file.findUnique({
      where: { roomId: id }
  });
  }
}
