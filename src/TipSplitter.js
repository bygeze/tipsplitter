import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PeopleTable from "./PeopleTable";
import CalculationTable from "./CalculationTable";
import { database } from './firebase.js';
import { ref, get, set, update, onValue } from 'firebase/database';
import Summary from "./Summary.js";

// Define la función exist

const TipSplitter = ({handleLogout}) => {

    const fetchPersonsFromFirebase = () => {
        const uid = localStorage.getItem('uid');
        const peopleRef = ref(database, `users/${uid}/people`);
        
        // Return the promise directly
        return get(peopleRef).then((snapshot) => {
          const data = snapshot.val();
          return data || []; // Return an empty array if data is falsy
        });
      };

      const fetchIdCounterFromFirebase = () => {
        const uid = localStorage.getItem('uid');
        const idCounterRef = ref(database, `users/${uid}/idCounter`);
        
        // Return the promise directly
        return get(idCounterRef).then((snapshot) => {
          const data = snapshot.val();
          return data || []; // Return an empty array if data is falsy
        });
      };     


  const [people, setPeople] = useState([]);
  const [idCounter, setIdCounter] = useState(fetchIdCounterFromFirebase() || 0);
  const [totalHours, setTotalHours] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const isInitialMount = useRef(true);


  useEffect(() => {
    if (isInitialMount.current) {
      // Skip the first render
      isInitialMount.current = false;
      return;
    }
    calculateTotalHours();

    // Your logic for handling changes in 'people'
    console.log('People changed:', people);
  }, [people]);

  useEffect(() => {
    fetchPersonsFromFirebase().then((data) => {
      console.log('Data from Firebase:', data);
      setPeople(data);
    });

    fetchIdCounterFromFirebase().then((data) => {
        console.log('Data from Firebase:', data);
        setIdCounter(data);
      });
  }, []); // Only run on mount



const saveDataToFirebase = (updatedPeople, updatedIdCounter) => {
    const uid = localStorage.getItem('uid');
  
    // Guardar en Firebase asociado al UID
    if (uid) {
      const peopleRef = ref(database, `users/${uid}/people`);
      set(peopleRef, updatedPeople);
  
      const idCounterRef = ref(database, `users/${uid}/idCounter`);
      set(idCounterRef, updatedIdCounter);
    }

  };


  const updateDataFromFirebase = (updatedPeople) => {
    const uid = localStorage.getItem('uid');
  
    if (uid && updatedPeople.length > 0) {
      const peopleObject = updatedPeople.reduce((acc, person) => {
        acc[person.id] = person;
        return acc;
      }, {});
  
      const peopleRef = ref(database, `users/${uid}/people`);
  
      // Actualizar datos de personas
      update(peopleRef, peopleObject);
    }
  };
  
  

  const handleAddPerson = (newPerson) => {
    setPeople((prevPeople) => [...prevPeople, newPerson]);
    setIdCounter((prevIdCounter) => prevIdCounter + 1);
    saveDataToFirebase([...people, newPerson], idCounter + 1); // Pass the updated data to the function
  };

  const handleModifyPerson = (modifiedPerson) => {
    const updatedPeople = people.map((person) =>
      person.id === modifiedPerson.id ? modifiedPerson : person
    );
    setPeople(updatedPeople);
    updateDataFromFirebase(updatedPeople); // Guardar datos al añadir persona

  };

  const calculateTotalHours = () => {
    console.log("plays")
    const totalHours = people.reduce((total, person) => total + parseFloat(person.hours || 0), 0);
    setTotalHours(totalHours);
  }

  const handleCalculate = () => {
    // Calcular precio por hora
    const hourlyRate = totalHours !== 0 ? totalMoney / totalHours : 0;
    setHourlyRate(hourlyRate);
    //updateDataFromFirebase(); // Guardar datos al añadir persona

  };

  const handleCalculateAmounts = () => {
    const updatedPeople = people.map((person) => {
      const calculatedMoney = parseFloat(person.hours) * hourlyRate;
      return { ...person, money: calculatedMoney };
    });
    setPeople(updatedPeople);
    
  };

  return (
    <div className="container mt-2">
        <div className="row">
            <div className="col-8"><h1>TipSplitter </h1></div>
            <div className={"col-4 justify-content-end"}><button onClick={handleLogout}>Salir</button></div>
        </div>


      <PeopleTable people={people} onAddPerson={handleAddPerson} onModifyPerson={handleModifyPerson} idCounter={idCounter} />
      <CalculationTable totalHours={totalHours} totalMoney={totalMoney} setTotalMoney={setTotalMoney} hourlyRate={hourlyRate} handleCalculate={handleCalculate} handleCalculateAmounts={handleCalculateAmounts}/>
      <Summary people={people} />
    </div>
  );
};

export default TipSplitter;
