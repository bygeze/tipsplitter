// Summary.js
import React from 'react';

const Summary = ({ people }) => {
  // Función para calcular el resumen
  const calculateSummary = () => {
    // Creamos un objeto para almacenar la información resumida
    const summaryData = {};

    // Iteramos sobre la lista de personas
    people.forEach((person) => {
      // Creamos una clave única para cada grupo basada en la cantidad de horas
      const groupKey = `${person.hours}h`;

      // Si el grupo no existe, lo inicializamos
      if (!summaryData[groupKey]) {
        summaryData[groupKey] = {
          count: 0,
          hours: person.hours,
          money: person.money,
          names: [],
        };
      }

      // Incrementamos la cantidad de personas en el grupo
      summaryData[groupKey].count++;

      // Agregamos el nombre de la persona al grupo
      summaryData[groupKey].names.push(person.name);

      // Sumamos el dinero al grupo
      summaryData[groupKey].money = person.money;
    });

    // Convertimos el objeto a un array para renderizar fácilmente
    const result = Object.values(summaryData);

    return result;
  };

  const summaryData = calculateSummary();

  return (
    <div>
      <h2>Resumen</h2>
      {summaryData.map((summaryItem, index) => (
        <div key={index}>
          <p>
            {summaryItem.count} pax * {summaryItem.hours}h = {summaryItem.money}€ ({summaryItem.names.join(', ')})
          </p>
        </div>
      ))}
    </div>
  );
};

export default Summary;
