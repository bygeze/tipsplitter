import React, { useEffect } from "react";

const CalculationTable = ({ totalHours, totalMoney, setTotalMoney, hourlyRate, handleCalculate, handleCalculateAmounts }) => {
  useEffect(() => {
    handleCalculate();
  }, [totalMoney, handleCalculate]);

  return (
    <div>
      <h3>Resumen de Cálculos</h3>
      <table className="table">
        <tbody>
          <tr>
            <td>Cantidad de horas</td>
            <td>{totalHours}</td>
          </tr>
          <tr>
            <td>Cantidad de dinero</td>
            <td>
              <input
                type="text"
                value={totalMoney}
                onChange={(e) => setTotalMoney(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Precio por hora</td>
            <td>{hourlyRate}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleCalculateAmounts}>
        Calcular importe por persona
      </button>
    </div>
  );
};

export default CalculationTable;
