import express from "express";
import { getNotes, getNote, createNote, updateNote, deleteNote } from "../control/control.js";
const router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.get('/:id', getNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;