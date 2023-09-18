import { Injectable } from '@nestjs/common';
import StorageConfig from './storage-config';
import { StorageFile } from './storage-file';
import { DownloadResponse, Storage } from '@google-cloud/storage';

@Injectable()
export class StorageService {
    private storage: Storage;
    private bucket: string;

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
        console.log(storageConfig);
    }

    async save(
        path: string,
        contentType: string,
        media: Buffer,
        metadata: { [key: string]: string }[]
    ) {
        const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
        const file = this.storage.bucket(this.bucket).file(path);
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
    }

    async delete(path: string) {
        await this.storage
          .bucket(this.bucket)
          .file(path)
          .delete({ ignoreNotFound: true });
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
        console.log('Connected to Google Cloud Storage');
        console.log('Buckets:', buckets);
        return true;
      } catch (error) {
        console.error('Error connecting to Google Cloud Storage:', error);
        return false;
      }
    }
}
