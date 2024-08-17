import React, { useState } from "react";
import NoteContext from "./NotesContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // GET ALL NOTES
  const getNotes = async () => {
    console.log("Getting notes");
    try {
      const response = await fetch(`${host}/api/notes/fetchNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });

      const json = await response.json();
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("Expected an array but got:", json);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // ADD A NOTE
  const addNote = async (title, description, tag) => {
    console.log("Adding a note");
    
    try {
      const response = await fetch(`${host}/api/notes/addNotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ODFhNGJiYjEzNmY5NmYxMmNjNzkwIn0sImlhdCI6MTcyMTI0NTgzNH0.kpfkvH1nt9OEqR3dCoOXH5UL2NnwQenTHZMDndvP14Y',
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();

      if (note) {
        setNotes([...notes, note]);
      } else {
        console.error("Failed to add note:", note);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // DELETE A NOTE
  const deleteNote = async (id) => {
    console.log("Deleting a note with id " + id);
    try {
      await fetch(`${host}/api/notes/deletenode/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ODFhNGJiYjEzNmY5NmYxMmNjNzkwIn0sImlhdCI6MTcyMTI0NTgzNH0.kpfkvH1nt9OEqR3dCoOXH5UL2NnwQenTHZMDndvP14Y',
        },
      });

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    console.log("Editing a note with id " + id);
    try {
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ODFhNGJiYjEzNmY5NmYxMmNjNzkwIn0sImlhdCI6MTcyMTI0NTgzNH0.kpfkvH1nt9OEqR3dCoOXH5UL2NnwQenTHZMDndvP14Y',
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      if (json) {
        const updatedNotes = notes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        );
        setNotes(updatedNotes);
      } else {
        console.error("Failed to update note:", json);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
