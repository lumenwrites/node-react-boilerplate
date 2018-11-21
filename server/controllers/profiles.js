import jwt from 'jwt-simple'
import bcrypt from 'bcrypt'
/* For generating random token */
import { randomBytes } from 'crypto'
/* Turn callback-based function into a promise-based function, so I could use
   await with randomBytes*/
import { promisify } from 'util'
/* Sendgrid for password reset */
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(keys.sendgrid)
/* Stripe */
import Stripe from 'stripe'
const stripe = Stripe(process.env.STRIPE_SECRET)

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

    profile.email = receivedProfile.email        
    profile.prefs = receivedProfile.prefs

    profile.save((err, updatedProfile) => {
	if (err) return res.status(400).send('Error updating a profile.')
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
	return res.status(400).send(err)
    }

    const passwordsMatch = await bcrypt.compare(password, profile.password)
    if (!passwordsMatch) return res.status(400).send("Email and password don't match")
    
    profile.lastLoggedIn = new Date()
    profile.save()
    
    res.send({token:tokenForUser(profile), ...returnProfile(profile)})
}

/* Reset password
   - User enters his email and sends it here.
   - I find Profile by email, add resetToken to it, and email the token to user.
   - User clicks on a link, which takes him to ?token=abc123 url,
   which opens a reset password form, and sends me new password and the token.
   - I find the user's profile by token, and update his password.
   - I return his profile and automatically log him in.
 */

export async function requestReset(req, res, next) {
    const { email } = req.body

    /* Find profile by email if it exists */
    const profile = await Profile.findOne({email:email})
    if (!profile) return res.status(400).send('User with this email not found')

    /* Generate and save reset token */
    const resetToken = (await promisify(randomBytes)(20)).toString('hex')
    const resetTokenExpiry = Date.now() + (1000 * 60 * 60) /* 1 hour from now */
    profile.resetToken = resetToken
    profile.resetTokenExpiry = resetTokenExpiry
    profile.save()

    /* Email reset token to user */
    const msg = {
	to: profile.email,
	from: process.env.CONTACT_EMAIL,
	subject: `Reset your Writing Streak password`,
	html: `Click <a href="${process.env.URL}/reset-password?token=${profile.resetToken}">this link</a> to reset your password. <br/> (link is valid for 1 hour)`
    }
    sgMail.send(msg)

    return res.send('Check your email!')    
}

export async function resetPassword(req, res, next) {
    const { token, password } = req.body

    /* Find profile by reset token */
    const profile = await Profile.findOne({resetToken:token})
				 .where('resetTokenExpiry').gt(Date.now())
    if (!profile) return res.status(400).send('This token is either invalid or expired.')
    
    /* Update password, remove tokens */
    const newPassword = await bcrypt.hash(password, 10)
    profile.password = newPassword
    profile.resetToken = null
    profile.resetTokenExpiry = null
    profile.lastLoggedIn = new Date()
    profile.save()
    /* Return profile so I could login */
    res.send({token:tokenForUser(profile), ...returnProfile(profile)})
}


/* Stripe payments*/
export async function upgrade(req, res) {
    const profile = req.user
    const { token } = req.body
    let customer, subscription
    try {
	/* You have to create a customer to be able to subscribe him to a plan. */
	customer = await stripe.customers.create({
	    email: profile.email,
	    /* Source is customer's payment information, a stripe token */
	    source: token.id,
	})
    } catch(err) {
	console.log(err)
	if (err) res.status(400).send('Error creating a customer')
    }
    /* Make sure to save customer id */
    /* 
       profile.stripeId = customer.id
       profile.save()
     */
    console.log('now onto subscription')
    try {
	subscription = await stripe.subscriptions.create({
	    customer: customer.id,
	    /* If you dont need a different plan for every user,
	       you just create predetermined ones in the dashboard
	       (Billing>Products>ProductName>Plan, and get it's id). */
	    items: [{plan: 'plan_E0NpvLFb1MWuO1'}],
	})
    } catch(err) {
	console.log(err)
	if (err) res.status(400).send('Error creating a subscription')
    }
    console.log('subscription created')
    res.send(returnProfile(profile))
}
