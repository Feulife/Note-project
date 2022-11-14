import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
})

export const fetchNotes = () => API.get(`/note`);
export const createNote = (newNote) => API.post(`/note`, newNote);
export const deleteNote = (id) => API.delete(`/note/${id}`);
export const updateNote = (id, updateNote) => API.patch(`/note/${id}`, updateNote);