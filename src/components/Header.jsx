import { useState } from "react";
import "./Header.css";

export default function Header({ showGuide, setShowGuide, currency, setCurrency }) {
  return (
    <>
      <div className="header-card">
        <div className="header-content">
          <div className="header-left">
            <div className="header-icon">⚖️</div>
            <div className="header-text">
              <h1 className="header-title">LegacyFlow</h1>
            </div>
          </div>
          <div className="header-actions">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="currency-select"
            >
              <option value="PKR">PKR (₨)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
            <button onClick={() => setShowGuide(!showGuide)} className="guide-button">
              {showGuide ? "Hide" : "Show"} Guide
            </button>
          </div>
        </div>
      </div>

      {showGuide && (
        <div className="guide-section">
          <h3 className="guide-title">📖 Pakistani Islamic Inheritance Law Guide</h3>
          <div className="guide-content">
            <p>
              <strong>Priority Order:</strong> 1) Funeral expenses, 2) Debts, 3) Will (max 1/3),
              4) Legal heirs
            </p>
            <ul className="guide-list">
              <li>Wife: 1/8 (with children) or 1/4 (no children)</li>
              <li>Husband: 1/4 (with children) or 1/2 (no children)</li>
              <li>Mother: 1/6 (with children) or 1/3 (no children)</li>
              <li>Father: 1/6 (with children) or residue (no children)</li>
              <li>Sons & Daughters: 2:1 ratio from residue</li>
              <li>Siblings: Only inherit if no children/grandchildren and no father</li>
            </ul>
            <p className="guide-warning">
              ⚠️ Will cannot exceed 33.33% and cannot benefit legal heirs without consent.
            </p>
          </div>
        </div>
      )}
    </>
  );
}