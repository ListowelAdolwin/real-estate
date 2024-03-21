const mailer = require('nodemailer')
require('dotenv').config()


const sendCustomEmail = (from, to, subject, html) => {
    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD,
        }
    })

    transporter.sendMail({
        from,
        to,
        subject,
        html
    }, (err, info) => {
        if (err) {
            console.log(`Failled to send email to ${to}`)
            console.log(err)
        } else {
            console.log(`Email sent to ${to}`)
        }
    })
}

module.exports = sendCustomEmail