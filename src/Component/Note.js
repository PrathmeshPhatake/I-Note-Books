import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import NotesContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

const Note = (props) => {
  const context = useContext(NotesContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert('Note updated successfully', 'success');
    setNote({ id: "", etitle: "", edescription: "", etag: "default" });
  };

  const openModal = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    ref.current.click();
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary my-3 mx-2 d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    <b>Title</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    <b>Description</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    <b>Tag</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Save changes
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row my-3">
          <h1>Your notes</h1>
          <div className="container mx-2">
            {notes && notes.length === 0 && "No Notes to display"}
          </div>
          {Array.isArray(notes) && notes.map((noteItem) => (
            <NoteItem
              key={noteItem._id}
              updateNote={openModal}
              note={noteItem}
              showAlert={props.showAlert}
            />
          ))}
        </div>
      </div>
    </>
  );
};

Note.propTypes = {
  showAlert: PropTypes.func.isRequired,
};

export default Note;
