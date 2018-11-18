/* Sendgrid for email verification and password reset */
import sgMail from '@sendgrid/mail'

/* Secret keys */
import keys from '../../config/keys'


export function sendNewUserNotification(email, source) {
    sgMail.setApiKey(keys.sendgrid)
    var message = `${email} signed up for Writing Streak`
    if (source) { message += " came from " + source }
    const msg = {
	to: 'raymestalez@gmail.com',
	from: 'contact@writingstreak.io',
	subject: `${email} signed up for Writing Streak`,
	text: message
    }
    sgMail.send(msg)
}
