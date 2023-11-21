import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, Res, NotFoundException, ServiceUnavailableException, Query } from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';
import { StorageFile } from 'src/storage/storage-file';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('files')
export class FilesController {
  constructor(
    private storageService: StorageService
  ) {}

  @Post() 
  async uploadMedia(
    @Body("fileName") fileName: string
  ) {
    const filePath = 'src/assets/media/' + fileName + '.webm';
    const fileContent: any = await new Promise((resolve, reject) => {
      return fs.readFile(filePath, (err, data) => {
          if (err) {
              return reject(err);
          }
          return resolve(data);
      });
    });

    this.storageService.saveS3(
      fileName + '.webm',
      "video/webm",
      fileContent,
      [{ fileName: fileName }]
    );
  
    return {
      "message": "File saved successfully",
      "data": {
        "fileName": fileName + '.webm',
      }
    }
  }

  // @Get(':filename')
  // async downloadMedia(@Param('filename') filename: string, @Res() res: Response) {
  //   let storageFile: StorageFile;
  //   await this.storageService.checkConnection();
  //   try {
  //     storageFile = await this.storageService.getWithMetaData("media/" + filename);
  //   } catch (e) {
  //     if (e.message.toString().includes("No such object")) {
  //       throw new NotFoundException("image not found");
  //     } else {
  //       throw new ServiceUnavailableException("internal error");
  //     }
  //   }
  //   res.setHeader("Content-Type", storageFile.contentType);
  //   res.setHeader("Cache-Control", "max-age=60d");
  //   res.end(storageFile.buffer);
  // }

  @Get(':filename')
  async downloadMediaS3(@Param('filename') filename: string, @Res() res: Response) {
    await this.storageService.checkConnection();
    try {
      const file = await this.storageService.getS3(filename, res);
      console.log(file);
      file.pipe(res);
    } catch (e) {
      if (e.message.toString().includes("No such object")) {
        throw new NotFoundException("image not found");
      } else {
        throw e;
      }
    }
  }
}
