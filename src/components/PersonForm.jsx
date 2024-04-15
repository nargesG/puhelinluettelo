import { useState } from "react";

const PersonForm = ({ addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    // Ensure to call preventDefault on the event object
    event.preventDefault();

    // addPerson is a component prop
    addPerson(newName, newNumber);

    // reset the inner states
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formItem">
        <h4>name:</h4>
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div className="formItem">
        <h4>number:</h4>
        <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" className="button">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
