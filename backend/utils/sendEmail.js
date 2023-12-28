import nodemailer from 'nodemailer'

const sendEmail = async (email, subject, url, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      post: process.env.EMAIL_PORT,
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    })

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: `<a href=${url}>${text}</a>`
    })
    console.log("Email sent successfully")
  } catch (error) {
    console.log("Email not sent")
    console.log(error)
  }
}

export default sendEmail