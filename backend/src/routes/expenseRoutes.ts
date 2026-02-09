import { Router } from "express";
import {
  addExpense,
  getExpensesByProject,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController";

const router = Router();

router.post("/", addExpense);
router.get("/project/:projectId", getExpensesByProject);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
