import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_FROM =
  process.env.EMAIL_FROM || "SaaS Kit <noreply@yourdomain.com>";

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: React.ReactNode;
}) {
  const { render } = await import("@react-email/render");
  const html = await render(react);

  return resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject,
    html,
  });
}
