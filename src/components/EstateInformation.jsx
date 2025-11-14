import "./EstateInformation.css";

export default function EstateInformation({
  gender,
  setGender,
  total,
  setTotal,
  debts,
  setDebts,
  funeralExpenses,
  setFuneralExpenses,
  sons,
  setSons,
  daughters,
  setDaughters,
  wives,
  setWives,
  husbands,
  setHusbands,
  mother,
  setMother,
  father,
  setFather,
  brothers,
  setBrothers,
  sisters,
  setSisters,
  grandSons,
  setGrandSons,
  grandDaughters,
  setGrandDaughters,
  stepSons,
  setStepSons,
  stepDaughters,
  setStepDaughters,
  willPercent,
  setWillPercent,
  calculate
}) {
  return (
    <div className="input-card">
      <h2 className="section-title">Estate Information</h2>
      <div className="form-content">
        <div className="form-group">
          <label className="form-label">Deceased Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="form-select"
          >
            <option value="male">👨 Male</option>
            <option value="female">👩 Female</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Total Property Value</label>
          <input
            type="number"
            placeholder="Enter total estate value"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Debts</label>
            <input
              type="number"
              placeholder="0"
              value={debts}
              onChange={(e) => setDebts(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Funeral Expenses</label>
            <input
              type="number"
              placeholder="0"
              value={funeralExpenses}
              onChange={(e) => setFuneralExpenses(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Heirs */}
        <div className="heirs-section">
          <h3 className="heirs-title">👨‍👩‍👧‍👦 Heirs</h3>
          
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Sons</label>
              <input
                type="number"
                placeholder="0"
                value={sons}
                onChange={(e) => setSons(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Daughters</label>
              <input
                type="number"
                placeholder="0"
                value={daughters}
                onChange={(e) => setDaughters(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Grandsons</label>
              <input
                type="number"
                placeholder="0"
                value={grandSons}
                onChange={(e) => setGrandSons(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Granddaughters</label>
              <input
                type="number"
                placeholder="0"
                value={grandDaughters}
                onChange={(e) => setGrandDaughters(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {gender === "male" && (
            <div className="form-group">
              <label className="form-label">Number of Wives</label>
              <input
                type="number"
                placeholder="0"
                value={wives}
                onChange={(e) => setWives(e.target.value)}
                className="form-input spouse-input"
              />
            </div>
          )}

          {gender === "female" && (
            <div className="form-group">
              <label className="form-label">Husband</label>
              <input
                type="number"
                placeholder="0 or 1"
                value={husbands}
                onChange={(e) => setHusbands(e.target.value)}
                className="form-input spouse-input"
              />
            </div>
          )}

          <div className="parents-section">
            <label className="parents-label">Parents</label>
            <div className="checkbox-grid">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={mother}
                  onChange={() => setMother(!mother)}
                  className="checkbox-input"
                />
                <span>Mother</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={father}
                  onChange={() => setFather(!father)}
                  className="checkbox-input"
                />
                <span>Father</span>
              </label>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Brothers</label>
              <input
                type="number"
                placeholder="0"
                value={brothers}
                onChange={(e) => setBrothers(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Sisters</label>
              <input
                type="number"
                placeholder="0"
                value={sisters}
                onChange={(e) => setSisters(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Will */}
        <div className="will-section">
          <h3 className="will-title">📜 Will (Wasiyyah)</h3>
          
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Step-Sons</label>
              <input
                type="number"
                placeholder="0"
                value={stepSons}
                onChange={(e) => setStepSons(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Step-Daughters</label>
              <input
                type="number"
                placeholder="0"
                value={stepDaughters}
                onChange={(e) => setStepDaughters(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label will">Will Percentage</label>
            <input
              type="number"
              placeholder="0 - 33.33%"
              value={willPercent}
              onChange={(e) => setWillPercent(e.target.value)}
              className="form-input will-input"
              min="0"
              max="33.33"
              step="0.01"
            />
            <p className="will-note">⚠️ Maximum: 33.33% of net estate</p>
          </div>
        </div>

        <button onClick={calculate} className="calculate-button">
          🧮 Calculate Distribution
        </button>
      </div>
    </div>
  );
}