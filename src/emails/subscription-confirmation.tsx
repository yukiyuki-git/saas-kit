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

interface SubscriptionConfirmationEmailProps {
  name: string;
  plan: string;
  price: string;
  features: string[];
}

export function SubscriptionConfirmationEmail({
  name,
  plan,
  price,
  features,
}: SubscriptionConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {plan} plan!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to {plan}! 🎉</Heading>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            Thank you for subscribing to the {plan} plan ({price}/month). You
            now have access to all the features included in your plan.
          </Text>
          <Section style={featureBox}>
            <Heading style={h2}>Your Plan Features:</Heading>
            {features.map((feature, i) => (
              <Text key={i} style={featureItem}>
                ✓ {feature}
              </Text>
            ))}
          </Section>
          <Section style={buttonContainer}>
            <Button
              style={button}
              href={process.env.NEXT_PUBLIC_APP_URL + "/dashboard"}
            >
              Go to Dashboard
            </Button>
          </Section>
          <Text style={text}>
            If you have any questions about your subscription, feel free to
            reach out to our support team.
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
const h2 = { color: "#333", fontSize: "18px", fontWeight: "bold", padding: "0", margin: "0 0 12px" };
const text = { color: "#333", fontSize: "16px", lineHeight: "26px", padding: "0 40px" };
const featureBox = { backgroundColor: "#f8f9fa", borderRadius: "8px", padding: "20px", margin: "20px 40px" };
const featureItem = { color: "#333", fontSize: "14px", lineHeight: "24px", padding: "2px 0", margin: "0" };
const buttonContainer = { textAlign: "center" as const, padding: "20px 40px" };
const button = { backgroundColor: "#000", borderRadius: "6px", color: "#fff", fontSize: "16px", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "12px 24px" };
const footer = { color: "#8898aa", fontSize: "12px", textAlign: "center" as const, padding: "20px 40px" };
