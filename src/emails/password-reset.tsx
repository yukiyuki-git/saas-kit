import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface PasswordResetEmailProps {
  name: string;
  resetUrl: string;
}

export function PasswordResetEmail({ name, resetUrl }: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset Your Password 🔐</Heading>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            We received a request to reset your password. Click the button below
            to set a new password. This link will expire in 1 hour.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={resetUrl}>
              Reset Password
            </Button>
          </Section>
          <Text style={text}>
            If you didn&apos;t request a password reset, you can safely ignore
            this email.
          </Text>
          <Text style={footer}>
            © {new Date().getFullYear()} SaaS Kit. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px" };
const h1 = { color: "#333", fontSize: "24px", fontWeight: "bold", textAlign: "center" as const, padding: "0 40px" };
const text = { color: "#333", fontSize: "16px", lineHeight: "26px", padding: "0 40px" };
const buttonContainer = { textAlign: "center" as const, padding: "20px 40px" };
const button = { backgroundColor: "#000", borderRadius: "6px", color: "#fff", fontSize: "16px", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "12px 24px" };
const footer = { color: "#8898aa", fontSize: "12px", textAlign: "center" as const, padding: "20px 40px" };
