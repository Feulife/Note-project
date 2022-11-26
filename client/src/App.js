import "./App.css";
import { Row, Col, Table, Button, Card, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotes,
  deleteNote,
  updateNote,
  createNote,
  showDateTime,
} from "./actions/action.js";

function App() {
  const dispatch = useDispatch();
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    dateCreate: "",
  });
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    try {
      dispatch(getNotes());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const notes = useSelector((state) => state.notes);

  const noteFormData = useSelector((state) =>
    currentId ? state.notes.find((data) => data._id === currentId) : null
  );

  useEffect(() => {
    if (noteFormData) setNoteData(noteFormData);
  }, [noteFormData]);

  const clear = () => {
    setCurrentId(0);
    setNoteData({ title: "", description: "", createdAt: "", updatedAt: "", dateCreate: "" });
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
      <div className="section" style={{ margin: "20px" }}>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>NOTE Form</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {currentId ? "Edit" : "Create"} NOTE
                </Card.Subtitle>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formGroupTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      type="text"
                      placeholder="Enter Title"
                      value={noteData.title}
                      onChange={(e) =>
                        setNoteData({
                          ...noteData,
                          title: e.target.value,
                          // dateCreate: showDateTime,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      name="description"
                      type="text"
                      placeholder="Enter Description"
                      value={noteData.description}
                      onChange={(e) =>
                        setNoteData({
                          ...noteData,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  {/* <Form.Group className="mb-3" controlId="formGroupPublish">
                    <Form.Label>Publish</Form.Label>
                    <Form.Control
                      name="published"
                      type="text"
                      placeholder="Enter Publish"
                      value={noteData.published}
                      onChange={(e) =>
                        setNoteData({
                          ...noteData,
                          published: e.target.value,
                        })
                      }
                    />
                  </Form.Group> */}
                  <div className="d-grid gap-2">
                    <Button variant="success" size="lg" type="submit" onClick={() =>  setNoteData({
                          ...noteData,
                          dateCreate: showDateTime,
                        })}>
                      Save
                    </Button>
                    <Button variant="secondary" size="lg" onClick={clear}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note, index) => (
                  <>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{note?.title}</td>
                      <td>{note?.description}</td>
                      <td>{note.dateCreate}</td>
                      <td>
                        <div className="d-grid gap-2">
                          <Button
                            variant="outline-warning"
                            size="lg"
                            style={{ margin: "1%" }}
                            onClick={() => setCurrentId(note._id)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="lg"
                            style={{ margin: "1%" }}
                            onClick={() => dispatch(deleteNote(note._id))}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
