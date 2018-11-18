import base64url from 'base64url'

/* Utils */
import { sendNewUserNotification } from '../utils/profiles'

/* Passport is general helpers for handling auth in express apps. */
import passport from 'passport'
/* Strategies are helpers for authenticating with a specific method. */
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt } from  'passport-jwt'
/* Models */
import mongoose from 'mongoose'
import Profile from '../models/Profile'
/* Secret keys */
import keys from '../../config/keys'

/* Google Auth */
const googleAuth = new GoogleStrategy({
    /* Options */
    /* Keys are generated on GCP dashboard as Google+ API credentials */
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    /* CallbackURL is where google redirects user after he clicks "Allow",
       passing me the code server can use to fetch user info from google. */
    callbackURL: '/api/v1/profiles/google/callback',
    passReqToCallback: true // so I could pass custom url parameters like source/invitedBy
}, async (req, accessToken, refreshToken, profile, done) => {
    /* After user gave me permission on google's page, Google redirects him here,
       with the code passport can use to fetch user info from google. */
    console.log("[passport] Google returned user info and url parameters",
		profile.emails[0].value, base64url.decode(req.query.state))
    /* Find profile by email, so that if he had signed up with email/password,
       oAuth would still log him in. */
    const existingProfile = await Profile.findOne({ email: profile.emails[0].value })
    /* Found user, return him and move along. */
    if (existingProfile) return done(null, existingProfile)

    /* Haven't found profile with this googleId, create a new one. */
    /* userMeta is url parameters passed to google and returned back to me,
       for stuff like ?source=hackernews or referral link.
       Take it from url and pass it here in ../routes/profiles.js. */
    const userMeta = JSON.parse(base64url.decode(req.query.state))
    const createdProfile = await new Profile({
	googleId: profile.id,
	email: profile.emails[0].value,
	...userMeta
    })
    createdProfile.save()

    console.log('Profile created')
    /* Email me a message that new user has joined */
    sendNewUserNotification(profile.emails[0].value, source)
    console.log('Message sent')
    console.log(`Profile ${profile.emails[0].value} created!`)
    done(null, createdProfile)
})



/* JWT Auth */
const jwtAuth = new JwtStrategy({
    /* Tell it where to look for token */
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    /* secretOrKey is used to decode the token. */
    secretOrKey: keys.secret,
    /* passReqToCallback: true, */
}, async (payload, done) => {
    /* Payload contains a decoded JWT token, containing sub and iat
       sub(subject) is profile.id, iat - issued at time. */
    console.log("Attempting JWT login", payload)

    const profile = await Profile.findById(payload.sub)
    if (!profile) return done(new Error("Profile not found, JWT login failed."), false)

    done(null, profile) // Logged in, return user
})

/* Tell passport to use strategies I've created */
passport.use(jwtAuth)
passport.use(googleAuth)
