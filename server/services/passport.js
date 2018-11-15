import base64url from 'base64url'

/* Utils */
import { sendNewUserNotification } from '../utils/profiles.utils'

/* Passport is general helpers for handling auth in express apps. */
import passport from 'passport'
/* Strategies are helpers for authenticating with a specific method. */
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as JwtStrategy } from 'passport-jwt'
import LocalStrategy from 'passport-local'
import { ExtractJwt } from  'passport-jwt'
/* Models */
import mongoose from 'mongoose'
import Profile from '../models/profile.model'
/* Secret keys */
import keys from '../config/keys'

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

    /* Email me a message that new user has joined */
    sendNewUserNotification(profile.emails[0].value, source)

    console.log(`Profile ${profile.emails[0].value} created!`)
    done(null, createdProfile)
})


/* "LocalStrategy" means Email/Password Auth. */
const passwordAuth = new LocalStrategy({
    /* By default passport uses username and password, I want to use email instead */
    usernameField: 'email'
}, async (email, password, done) => {
    console.log("Checking username and password. If they match - pass person in.");
    const profile = await Profile.findOne({email:email})
    if (!profile) return done(new Error('User with this email not found'), false)
    
    if (profile.googleId && !profile.password) {
	const err = new Error("Your account was created with Google Auth, "
			    + "so it doesn't have a password. Use Google to login.")
	return done(err, false)
    }

    const passwordsMatch = await bcrypt.compare(password, profile.password)
    if (!passwordsMatch) return done(new Error("Email and password don't match"), false)

    done(null, profile) // Logged in, return user
})


/* JWT Auth */
const jwtAuth = new JwtStrategy({
    /* Tell it where to look for token */
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    /* secretOrKey is used to decode the token. */
    secretOrKey: keys.secret
}, async (payload, done) => {
    /* Payload contains a decoded JWT token, containing sub and iat
       sub(subject) is profile.id, iat - issued at time. */
    console.log("Attempting JWT login", payload)

    const profile = await Profile.findById(payload.sub)
    if (!profile) return done(new Error("Profile not found, JWT login failed."), false)

    done(null, profile) // Logged in, return user
})

/* Tell passport to use strategies I've created */
passport.use(passwordAuth)
passport.use(jwtAuth)
passport.use(googleAuth)
