import React, { useState, useEffect } from 'react';
import { fetchNotes, addNote, deleteNote } from '../api/api';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes()
      .then(response => {
        setNotes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
        setLoading(false);
      });
  }, []);

  const handleAddNote = async () => {
    if (newNote.trim() === '') return;
    try {
      const response = await addNote(newNote);
      setNotes([...notes, response.data]);
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  if (loading) {
    return <div className="container text-center text-white">Loading notes...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Smart Notes</h1>
      <div className="card mb-8">
        <textarea
          className="input mb-4"
          rows="4"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your note here..."
        ></textarea>
        <button 
          onClick={handleAddNote}
          className="btn btn-primary w-full"
        >
          Add Note
        </button>
      </div>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="card flex justify-between items-center">
            <p className="flex-grow">{note.content}</p>
            <button 
              onClick={() => handleDeleteNote(note.id)}
              className="btn btn-danger ml-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;