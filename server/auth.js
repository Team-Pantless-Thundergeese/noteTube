import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';

import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Initialize config
  // workaround for dirname which is deprecated 
const __dirname = dirname(fileURLToPath(import.meta.url));
const _config = JSON.parse(await fs.readFile(path.join(__dirname, './server.config.json')));

  
// Google "google credentials" and click on API Credentials to get the authentication info for the middleware
const GOOGLE_CLIENT_ID = _config.client_id;
const GOOGLE_CLIENT_SECRET = _config.client_secret;

// WARNING: NOT FOR PRODUCTION - Temporary until we add .env file 
// const GOOGLE_CLIENT_ID = '152983269141-f239n23kdos33m5dbacr2nch3mjribpn.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = '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';

// Paste the middleware from the passport page. 
passport.use(new Strategy({
  // The clientID and clientSecret are properties we create so Google knows its us
  // clientID: process.env.GOOGLE_CLIENT_ID,
  // clientSecret: process.env.GOOGLE_CLIENT_SECRET,

  // WARNING: NOT FOR PRODUCTION - Temporary until we add .env file 
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  // This is the route the user is directed to upon successful authentication which you can see is in the app.get('/auth/google',... in index.js
  callbackURL: 'http://localhost:5000/auth/google/callback',
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
