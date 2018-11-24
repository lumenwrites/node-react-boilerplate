import mongoose from 'mongoose'
import validator from 'validator' // for validating email
import cuid from 'cuid' // for initial username

const { Schema } = mongoose

/* import { DEFAULT_PROFILE } from '../../client/utils/initialData.js' */

const profileSchema = new Schema({
    username: {
	type: String,
	default: ""
    },
    email: {
	type: String,
	lowercase: true,
    	validate: {
	    validator: validator.isEmail,
	    message: '{VALUE} is not a valid email'
	}
    },
    /* For email auth */
    password: { type: String },
    /* Reset password */
    resetToken: { type: String },
    resetTokenExpiry: { type: 'Number' },
    /* For google auth */
    googleId: { type: String },
    /* Meta */
    createdAt: { type: Date, default: new Date() },
    lastLoggedIn: { type: Date, default: new Date() },
    source: { type: String, default: null },
    /* Prefs */
    prefs: {
	type: JSON,
	unique: false,
	required: false,
	default: {}
    },
    /* Stripe */
    plan: { type: String, default: 'free' },
    stripe: {
	customerId: { type: String },
	subscriptionId: { type: String },
	/* Payment method, all the credit card info */
	sourceId: { type: String },
	sourceLast4: { type: String },
	sourceBrand: { type: String }, // visa/mastercard
    }
})

/* Send back to client only the fields I want from profile */
profileSchema.methods.publicFields = function() {
    const { email, username, prefs, plan, stripe } = this
    const { sourceLast4, sourceBrand } = stripe
    return { email, username, prefs, plan, sourceLast4, sourceBrand }
}

/* Profile collection */
export default mongoose.model('Profile', profileSchema)
