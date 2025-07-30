import mongoose from "mongoose";

// 1 - create a schema
// 2 - create model based of that schema


const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
},
{timestamps: true} // mongoose by default will give createdAt and updatedAt
);


const Note = mongoose.model("Note", noteSchema);

export default Note;