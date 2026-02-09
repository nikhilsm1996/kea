import { Request, Response } from "express";
import * as projectService from "../services/projectService";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, clientName, estimatedBudget } = req.body;
    if (!name || !clientName || !estimatedBudget)
      return res.status(400).json({ message: "All fields are required" });

    const project = await projectService.createProject({
      name,
      clientName,
      estimatedBudget,
    });
    res.status(201).json(project);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await projectService.getProjectById(Number(req.params.id));
    res.json(project);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await projectService.updateProject(
      Number(req.params.id),
      req.body,
    );
    res.json(project);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const result = await projectService.deleteProject(Number(req.params.id));
    res.json(result);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
