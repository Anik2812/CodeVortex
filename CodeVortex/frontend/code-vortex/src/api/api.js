import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchFlashcards = () => axios.get(`${API_URL}/flashcards`);
export const fetchNotes = () => axios.get(`${API_URL}/notes`);
export const addNote = (content) => axios.post(`${API_URL}/notes`, { content });
export const deleteNote = (id) => axios.delete(`${API_URL}/notes/${id}`);
export const sendAIMessage = (message) => axios.post(`${API_URL}/ai-assistant`, { message });