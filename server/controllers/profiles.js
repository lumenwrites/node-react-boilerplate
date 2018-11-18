import jwt from 'jwt-simple'
import bcrypt from 'bcrypt'

/* Utils */
import { sendNewUserNotification } from '../utils/profiles'

/* Models */
import Profile from '../models/Profile'

/* Secret keys */
import keys from '../../config/keys'

/* Generate JWT token for a user */
function tokenForUser(profile) {
    const timestamp = new Date().getTime()
    /* sub (subject) is profile.id encoded with a secret random string.
       iat - issued at time */
    return jwt.encode({ sub: profile.id, iat: timestamp }, keys.secret);
}

/* Send back to client only the fields I want from profile */
function returnProfile(profile) {
    const { email, username, prefs } = profile
    return { email, username, prefs }
}

/* Return profile (in exchange for jwt) */
export function getProfile(req, res) {
    console.log('getProfile')
    const profile  = req.user
    profile.lastLoggedIn = new Date()
    profile.save()
    res.send(returnProfile(profile))
}

/* Update profile */
export function updateProfile(req, res) {
    const profile = req.user
    var receivedProfile = req.body

    profile.username = receivedProfile.username        
    profile.prefs = receivedProfile.prefs

    profile.save((err, updatedProfile) => {
	if (err) return res.send({ error:'Error updating a profile' })
	res.send(returnProfile(updatedProfile))
    })
}

/* Google Login.
   Passport has created/found google account,
   atteched user object to the request, and passed me through.
   Now I just redirect to a url that contains token, so that react could pick it up
   and save it into local storage. */
export function googleLogin(req, res, next) {
    console.log("[profiles.controllers] Google login, redirecting to token url.",
		req.user.email)
    res.redirect('/login/?token='+tokenForUser(req.user))
}


/* Email/Password Signup */
export async function passwordSignup(req, res, next) {
    const { email, password, source }  = req.body

    if (!email || !password) return res.status(400).send('Provide email and password.')

    /* Check if user with this email already exists */
    const existingProfile = await Profile.findOne({ email })
    if (existingProfile) return res.status(400).send('Email is in use.')

    /* Hash password */
    const hashedPassword = await bcrypt.hash(password, 10)
    /* If a profile doesn't exist - create and save profile record */
    const profile = new Profile({email, password:hashedPassword, source })

    /* Email me a message that new user has joined */
    sendNewUserNotification(email, source)

    const createdProfile = await profile.save()
    res.send({ token: tokenForUser(profile), ...returnProfile(profile) })
}

/* Email/Password Login. */
export async function passwordLogin(req, res, next) {
    console.log('passwordLogin')
    const { email, password } = req.body

    const profile = await Profile.findOne({email:email})
    if (!profile) return res.status(400).send('User with this email not found')
    
    if (profile.googleId && !profile.password) {
	const err = "Your account was created with Google Auth, "
		  + "so it doesn't have a password. Use Google to login."
	return res.status(400).send('User with this email not found')
    }

    const passwordsMatch = await bcrypt.compare(password, profile.password)
    if (!passwordsMatch) return res.status(400).send("Email and password don't match")
    
    profile.lastLoggedIn = new Date()
    profile.save()
    
    res.send({token:tokenForUser(profile), ...returnProfile(profile)})
}
