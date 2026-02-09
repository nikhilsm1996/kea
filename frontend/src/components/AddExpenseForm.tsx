import { useState } from "react";

interface Props {
  projectId: number;
  onExpenseAdded: (expense: { id: number; amount: number }) => void;
}

const AddExpenseForm = ({ projectId, onExpenseAdded }: Props) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "material",
  });

  const handleSubmit = async () => {
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
    } catch (err) {
      console.error(err);
      alert("Error adding expense");
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", background: "#f5f5f5", marginTop: "10px" }}>
      <h4>Add Expense</h4>
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      >
        <option value="material">Material</option>
        <option value="labor">Labor</option>
        <option value="other">Other</option>
      </select>
      <button onClick={handleSubmit}>Add Expense</button>
    </div>
  );
};

export default AddExpenseForm;
