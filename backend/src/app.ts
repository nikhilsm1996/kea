// import "reflect-metadata";
// import express from "express";

// const app = express();
// app.use(express.json());

// app.get("/health", (req, res) => {
//   res.send("OK");
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("DB connection error", err);
  });
