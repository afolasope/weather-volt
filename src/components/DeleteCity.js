import React from 'react';
import { MdDelete } from 'react-icons/md';
import { useCitiesContext } from '../context/cities_context';

const DeleteCity = ({ id }) => {
  const { deleteCity } = useCitiesContext();

  const handleDelete = (id) => {
    deleteCity(id);
  };

  return (
    <div>
      <MdDelete className="btn-icon" onClick={() => handleDelete(id)} />
    </div>
  );
};

export default DeleteCity;
