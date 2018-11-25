import base64url from 'base64url'
import { Router } from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'

import * as profilesControllers from '../controllers/profiles';

const router = new Router()

/* Not using this anywhere, just import the file to execute it and setup passport. */
import '../services/passport'

/* Google auth */
router.route('/google').get((req, res) => {
    /* Pass query parameters to google which it'll return to passport.
       For things like referral code or ?src=hackernews*/
    const { source } = req.query
    const state = base64url(JSON.stringify({ source }))
    console.log("[profiles.routes] Initiating google oAuth", source)

    /* Tell passport to start auth flow with GoogleStrategy.
       It'll redirect user to google's page where he gives permission to view his info.
       Scope is the list of permissions we want. */
    passport.authenticate('google', { scope: ['profile', 'email'], state })(req, res)
})

/* After user gave me permission on google's page, Google redirects him here,
   with the code passport can use to fetch user info from google. */
router.route('/google/callback').get(passport.authenticate('google', { session:false }),
				     profilesControllers.googleLogin)


/* Email/Password auth */
/* Create user with email/password, returns JWT. */
router.route('/password/signup').post(profilesControllers.passwordSignup)
/* Login with email/password, returns JWT. */
router.route('/password/login').post(profilesControllers.passwordLogin)
router.route('/request-reset').post(profilesControllers.requestReset)
router.route('/reset-password').post(profilesControllers.resetPassword)



/* JWT auth */
const jwtAuth = passport.authenticate('jwt', {session:false})
/* Return profile in exchange for JWT. */
router.route('/profile').get(jwtAuth, profilesControllers.getProfile)
/* Update profile */
router.route('/profile').post(jwtAuth, profilesControllers.updateProfile)

/* Payments */
router.route('/upgrade').post(jwtAuth, profilesControllers.upgrade)
router.route('/update-payment-info').post(jwtAuth, profilesControllers.updatePaymentInfo)
router.route('/cancel-subscription').post(jwtAuth,
					  profilesControllers.cancelSubscription)


export default router
