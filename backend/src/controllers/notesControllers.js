import Note from "../models/Note.js"


export async function getAllNotes(_, res) { // _ becuz req not used
    try {
        const notes = await Note.find().sort({createdAt:-1}) // -1 means show newly added first
        res.status(200).json(notes)
    } catch(e) {
        console.error("Error in getAllNotes controller", e);
        res.status(500).json({message : 'Internal server error'})
    }
};

export async function getNoteByID(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message : "Note not found."})
        res.status(200).json(note)
    } catch(e) {
        console.error("Error in getNoteByID controller", e);
        res.status(500).json({message : 'Internal server error'})
    }
};

export async function createNote(req, res) {
    try {
        const {title, content} = req.body
        const newNote = new Note({title:title, content:content})
        const savedNote = await newNote.save()
        res.status(201).json(savedNote)
    }catch(e) {
        console.error("Error in createNote controller", e);
        res.status(500).json({message : 'Internal server error'})
    }
};

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new:true});
        if(!updatedNote) return res.status(404).json({message : "Note not found."})
        res.status(200).json(updatedNote)
    } catch(e) {
        console.error("Error in updateNote controller", e);
        res.status(500).json({message : 'Internal server error'})
    }
};

export async function deleteNode(req, res) {
    try {
        const {title, content} = req.body
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message : "Note not found."})
        res.status(200).json(deletedNote)
    } catch(e) {
        console.error("Error in deleteNote controller", e);
        res.status(500).json({message : 'Internal server error'})
    }
};