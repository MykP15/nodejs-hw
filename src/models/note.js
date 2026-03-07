import {model, Schema } from "mongoose";


const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tag: {
    type: String,
    enum: [
      "Work",
      "Personal",
      "Meeting",
      "Shopping",
      "Ideas",
      "Travel",
      "Finance",
      "Health",
      "Important",
      "Todo",
    ],
    default: "Todo",
  },
},
  {
    versionKey: false,
    timestamps: true,
   });

const Note = model('notes', noteSchema);

export default Note;
