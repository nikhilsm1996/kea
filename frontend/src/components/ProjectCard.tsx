import { useState } from "react";
import ExpenseList from "./ExpenseList";
import AddExpenseForm from "./AddExpenseForm";

interface Project {
  id: number;
  name: string;
  clientName: string;
  estimatedBudget: number;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const [expanded, setExpanded] = useState(false);

  // Totals tracked manually
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(project.estimatedBudget || 0);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: "pointer", backgroundColor: "#eee", padding: "5px" }}
      >
        <h3>{project.name || "Untitled Project"}</h3>
        <p>Client: {project.clientName || "Unknown"}</p>
        <p>Estimated Budget: {project.estimatedBudget || 0}</p>
        <p>Total Expenses: {totalExpenses}</p>
        <p>Remaining Budget: {remainingBudget}</p>
      </div>

      {expanded && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#f9f9f9",
          }}
        >
          {/* Expense list */}
          <ExpenseList
            projectId={project.id}
            onExpensesChange={(expenses) => {
              // Calculate totals manually whenever expenses change
              const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
              setTotalExpenses(total);
              setRemainingBudget((project.estimatedBudget || 0) - total);
            }}
          />

          {/* Add expense form */}
          <AddExpenseForm
            projectId={project.id}
            onExpenseAdded={(newExpense) => {
              // Update totals immediately
              const amount = Number(newExpense.amount || 0);
              setTotalExpenses((prev) => prev + amount);
              setRemainingBudget((prev) => prev - amount);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
