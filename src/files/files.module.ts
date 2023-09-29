import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { ConfigService } from '@nestjs/config';
import { StorageModule } from 'src/storage/storage.module';
import { FilesGateway } from './files.gateway';

@Module({
  imports: [StorageModule],
  controllers: [FilesController],
  providers: [ConfigService, FilesGateway]
})
export class FilesModule {}
