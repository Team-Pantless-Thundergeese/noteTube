import { ClientError, getBodyProps } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';
import {query, sql} from '../models/model.js';


/** @typedef {import("express").RequestHandler} RequestHandler */

const notesController = {};


/**
 * Get all notes for a user and store them into `res.locals.notes`
 * @type {RequestHandler}
 */
// fetch('/api/notes/1?videoLink=https%12%30%30youtube%11com')
notesController.getUserNotes = (req, res, next) => {
  // Ensure userId param is valid
  if (!req.params.userId) return next({
    msg: 'Invalid URL parameter',
    err: new ClientError('Provided userId parameter in URL is invalid')
  });

  if (req.params.userId == null )
    req.params.userId = 1;

  const queryObj = {
    text: 'SELECT  DISTINCT youtube_link FROM Notes WHERE user_id = $1', 
    values: [ req.params.userId ]
  };

  /*
  let text = 'SELECT * FROM Notes WHERE Notes.user_id = 1';
  const params = [];
  if (req.query.videoLink) {
    text += '\nAND notes.youtube_link = $1';
    params.push(req.query.videoLink);
  }
*/

  const result = query(queryObj).then(data => {
    res.locals.notes = data.rows;
    return next();
  })
; // Move into query .then() or after awaiting query
};

/**
 * Inserts a new note into the database and stores the inserted note (with the note id from insertion)
 * into `res.locals.newNote`
 * @type {RequestHandler}
 */
notesController.addNote = (req, res, next) => {
  // Check for required body properties and 
  const required = {
    title: 'string',
    content: 'string',
    // username: 'string',
    youtubeLink: 'string',
    time: 'number'
  };
  // let properties = {};
  // try {
  //   properties = getBodyProps(req, required);
  // } catch (err) {
  //   return next({
  //     msg: 'Invalid properties provided in request body',
  //     err: err,
  //     code: 400
  //   });
  // }

  const text = `
    INSERT INTO Notes (user_id, _id, title, youtube_link, content, time)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;
 
  query(text, [1, uuidv4(), req.body.title, req.body.youtubeLink, req.body.content, req.body.time]).then(data => {
    res.locals.newNote = data.rows[0];
    return next();
  });

  // return next(); // Move into query .then() or after awaiting query
};




notesController.deleteNote = (req, res, next) => {

 
  const queryObj = {
    text: 'DELETE from Notes WHERE _id = $1 AND user_id = $2',
    values: [req.body.note_id, req.body.user_id]
  };
  query(queryObj)
  .then(response => {
  
    console.log('Delete Notes Record Request Successful');
    return next();
  })
  .catch(err => {
    console.log(`Error trying to Delete Notes Record: ${err}`);
    return next(err);
  });

  // return next(); // Move into query .then() or after awaiting query
};


notesController.getSpecificNotes = (req, res, next) => {
console.log('youtube.com/watch?v='.concat(req.params.videoID));
  const queryObj = {
    text: 'SELECT * FROM Notes WHERE youtube_link = $1 AND user_id = $2', 
    values: ['https://www.youtube.com/watch?v='.concat(req.params.videoID), req.params.userId ]
  };
  
  query(queryObj).then(result => {
    console.log(result.rows);
    res.locals.notes = result.rows;
    return next();
  }).catch(err => {
    console.log(`Error trying to Delete Notes Record: ${err}`);
    return next(err);
  });

  // return next(); // Move into query .then() or after awaiting query
};







notesController.getSpecificVideos = (req, res, next) => {

  const queryObj = {
    text: 'SELECT * FROM Notes WHERE youtube_link = $1 AND user_id = $2', 
    values: [req.params.videoID, req.params.userId ]
  };
  
  query(queryObj).then(result => {
    console.log(result);
    res.locals.videos = result.rows.map(video => video.youtube_link);
    return next();
  }).catch(err => {
    console.log(`Error trying to Delete Notes Record: ${err}`);
    return next(err);
  });
 
};

export default notesController;



