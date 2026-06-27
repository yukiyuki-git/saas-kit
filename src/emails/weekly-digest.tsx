import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WeeklyDigestEmailProps {
  name: string;
  stats: {
    newUsers: number;
    revenue: string;
    apiCalls: number;
  };
  highlights: string[];
}

export function WeeklyDigestEmail({
  name,
  stats,
  highlights,
}: WeeklyDigestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your weekly digest</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Weekly Digest 📊</Heading>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            Here&apos;s a summary of what happened this week.
          </Text>
          <Section style={statsBox}>
            <div style={statItem}>
              <span style={statValue}>{stats.newUsers}</span>
              <span style={statLabel}>New Users</span>
            </div>
            <div style={statItem}>
              <span style={statValue}>{stats.revenue}</span>
              <span style={statLabel}>Revenue</span>
            </div>
            <div style={statItem}>
              <span style={statValue}>{stats.apiCalls.toLocaleString()}</span>
              <span style={statLabel}>API Calls</span>
            </div>
          </Section>
          {highlights.length > 0 && (
            <Section style={highlightBox}>
              <Heading style={h2}>Highlights</Heading>
              {highlights.map((highlight, i) => (
                <Text key={i} style={highlightItem}>
                  • {highlight}
                </Text>
              ))}
            </Section>
          )}
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
const statsBox = { display: "flex", justifyContent: "space-around", margin: "20px 40px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" };
const statItem = { textAlign: "center" as const };
const statValue = { display: "block", fontSize: "24px", fontWeight: "bold", color: "#333" };
const statLabel = { display: "block", fontSize: "12px", color: "#666", marginTop: "4px" };
const highlightBox = { backgroundColor: "#f8f9fa", borderRadius: "8px", padding: "20px", margin: "20px 40px" };
const highlightItem = { color: "#333", fontSize: "14px", lineHeight: "24px", padding: "2px 0", margin: "0" };
const footer = { color: "#8898aa", fontSize: "12px", textAlign: "center" as const, padding: "20px 40px" };
