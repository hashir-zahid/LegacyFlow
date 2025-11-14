import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./DistributionResult.css";

export default function DistributionResult({ 
  result, 
  currency, 
  sons, 
  daughters, 
  wives, 
  husbands, 
  grandSons, 
  grandDaughters, 
  brothers, 
  sisters 
}) {
  
  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);

  const chartData =
    result
      ? [
          { name: "Will", value: result.willAmount },
          {
            name: "Spouse",
            value: result.wifeShareEach * (parseInt(wives || 0, 10)) + result.husbandShare,
          },
          { name: "Parents", value: result.motherShare + result.fatherShare },
          {
            name: "Children",
            value:
              result.sonShare * (parseInt(sons || 0, 10)) +
              result.daughterShare * (parseInt(daughters || 0, 10)),
          },
          {
            name: "Grandchildren",
            value:
              result.grandSonShare * (parseInt(grandSons || 0, 10)) +
              result.grandDaughterShare * (parseInt(grandDaughters || 0, 10)),
          },
        ].filter((item) => item.value > 0)
      : [];

  return (
    <div className="results-card">
      {result ? (
        <div className="results-content">
          <h2 className="section-title">📊 Distribution Results</h2>

          {/* Summary */}
          <div className="summary-grid">
            <div className="summary-card summary-debts">
              <p className="summary-label">Debts</p>
              <p className="summary-value">{formatCurrency(result.debtAmount)}</p>
            </div>
            <div className="summary-card summary-funeral">
              <p className="summary-label">Funeral</p>
              <p className="summary-value">{formatCurrency(result.funeralExpenses)}</p>
            </div>
            <div className="summary-card summary-net">
              <p className="summary-label">Net Estate</p>
              <p className="summary-value">{formatCurrency(result.netEstate)}</p>
            </div>
            <div className="summary-card summary-will">
              <p className="summary-label">Will Amount</p>
              <p className="summary-value">{formatCurrency(result.willAmount)}</p>
            </div>
          </div>

          {/* Shares */}
          <div className="shares-list">
            <h3 className="shares-title">Individual Shares:</h3>

            {result.wifeShareEach > 0 && parseInt(wives || 0, 10) > 0 && (
              <div className="share-item share-wife">
                <span className="share-label">👰 Each Wife</span>
                <span className="share-value">{formatCurrency(result.wifeShareEach)}</span>
              </div>
            )}

            {result.husbandShare > 0 && parseInt(husbands || 0, 10) > 0 && (
              <div className="share-item share-husband">
                <span className="share-label">🤵 Husband</span>
                <span className="share-value">{formatCurrency(result.husbandShare)}</span>
              </div>
            )}

            {result.motherShare > 0 && (
              <div className="share-item share-mother">
                <span className="share-label">👵 Mother</span>
                <span className="share-value">{formatCurrency(result.motherShare)}</span>
              </div>
            )}

            {result.fatherShare > 0 && (
              <div className="share-item share-father">
                <span className="share-label">👴 Father</span>
                <span className="share-value">{formatCurrency(result.fatherShare)}</span>
              </div>
            )}

            {result.sonShare > 0 && parseInt(sons || 0, 10) > 0 && (
              <div className="share-item share-son">
                <span className="share-label">👦 Each Son</span>
                <span className="share-value">{formatCurrency(result.sonShare)}</span>
              </div>
            )}

            {result.daughterShare > 0 && parseInt(daughters || 0, 10) > 0 && (
              <div className="share-item share-daughter">
                <span className="share-label">👧 Each Daughter</span>
                <span className="share-value">{formatCurrency(result.daughterShare)}</span>
              </div>
            )}

            {result.grandSonShare > 0 && parseInt(grandSons || 0, 10) > 0 && (
              <div className="share-item share-grandson">
                <span className="share-label">🧒 Each Grandson</span>
                <span className="share-value">{formatCurrency(result.grandSonShare)}</span>
              </div>
            )}

            {result.grandDaughterShare > 0 && parseInt(grandDaughters || 0, 10) > 0 && (
              <div className="share-item share-granddaughter">
                <span className="share-label">👧 Each Granddaughter</span>
                <span className="share-value">{formatCurrency(result.grandDaughterShare)}</span>
              </div>
            )}

            {result.brotherShare > 0 && parseInt(brothers || 0, 10) > 0 && (
              <div className="share-item share-brother">
                <span className="share-label">👨 Each Brother</span>
                <span className="share-value">{formatCurrency(result.brotherShare)}</span>
              </div>
            )}

            {result.sisterShare > 0 && parseInt(sisters || 0, 10) > 0 && (
              <div className="share-item share-sister">
                <span className="share-label">👩 Each Sister</span>
                <span className="share-value">{formatCurrency(result.sisterShare)}</span>
              </div>
            )}

            {result.stepShareEach > 0 && (
              <div className="share-item share-step">
                <span className="share-label">👶 Each Stepchild (Will)</span>
                <span className="share-value">{formatCurrency(result.stepShareEach)}</span>
              </div>
            )}
          </div>

          {/* Chart */}
          {chartData.length > 0 && (
            <div className="chart-wrapper">
              <PieChart width={400} height={400}>
                <Pie
                  data={chartData}
                  cx={200}
                  cy={200}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${((entry.value / result.netEstate) * 100).toFixed(1)}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-results">
          <div className="empty-icon">📋</div>
          <p className="empty-text">Enter estate details and click Calculate to see distribution results</p>
        </div>
      )}
    </div>
  );
}