import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
}

export function WelcomeEmail({ name, loginUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to SaaS Kit!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to SaaS Kit! 🚀</Heading>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            Thanks for signing up! You&apos;re now ready to start building your
            SaaS product with our production-ready template.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={loginUrl}>
              Go to Dashboard
            </Button>
          </Section>
          <Text style={text}>
            If you have any questions, just reply to this email. We&apos;re here
            to help!
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
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  padding: "0 40px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 40px",
};

const buttonContainer = {
  textAlign: "center" as const,
  padding: "20px 40px",
};

const button = {
  backgroundColor: "#000",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center" as const,
  padding: "20px 40px",
};
