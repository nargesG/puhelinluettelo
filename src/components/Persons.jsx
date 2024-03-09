const Persons = ({ persons, filterString }) => {
  return persons
    .filter(({ name }) =>
      name.toLowerCase().includes(filterString.toLowerCase())
    )
    .map(({ id, name, number }) => (
      <p key={id}>
        {name} {number}
      </p>
    ));
};

export default Persons;
