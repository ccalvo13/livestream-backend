import { DataSourceOptions } from "typeorm";
import { Chat } from "./chat/entities/chat.entity";

const config: DataSourceOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "P@ssword01",
  database: "livestream",
  entities: [Chat],
  synchronize: true,
  extra: {
    connectionTimeoutMillis: 5000, // Set the connection timeout to 5 seconds
  },
};
export default config;