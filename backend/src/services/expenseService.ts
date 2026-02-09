import { AppDataSource } from "../data-source";
import { Expense } from "../entities/Expense";
import { Project } from "../entities/Project";

const expenseRepo = AppDataSource.getRepository(Expense);
const projectRepo = AppDataSource.getRepository(Project);

export const addExpense = async (data: {
  projectId: number;
  description: string;
  amount: number;
  category: "material" | "labor" | "other";
}) => {
  const project = await projectRepo.findOne({ where: { id: data.projectId } });
  if (!project) throw new Error("Project not found");

  const expense = expenseRepo.create({
    description: data.description,
    amount: data.amount,
    category: data.category,
    project,
  });

  return await expenseRepo.save(expense);
};

export const getExpensesByProject = async (projectId: number) => {
  const expenses = await expenseRepo.find({
    where: { project: { id: projectId } },
  });
  return expenses;
};

export const updateExpense = async (
  id: number,
  data: Partial<{ description: string; amount: number; category: "material" | "labor" | "other" }>
) => {
  const expense = await expenseRepo.findOne({ where: { id }, relations: ["project"] });
  if (!expense) throw new Error("Expense not found");

  expense.description = data.description ?? expense.description;
  expense.amount = data.amount ?? expense.amount;
  expense.category = data.category ?? expense.category;

  return await expenseRepo.save(expense);
};

export const deleteExpense = async (id: number) => {
  const expense = await expenseRepo.findOne({ where: { id } });
  if (!expense) throw new Error("Expense not found");

  await expenseRepo.remove(expense);
  return { message: "Expense deleted" };
};
