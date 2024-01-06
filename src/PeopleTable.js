import React, { useState } from "react";

const PeopleTable = ({ people, onAddPerson, onModifyPerson, idCounter }) => {
  const [newPerson, setNewPerson] = useState({
    id: idCounter + 1,
    name: "",
    hours: "",
    money: 0  // Nueva propiedad "money"
  });

  const handleAddClick = () => {
    onAddPerson(newPerson);

    setNewPerson({
      id: newPerson.id + 1,
      name: "",
      hours: "",
      money: 0  // Reiniciamos la nueva propiedad "money" para la siguiente persona
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleModifyClick = (modifiedPerson) => {
    onModifyPerson(modifiedPerson);
  };

  return (
    <div>
      <h3>Lista de personas</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="d-none">  ID</th>
            <th>Nombre</th>
            <th>Cantidad de horas</th>
            <th>Dinero a percibir</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td  className="d-none">{person.id}</td>
              <td>
                <input
                  size= "9"
                  type="text"
                  name="name"
                  value={person.name}
                  onChange={(e) => handleModifyClick({ ...person, name: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="hours"
                  size="2"
                  value={person.hours}
                  onChange={(e) => handleModifyClick({ ...person, hours: e.target.value })}
                />
              </td>
              <td>{person.money}</td> {/* Mostrar la nueva propiedad "money" */}
            </tr>
          ))}
          <tr>
            <td  className="d-none">
              <input type="text" name="id" disabled value={idCounter + 1} />
            </td>
            <td>
              <input size="9" type="text" name="name" value={newPerson.name} onChange={handleInputChange} />
            </td>
            <td>
              <input size="2" type="text" name="hours" value={newPerson.hours} onChange={handleInputChange} />
            </td>
            <td>
              <button className="btn btn-success" onClick={handleAddClick}>
                Añadir persona
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
