
const Persons = ({ persons, onRemove, filterString }) => {

  return persons
    .filter(({ name }) =>
      name.toLowerCase().includes(filterString.toLowerCase())
    )
    .map(({ id, name, number }) => (
      <p key={id} className="personItem">
        <h4>{name}</h4> 
        <h4>{number}</h4>
        <div>
          <button onClick={() => onRemove(id, name)} className="button" >delete</button>
        </div>
      </p>
    ));
};

export default Persons;
