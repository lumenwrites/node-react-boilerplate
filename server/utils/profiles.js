/* Sendgrid for email verification and password reset */
import sgMail from '@sendgrid/mail'


export function sendNewUserNotification(email, source) {
    sgMail.setApiKey(process.env.SENDGRID_KEY)
    var message = `${email} signed up for Writing Streak`
    if (source) { message += " came from " + source }
    const msg = {
	to: process.env.ADMIN_EMAIL,
	from: process.env.CONTACT_EMAIL,
	subject: `${email} signed up for Writing Streak`,
	text: message
    }
    sgMail.send(msg)
}
