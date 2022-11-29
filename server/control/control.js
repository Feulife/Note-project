import express from "express";
import mongoose from "mongoose";
import Note from "../models/model.js";

export const getNotes = async (req, res) => {
  try {
    const Notes = await Note.find();
    res.status(200);
    res.json(Notes);          
  } catch (error) {
    console.log(error)
    res.status(404);
    res.json({ "message": error.message })
  }
}

export const createNote = async (req, res) => {
  const note = req.body;
  const newNote = new Note(note);
  try {
    await newNote.save();
    res.status(201);
    res.json(newNote);
  } catch (error) {
    res.status(409);
    res.json({ "message": error.message });
  }
}

export const getNote = async (req, res) => {
  const [ id ] = req.params;
  try {
    const note = await Note.findById(id);
    res.status(200);
    res.json(note);
  } catch (error) {
    res.status(404);
    res.json({ "message": error.message });
  }
}

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, dateCreate } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Note with id: ${id}`);
    }

    const updateNote = { title, description, dateCreate, _id: id };
    await Note.findByIdAndUpdate(id, updateNote, { new: true });

    res.status(200);
    res.json(updateNote);
  } catch (error) {
    res.status(404);
    res.json({ "message": error.message });
  }
}

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Note with id: ${id}`);
    }
    await Note.findByIdAndDelete(id);
    res.status(200);
    res.json({ "message": "Note deleted successfully" });    
  } catch (error) {
    res.status(404);
    res.json({ "message": error.message});
  }
}

export const likeNote = async (req, res) => {
  const { id } = req.params;
  const { like } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Note with id: ${id}`);
    }

    const likeNote = { like, _id: id };
    await Note.findByIdAndUpdate(id, likeNote, { new: true });

    res.status(200);
    res.json(likeNote);
  } catch (error) {
    res.status(404);
    res.json({ "message": error.message });
  }
}