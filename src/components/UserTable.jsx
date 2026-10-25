// Owner: Manya - data grid

import { useEffect, useRef, useState } from "react";
import { exportCsv } from "../utils/exportCsv.js";

const PAGE_SIZE = 8;
const FAKE_LOAD_DELAY_MS = 600;

export default function UserTable({
  columns,
  rows,
  onEdit,
  onDelete,
  quickFilters = [],
  pauseHighlightClear = false,
}) {
  const [search, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const [activeQuickFilter, setActiveQuickFilter] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const [highlightedId, setHighlightedId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [forceError, setForceError] = useState(false);

  const searchInputRef = useRef(null);
  const tableWrapperRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), FAKE_LOAD_DELAY_MS);
    return () => clearTimeout(timer);
  }, [rows]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== "/") return;
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") return;
      e.preventDefault();
      searchInputRef.current?.focus();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (highlightedId === null || pauseHighlightClear) return;
    function handleDocumentClick(e) {
      const stillInsideHighlightedRow = e.target.closest?.(`tr[data-row-id="${highlightedId}"]`);
      if (!stillInsideHighlightedRow) setHighlightedId(null);
    }
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [highlightedId, pauseHighlightClear]);

  let visibleRows = rows.filter((row) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(q));
  });

  visibleRows = visibleRows.filter((row) =>
    columns.every((col) => {
      const filterValue = columnFilters[col.key];
      if (!filterValue) return true;
      return String(row[col.key] ?? "").toLowerCase().includes(filterValue.toLowerCase());
    })
  );

  if (activeQuickFilter) {
    visibleRows = visibleRows.filter(
      (row) => String(row[activeQuickFilter.field]) === activeQuickFilter.value
    );
  }

  if (sortKey) {
    visibleRows = [...visibleRows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }

  const totalPages = Math.max(1, Math.ceil(visibleRows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = visibleRows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const hasAnyFilterActive =
    search.trim() || Object.values(columnFilters).some(Boolean) || activeQuickFilter;

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function handleColumnFilterChange(key, value) {
    setColumnFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function handleQuickFilterClick(field, value) {
    setActiveQuickFilter((prev) =>
      prev && prev.field === field && prev.value === value ? null : { field, value }
    );
    setPage(1);
  }

  function handleResetFilters() {
    setSearch("");
    setColumnFilters({});
    setActiveQuickFilter(null);
    setSortKey(null);
    setPage(1);
  }

  function toggleRow(id) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function toggleSelectAllOnPage() {
    const idsOnPage = pageRows.map((r) => r.id);
    const allSelected = idsOnPage.every((id) => selectedIds.includes(id));
    setSelectedIds((prev) =>
      allSelected ? prev.filter((id) => !idsOnPage.includes(id)) : [...new Set([...prev, ...idsOnPage])]
    );
  }

  function handleExport() {
    const rowsToExport = selectedIds.length
      ? visibleRows.filter((r) => selectedIds.includes(r.id))
      : visibleRows;
    exportCsv(rowsToExport, columns, "users.csv");
  }

  function handleEditClick(row) {
    setHighlightedId(row.id);
    onEdit(row);
  }

  return (
    <div className="data-table" ref={tableWrapperRef}>
      <div className="data-table__toolbar">
        <div className="data-table__search-wrap">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search all columns... (press / to focus)"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="data-table__search"
          />
          <kbd className="data-table__kbd-hint">/</kbd>
        </div>

        <div className="data-table__toolbar-right">
          {selectedIds.length > 0 && (
            <span className="data-table__selected-count">{selectedIds.length} selected</span>
          )}
          {hasAnyFilterActive && (
            <button className="btn btn--ghost" onClick={handleResetFilters}>
              Reset filters
            </button>
          )}
          <button
            className="btn btn--ghost"
            onClick={() => setForceError((v) => !v)}
            title="Demo button: shows what the error state looks like"
          >
            {forceError ? "Fix error (demo)" : "Simulate error (demo)"}
          </button>
          <button className="btn" onClick={handleExport} disabled={isLoading || forceError}>
            Export CSV
          </button>
        </div>
      </div>

      {isLoading ? (
        <SkeletonRows columnCount={columns.length} />
      ) : forceError ? (
        <div className="state-message state-message--error state-message--block">
          <p>⚠️ Something went wrong while loading users.</p>
          <button className="btn btn--primary" onClick={() => setForceError(false)}>
            Retry
          </button>
        </div>
      ) : visibleRows.length === 0 ? (
        <p className="state-message">No results match your search/filters.</p>
      ) : (
        <>
          <table className="data-table__table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={toggleSelectAllOnPage}
                    checked={pageRows.length > 0 && pageRows.every((r) => selectedIds.includes(r.id))}
                  />
                </th>
                {columns.map((col) => (
                  <th key={col.key} onClick={() => handleSort(col.key)} className="data-table__th">
                    {col.label}
                    {sortKey === col.key && (sortDir === "asc" ? " ▲" : " ▼")}
                  </th>
                ))}
                <th></th>
              </tr>
              <tr className="data-table__filter-row">
                <th></th>
                {columns.map((col) => (
                  <th key={col.key}>
                    <input
                      type="text"
                      placeholder="Filter..."
                      value={columnFilters[col.key] || ""}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleColumnFilterChange(col.key, e.target.value)}
                      className="data-table__filter-input"
                    />
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr
                  key={row.id}
                  data-row-id={row.id}
                  className={highlightedId === row.id ? "data-table__row--highlighted" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.key}>{row[col.key]}</td>
                  ))}
                  <td className="data-table__row-actions">
                    <button className="btn btn--small" onClick={() => handleEditClick(row)}>
                      Edit
                    </button>
                    {onDelete && (
                      <button
                        className="btn btn--small btn--danger"
                        onClick={() => onDelete(row)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="data-table__pagination">
            <button className="btn" disabled={currentPage === 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages} &middot; {visibleRows.length} of {rows.length} users
            </span>
            <button
              className="btn"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      
      {quickFilters.length > 0 && (
        <div className="data-table__footer">
          <span className="data-table__footer-label">Filter by category:</span>
          <div className="data-table__chip-row">
            <button
              className={`chip ${!activeQuickFilter ? "chip--active" : ""}`}
              onClick={() => setActiveQuickFilter(null)}
            >
              All
            </button>
            {quickFilters.map((group) =>
              group.options.map((option) => (
                <button
                  key={`${group.field}-${option}`}
                  className={`chip ${
                    activeQuickFilter?.field === group.field && activeQuickFilter?.value === option
                      ? "chip--active"
                      : ""
                  }`}
                  onClick={() => handleQuickFilterClick(group.field, option)}
                >
                  {group.label}: {option}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SkeletonRows({ columnCount }) {
  const skeletonRowCount = 5;
  return (
    <div className="skeleton-table" aria-busy="true" aria-label="Loading users">
      {Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
        <div className="skeleton-row" key={rowIndex}>
          {Array.from({ length: columnCount + 1 }).map((__, cellIndex) => (
            <div className="skeleton-cell" key={cellIndex} />
          ))}
        </div>
      ))}
    </div>
  );
}
