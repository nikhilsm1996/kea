import { useState } from "react";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expense: Expense;
  onUpdate: (updated: Expense) => void;
  onDelete: (id: number) => void; 
}

const ExpenseRow = ({ expense, onUpdate, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    description: expense.description,
    amount: expense.amount,
    category: expense.category,
  });

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:3001/expenses/${expense.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: formData.description,
          amount: Number(formData.amount),
          category: formData.category,
        }),
      });

      if (!res.ok) throw new Error("Failed to update expense");

      const updatedExpense = await res.json();
      onUpdate(updatedExpense);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error updating expense");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3001/expenses/${expense.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete expense");

      onDelete(expense.id);
    } catch (err) {
      console.error(err);
      alert("Error deleting expense");
    }
  };

  if (isEditing) {
    return (
      <div style={{ borderBottom: "1px solid #ddd", padding: "5px 0" }}>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Description"
        />
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData((prev) => ({ ...prev, amount: Number(e.target.value) }))}
          placeholder="Amount"
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
        >
          <option value="material">Material</option>
          <option value="labor">Labor</option>
          <option value="other">Other</option>
        </select>
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div style={{ borderBottom: "1px solid #ddd", padding: "5px 0" }}>
      <p>Description: {expense.description}</p>
      <p>Amount: {expense.amount}</p>
      <p>Category: {expense.category}</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ExpenseRow;
