import './App.css';
import { Navbar, Nav, Container, NavDropdown, Row, Col, Table, Button, Card, Form, } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes, deleteNote, updateNote, createNote } from "./actions/action.js";

function App() {
  const dispatch = useDispatch();
  const [noteData, setNoteData] = useState({
    title: "",
    descripton: "";
    published: "",
  });
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    try {
      dispatch(getNotes());
    } catch (error) {
      console.log(error);
    }
  }, []);

  const notes = useSelector((state) => state.notes);

  const noteFormData = useSelector((state) => currentId ? state.notes.find((data) => data._id === currentId) : null );

  useEffect(() => {
    if (noteFormData) setNoteData(noteFormData);
  }, [noteFormData]);

  const clear = () => {
    setCurrentId(0);
    setNoteData({ title: "", descripton: "", published: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createNote(noteData));
      clear();
    } else {
      dispatch(updateNote(currentId, noteData));
      clear();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
