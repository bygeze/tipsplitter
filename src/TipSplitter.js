import React, { useState, useRef, useCallback, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PeopleTable from "./PeopleTable";
import CalculationTable from "./CalculationTable";
import { database } from './firebase.js';
import { ref, get, set, push, update, remove } from 'firebase/database';
import Summary from "./Summary.js";
import './TipSplitter.css';

const TipSplitter = ({ handleLogout }) => {
  const [people, setPeople] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);

  const isInitialMount = useRef(true);

  const calculateTotalHours = useCallback((people) => {
    const totalHours = people.reduce((total, person) => total + parseFloat(person.hours || 0), 0);
    setTotalHours(totalHours);
  }, [setTotalHours]);

  useEffect(() => {
    if (isInitialMount.current) {
      fetchPersonsFromFirebase().then((data) => {
        console.log('Data from Firebase:', data);
        setPeople(data);
      });

      isInitialMount.current = false;
      return;
    }

    calculateTotalHours(people);
  }, [people, calculateTotalHours]);

  const fetchPersonsFromFirebase = () => {
    const uid = localStorage.getItem('uid');
    const peopleRef = ref(database, `users/${uid}/people`);

    return get(peopleRef).then((snapshot) => {
      const data = snapshot.val();
      const peopleList = data ? Object.entries(data).map(([id, person]) => ({ id, ...person })) : [];
      return peopleList;
    });
  };

  const handleAddPerson = (newPerson) => {
    const uid = localStorage.getItem('uid');
    const peopleRef = ref(database, `users/${uid}/people`);
    const newPersonRef = push(peopleRef);
    const newPersonId = newPersonRef.key;

    const updatedPeople = [...people, { id: newPersonId, ...newPerson }];
    setPeople(updatedPeople);
    set(newPersonRef, newPerson);
  };

  const handleModifyPerson = (modifiedPerson) => {
    const uid = localStorage.getItem('uid');
    const personRef = ref(database, `users/${uid}/people/${modifiedPerson.id}`);

    const updatedPeople = people.map((person) =>
      person.id === modifiedPerson.id ? modifiedPerson : person
    );
    setPeople(updatedPeople);
    update(personRef, modifiedPerson);
  };

  const handleDeletePerson = (personId) => {
    const updatedPeople = people.filter(person => person.id !== personId);
    setPeople(updatedPeople);

    const uid = localStorage.getItem('uid');
    const personRef = ref(database, `users/${uid}/people/${personId}`);
    remove(personRef);
  };

  const handleCalculate = () => {
    const hourlyRate = totalHours !== 0 ? totalMoney / totalHours : 0;
    setHourlyRate(hourlyRate);
  };

  const handleCalculateAmounts = () => {
    const updatedPeople = people.map((person) => {
      const calculatedMoney = parseFloat(person.hours) * hourlyRate;
      return { ...person, money: calculatedMoney };
    });
    setPeople(updatedPeople);
  };

  const roundToEuroStep = (number) => {
    if (Number.isInteger(number)) {
      return number.toFixed(2);
    }
    const roundedNumber = Math.round(number);
    return roundedNumber.toFixed(2);
  };

  return (
    <div className="container mt-2">
      <div className="row ts-topbar">
        <div className="col-8 ts-app-label"><h1>TipSplitter</h1></div>
        <div className={"col-4 justify-content-end ts-logout"}><p className="t-right" onClick={handleLogout}>Cerrar sesión</p></div>
      </div>

      <PeopleTable
        round={roundToEuroStep}
        people={people}
        onAddPerson={handleAddPerson}
        onModifyPerson={handleModifyPerson}
        onDeletePerson={handleDeletePerson}
      />
      <CalculationTable
        round={roundToEuroStep}
        totalHours={totalHours}
        totalMoney={totalMoney}
        setTotalMoney={setTotalMoney}
        hourlyRate={hourlyRate}
        handleCalculate={handleCalculate}
        handleCalculateAmounts={handleCalculateAmounts}
      />
      <Summary
        round={roundToEuroStep}
        people={people}
      />
    </div>
  );
};

export default TipSplitter;
