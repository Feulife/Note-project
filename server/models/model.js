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
  createdAt: {
    type: Date,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: true,
  },
  dateCreate: {
    type: String,
    default: true,
  },
  like: {
    type: String,
    require: true,
  },
});

const Note = mongoose.model("Note", noteSchema);
export default Note;
