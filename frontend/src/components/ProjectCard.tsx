import { useState } from "react";
import ExpenseList from "./ExpenseList";
import AddExpenseForm from "./AddExpenseForm";
import "../styles/ProjectCard.css";

interface Project {
  id: number;
  name: string;
  clientName: string;
  estimatedBudget: number;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const [expanded, setExpanded] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(
    project.estimatedBudget || 0,
  );
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const formatCurrency = (amount: number) => {
    return `AED ${amount.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
  };

  return (
    <div className="project-card">
      <div
        className="project-card-header"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="project-info">
          <div className="chevron-container">
            <span className={`chevron ${expanded ? "expanded" : ""}`}>›</span>
          </div>
          <div className="project-details">
            <h3 className="project-name">
              {project.name || "Untitled Project"}
            </h3>
            <p className="client-name">{project.clientName || "Unknown"}</p>
          </div>
        </div>
        <div className="budget-summary">
          <div className="budget-item">
            <span className="budget-label">Estimated Budget</span>
            <span className="budget-value">
              {formatCurrency(project.estimatedBudget || 0)}
            </span>
          </div>
          <div className="budget-item">
            <span className="budget-label">Remaining Budget</span>
            <span className="budget-value remaining">
              {formatCurrency(remainingBudget)}
            </span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="project-card-content">
          <div className="budget-details">
            <div className="budget-detail-item">
              <span className="detail-label">Estimated Budget</span>
              <span className="detail-value">
                {formatCurrency(project.estimatedBudget || 0)}
              </span>
            </div>
            <div className="budget-detail-item">
              <span className="detail-label">Total Expenses</span>
              <span className="detail-value">
                {formatCurrency(totalExpenses)}
              </span>
            </div>
            <div className="budget-detail-item">
              <span className="detail-label">Remaining Budget</span>
              <span className="detail-value remaining">
                {formatCurrency(remainingBudget)}
              </span>
            </div>
          </div>

          <ExpenseList
            key={refreshTrigger}
            projectId={project.id}
            onExpensesChange={(expenses) => {
              const total = expenses.reduce(
                (sum, e) => sum + Number(e.amount || 0),
                0,
              );
              setTotalExpenses(total);
              setRemainingBudget((project.estimatedBudget || 0) - total);
            }}
          />

          <AddExpenseForm
            projectId={project.id}
            onExpenseAdded={() => {
              setRefreshTrigger((prev) => prev + 1);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
