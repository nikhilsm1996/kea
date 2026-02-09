import { Request, Response } from "express";
import * as expenseService from "../services/expenseService";

export const addExpense = async (req: Request, res: Response) => {
  try {
    const expense = await expenseService.addExpense(req.body);
    res.status(201).json(expense);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getExpensesByProject = async (req: Request, res: Response) => {
  try {
    const expenses = await expenseService.getExpensesByProject(
      Number(req.params.projectId),
    );
    res.json(expenses);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const expense = await expenseService.updateExpense(
      Number(req.params.id),
      req.body,
    );
    res.json(expense);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const result = await expenseService.deleteExpense(Number(req.params.id));
    res.json(result);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
