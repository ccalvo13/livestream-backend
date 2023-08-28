import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, Res, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { FilesService } from './files.service';
import { File } from './entities/file.entity';
import { StorageService } from 'src/storage/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageFile } from 'src/storage/storage-file';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private storageService: StorageService
  ) {}

  // @Post()
  // create(@Body() file: File) {
  //   return this.filesService.create(file);
  // }

  // @Get()
  // findAll(@Param() file: File) {
  //   return this.filesService.findAll(file);
  // }

  // @Get(':id')
  // findOne(@Param() params) {
  //   return this.filesService.findOne(params.id);
  // }

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        files: 1,
      },
    })
  )
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body("fileName") fileName: string
  ) {
    await this.storageService.save(
      "media/" + fileName,
      file.mimetype,
      file.buffer,
      [{ mediaId: fileName }]
    );

    return {
      "message": "File saved successfully",
      "data": {
        "fileName": fileName,
        "contentType": file.mimetype,
      }
    }
  }

  @Get()
  async downloadMedia(@Body("fileName") fileName: string, @Res() res: Response) {
    let storageFile: StorageFile;
    try {
      storageFile = await this.storageService.getWithMetaData("media/" + fileName);
    } catch (e) {
      if (e.message.toString().includes("No such object")) {
        throw new NotFoundException("image not found");
      } else {
        throw new ServiceUnavailableException("internal error");
      }
    }
    res.setHeader("Content-Type", storageFile.contentType);
    res.setHeader("Cache-Control", "max-age=60d");
    res.end(storageFile.buffer);
  }
}
