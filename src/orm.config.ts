import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "P@ssword01",
  database: "livestream",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
};
export default config;