import React from "react";
import {
  Html,
  Head,
  Container,
  Font,
  Tailwind,
  Text,
  Heading,
  Button,
  Hr,
  Section,
  Row,
  Column,
} from "@react-email/components";

const Template = ({ code }) => {
  const verificationCode = "123456";

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Montserrat"
          fallbackFontFamily="Verdana, sans-serif"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email Address</title>
      </Head>
      <Tailwind>
        <body style={{ fontFamily: "Montserrat, Verdana, sans-serif" }}>
          <Container className="mx-auto px-[20px] py-[40px] max-w-[600px]">
            {/* Header Section */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[14px] text-gray-600 m-0">
                Email Verification
              </Text>
            </Section>

            {/* Main Card */}
            <Section className="rounded-[12px] overflow-hidden mb-[32px]">
              {/* Background with fallback for email clients */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #007291 0%, #005a73 100%)",
                }}
                className="p-[40px]"
              >
                <Row>
                  <Column>
                    {/* Verification Code */}
                    <Text className="m-0 font-bold text-white text-[52px] leading-[60px] text-center tracking-[8px] mb-[24px]">
                      {verificationCode}
                    </Text>
                    <Hr className="border-t-2 border-white/20 my-[24px]" />
                    {/* Content */}
                    <Heading
                      as="h1"
                      className="m-0 text-white text-[24px] leading-[32px] font-semibold text-center mb-[16px]"
                    >
                      Verify Your Email Address
                    </Heading>
                    <Text className="m-0 text-white/80 text-[16px] leading-[24px] text-center mb-[8px]">
                      Use this verification code to complete your registration
                      process.
                    </Text>
                    <Text className="m-0 text-white/80 text-[14px] leading-[20px] text-center">
                      This code will expire in 15 minutes.
                    </Text>
                  </Column>
                </Row>
              </div>
            </Section>

            {/* Action Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href="https://example.com"
                className="inline-block rounded-[8px] bg-[#007291] px-[40px] py-[14px] font-semibold text-[16px] no-underline text-center text-white"
              >
                Verify Email Address
              </Button>
            </Section>

            {/* Security Notice */}
            <Section className="bg-gray-50 rounded-[8px] p-[24px]">
              <Text className="m-0 text-gray-600 text-[14px] leading-[20px] text-center">
                If you didn't request this code, please ignore this email.
                Someone might have entered your email address by mistake.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="text-center mt-[32px]">
              <Text className="m-0 text-gray-500 text-[12px] leading-[18px]">
                Sent by YourApp Name <br />© 2024 YourApp Name. All rights
                reserved.
              </Text>
            </Section>
          </Container>
        </body>
      </Tailwind>
    </Html>
  );
};

export default Template;


