import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [FilesController],
  providers: [PrismaService, ConfigService]
})
export class FilesModule {}
