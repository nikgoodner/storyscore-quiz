import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import { archetypes, type ArchetypeId } from "@/lib/archetypes";
import { emailCopy } from "@/lib/emailCopy";
import {
  buildChordOneLiner,
  extractActionsKeepingCapitalization,
  stripFirstWord,
  withoutEmDashes,
} from "@/lib/storyscore-breakdown-content";
import { getSiteUrl, getUnsubscribeUrl } from "@/lib/site-url";

export type StoryscoreBreakdownProps = {
  firstName: string;
  coreId: ArchetypeId;
  balanceId: ArchetypeId;
  inverseId: ArchetypeId;
  recipientEmail: string;
};

const RED = "#FF0000";
const WHITE = "#FFFFFF";
const mono = {
  fontFamily: '"DM Mono", monospace',
} as const;

const helvetica = {
  fontFamily: "Helvetica, Arial, sans-serif",
} as const;

const largeHeadline = {
  ...helvetica,
  letterSpacing: "-0.04em",
} as const;

const strongHelvetica = {
  fontFamily: "Helvetica, Arial, sans-serif",
  fontWeight: 700,
  color: WHITE,
} as const;

const floatingHeadImgStyle = {
  display: "block",
  height: "auto",
};

const dottedBox = {
  border: `1px dashed ${RED}`,
  borderRadius: "4px",
  padding: "20px",
} as const;

function floatingHeadSrc(): string {
  return `${getSiteUrl()}/floating-head.png`;
}

function iconSrc(filename: string): string {
  return `${getSiteUrl()}/${filename}`;
}

function FloatingHeadImg() {
  return (
    <Img
      src={floatingHeadSrc()}
      width="40"
      alt="Nik Goodner"
      style={floatingHeadImgStyle}
    />
  );
}

function MonoLabel({
  children,
  underline = false,
  color = RED,
  centered = false,
}: {
  children: ReactNode;
  underline?: boolean;
  color?: string;
  centered?: boolean;
}) {
  return (
    <Text
      style={{
        ...mono,
        margin: "0 0 8px",
        fontSize: "11px",
        lineHeight: "1.4",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color,
        textDecoration: underline ? "underline" : "none",
        textAlign: centered ? "center" : "left",
      }}
    >
      {children}
    </Text>
  );
}

function MonoSectionLabel({
  children,
  centered = false,
}: {
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <Text
      style={{
        ...mono,
        margin: "0 0 12px",
        fontSize: "14px",
        lineHeight: "1.4",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: RED,
        textAlign: centered ? "center" : "left",
      }}
    >
      {children}
    </Text>
  );
}

function KeywordsThinkLines({ archetypeId }: { archetypeId: ArchetypeId }) {
  const archetype = archetypes[archetypeId];
  const exampleLinkStyle = {
    color: RED,
    textDecoration: "underline",
  } as const;

  return (
    <>
      <Text
        style={{
          ...mono,
          margin: "0 0 8px",
          fontSize: "11px",
          lineHeight: "1.4",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: RED,
        }}
      >
        <span style={{ textDecoration: "underline" }}>KEYWORDS:</span>{" "}
        {archetype.keywords.join(", ").toUpperCase()}
      </Text>
      <Text
        style={{
          ...mono,
          margin: "0 0 8px",
          fontSize: "11px",
          lineHeight: "1.4",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: RED,
        }}
      >
        <span style={{ textDecoration: "underline" }}>THINK:</span>{" "}
        {archetype.examples.map((example, index) => (
          <span key={example.url}>
            {index > 0 && ", "}
            <Link
              href={example.url}
              target="_blank"
              style={exampleLinkStyle}
            >
              {example.name.toUpperCase()}
            </Link>
          </span>
        ))}
      </Text>
    </>
  );
}

