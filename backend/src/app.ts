import express from "express";
import { AppDataSource } from "./data-source";
import projectRoutes from "./routes/projectRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    
    app.get("/test", (_req, res) => res.send("OK"));

   
    app.use("/projects", projectRoutes);
    app.use("/expenses", expenseRoutes);

    const PORT = 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection error", err));
