import express from 'express';
import { createNote, deleteNode, getAllNotes, updateNote, getNoteByID } from '../controllers/notesControllers.js';

const router = express.Router();


router.get('/', getAllNotes);
router.get('/:id', getNoteByID);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNode);


export default router;