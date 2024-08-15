import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/notes');
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setLoading(false);
    }
  };

  const addNote = async () => {
    if (newNote.trim() === '') return;
    try {
      const response = await axios.post('/api/notes', { content: newNote });
      setNotes([...notes, response.data]);
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading notes...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Smart Notes</h1>
      <div className="mb-8">
        <textarea
          className="w-full p-2 border rounded"
          rows="4"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your note here..."
        ></textarea>
        <button 
          onClick={addNote}
          className="mt-2 bg-secondary text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <p>{note.content}</p>
            <button 
              onClick={() => deleteNote(note.id)}
              className="text-red-500 hover:text-red-700"
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