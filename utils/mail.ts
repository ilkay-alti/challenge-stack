import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Verify your email address",
    html: `
      <h1>Verify your email address</h1>
      <p>Click the link below to verify your email address.</p>
      <a href="${confirmLink}">Verify your email address</a>
    `,
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    from: "nextauthv5@resend.dev",
    to: email,
    subject: "Verify your email address",
    html: `
      <h1>2FA Verification Token</h1>
     <h2> ${token}</h2>   `,
  });
};
