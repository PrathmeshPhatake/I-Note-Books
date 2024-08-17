import React, { useContext, useState } from "react";
import NotesContext from "../context/notes/NotesContext";
import PropTypes from 'prop-types'

const AddNote = (props) => {
  const context = useContext(NotesContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const[isButtonDisabled,setisButtonDisabled]= useState(true);

  
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    //disabled if one of them is empty 
    if(e.target.value.trim()==="" || note.title.trim()==="" || note.description.trim()==="")
    {
      setisButtonDisabled(true);
    }
    else{
      setisButtonDisabled(false);
    }
    
  };


  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert('Note Add succesfully','Success')
    setNote({title:" ",description:" ",tag:"default"});// add NOTE is cleared 
    setisButtonDisabled(true); //  disabled this button 
  };


  return (
    <div>
      <div className="container ">
        <h1>Add a notes</h1>
        <form>
          <div className="mb-3 my-3">
            <label htmlFor="title" className="form-label">
              <b>Title</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"  
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
            />
            <div id="title" className="form-text">
              Enter a Note in it!
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <b>Description</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              <b>Tag</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary "
            onClick={handleClick}
            disabled={isButtonDisabled}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};
AddNote.propTypes = {
  showAlert: PropTypes.func.isRequired,
};
export default AddNote;
