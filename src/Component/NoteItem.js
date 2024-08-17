import React, { useContext } from 'react';
import NotesContext from '../context/notes/NotesContext';


function NoteItem(props) {
  const { note, updateNote } = props;
  const context = useContext(NotesContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-4">
      <div className="card my-3" style={{ width: "20rem" }}>
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title mr-auto p-2">{note.title}</h5>
            <i className="fa-regular fa-trash-can mx-2 p-2" onClick={() => {
              deleteNote(note._id)
              props.showAlert('Note deleted successfully', 'danger');
            }}></i>
            <i className="fa-regular fa-pen-to-square p-2" onClick={() => {
              updateNote(note);
            }}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}



export default NoteItem;
