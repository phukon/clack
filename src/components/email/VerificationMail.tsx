import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerificationMailProps {
  confirmLink: string;
}

export const VerificationMail = ({ confirmLink }: VerificationMailProps) => (
  <Html>
    <Head />
    <Preview>A fine-grained personal access token has been added to your account</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://clack.rkph.me/_next/image?url=%2Flogo.png&w=750&q=75"
          width="32"
          height="32"
          alt="Github"
        />

        <Text style={title}>An email confirmation was created.</Text>

        <Section style={section}>
          <Text style={text}>Hi there!</Text>
          <Text style={text}>Here&apos;s the link to confirm your email with Clack.</Text>

          <Button href={confirmLink} style={button}>
            Confirm your email
          </Button>
        </Section>
        <Text style={links}>
          <Link href="https://clack.rkph.me/tos" style={link}>
            Terms of Service
          </Link>{" "}
          ・{" "}
          <Link href="https://clack.rkph.me/privacy" style={link}>
            Privacy Policy
          </Link>
        </Text>

        <Text style={footer}>
          Clack syncs your writing activity from Notion and Google Docs, and comes with an AI
          assistant and a Notion-style WYSIWYG editor.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default VerificationMail;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const button = {
  fontSize: "14px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
