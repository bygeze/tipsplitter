import React, { useState } from "react";
import "./PeopleTable.css";

const PeopleTable = ({ round, people, onAddPerson, onModifyPerson, idCounter }) => {
  const [newPerson, setNewPerson] = useState({
    id: idCounter + 1,
    name: "",
    hours: "",
    money: 0  // Nueva propiedad "money"
  });

  const [peopeListCollapsed, setPeopleListCollapsed] = useState(1);

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

  const handlePeopleListCollapseBtn = () => {
    setPeopleListCollapsed(!peopeListCollapsed);
  }

  return (
    <div className="container pb-2">
        <div className="pt-topbar row">
          <div className="col-10"><h4>Lista de personas</h4></div>
          <div className="col-2" ><h4 className="t-right" onClick={handlePeopleListCollapseBtn}>{peopeListCollapsed ? "▼" : "▲"}</h4></div>
        </div>
        <div className={peopeListCollapsed ? "row d-none" : "row d-initial"}> 
          <table className="table  m-0">
          <thead>
            <tr>
              <th className="d-none">  ID</th>
              <th>Nombre</th>
              <th>Cant. hrs.</th>
              <th>A percibir</th>
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
                <td>{round(person.money.toFixed(2))}€</td> {/* Mostrar la nueva propiedad "money" */}
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
                  Añadir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
    </div>
  );
};

export default PeopleTable;
