import axios from "axios";

const API = axios.create({
  baseURL: "https://note-project-backend.vercel.app"
})

export const fetchNotes = () => API.get(`/note`);
export const createNote = (newNote) => API.post(`/note`, newNote);
export const deleteNote = (id) => API.delete(`/note/${id}`);
export const updateNote = (id, updateNote) => API.patch(`/note/${id}`, updateNote);
export const likeNote = (id, likeNote) => API.patch(`/note/${id}`, likeNote);
