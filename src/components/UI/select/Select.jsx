import React from 'react';

const Select = ({ option, defaultOption, value, onChange }) => {
  return (
    <div>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option disabled value=''>{defaultOption}</option>
        {option.map(option =>
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        )}
      </select>
    </div>
  );
}

export default Select;
