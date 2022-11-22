import mongoose from "mongoose";
const noteSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  published: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: true,
  },
});

const Note = mongoose.model('Note', noteSchema);
export default Note;