import { Injectable, Res } from '@nestjs/common';
import StorageConfig from './storage-config';
import { StorageFile } from './storage-file';
import { DownloadResponse, Storage } from '@google-cloud/storage';
import * as fs from 'fs';
import * as AWS from 'aws-sdk';

@Injectable()
export class StorageService {
    private storage: Storage;
    private bucket: string;
    private s3;
    private s3_bucket: string;
    chunks = {};

    constructor() {
      const storageConfig = StorageConfig();
        this.storage = new Storage({
          projectId: storageConfig.projectId,
          credentials: {
            client_email: storageConfig.client_email,
            private_key: storageConfig.private_key,
          },
        });
    
        this.bucket = storageConfig.mediaBucket;

        this.s3 = new AWS.S3({
          accessKeyId: storageConfig.s3_access_key_id,
          secretAccessKey: storageConfig.s3_secret_access_key,
        });
        this.s3_bucket = storageConfig.s3_bucket;
    }

    async save(
        fileName: string,
        contentType: string,
        media: Buffer,
        metadata: { [key: string]: string }[]
    ) {
        const filePath = 'media/' + fileName;
        const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
        const file = this.storage.bucket(this.bucket).file(filePath);
        const stream = file.createWriteStream();
        stream.on("finish", async () => {
          return await file.setMetadata({
            contentType: contentType,
            metadata: {
                contentType: contentType,
                ...object
            },
          });
        });
        
        stream.on('error', (error) => {
            console.error('stream error', error)
            return error
        });

        stream.end(media);

        this.deleteFile('src/assets/media/' + fileName);
    }

    async saveS3(
      fileName: string,
      contentType: string,
      media: Buffer,
      metadata: { [key: string]: string }[]
    ) {
      const params = {
        Bucket: this.s3_bucket,
        Key: String(fileName),
        Body: media,
        ACL: 'public-read',
        ContentType: contentType,
        ContentDisposition: 'inline',
        CreateBucketConfiguration: {
          LocationConstraint: 'ap-southeast-1',
        },
      };

      const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
      const file = await this.s3.upload(params).promise();
      console.log('file', file);

      this.deleteFile('src/assets/media/' + fileName);
    }

    async deleteFile(filePath: string) {
      fs.unlink(filePath, function(err) {
        if(err && err.code == 'ENOENT') {
            // file doens't exist
            return { message: "File doesn't exist, won't remove it." }
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            return { message: "Error occurred while trying to remove file." };
        } else {
            return { message: "File removed." };
        }
      });
    }

    async get(path: string): Promise<StorageFile> {
        const fileResponse: DownloadResponse = await this.storage
          .bucket(this.bucket)
          .file(path)
          .download();
        const [buffer] = fileResponse;
        const storageFile = new StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map<string, string>();
        return storageFile;
    }

    async getS3(fileName: string, res: any) {
      const params = {
        Bucket: this.s3_bucket,
        Key: fileName + '.webm',
      };
      
      const stream = this.s3.getObject(params).createReadStream();
      stream.pipe(res);

      return stream;
    }
    
    async getWithMetaData(path: string): Promise<StorageFile> {
        const [bucketObj] = await this.storage.bucket(this.bucket).file(path).getMetadata();
        const {metadata} = bucketObj;
        const fileResponse: DownloadResponse = await this.storage
          .bucket(this.bucket)
          .file(path)
          .download();
        const [buffer] = fileResponse;
    
        const storageFile = new StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map<string, any>(
          Object.entries(metadata || {})
        );
        storageFile.contentType = storageFile.metadata.get("contentType");
        return storageFile;
    }

    async checkConnection() {
      try {
        const [buckets] = await this.storage.getBuckets();
        return true;
      } catch (error) {
        console.error('Error connecting to Google Cloud Storage:', error);
        return false;
      }
    }
  
    async saveChunks(roomId: string, data: any) {
      const filePath = 'src/assets/media/' + roomId + '.webm';
      fs.appendFile(filePath, data, (err) => {
        if (err) {
          console.error('Error saving data to file:', err);
        } else {
          console.log('Data saved to file:', filePath);
        }
      });
    }
}
