import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./emailTemplate";
import { client, sender } from "./mailtrap";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "verify your email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Email Verification",
    });
  } catch (error) {
    console.log("verification mail error=>", error);
    throw new Error("failed to send verification email");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Welcom to Eats",
      html: htmlContent,
      template_variables: {
        company_info_name: "Eats",
        name: name,
      },
    });
  } catch (error) {
    console.log("welcome mail error=>", error);
    throw new Error("failed to send welcome email");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  const recipient = [{ email }];
  const htmlContent = generatePasswordResetEmailHtml(resetUrl);
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: htmlContent,
      category: "Reset password",
    });
  } catch (error) {
    console.log("password reset mail error=>", error);
    throw new Error("failed to send password reset email");
  }
};

export const sendResetSuccessEmail = async (
  email: string
  //   resetUrl: string
) => {
  const recipient = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Password reset Successfully",
      html: htmlContent,
      category: "Password Reset",
    });
  } catch (error) {
    console.log("success password reset mail error=>", error);
    throw new Error("failed to send success password reset email");
  }
};
