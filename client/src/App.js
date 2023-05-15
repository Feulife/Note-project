import { Row, Col, Table, Button, Card, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotes,
  deleteNote,
  updateNote,
  createNote,
  likeNote,
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
    like: false,
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
    setNoteData({
      title: "",
      description: "",
      dateCreate: "",
      like: false,
    });
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
      <div className="section" style={{ margin: "10px"}}>
          <div class="position-fixed" style={{ marginLeft: "1%", width: "500px" }}>
            <Col md={12}>
              <Card bg="dark">
                <Card.Body>
                  <Card.Title className="text-center text-light">
                    PROVERB Form
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-center text-muted">
                    {currentId ? "Edit" : "Create"} PROVERB
                  </Card.Subtitle>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupTitle">
                      <Form.Label className="text-light">Title</Form.Label>
                      <Form.Control
                        name="title"
                        type="text"
                        placeholder="Enter Title"
                        value={noteData.title}
                        onChange={(e) =>
                          setNoteData({
                            ...noteData,
                            title: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formGroupDescription"
                    >
                      <Form.Label className="text-light">
                        Description
                      </Form.Label>
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
                    <div className="d-grid gap-2">
                      <Button
                        variant="success"
                        size="lg"
                        type="submit"
                        onClick={() =>
                          setNoteData({
                            ...noteData,
                            dateCreate: showDateTime,
                          })
                        }
                      >
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
          </div>
        
          <div style={{ marginLeft: "30%" }}>
            <Col md={10}>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr class="sticky-top">
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Published</th>
                    <th>Like</th>
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
                        <td>{note?.like ? `\u261D` : " "}</td>
                        <td>
                          <div className="d-grid gap-2">
                            <Button
                              variant="outline-info"
                              size="sm"
                              style={{ margin: "1%" }}
                              onClick={() => {
                                dispatch(
                                  likeNote(note._id, {
                                    title: note.title,
                                    description: note.description,
                                    dateCreate: note.dateCreate,
                                    like: !note.like,
                                  })
                                );
                              }}
                            >
                              {note?.like ? "Dislike" : "like"}
                            </Button>
                            <Button
                              variant="outline-warning"
                              size="sm"
                              style={{ margin: "1%" }}
                              onClick={() => setCurrentId(note._id)}
                            >
                              Update
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
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
          </div>
      </div>
    </div>
  );
}

export default App;
