import mongoose from "mongoose";
const noteSchema = mongoose.Schema({
  titele: {
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
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Note = mongoose.model('Note', noteSchema);
export default Note;