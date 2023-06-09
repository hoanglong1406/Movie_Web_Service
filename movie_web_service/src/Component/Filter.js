import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const Filter = ({ handleFilterChange }) => {
  const [sortOption, setSortOption] = useState('');

  // handle sort option change
  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    handleFilterChange(selectedOption); // call the parent handler with the selected option
  };

  return (
    <Form className='py-5'>
      <Form.Label>Sort By</Form.Label>
      <Form.Select id="sort" value={sortOption} onChange={handleSortChange}>
        <option value="">None</option>
        <option value="title">Title</option>
        <option value="year">Year</option>
      </Form.Select>
    </Form>
  );
};

export default Filter;
