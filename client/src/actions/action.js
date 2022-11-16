import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/constants.js";
import * as api from "../api/index.js";

export const getNotes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchNotes();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createNote = (Note) => async (dispatch) => {
  try {
    const { data } = await api.createNote(Note);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateNote = (id, Note) => async (dispatch) => {
  try {
    const { data } = await api.updateNote(id, Note);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    await api.deleteNote(id);
    dispatch({ type: DELETE, payload: id});
  } catch (error) {
    console.log(error.message);
  }
};