function ArchetypeDetailSection({
  rankLabel,
  archetypeId,
  descriptionKey,
}: {
  rankLabel: string;
  archetypeId: ArchetypeId;
  descriptionKey: "core" | "balance" | "inverse";
}) {
  const archetype = archetypes[archetypeId];
  const extended = emailCopy[archetypeId].extendedDescription[descriptionKey];

  return (
    <Section style={{ marginBottom: "8px" }}>
      <MonoSectionLabel>
        {rankLabel}: {archetype.name.toUpperCase()}
      </MonoSectionLabel>
      <Text
        style={{
          ...largeHeadline,
          margin: "0 0 16px",
          fontSize: "40px",
          fontWeight: 700,
          lineHeight: "1.05",
          textTransform: "uppercase",
          color: RED,
        }}
      >
        {archetype.tagline.toUpperCase()}
      </Text>
      <Text
        style={{
          ...helvetica,
          margin: "0 0 16px",
          fontSize: "15px",
          lineHeight: "1.5",
          color: RED,
        }}
      >
        {withoutEmDashes(archetype.descriptions[descriptionKey])}
      </Text>
      <Text
        style={{
          ...helvetica,
          margin: "0 0 20px",
          fontSize: "15px",
          lineHeight: "1.5",
          color: RED,
        }}
      >
        {withoutEmDashes(extended)}
      </Text>
      <KeywordsThinkLines archetypeId={archetypeId} />
    </Section>
  );
}

function DashedDivider() {
  return (
    <Hr
      style={{
        margin: "32px 0",
        border: "none",
        borderTop: `1px dashed ${RED}`,
      }}
    />
  );
}

function SocialIconImg({
  href,
  src,
  alt,
}: {
  href: string;
  src: string;
  alt: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      style={{
        display: "inline-block",
        marginLeft: "12px",
        textDecoration: "none",
      }}
    >
      <Img src={src} width="24" height="24" alt={alt} style={{ display: "block" }} />
    </Link>
  );
}

