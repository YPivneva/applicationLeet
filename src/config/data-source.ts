import {DataSource, DataSourceOptions} from "typeorm";
import "reflect-metadata";

const usersBD: DataSourceOptions ={
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "07101960qwe",
    database: "postgres",

    entities: ["./src/db/entities/*.entity{.ts, .js}"],
    migrationsTableName: "__migrations",
    migrations: ["./src/db/migrations/*{.ts, .js}"],
};

export default new DataSource(usersBD);