import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, Res, NotFoundException, ServiceUnavailableException, Query } from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageFile } from 'src/storage/storage-file';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(
    private storageService: StorageService
  ) {}

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
    try {
      await this.storageService.save(
        "media/" + fileName,
        file.mimetype,
        file.buffer,
        [{ fileName: fileName }]
      );
    } catch (e) {
      throw e
    }
  
    return {
      "message": "File saved successfully",
      "data": {
        "fileName": fileName,
        "contentType": file.mimetype,
      }
    }
  }

  @Get(':filename')
  async downloadMedia(@Param('filename') filename: string, @Res() res: Response) {
    let storageFile: StorageFile;
    await this.storageService.checkConnection();
    try {
      storageFile = await this.storageService.getWithMetaData("media/" + filename);
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
    
  @Get('record/get')
  async getRecord() {
    await this.storageService.getChunks().then((chunks) => {
      console.log('chunks: ' + chunks);
      return chunks;
    });
  }

  @Post('record/stop/:roomId')
  async stopRecord(@Param('roomId') roomId: string) {
    await this.storageService.stopRecord(roomId);
  }
}
