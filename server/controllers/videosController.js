import { ClientError, getBodyProps } from '../utils/utils.js';
import {query, sql} from '../models/model.js';


/** @typedef {import("express").RequestHandler} RequestHandler */

const videosController = {};

videosController.getUserVideos = (req, res, next) => {
  console.log("get user videos running")
  if (!req.params.userId) return next({
    msg: 'Invalid URL parameter',
    err: new ClientError('Provided userId parameter in URL is invalid')
  });
  let queryObj = {
    text: 'SELECT * FROM Notes WHERE youtube_link = $1 AND user_id = 1', 
    values: ["https://www.youtube.com/watch?v=Z6a1cLyq7Ac" ]
  };
  
  query(queryObj).then(result => {
    console.log(result)
    res.locals.videos = result.rows.map(video => video.youtube_link);
    return next();
  });
};

export default videosController;