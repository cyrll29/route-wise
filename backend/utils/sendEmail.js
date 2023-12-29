import nodemailer from 'nodemailer'
import config from './config.js'
import emailContent from './emailContent.js'

const sendEmail = async (email, subject, url, text, introduction, button) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.HOST,
      service: config.SERVICE,
      post: config.EMAIL_PORT,
      secure: Boolean(config.SECURE),
      auth: {
        user: config.USER,
        pass: config.PASS
      }
    })

    await transporter.sendMail({
      from: config.USER,
      to: email,
      subject: subject,
      html: emailContent(subject, text, url, introduction, button)
    })
    console.log("Email sent successfully")
  } catch (error) {
    console.log("Email not sent: ", error)
  }
}


export default sendEmail