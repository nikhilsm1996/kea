import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "../styles/ExpenseRow.css";

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

  const formatCurrency = (amount: number) => {
    return `AED ${amount.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "material":
        return "#d4a574";
      case "labor":
        return "#d4a574";
      default:
        return "#999";
    }
  };

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
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;

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
      <div className="expense-row editing">
        <input
          type="text"
          className="edit-input description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Description"
        />
        <select
          className="edit-select"
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="material">Material</option>
          <option value="labor">Labor</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          className="edit-input amount"
          value={formData.amount}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, amount: Number(e.target.value) }))
          }
          placeholder="Amount"
        />
        <div className="edit-actions">
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
          <button className="btn-cancel" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-row">
      <div className="expense-cell description">{expense.description}</div>
      <div className="expense-cell category">
        <span
          className="category-badge"
          style={{ color: getCategoryColor(expense.category) }}
        >
          {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
        </span>
      </div>
      <div className="expense-cell amount">
        {formatCurrency(expense.amount)}
      </div>
      <div className="expense-actions">
        <button
          className="btn-icon"
          onClick={() => setIsEditing(true)}
          title="Edit"
        >
          <FiEdit2 />
        </button>
        <button className="btn-icon" onClick={handleDelete} title="Delete">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default ExpenseRow;
