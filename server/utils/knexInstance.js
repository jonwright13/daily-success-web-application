import { db } from "../db.js";
import knex from "knex";

// Create a Knex instance using the existing MySQL connection
const knexInstance = knex({
  client: "mysql",
  connection: {
    host: db.config.host,
    user: db.config.user,
    password: db.config.password,
    database: db.config.database,
  },
});

export default knexInstance;
