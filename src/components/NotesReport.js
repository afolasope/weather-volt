import React, { useState } from 'react';
import { useDetailsContext } from '../context/details_context';
import { v4 as uuidv4 } from 'uuid';
import EditNote from './EditNote';
import DeleteNote from './DeleteNote';
import { useRef } from 'react';

const NotesReport = ({ id }) => {
  const { notes, addToNote, is_editing } = useDetailsContext();
  const [noteInput, setNoteInput] = useState();
  const textareaRef = useRef();
  const handleAddNote = () => {
    if (noteInput && !is_editing) {
      addToNote(id, noteInput, uuidv4());
    }
    if (noteInput && is_editing) {
      addToNote(id, noteInput, uuidv4());
    }
    setNoteInput('');
    textareaRef.current.value = '';
  };

  return (
    <section className="section-wrapper notes-wrapper">
      <h3 className="note-title">Notes Report</h3>
      <textarea
        name="text"
        id="text"
        cols="30"
        rows="10"
        value={noteInput}
        ref={textareaRef}
        onChange={(e) => setNoteInput(e.target.value)}
      ></textarea>

      <button className="add-note" onClick={handleAddNote}>
        {is_editing ? 'Edit Note' : 'Add Note'}
      </button>
      {notes[id] && (
        <ul className="note-items">
          {notes[id].map(({ textId, text }) => {
            return (
              <li className="note-item" key={textId}>
                <p>{text}</p>
                <div className="note-cta">
                  <EditNote
                    textId={textId}
                    id={id}
                    text={text}
                    setNoteInput={setNoteInput}
                  />
                  <DeleteNote textId={textId} id={id} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default NotesReport;
