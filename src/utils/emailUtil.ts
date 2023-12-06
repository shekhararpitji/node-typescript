import nodemailer from "nodemailer";
import { google } from "googleapis";
export interface EmailData {
  to: string;
  subject: string;
  message: string;
  url: string;
  link: string;
}
export const emails = async(data:EmailData) => {
  const OAuth2 = google.auth.OAuth2;
  const OAuth2_client = new OAuth2(
    process.env.G_CLIENT_ID,
    process.env.G_CLIENT_SECRET
  );
  OAuth2_client.setCredentials({ refresh_token: process.env.G_REFRESH_TOKEN });
  const access_token =await OAuth2_client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      clientId: process.env.G_CLIENT_ID,
      clientSecret: process.env.G_CLIENT_SECRET,
      refreshToken: process.env.G_REFRESH_TOKEN,
      accessToken: access_token,
    }as any,
  });

  const mail_options = {
    from: process.env.EMAIL,
    to: data.to,
    subject: data.subject,
    text: data.message,
    html: `<b><h2>${data.message}</h></b>
        <a href=${data.url}>${data.link}</a>`,
  };
  transporter.sendMail(mail_options , (err, result)=>{
    if(err) console.error(err)
    else console.log(result)
    transporter.close();
  });
};

