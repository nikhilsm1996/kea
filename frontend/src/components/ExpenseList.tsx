import { useEffect, useState } from "react";
import ExpenseRow from "./ExpenseRow";
import "../styles//ExpenseList.css";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  projectId: number;
  onExpensesChange: (expenses: Expense[]) => void;
}

const ExpenseList = ({ projectId, onExpensesChange }: Props) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    onExpensesChange(expenses);
  }, [expenses, onExpensesChange]);

  const fetchExpenses = async () => {
    try {
      console.log("Fetching expenses for project:", projectId);
      const res = await fetch(
        `http://localhost:3001/expenses/project/${projectId}`,
      );
      if (!res.ok) throw new Error("Failed to fetch expenses");
      const data = await res.json();
      console.log("Fetched expenses:", data);
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updated: Expense) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === updated.id ? updated : exp)),
    );
  };

  const handleDelete = (id: number) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  if (loading) return <p className="expense-loading">Loading expenses...</p>;

  return (
    <div className="expense-list">
      <div className="expense-list-header">
        <h4>Expenses</h4>
      </div>

      {expenses.length === 0 ? (
        <p className="no-expenses">No expenses yet</p>
      ) : (
        <>
          <div className="expense-table-header">
            <div className="header-cell description">Description</div>
            <div className="header-cell category">Category</div>
            <div className="header-cell amount">Amount</div>
            <div className="header-cell actions">Actions</div>
          </div>
          <div className="expense-rows">
            {expenses.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
