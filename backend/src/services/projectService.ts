import { AppDataSource } from "../data-source";
import { Project } from "../entities/Project";

const projectRepo = AppDataSource.getRepository(Project);

export const createProject = async (data: Partial<Project>) => {
  const project = projectRepo.create(data);
  return await projectRepo.save(project);
};

export const getAllProjects = async () => {
  const projects = await projectRepo.find({ relations: ["expenses"] });
  return projects.map((p) => {
    const totalExpenses = p.expenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0,
    );
    const remainingBudget = Number(p.estimatedBudget) - totalExpenses;
    return { ...p, totalExpenses, remainingBudget };
  });
};

export const getProjectById = async (id: number) => {
  const project = await projectRepo.findOne({
    where: { id },
    relations: ["expenses"],
  });
  if (!project) throw new Error("Project not found");

  const totalExpenses = project.expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0,
  );
  const remainingBudget = Number(project.estimatedBudget) - totalExpenses;
  return { ...project, totalExpenses, remainingBudget };
};

export const updateProject = async (id: number, data: Partial<Project>) => {
  const project = await projectRepo.findOne({ where: { id } });
  if (!project) throw new Error("Project not found");

  project.name = data.name ?? project.name;
  project.clientName = data.clientName ?? project.clientName;
  project.estimatedBudget = data.estimatedBudget ?? project.estimatedBudget;

  return await projectRepo.save(project);
};

export const deleteProject = async (id: number) => {
  const project = await projectRepo.findOne({ where: { id } });
  if (!project) throw new Error("Project not found");

  await projectRepo.remove(project);
  return { message: "Project deleted" };
};