export function StoryscoreBreakdown({
  firstName,
  coreId,
  balanceId,
  inverseId,
  recipientEmail,
}: StoryscoreBreakdownProps) {
  const core = archetypes[coreId];
  const balance = archetypes[balanceId];
  const inverse = archetypes[inverseId];
  const chordOneLiner = buildChordOneLiner(coreId, balanceId, inverseId);

  const balanceActions = extractActionsKeepingCapitalization(
    emailCopy[balanceId].contentPrompt,
  );
  const inverseActions = extractActionsKeepingCapitalization(
    emailCopy[inverseId].contentPrompt,
  );

  const preheaderText = `Your chord is ${core.name}, ${balance.name}, and ${inverse.name}. Here's how to use it.`;

  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <Font
          fontFamily="DM Mono"
          fallbackFontFamily="monospace"
          webFont={{
            url: "https://fonts.gstatic.com/s/dmmono/v15/aFTU7PB1wkZtYx-6KWCoeA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: WHITE,
          ...helvetica,
        }}
      >
        <div
          style={{
            display: "none",
            overflow: "hidden",
            lineHeight: "1px",
            opacity: 0,
            maxHeight: "0px",
            maxWidth: "0px",
          }}
        >
          {preheaderText}
          &#847; &zwnj; &nbsp; &#847; &zwnj; &nbsp; &#847; &zwnj; &nbsp; &#847; &zwnj; &nbsp;
        </div>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: WHITE,
            padding: "0 24px 40px",
          }}
        >
          {/* 1. Top header bar */}
          <Section style={{ padding: "24px 0" }}>
            <Row>
              <Column style={{ width: "40px", verticalAlign: "middle" }}>
                <FloatingHeadImg />
              </Column>
              <Column style={{ verticalAlign: "middle", textAlign: "right" }}>
                <Text
                  style={{
                    ...mono,
                    margin: 0,
                    fontSize: "12px",
                    color: RED,
                    textAlign: "right",
                  }}
                >
                  @nikgoodner
                </Text>
              </Column>
            </Row>
          </Section>

          {/* 2. Title block */}
          <Section style={{ marginBottom: "40px", textAlign: "center" }}>
            <MonoSectionLabel centered>
              UNDERSTANDING {firstName.toUpperCase()}&apos;S STORYSCORE
            </MonoSectionLabel>
            <Text
              style={{
                ...largeHeadline,
                margin: 0,
                fontSize: "48px",
                fontWeight: 700,
                lineHeight: "1",
                color: RED,
              }}
            >
              STORYSCORE CARD
            </Text>
          </Section>

          {/* 3. Three chord cards */}
          <Section style={{ marginBottom: "40px" }}>
            {[core, balance, inverse].map((archetype, index) => (
              <Section
                key={archetype.id}
                style={{
                  ...dottedBox,
                  marginBottom: index < 2 ? "12px" : "0",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    ...mono,
                    margin: 0,
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: RED,
                  }}
                >
                  {index === 0 && `CORE: ${archetype.name.toUpperCase()}`}
                  {index === 1 && `BALANCE: ${archetype.name.toUpperCase()}`}
                  {index === 2 && `INVERSE: ${archetype.name.toUpperCase()}`}
                </Text>
              </Section>
            ))}
          </Section>

          {/* 4. What this means */}
          <Section style={{ ...dottedBox, marginBottom: "48px", textAlign: "center" }}>
            <MonoLabel underline centered>
              WHAT THIS MEANS:
            </MonoLabel>
            <Section style={{ maxWidth: "400px", margin: "0 auto" }}>
              <Text
                style={{
                  ...helvetica,
                  margin: "0 0 16px",
                  fontSize: "15px",
                  lineHeight: "1.5",
                  color: RED,
                  textAlign: "center",
                }}
              >
                {chordOneLiner}
              </Text>
              <Text
                style={{
                  ...helvetica,
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: "1.5",
                  color: RED,
                  textAlign: "center",
                }}
              >
                That&apos;s the music of your personal brand.
              </Text>
            </Section>
          </Section>

          {/* 5. Core */}
          <ArchetypeDetailSection
            rankLabel="YOUR CORE"
            archetypeId={coreId}
            descriptionKey="core"
          />

          <DashedDivider />

          {/* 7. Balance */}
          <ArchetypeDetailSection
            rankLabel="YOUR BALANCE"
            archetypeId={balanceId}
            descriptionKey="balance"
          />

          <DashedDivider />

          {/* 9. Inverse */}
          <ArchetypeDetailSection
            rankLabel="YOUR INVERSE"
            archetypeId={inverseId}
            descriptionKey="inverse"
          />

          <Section style={{ height: "48px" }} />

          {/* 10. Putting it all together */}
          <Section
            style={{
              backgroundColor: RED,
              borderRadius: "4px",
              padding: "32px",
              marginBottom: "48px",
            }}
          >
            <MonoLabel underline color={WHITE}>
              PUTTING IT ALL TOGETHER:
            </MonoLabel>
            <Text
              style={{
                ...helvetica,
                margin: 0,
                fontSize: "15px",
                lineHeight: "1.55",
                color: WHITE,
              }}
            >
              <strong style={strongHelvetica}>{core.name}</strong>{" "}
              {withoutEmDashes(stripFirstWord(emailCopy[coreId].chordSummaryFragment))}{" "}
              <strong style={strongHelvetica}>{balance.name}</strong>{" "}
              {withoutEmDashes(stripFirstWord(emailCopy[balanceId].chordSummaryFragment))}{" "}
              <strong style={strongHelvetica}>{inverse.name}</strong>{" "}
              {withoutEmDashes(stripFirstWord(emailCopy[inverseId].chordSummaryFragment))}
            </Text>
          </Section>

          {/* 11. Prompt section */}
          <Section style={{ marginBottom: "40px" }}>
            <MonoSectionLabel>TRY THIS OUT THIS WEEK:</MonoSectionLabel>
            <Text
              style={{
                ...largeHeadline,
                margin: "0 0 20px",
                fontSize: "40px",
                fontWeight: 700,
                lineHeight: "1.05",
                textTransform: "uppercase",
                color: RED,
              }}
            >
              YOUR PROMPT
            </Text>
            <Text
              style={{
                ...helvetica,
                margin: "0 0 16px",
                fontSize: "15px",
                lineHeight: "1.5",
                color: RED,
              }}
            >
              {withoutEmDashes(emailCopy[coreId].contentPrompt)}
            </Text>
            <Text
              style={{
                ...helvetica,
                margin: "0 0 16px",
                fontSize: "15px",
                lineHeight: "1.5",
                color: RED,
              }}
            >
              Then {withoutEmDashes(balanceActions)}
            </Text>
            <Text
              style={{
                ...helvetica,
                margin: "0 0 24px",
                fontSize: "15px",
                lineHeight: "1.5",
                color: RED,
              }}
            >
              Finally, {withoutEmDashes(inverseActions)}
            </Text>
            <Text
              style={{
                ...helvetica,
                margin: "0 0 16px",
                fontSize: "15px",
                lineHeight: "1.5",
                color: RED,
              }}
            >
              Write it. Record it. Sketch it. Turn it into a post. Don&apos;t
              overthink it.
            </Text>
            <Text
              style={{
                ...helvetica,
                margin: "0 0 16px",
                fontSize: "15px",
                lineHeight: "1.5",
                color: RED,
              }}
            >
              Your StoryScore is not here to trap you inside a type. It&apos;s
              here to give you language for the way your voice already works.
            </Text>
            <Text
              style={{
                ...helvetica,
                margin: 0,
                fontSize: "15px",
                lineHeight: "1.5",
                color: RED,
              }}
            >
              Good stories have good music. Now you know your chord.
            </Text>
          </Section>

          {/* 12. Footer */}
          <Section
            style={{
              backgroundColor: RED,
              borderRadius: "4px 4px 0 0",
              padding: "24px",
            }}
          >
            <Row>
              <Column style={{ verticalAlign: "middle" }}>
                <Row>
                  <Column style={{ width: "40px", verticalAlign: "middle" }}>
                    <FloatingHeadImg />
                  </Column>
                  <Column style={{ verticalAlign: "middle", paddingLeft: "12px" }}>
                    <Link
                      href="https://nikgoodner.com"
                      target="_blank"
                      style={{
                        ...mono,
                        fontSize: "12px",
                        color: WHITE,
                        textDecoration: "none",
                      }}
                    >
                      @nikgoodner
                    </Link>
                  </Column>
                </Row>
              </Column>
              <Column style={{ verticalAlign: "middle", textAlign: "right" }}>
                <SocialIconImg
                  href="https://www.instagram.com/nikgoodner/"
                  src={iconSrc("icon-instagram.png")}
                  alt="Instagram"
                />
                <SocialIconImg
                  href="https://www.youtube.com/nikgoodner"
                  src={iconSrc("icon-youtube.png")}
                  alt="YouTube"
                />
                <SocialIconImg
                  href="https://www.threads.com/@nikgoodner"
                  src={iconSrc("icon-threads.png")}
                  alt="Threads"
                />
              </Column>
            </Row>
          </Section>

          <Section style={{ padding: "24px 0", textAlign: "center" }}>
            <Text
              style={{
                ...mono,
                margin: 0,
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: RED,
              }}
            >
              <Link
                href={getUnsubscribeUrl(recipientEmail)}
                style={{ color: RED, textDecoration: "underline" }}
              >
                UNSUBSCRIBE
              </Link>
              {" "}| ORLANDO, FLORIDA
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

StoryscoreBreakdown.PreviewProps = {
  firstName: "Alex",
  coreId: "storyteller",
  balanceId: "reporter",
  inverseId: "connector",
  recipientEmail: "alex@example.com",
} satisfies StoryscoreBreakdownProps;

export default StoryscoreBreakdown;
