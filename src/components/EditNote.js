import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { useDetailsContext } from '../context/details_context';

const EditNote = ({ text, setNoteInput, textId }) => {
  const { editNote } = useDetailsContext();
  const handleEdit = () => {
    setNoteInput(text);
    editNote(textId);
  };

  return (
    <button className="btn-icon note-btn" onClick={handleEdit}>
      <FaEdit />
    </button>
  );
};

export default EditNote;
