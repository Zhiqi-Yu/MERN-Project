import React, { useMemo, useState } from "react";

// denomination
const DENOMS = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

// Calculate how many bills of each denomination should be issued.
function calcNotes(raw) {
  // Only non-negative integers are accepted
  const amount = Math.max(0, Math.trunc(Number(raw) || 0));
  let remaining = amount;
  const rows = [];

  for (const d of DENOMS) {
    const cnt = Math.floor(remaining / d);
    rows.push({ denom: d, count: cnt });
    remaining -= cnt * d;
  }
  const totalNotes = rows.reduce((s, r) => s + r.count, 0);
  return { amount, rows, totalNotes };
}

export default function CheckDenominations() {
  const [input, setInput] = useState("");      // Text box input
  const [lockedAmt, setLockedAmt] = useState(null); // The amount "locked" after clicking Withdraw

  // Real-time preview (showing the user the result before they click the button)
  const preview = useMemo(() => calcNotes(input), [input]);

  // Click Withdraw: Locks and displays the result at that moment.
  const onWithdraw = (e) => {
    e.preventDefault();
    setLockedAmt(preview.amount);
  };

  // Results to be displayed: Prioritize showing results for locked amounts; if no amounts are locked, display a preview.
  const result = useMemo(
    () => calcNotes(lockedAmt ?? input),
    [lockedAmt, input]
  );

  const disableWithdraw = (preview.amount <= 0);

  return (
    <div>
      <h2>ATM Dispenser • Check Denominations</h2>

      <form onSubmit={onWithdraw} className="card" style={{maxWidth:520}}>
        <label className="subtle" htmlFor="amt">Enter amount (₹):</label>
        <div className="row" style={{gap:8, marginTop:6}}>
          <input
            id="amt"
            className="input"
            placeholder="e.g. 7863"
            inputMode="numeric"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            style={{flex:1}}
          />
          <button className="btn btn-primary" type="submit" disabled={disableWithdraw}>
            Withdraw
          </button>
        </div>
        <p className="subtle" style={{marginTop:8}}>
          (Only non-negative integers are accepted; decimals will be truncated.)
        </p>
      </form>

      <div className="card" style={{marginTop:16, maxWidth:520}}>
        <h3 style={{marginTop:0}}>
          Result for ₹{result.amount.toLocaleString("en-IN")}
        </h3>
        <ul style={{lineHeight:1.8, marginLeft:18}}>
          {result.rows.map(r => (
            <li key={r.denom}>
              <strong>{r.count}</strong> notes of Rs <strong>{r.denom}</strong>
            </li>
          ))}
        </ul>
        <p><strong>Total notes dispensed: {result.totalNotes}</strong></p>
        {lockedAmt !== null && (
          <button className="btn" onClick={()=>setLockedAmt(null)}>Clear lock (edit again)</button>
        )}
      </div>
    </div>
  );
}
