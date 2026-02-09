import { useEffect, useState } from "react";
import ExpenseRow from "./ExpenseRow";

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
    const fetchExpenses = async () => {
      try {
        const res = await fetch(`http://localhost:3001/expenses/project/${projectId}`);
        const data = await res.json();
        setExpenses(data);
     
      } catch (err) {
        console.error("Failed to fetch expenses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [projectId]);

 
  const updateParentTotals = (updatedExpenses: Expense[]) => {
    setExpenses(updatedExpenses);
    onExpensesChange(updatedExpenses);
  };

  if (loading) return <p>Loading expenses...</p>;
  if (expenses.length === 0) return <p>No expenses added yet</p>;

  return (
    <div>
      <h4>Expenses</h4>
      {expenses.map((expense) => (
        <ExpenseRow
          key={expense.id}
          expense={expense}
          onUpdate={(updated) => {
            const updatedList = expenses.map((e) => (e.id === updated.id ? updated : e));
            updateParentTotals(updatedList);
          }}
          onDelete={(id) => {
            const filtered = expenses.filter((e) => e.id !== id);
            updateParentTotals(filtered);
          }}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
