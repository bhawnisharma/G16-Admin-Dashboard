// Owner: Manya - table wiring | Priyanshi - add, edit, delete, undo

import { useEffect, useRef, useState } from "react";
import UserTable from "../components/UserTable.jsx";
import UserForm from "../components/UserForm.jsx";
import { users as initialUsers } from "../data/mockUsers.js";

const columns = [
  { key: "id", label: "ID" },
  { key: "firstName", label: "First name" },
  { key: "lastName", label: "Last name" },
  { key: "email", label: "Email" },
  { key: "age", label: "Age" },
  { key: "gender", label: "Gender" },
  { key: "role", label: "Role" },
];

const quickFilters = [
  { field: "role", label: "Role", options: ["admin", "viewer"] },
  { field: "gender", label: "Gender", options: ["male", "female"] },
];

const UNDO_WINDOW_MS = 5000;

export default function Users({ setPageName, role }) {
  useEffect(() => {
    setPageName("Users");
  }, [setPageName]);

  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [pendingDelete, setPendingDelete] = useState(null);
  const undoTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    };
  }, []);

  function handleSaveEdit(updatedUser) {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditingUser(null);
  }

  function handleSaveNew(newUser) {
    const nextId = Math.max(...users.map((u) => u.id)) + 1;
    setUsers((prev) => [...prev, { ...newUser, id: nextId }]);
    setShowAddForm(false);
  }

  function handleDelete(row) {
    const index = users.findIndex((u) => u.id === row.id);
    setUsers((prev) => prev.filter((u) => u.id !== row.id));

    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    undoTimerRef.current = setTimeout(() => setPendingDelete(null), UNDO_WINDOW_MS);
    setPendingDelete({ user: row, index });
  }

  function handleUndoDelete() {
    if (!pendingDelete) return;
    clearTimeout(undoTimerRef.current);
    setUsers((prev) => {
      const next = [...prev];
      next.splice(pendingDelete.index, 0, pendingDelete.user);
      return next;
    });
    setPendingDelete(null);
  }

  return (
    <div>
      <div className="page-header">
        <h2>Users</h2>
        
        {role === "admin" && (
          <button className="btn btn--primary" onClick={() => setShowAddForm(true)}>
            + Add user
          </button>
        )}
      </div>

      <UserTable
        columns={columns}
        rows={users}
        onEdit={(row) => setEditingUser(row)}
        onDelete={role === "admin" ? handleDelete : undefined}
        quickFilters={quickFilters}
        pauseHighlightClear={Boolean(editingUser || showAddForm)}
      />

      {editingUser && (
        <UserForm
          initialUser={editingUser}
          onCancel={() => setEditingUser(null)}
          onSave={handleSaveEdit}
        />
      )}

      {showAddForm && (
        <UserForm onCancel={() => setShowAddForm(false)} onSave={handleSaveNew} />
      )}

      
      {pendingDelete && (
        <div className="toast" role="status">
          <span>
            User <strong>{pendingDelete.user.firstName} {pendingDelete.user.lastName}</strong> removed.
          </span>
          <button className="toast__undo" onClick={handleUndoDelete}>
            Undo
          </button>
        </div>
      )}
    </div>
  );
}
