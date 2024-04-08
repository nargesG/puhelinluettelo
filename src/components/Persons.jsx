
const Persons = ({ persons, onRemove, filterString }) => {

  return persons
    .filter(({ name }) =>
      name.toLowerCase().includes(filterString.toLowerCase())
    )
    .map(({ id, name, number }) => (
      <p key={id}>
        {name} {number}
        <button onClick={() => onRemove(id, name)} >delete</button>
      </p>
    ));
};

export default Persons;
