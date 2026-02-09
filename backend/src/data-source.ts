import "reflect-metadata";
import { DataSource } from "typeorm";
// import { Project } from "./entities/Project";
// import { Expense } from "./entities/Expense";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "pgadmin",
  database: "kea_db",
  synchronize: true, // OK for machine test
  logging: false,
//   entities: [Project, Expense],
});
