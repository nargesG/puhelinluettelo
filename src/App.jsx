import { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterString, setFilterString] = useState("");

  const hook = () => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }

  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

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
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterString={filterString} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterString={filterString} />
    </div>
  );
};

export default App;
