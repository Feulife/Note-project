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
  dateCreate: {
    type: String,
    default: true,
  },
  like: {
    type: Boolean,
    require: true,
  },
});

const Note = mongoose.model("Note", noteSchema);
export default Note;
