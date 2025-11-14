import { useState } from "react";
import Header from "./Header";
import EstateInformation from "./EstateInformation";
import DistributionResult from "./DistributionResult";
import "./Calculate.css";

export default function Calculate() {
  const [total, setTotal] = useState("");
  const [gender, setGender] = useState("male");
  const [sons, setSons] = useState("");
  const [daughters, setDaughters] = useState("");
  const [wives, setWives] = useState("");
  const [husbands, setHusbands] = useState("");
  const [mother, setMother] = useState(false);
  const [father, setFather] = useState(false);
  const [brothers, setBrothers] = useState("");
  const [sisters, setSisters] = useState("");
  const [grandSons, setGrandSons] = useState("");
  const [grandDaughters, setGrandDaughters] = useState("");
  const [stepSons, setStepSons] = useState("");
  const [stepDaughters, setStepDaughters] = useState("");
  const [willPercent, setWillPercent] = useState("");
  const [debts, setDebts] = useState("");
  const [funeralExpenses, setFuneralExpenses] = useState("");
  const [result, setResult] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [currency, setCurrency] = useState("PKR");

  // helper to round to 2 decimals
  const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

  // ---------- CALCULATION ----------
  const calculate = () => {
    // parse inputs
    const totalP = parseFloat(total);
    const s = parseInt(sons, 10) || 0;
    const d = parseInt(daughters, 10) || 0;
    const w = parseInt(wives, 10) || 0;
    const h = parseInt(husbands, 10) || 0;
    const br = parseInt(brothers, 10) || 0;
    const si = parseInt(sisters, 10) || 0;
    const gs = parseInt(grandSons, 10) || 0;
    const gd = parseInt(grandDaughters, 10) || 0;
    const stS = parseInt(stepSons, 10) || 0;
    const stD = parseInt(stepDaughters, 10) || 0;
    const willP = parseFloat(willPercent) || 0;
    const debtAmount = parseFloat(debts) || 0;
    const funeralExp = parseFloat(funeralExpenses) || 0;

    // validations
    if (isNaN(totalP) || totalP <= 0) {
      alert("Please enter a valid total property value!");
      return;
    }
    if (willP > 33.33) {
      alert("⚠️ According to Pakistani law, Will cannot exceed one-third (33.33%) of total property!");
      return;
    }

    const netEstate = totalP - debtAmount - funeralExp;
    if (netEstate <= 0) {
      alert("Estate is insufficient after debts and funeral expenses!");
      return;
    }

    // compute will and estate available for fixed shares/residue
    const willAmount = (netEstate * willP) / 100;
    const estateAfterWill = netEstate - willAmount;

    // initialize shares object (values are per-person amounts for relevant heirs)
    let shares = {
      wifeShareEach: 0,
      husbandShare: 0,
      motherShare: 0,
      fatherShare: 0,
      sonShare: 0,
      daughterShare: 0,
      brotherShare: 0,
      sisterShare: 0,
      grandSonShare: 0,
      grandDaughterShare: 0,
      stepShareEach: 0,
      willAmount: round2(willAmount),
      debtAmount: round2(debtAmount),
      funeralExpenses: round2(funeralExp),
      netEstate: round2(netEstate),
    };

    // compute fixed shares that are fractions of estateAfterWill
    // spouse (based on gender of deceased and whether there are descendants)
    const hasDescendants = s + d + gs + gd > 0;
    let spouseTotal = 0;
    if (gender === "male" && w > 0) {
      // deceased is male -> wives get share
      spouseTotal = estateAfterWill * (hasDescendants ? 1 / 8 : 1 / 4);
      shares.wifeShareEach = w > 0 ? round2(spouseTotal / w) : 0;
    } else if (gender === "female" && h > 0) {
      // deceased is female -> husband gets share
      shares.husbandShare = round2(estateAfterWill * (hasDescendants ? 1 / 4 : 1 / 2));
      spouseTotal = shares.husbandShare;
    }
    spouseTotal = round2(spouseTotal);

    // mother share (fractions of estateAfterWill). According to Hanafi:
    // - mother gets 1/6 if there are children or (>=2 siblings); else 1/3.
    let motherShare = 0;
    if (mother) {
      if (s + d > 0 || br + si >= 2) {
        motherShare = estateAfterWill * (1 / 6);
      } else {
        motherShare = estateAfterWill * (1 / 3);
      }
      motherShare = round2(motherShare);
      shares.motherShare = motherShare;
    }

    // father: if there are children -> gets 1/6 (fixed). If no children, he may be residuary (get remainder).
    let fatherShare = 0;
    if (father && (s + d) > 0) {
      fatherShare = round2(estateAfterWill * (1 / 6));
      shares.fatherShare = fatherShare;
    }
    // If father exists and no children, we'll assign residuary after subtracting other fixed shares.

    // subtract fixed fractional shares (spouse, mother, father-if-fixed) from estateAfterWill
    let totalFixed = 0;
    totalFixed += spouseTotal;
    totalFixed += motherShare;
    totalFixed += fatherShare; // only counts if father had fixed share (i.e., children exist)

    let remaining = round2(estateAfterWill - totalFixed);
    if (remaining < 0) remaining = 0;

    // If father exists and there are NO children, father becomes residuary: he takes the remaining
    if (father && s + d === 0) {
      fatherShare = round2(remaining);
      shares.fatherShare = fatherShare;
      remaining = 0;
    }

    // Now distribute the remaining to residuary heirs
    // Priority: children (sons/daughters) -> grandchildren -> siblings (only if no father present)
    if (s + d > 0) {
      // children present -> distribute remaining by 2:1 ratio (each son 2 parts, each daughter 1 part)
      const childPortions = 2 * s + d;
      if (childPortions > 0 && remaining > 0) {
        const perPortion = remaining / childPortions;
        shares.sonShare = s > 0 ? round2(perPortion * 2) : 0; // per son
        shares.daughterShare = d > 0 ? round2(perPortion) : 0; // per daughter
        remaining = 0;
      }
    } else if (gs + gd > 0) {
      // grandchildren (when direct children absent)
      const grandPortions = 2 * gs + gd;
      if (grandPortions > 0 && remaining > 0) {
        const perPortion = remaining / grandPortions;
        shares.grandSonShare = gs > 0 ? round2(perPortion * 2) : 0;
        shares.grandDaughterShare = gd > 0 ? round2(perPortion) : 0;
        remaining = 0;
      }
    } else if ((br + si) > 0 && !father) {
      // siblings inherit only if no children/grandchildren and father doesn't block them
      const siblingPortions = 2 * br + si;
      if (siblingPortions > 0 && remaining > 0) {
        const perPortion = remaining / siblingPortions;
        shares.brotherShare = br > 0 ? round2(perPortion * 2) : 0;
        shares.sisterShare = si > 0 ? round2(perPortion) : 0;
        remaining = 0;
      }
    }

    // stepchildren - get share from will only (divided equally among step-sons/daughters specified)
    const totalStepChildren = stS + stD;
    shares.stepShareEach = totalStepChildren > 0 ? round2(willAmount / totalStepChildren) : 0;

    // ensure all numeric outputs are rounded
    shares.willAmount = round2(shares.willAmount);
    shares.debtAmount = round2(shares.debtAmount);
    shares.funeralExpenses = round2(shares.funeralExpenses);
    shares.netEstate = round2(shares.netEstate);
    shares.wifeShareEach = round2(shares.wifeShareEach || 0);
    shares.husbandShare = round2(shares.husbandShare || 0);
    shares.motherShare = round2(shares.motherShare || 0);
    shares.fatherShare = round2(shares.fatherShare || 0);
    shares.sonShare = round2(shares.sonShare || 0);
    shares.daughterShare = round2(shares.daughterShare || 0);
    shares.brotherShare = round2(shares.brotherShare || 0);
    shares.sisterShare = round2(shares.sisterShare || 0);
    shares.grandSonShare = round2(shares.grandSonShare || 0);
    shares.grandDaughterShare = round2(shares.grandDaughterShare || 0);

    setResult(shares);
  };

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <Header 
          showGuide={showGuide} 
          setShowGuide={setShowGuide} 
          currency={currency} 
          setCurrency={setCurrency} 
        />

        <div className="grid-container">
          <EstateInformation
            gender={gender}
            setGender={setGender}
            total={total}
            setTotal={setTotal}
            debts={debts}
            setDebts={setDebts}
            funeralExpenses={funeralExpenses}
            setFuneralExpenses={setFuneralExpenses}
            sons={sons}
            setSons={setSons}
            daughters={daughters}
            setDaughters={setDaughters}
            wives={wives}
            setWives={setWives}
            husbands={husbands}
            setHusbands={setHusbands}
            mother={mother}
            setMother={setMother}
            father={father}
            setFather={setFather}
            brothers={brothers}
            setBrothers={setBrothers}
            sisters={sisters}
            setSisters={setSisters}
            grandSons={grandSons}
            setGrandSons={setGrandSons}
            grandDaughters={grandDaughters}
            setGrandDaughters={setGrandDaughters}
            stepSons={stepSons}
            setStepSons={setStepSons}
            stepDaughters={stepDaughters}
            setStepDaughters={setStepDaughters}
            willPercent={willPercent}
            setWillPercent={setWillPercent}
            calculate={calculate}
          />

          <DistributionResult
            result={result}
            currency={currency}
            sons={sons}
            daughters={daughters}
            wives={wives}
            husbands={husbands}
            grandSons={grandSons}
            grandDaughters={grandDaughters}
            brothers={brothers}
            sisters={sisters}
            stepSons={stepSons}
            stepDaughters={stepDaughters}
          />
        </div>

        {/* Footer */}
        <div className="footer">
          <p>⚖️ Based on Pakistani Islamic Inheritance Law</p>
          <p className="footer-disclaimer">This calculator is for educational purposes. Consult a qualified Islamic scholar or lawyer for legal advice.</p>
        </div>
      </div>
    </div>
  );
}