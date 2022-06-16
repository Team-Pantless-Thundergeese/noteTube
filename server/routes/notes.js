import { Router } from 'express';
import notesController from '../controllers/notesController.js';
const notesRouter = Router();


notesRouter.get('/:userId/:videoID', notesController.getSpecificNotes, function(req, res) {
  res.status(200).json({ notes: res.locals.notes });
});

notesRouter.get('/:userId', notesController.getUserNotes, function(req, res) {
  res.status(200).json({ notes: res.locals.notes });
});

notesRouter.post('/', notesController.addNote, function(req, res) {
  res.status(200).json({ newNote: res.locals.newNote });
});

notesRouter.post('/deleteNotes', notesController.deleteNote, function(req, res) {
  console.log('/deleteNotes Request Recieved', req.body);
  res.status(200).json({ deleteStatus: 'successful' });
});


notesRouter.post('/editNotes', notesController.deleteNote, function(req, res) {
  console.log('/deleteNotes Request Recieved', req.body);
  res.status(200).json({ deleteStatus: 'successful' });
});


export default notesRouter;