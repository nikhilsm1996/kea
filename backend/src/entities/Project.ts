import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Expense } from "./Expense";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  clientName: string;

  @Column("decimal", { precision: 12, scale: 2 })
  estimatedBudget: number;

  @OneToMany(() => Expense, (expense) => expense.project, { cascade: true })
  expenses: Expense[];
}
