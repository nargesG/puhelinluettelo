import { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const baseUrl = 'http://localhost:3001/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterString, setFilterString] = useState("");

  const getPersonsFromServer = () => {
  axios
    .get(baseUrl)
    .then(response => {
      setPersons(response.data)
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
        id: `${persons.length + 1}`,
      };

      
      axios
      .post(baseUrl, newPerson)
      .then(response => response.data)
      .then(person => {
        setPersons(persons.concat(person));
      })
    }

//     const create = newObject => {
//   const request = axios.post(baseUrl, newObject)
//   return request.then(response => {
//     return response.data
//   })
// }

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
