// Owner: Priyanshi - add/edit form

import { useState } from "react";

const emptyForm = { firstName: "", lastName: "", email: "", age: "", gender: "female" };

export default function UserForm({ initialUser, onCancel, onSave }) {
  const [form, setForm] = useState(initialUser ? { ...initialUser } : emptyForm);
  const [error, setError] = useState("");

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError("First name, last name and email are required.");
      return;
    }
    if (!form.age || Number(form.age) <= 0) {
      setError("Please enter a valid age.");
      return;
    }

    onSave({ ...form, age: Number(form.age) });
  }

  return (
    <div className="modal-overlay">
      <form className="modal" onSubmit={handleSubmit}>
        <h3>{initialUser ? "Edit user" : "Add user"}</h3>

        {error && <p className="state-message state-message--error">{error}</p>}

        <label>
          First name
          <input value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
        </label>

        <label>
          Last name
          <input value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
        </label>

        <label>
          Email
          <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
        </label>

        <label>
          Age
          <input type="number" value={form.age} onChange={(e) => handleChange("age", e.target.value)} />
        </label>

        <label>
          Gender
          <select value={form.gender} onChange={(e) => handleChange("gender", e.target.value)}>
            <option value="female">female</option>
            <option value="male">male</option>
          </select>
        </label>

        <div className="modal__actions">
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
