import React, { useEffect } from "react";
import "./CalculationTable.css"

const CalculationTable = ({ totalHours, totalMoney, setTotalMoney, hourlyRate, handleCalculate, handleCalculateAmounts }) => {
  useEffect(() => {
    handleCalculate();
  }, [totalMoney, handleCalculate]);

  return (
    <div className="container pb-2">
        <div className="ct-topbar row">
          <div className="col-10"><h4>Cálculos</h4></div>
        </div>
        <div className="ct-content row pt-3">
          <div className="input-group mb-2">
            <span class="input-group-text" id="basic-addon1">⏱</span>
            <input type="text" disabled class="form-control" aria-label="Username" value={totalHours} aria-describedby="basic-addon1" />
            <span class="input-group-text" id="basic-addon2">€</span>
            <input type="text" value={totalMoney} onChange={(e) => setTotalMoney(e.target.value)} class="form-control" aria-label="Username" aria-describedby="basic-addon1" />
            <button className="btn btn-primary" onClick={handleCalculateAmounts}>
              Calcular
            </button>
          </div>
          <div className="row">
           <p>Precio por hora: <span>{hourlyRate.toFixed(2)}</span></p>
          </div>
        </div>
    </div>
  );
};

export default CalculationTable;
