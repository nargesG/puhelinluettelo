import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";



const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterString, setFilterString] = useState("");

  const getPersonsFromServer = () => {
  personService
    .getAll()
    .then(persons => {
      setPersons(persons)
    })
  }

  useEffect(getPersonsFromServer, [])

  const handleSearchChange = (event) => {
    setFilterString(event.target.value);
  };

  const addPerson = (newName, newNumber) => {
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook!`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        important: Math.random() < 0.5,
        id: uuidv4()
,
      };

      personService
      .create(newPerson)
      .then(person => {
        setPersons(persons.concat(person));
      })
      
    }
  };

  const removePerson = (id, name) => {
    if (confirm(`Delete ${name}?`) == true) {
      
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person =>  person.id !== id))
      })
      .catch(error => {
        console.error("Error removing person:", error);
      });
    }
   
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
     <Filter filterString={filterString} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} onRemove={removePerson} filterString={filterString}  />
    </div>
  );
};

export default App;
