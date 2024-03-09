import { useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filterString, setFilterString] = useState("");

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
