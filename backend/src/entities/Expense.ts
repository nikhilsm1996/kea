import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Project } from "./Project";

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column("decimal", { precision: 12, scale: 2 })
  amount: number;

  @Column()
  category: "material" | "labor" | "other";

  @ManyToOne(() => Project, (project) => project.expenses, { onDelete: "CASCADE" })
  project: Project;
}
