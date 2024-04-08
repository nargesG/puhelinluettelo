import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import "./index.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterString, setFilterString] = useState("");
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)


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
    const person = persons.find((person) => person.name === newName);  
    if (person) {
      // alert(`${newName} is already in the phonebook!`);
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one.`)==true){
        personService
        .update(person.id, {...person, number: newNumber})
        .then(returnedPerson => {
          setPersons(
            persons.map(person => 
              person.id !== returnedPerson.id 
                ? person 
                : returnedPerson)
          )
          setMessage(
            `Changed ${person.name}'s number.`
          )
          setMessageType("succes")
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(() => {
          setMessage(
            `Information of ${person.name} has already been removed from server.`
          )
          setMessageType("error")
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        important: Math.random() < 0.5,
        id: uuidv4(),
      };

      personService
      .create(newPerson)
      .then(person => {
        setPersons(persons.concat(person));
        setMessage(`Added ${person.name}.`);
        setMessageType("succes");
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
      .catch(() => {
        setMessage(
          `Information of ${name} has already been removed from server.`
        )
        setMessageType("error")
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      });
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filterString={filterString} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} onRemove={removePerson} filterString={filterString}  />
    </div>
  );
};

export default App;
