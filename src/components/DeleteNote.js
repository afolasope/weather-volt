import React from 'react';
import { MdDelete } from 'react-icons/md';
import { useDetailsContext } from '../context/details_context';

const DeleteNote = ({ id, textId }) => {
  const { deleteNote } = useDetailsContext();

  const handleDelete = () => {
    deleteNote(id, textId);
  };

  return (
    <button className=" btn-icon note-btn" onClick={handleDelete}>
      <MdDelete />
    </button>
  );
};

export default DeleteNote;
