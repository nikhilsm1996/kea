import { useState } from "react";
import "../styles/addExpenseForm.css";

interface Props {
  projectId: number;
  onExpenseAdded: (expense: { id: number; amount: number }) => void;
}

const AddExpenseForm = ({ projectId, onExpenseAdded }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "material",
  });

  const handleSubmit = async () => {
    if (!formData.description || !formData.amount) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          description: formData.description,
          amount: Number(formData.amount),
          category: formData.category,
        }),
      });

      if (!res.ok) throw new Error("Failed to add expense");
      const newExpense = await res.json();
      onExpenseAdded({ id: newExpense.id, amount: Number(newExpense.amount) });

      setFormData({ description: "", amount: "", category: "material" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Error adding expense");
    }
  };

  const handleCancel = () => {
    setFormData({ description: "", amount: "", category: "material" });
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <div className="add-expense-trigger">
        <button className="btn-add-expense" onClick={() => setShowForm(true)}>
          <span className="plus-icon">+</span>
          Add Expense
        </button>
      </div>
    );
  }

  return (
    <div className="add-expense-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (AED)</label>
          <input
            id="amount"
            type="number"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, amount: e.target.value }))
            }
            className="form-input"
            step="0.001"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            className="form-select"
          >
            <option value="material">Material</option>
            <option value="labor">Labor</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-cancel-form" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn-submit-form" onClick={handleSubmit}>
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
