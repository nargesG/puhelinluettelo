const Filter = ({ filterString, onChange }) => {
  return (
    <div className="filterContainer">
      <h4>
        filter shown with
      </h4>
      <input value={filterString} onChange={onChange} />
    </div>
  );
};

export default Filter;
