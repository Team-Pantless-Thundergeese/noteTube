import express from 'express';
import notesRouter from './routes/notes.js';
import videosRouter from './routes/videos.js';
import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { CustomError, error, warn } from './utils/utils.js';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';

// Initialize config
  // workaround for dirname which is deprecated 
const __dirname = dirname(fileURLToPath(import.meta.url));
const _config = JSON.parse(await fs.readFile(path.join(__dirname, './server.config.json')));

/* START PASSPORT MIDDLEWARE*/
 
// Google "google credentials" and click on API Credentials to get the authentication info for the middleware
const GOOGLE_CLIENT_ID = _config.client_id;
const GOOGLE_CLIENT_SECRET = _config.client_secret;

passport.use(new Strategy({
  // The clientID and clientSecret are properties we create so Google knows its us
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  // This is the route the user is directed to upon successful authentication which you can see is in the app.get('/auth/google',... in index.js
  callbackURL: 'http://localhost:8080/auth/google/callback',
  passReqToCallback: true,
}, // This function decides what to do upon successful authentication
function(request, accessToken, refreshToken, profile, done) {
  // This is where you would add the user to the database
  return done(null, profile);
}));
// Define the serialization and deserialization of our users
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/*  END PASSPORT MIDDLEWARE */

// Set up application
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use('/', express.static(path.resolve(__dirname, '../dist')));

// Routes
app.use('/api/notes', notesRouter);
app.use('/api/videos', videosRouter);

// Function that checks if our user is logged in or not
// If they are, go to the next middleware, if not send a 401 status
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}


// Add session storage from express-session NOTE: secret should be an env variable
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', 
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }), 
  (req, res) => {
    console.log('/auth/google called');
    res.status(200).send({ok : 'google'});
  }
);

// Defines the route the user will be directed to when they completed authentication
  // From there defines the route the user will be directed to upon successful authentication or unsuccessful
app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);
//app.get('/homepage', path.resolve(__dirname, '../client/index.html')));
// Create a route to page the user will land on after they have been successfully authenticated
  // Calls the middleware function defined on top of this page to check if user isLoggedIn
app.get('/protected', isLoggedIn, (req, res) => {
  // The next() middleware function isLoggedIn is referring to
  res.send(`Hello ${req.user.displayName}`);
});

// Defines route for logging out
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

// Defines route for unseccessful authentication
app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

// Catch-all
app.all('*', function(req, res) {
  return res.sendStatus(404);
});

// Global error handler
/**
 * @type {express.ErrorRequestHandler}
 * @param {Error | {msg: string, err?: Error, code?: number}} info
 */ 
function globalErrorHandler(info, req, res, next) {
  const err = (info instanceof Error ? info : info.err);
  const message = (info instanceof Error ? 'An unknown server error occurred' : info.msg);
  const code = (
    typeof info.code === 'number' ? info.code
    : info.err instanceof CustomError ? info.err.statusCode
    : 500
  );
  
  error(message);
  error(err);
  return res.status(code).send({ error: message });
}
app.use(globalErrorHandler);

// Start server
app.listen(_config.port, () => {
  console.log(`Listening on port ${_config.port}`);
});