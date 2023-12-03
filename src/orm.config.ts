import { DataSourceOptions } from 'typeorm';
import { VideoChat } from './chat/entities/videochat.entity';

const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'P@ssword01',
  database: 'livestream',
  entities: [VideoChat],
  synchronize: true,
  extra: {
    connectionTimeoutMillis: 5000, // Set the connection timeout to 5 seconds
  },
};
export default config;
