import express from "express";
import { getNotes, getNote, createNote, updateNote, deleteNote, likeNote } from "../control/control.js";
const router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.get('/:id', getNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);
router.post('/:id', likeNote);

export default router;