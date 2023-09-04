import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { ConfigService } from '@nestjs/config';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [FilesController],
  providers: [ConfigService]
})
export class FilesModule {}
