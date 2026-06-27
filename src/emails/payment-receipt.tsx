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

interface PaymentReceiptEmailProps {
  name: string;
  amount: string;
  plan: string;
  invoiceId: string;
  date: string;
}

export function PaymentReceiptEmail({
  name,
  amount,
  plan,
  invoiceId,
  date,
}: PaymentReceiptEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Payment receipt for {amount}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Payment Receipt 💳</Heading>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            Thank you for your payment! Here&apos;s your receipt.
          </Text>
          <Section style={receiptBox}>
            <div style={receiptRow}>
              <span style={receiptLabel}>Invoice</span>
              <span style={receiptValue}>#{invoiceId}</span>
            </div>
            <div style={receiptRow}>
              <span style={receiptLabel}>Date</span>
              <span style={receiptValue}>{date}</span>
            </div>
            <div style={receiptRow}>
              <span style={receiptLabel}>Plan</span>
              <span style={receiptValue}>{plan}</span>
            </div>
            <div style={receiptDivider} />
            <div style={receiptRow}>
              <span style={receiptLabel}>Total</span>
              <span style={receiptTotal}>{amount}</span>
            </div>
          </Section>
          <Text style={text}>
            You can view all your invoices in your billing settings.
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
const receiptBox = { backgroundColor: "#f8f9fa", borderRadius: "8px", padding: "24px", margin: "20px 40px" };
const receiptRow = { display: "flex", justifyContent: "space-between", marginBottom: "8px" };
const receiptLabel = { color: "#666", fontSize: "14px" };
const receiptValue = { color: "#333", fontSize: "14px", fontWeight: "500" };
const receiptTotal = { color: "#333", fontSize: "18px", fontWeight: "bold" };
const receiptDivider = { borderTop: "1px solid #e5e7eb", margin: "12px 0" };
const footer = { color: "#8898aa", fontSize: "12px", textAlign: "center" as const, padding: "20px 40px" };
