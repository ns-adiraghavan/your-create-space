// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import logoSrc from "@/assets/netscribes-logo.png";

export const Route = createFileRoute("/")({
  component: NetscribesShowcase,
});

/* ──────────────────────────────────────────────────────────────────
   Netscribes Showcase — tile-based microsite
   ────────────────────────────────────────────────────────────────── */

// ─── Brand tokens ────────────────────────────────────────────────
const NS = {
  blue:      "#005F86",
  blueDeep:  "#003A52",
  blueSoft:  "#1A8AB5",
  red:       "#C9252B",
  redDeep:   "#8C1A1F",
  redSoft:   "#E55A60",
  paper:     "#F5F1EA",
  paperDeep: "#EDE7DB",
  surface:   "#FFFFFF",
  ink:       "#0F1B27",
  inkSoft:   "#3C4754",
  muted:     "#6E7884",
  rule:      "rgba(0, 95, 134, 0.14)",
  ruleSoft:  "rgba(0, 95, 134, 0.07)",
};

// ─── Data ─────────────────────────────────────────────────────────

const CATS = [
  { id: "content", num: "01", label: "Content",      color: NS.blue,     tag: "Editorial",   blurb: "Long & short-form copy" },
  { id: "design",  num: "02", label: "Design",       color: NS.red,      tag: "Visual",      blurb: "Layouts, reports, banners" },
  { id: "videos",  num: "03", label: "Videos",       color: NS.blueDeep, tag: "Motion",      blurb: "Explainers, training, reels" },
  { id: "social",  num: "04", label: "Social Media", color: NS.redDeep,  tag: "Distributed", blurb: "Posts, carousels, campaigns" },
];

const CAT_BY_ID = Object.fromEntries(CATS.map(c => [c.id, c]));

const INDUSTRIES = [
  { id: "tech",    label: "Tech & Consulting" },
  { id: "auto",    label: "Automotive" },
  { id: "telecom", label: "Telecom" },
  { id: "bfsi",    label: "BFSI" },
];

const CONTENT_SUBS = [
  { id: "tl",    name: "Thought Leadership", kind: "parent", formats: ["Whitepaper","POV","TL Blog","Report","eBook"] },
  { id: "short", name: "Short-form",         kind: "parent", formats: ["Emailer","Newsletter","Brochure","Case Study","Video Script"] },
  { id: "web",   name: "Web Copies",         kind: "leaf",   format: "Web Copies" },
  { id: "ppt",   name: "PPT / Deck",         kind: "leaf",   format: "PPT / Deck" },
];

const DESIGN_FORMATS = ["Infographics","PPT","Event Based Assets","Landing Page","Web Banners","Print Publications","eBooks","Report Design"];
const VIDEO_FORMATS  = ["Motion Graphics","Footage / Image Based","Reels and Shorts","Podcast Interviews","Training Videos","Whiteboard Animation"];
const SOCIAL_FORMATS = ["Copywriting","Static Post Design","GIFs","Teasers","Memes","Carousel","Corporate Comics"];

const CURATED = {
  content: {
    "Whitepaper":   { title: "The Future of Cloud-Native Architecture", industry: "tech",    pages: 12, desc: "Enterprise whitepaper on multi-cloud strategy for technology leaders." },
    "POV":          { title: "Open Banking: Risk or Opportunity?",      industry: "bfsi",    pages: 4,  desc: "Executive POV on regulatory shifts, written for BFSI decision-makers." },
    "TL Blog":      { title: "EV Adoption: Where is the Market Headed?", industry: "auto",   pages: 3,  desc: "Thought leadership for mobility executives at OEMs and fleet operators." },
    "Report":       { title: "State of AI in Enterprise 2024",           industry: "tech",    pages: 28, desc: "Annual benchmark with executive summary and data visualisation." },
    "eBook":        { title: "Wealth Management for HNIs",               industry: "bfsi",    pages: 16, desc: "Gated lead-gen asset, digital and print ready." },
    "Emailer":      { title: "5G Network Speed Campaign",                industry: "telecom", desc: "Branded HTML emailer with hero, body and CTA modules." },
    "Newsletter":   { title: "Mobility Monthly",                         industry: "auto",    desc: "Monthly subscriber newsletter, modular template, four issues live." },
    "Brochure":     { title: "Connected Car Platform Overview",          industry: "auto",    pages: 6,  desc: "Tri-fold product brochure with tech specs and photography direction." },
    "Case Study":   { title: "Scaling DevOps 3×",                        industry: "tech",    pages: 4,  desc: "Client success story with data-driven narrative and exec summary." },
    "Video Script": { title: "5G Network Explainer — 60s",               industry: "telecom", desc: "Tight 60-second script with cue-based scene blocking." },
    "Web Copies":   { title: "Fiber Broadband Launch",                   industry: "telecom", desc: "Landing-page copy stack — hero, value props, plans, FAQs." },
    "PPT / Deck":   { title: "Investor Pitch — Series C",                industry: "tech",    pages: 18, desc: "18-slide investor deck, narrative arc plus appendix." },
  },
  design: {
    "Infographics":       { title: "EV Battery Supply Chain",          industry: "auto",    desc: "End-to-end visualisation with annotated process flow." },
    "PPT":                { title: "Annual Strategy Deck",             industry: "tech",    pages: 24, desc: "Editorial deck system with chart library and section dividers." },
    "Event Based Assets": { title: "Tech Summit 2024 Identity",        industry: "tech",    desc: "Stage backdrops, social cuts, booth panels, attendee handouts." },
    "Landing Page":       { title: "Fiber Broadband Launch",           industry: "telecom", desc: "Consumer-facing landing page with pricing, FAQs and CTA hierarchy." },
    "Web Banners":        { title: "Postpaid Upgrade Campaign",        industry: "telecom", desc: "Leaderboard, MREC and mobile interstitial banner suite." },
    "Print Publications": { title: "Quarterly Investor Report",        industry: "bfsi",    pages: 42, desc: "Data-rich quarterly with editorial charts and layout system." },
    "eBooks":             { title: "Open Banking Field Guide",         industry: "bfsi",    pages: 22, desc: "Lead-gen eBook with editorial typesetting and chart system." },
    "Report Design":      { title: "Financial Inclusion Annual",       industry: "bfsi",    pages: 64, desc: "Data-rich NBFC annual report with editorial chart library." },
  },
  videos: {
    "Motion Graphics":       { title: "5G eSIM — How It Works",          industry: "telecom", desc: "90-second animated consumer explainer with VO and motion graphics." },
    "Footage / Image Based": { title: "Safety Innovation Reel",          industry: "auto",    desc: "60-second brand highlight using on-site footage and motion typography." },
    "Reels and Shorts":      { title: "Road to Net Zero",                industry: "auto",    desc: "3-part vertical series for Instagram and YouTube Shorts." },
    "Podcast Interviews":    { title: "BFSI Decoded — Episode 14",       industry: "bfsi",    desc: "30-minute interview format, captioned, edited, social cuts included." },
    "Training Videos":       { title: "KYC Compliance Onboarding",       industry: "bfsi",    desc: "8-minute internal training with screencast and motion title cards." },
    "Whiteboard Animation":  { title: "How ADAS Works",                  industry: "auto",    desc: "90-second whiteboard explainer for B2B audiences and conferences." },
  },
  social: {
    "Copywriting":        { title: "Budget Reactions 2024",       industry: "bfsi",    desc: "30-day social calendar with post copy and hashtag strategy." },
    "Static Post Design": { title: "DevOps Awareness Campaign",   industry: "tech",    desc: "4-post series for LinkedIn and Twitter, copy and design included." },
    "GIFs":               { title: "Network Speed Loop",          industry: "telecom", desc: "Animated GIF set optimised for Instagram Stories and Twitter/X." },
    "Teasers":            { title: "Tech Summit Countdown",       industry: "tech",    desc: "15-second teaser series, three episodes, vertical format." },
    "Memes":              { title: "EV Owner Diaries",            industry: "auto",    desc: "Weekly reactive meme set, fully on-brand and platform-native." },
    "Carousel":           { title: "Top 5 AI Trends",             industry: "tech",    desc: "6-slide carousel — data stats, icons, brand palette applied throughout." },
    "Corporate Comics":   { title: "The Compliance Office Diary", industry: "bfsi",    desc: "Long-running comic series — fortnightly LinkedIn cadence." },
  },
};

// ─── Hooks ────────────────────────────────────────────────────────

function useMedia(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const fn = () => setMatch(mql.matches);
    fn();
    mql.addEventListener("change", fn);
    return () => mql.removeEventListener("change", fn);
  }, [query]);
  return match;
}

// ─── Format Mocks (light surface) ────────────────────────────────

function FrameBase({ accent, children, label }) {
  return (
    <div style={{
      position:"relative", width:"100%", aspectRatio:"4/3",
      background:`linear-gradient(180deg, ${accent}10, ${accent}06)`,
      border:`1px solid ${accent}24`,
      borderRadius:14, overflow:"hidden",
    }}>
      <svg viewBox="0 0 200 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
        <defs>
          <pattern id={`grid-${accent.replace("#","")}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <path d={`M 14 0 L 0 0 0 14`} fill="none" stroke={accent} strokeWidth="0.4" opacity="0.14"/>
          </pattern>
        </defs>
        <rect width="200" height="150" fill={`url(#grid-${accent.replace("#","")})`}/>
        {children}
      </svg>
      {label && (
        <div style={{
          position:"absolute", left:10, bottom:10,
          fontFamily:"'DM Sans', sans-serif",
          fontSize:9, fontWeight:600, letterSpacing:"0.14em",
          textTransform:"uppercase", color:`${accent}`,
          padding:"3px 8px", borderRadius:100,
          background:"rgba(255,255,255,0.92)",
          border:`1px solid ${accent}40`,
          backdropFilter:"blur(8px)",
        }}>{label}</div>
      )}
    </div>
  );
}

function WhitepaperMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Whitepaper">
      <g transform="translate(64 14)">
        <rect width="72" height="122" fill="#FFFFFF" stroke={accent} strokeOpacity="0.5" rx="2"/>
        <rect x="6" y="8" width="40" height="3" fill={accent} opacity="0.9"/>
        <rect x="6" y="14" width="30" height="2" fill={accent} opacity="0.5"/>
        <rect x="6" y="24" width="60" height="1" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="28" width="60" height="1" fill="#0F1B27" opacity="0.4"/>
        <rect x="6" y="32" width="48" height="1" fill="#0F1B27" opacity="0.4"/>
        <rect x="6" y="40" width="28" height="20" fill={accent} opacity="0.18"/>
        <rect x="38" y="40" width="28" height="20" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="0.5"/>
        {[64,68,72,76,80,84,88,92,96,100,104,108].map(y => (
          <rect key={y} x="6" y={y} width={y%8===0?60:42} height="1" fill="#0F1B27" opacity="0.35"/>
        ))}
        <rect x="6" y="114" width="14" height="3" fill={accent} opacity="0.7"/>
      </g>
    </FrameBase>
  );
}

function POVMock({ accent }) {
  return (
    <FrameBase accent={accent} label="POV">
      <text x="18" y="34" fill="#0F1B27" fontFamily="'DM Sans', sans-serif" fontSize="14"  opacity="0.95">"</text>
      <rect x="18" y="38" width="120" height="3" fill="#0F1B27" opacity="0.85"/>
      <rect x="18" y="44" width="160" height="3" fill="#0F1B27" opacity="0.85"/>
      <rect x="18" y="50" width="100" height="3" fill="#0F1B27" opacity="0.85"/>
      <rect x="18" y="62" width="3" height="22" fill={accent}/>
      <rect x="26" y="64" width="40" height="2" fill={accent} opacity="0.8"/>
      <rect x="26" y="70" width="60" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="26" y="74" width="46" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="26" y="78" width="56" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="18" y="100" width="164" height="0.5" fill={accent} opacity="0.4"/>
      <text x="18" y="120" fill={accent} fontFamily="sans-serif" fontSize="6" letterSpacing="1.5" opacity="0.7">PERSPECTIVE</text>
    </FrameBase>
  );
}

function CaseMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Case Study">
      <rect x="14" y="14" width="172" height="40" fill={accent} opacity="0.18" rx="2"/>
      <rect x="20" y="22" width="40" height="2" fill={accent}/>
      <rect x="20" y="28" width="60" height="3" fill="#0F1B27" opacity="0.9"/>
      <rect x="20" y="34" width="80" height="3" fill="#0F1B27" opacity="0.9"/>
      <g transform="translate(14 64)">
        {[0,1,2].map(i => (
          <g key={i} transform={`translate(${i*60} 0)`}>
            <text x="0" y="14" fill={accent} fontSize="14" fontWeight="700" fontFamily="sans-serif">{["3×","12M","42%"][i]}</text>
            <rect x="0" y="20" width="40" height="1.5" fill="#0F1B27" opacity="0.4"/>
            <rect x="0" y="24" width="32" height="1.5" fill="#0F1B27" opacity="0.4"/>
          </g>
        ))}
      </g>
      <rect x="14" y="104" width="60" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="14" y="110" width="80" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="14" y="116" width="50" height="1.5" fill="#0F1B27" opacity="0.4"/>
    </FrameBase>
  );
}

function EbookMock({ accent }) {
  return (
    <FrameBase accent={accent} label="eBook">
      <g transform="translate(54 18)">
        <rect x="2" y="2" width="90" height="115" fill={accent} opacity="0.25" rx="2"/>
        <rect x="0" y="0" width="90" height="115" fill="#FFFFFF" stroke={accent} strokeOpacity="0.5" rx="2"/>
        <circle cx="20" cy="20" r="6" fill={accent} opacity="0.6"/>
        <rect x="10" y="36" width="60" height="3" fill="#0F1B27"/>
        <rect x="10" y="42" width="70" height="3" fill="#0F1B27" opacity="0.85"/>
        <rect x="10" y="48" width="48" height="3" fill="#0F1B27" opacity="0.85"/>
        <rect x="10" y="68" width="40" height="1.5" fill={accent} opacity="0.7"/>
        <rect x="10" y="72" width="50" height="1" fill="#0F1B27" opacity="0.4"/>
        <rect x="10" y="100" width="20" height="2" fill={accent}/>
      </g>
    </FrameBase>
  );
}

function EmailMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Emailer">
      <rect x="20" y="14" width="160" height="122" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="2"/>
      <rect x="20" y="14" width="160" height="20" fill={accent} opacity="0.22"/>
      <circle cx="32" cy="24" r="4" fill={accent}/>
      <rect x="42" y="22" width="30" height="2" fill="#0F1B27" opacity="0.9"/>
      <rect x="42" y="27" width="20" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <rect x="28" y="42" width="60" height="3" fill="#0F1B27"/>
      <rect x="28" y="48" width="80" height="2" fill="#0F1B27" opacity="0.6"/>
      <rect x="28" y="60" width="144" height="32" fill={accent} opacity="0.1" rx="2"/>
      <rect x="36" y="68" width="40" height="2" fill={accent}/>
      <rect x="36" y="74" width="60" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <rect x="36" y="78" width="48" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <rect x="28" y="100" width="40" height="10" rx="5" fill={accent}/>
      <text x="48" y="107" fill="#FFFFFF" fontSize="5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">READ MORE</text>
    </FrameBase>
  );
}

function BrochureMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Brochure">
      <g transform="translate(20 18)">
        <rect width="50" height="114" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="1"/>
        <rect x="0" y="0" width="50" height="40" fill={accent} opacity="0.3"/>
        <rect x="4" y="60" width="32" height="2" fill="#0F1B27"/>
        <rect x="4" y="66" width="40" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="4" y="70" width="36" height="1.5" fill="#0F1B27" opacity="0.5"/>
      </g>
      <g transform="translate(74 18)">
        <rect width="50" height="114" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="1"/>
        <rect x="6" y="10" width="20" height="2" fill={accent}/>
        <rect x="6" y="16" width="38" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="20" width="32" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="38" width="38" height="20" fill={accent} opacity="0.18"/>
        <rect x="6" y="64" width="38" height="1.5" fill="#0F1B27" opacity="0.4"/>
        <rect x="6" y="68" width="30" height="1.5" fill="#0F1B27" opacity="0.4"/>
      </g>
      <g transform="translate(128 18)">
        <rect width="50" height="114" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="1"/>
        <rect x="6" y="10" width="20" height="2" fill={accent}/>
        <rect x="6" y="16" width="38" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="20" width="28" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="38" width="38" height="20" fill="none" stroke={accent} strokeOpacity="0.4"/>
        <rect x="6" y="100" width="14" height="6" rx="3" fill={accent}/>
      </g>
    </FrameBase>
  );
}

function ScriptMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Video Script">
      <g transform="translate(20 16)">
        <rect width="160" height="120" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="2"/>
        <rect x="8" y="10" width="40" height="2" fill={accent}/>
        <rect x="8" y="16" width="80" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="8" y="24" width="20" height="6" rx="1" fill={accent} opacity="0.5"/>
        <rect x="32" y="26" width="80" height="1.5" fill="#0F1B27" opacity="0.8"/>
        <rect x="32" y="30" width="60" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="8" y="42" width="20" height="6" rx="1" fill={accent} opacity="0.5"/>
        <rect x="32" y="44" width="100" height="1.5" fill="#0F1B27" opacity="0.8"/>
        <rect x="32" y="48" width="80" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="32" y="52" width="50" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="8" y="64" width="20" height="6" rx="1" fill={accent} opacity="0.5"/>
        <rect x="32" y="66" width="70" height="1.5" fill="#0F1B27" opacity="0.8"/>
        <rect x="32" y="70" width="100" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="8" y="86" width="20" height="6" rx="1" fill={accent} opacity="0.5"/>
        <rect x="32" y="88" width="60" height="1.5" fill="#0F1B27" opacity="0.8"/>
        <rect x="32" y="92" width="80" height="1.5" fill="#0F1B27" opacity="0.5"/>
      </g>
    </FrameBase>
  );
}

function WebPageMock({ accent, label = "Web Page" }) {
  return (
    <FrameBase accent={accent} label={label}>
      <rect x="14" y="14" width="172" height="122" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="14" y="14" width="172" height="8" fill={accent} opacity="0.18"/>
      <circle cx="20" cy="18" r="1" fill={accent}/>
      <circle cx="24" cy="18" r="1" fill={accent} opacity="0.6"/>
      <circle cx="28" cy="18" r="1" fill={accent} opacity="0.4"/>
      <rect x="20" y="30" width="80" height="3" fill="#0F1B27"/>
      <rect x="20" y="36" width="120" height="3" fill="#0F1B27"/>
      <rect x="20" y="42" width="60" height="3" fill="#0F1B27"/>
      <rect x="20" y="56" width="60" height="2" fill="#0F1B27" opacity="0.5"/>
      <rect x="20" y="60" width="80" height="2" fill="#0F1B27" opacity="0.5"/>
      <rect x="20" y="64" width="44" height="2" fill="#0F1B27" opacity="0.5"/>
      <rect x="20" y="76" width="24" height="8" rx="4" fill={accent}/>
      <rect x="120" y="30" width="60" height="80" fill={accent} opacity="0.18" rx="2"/>
      <rect x="14" y="116" width="172" height="20" fill={accent} opacity="0.06"/>
    </FrameBase>
  );
}

function PPTMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Deck">
      <rect x="40" y="20" width="120" height="68" fill="#FFFFFF" stroke={accent} strokeOpacity="0.5" rx="2"/>
      <rect x="48" y="30" width="40" height="3" fill={accent}/>
      <rect x="48" y="38" width="80" height="3" fill="#0F1B27"/>
      <rect x="48" y="44" width="60" height="3" fill="#0F1B27"/>
      <rect x="48" y="58" width="40" height="20" fill={accent} opacity="0.18"/>
      <rect x="92" y="58" width="40" height="20" fill="none" stroke={accent} strokeOpacity="0.4"/>
      {[0,1,2].map(i => (
        <rect key={i} x={20 + i*60} y={102} width="50" height="28" fill="#FFFFFF" stroke={accent} strokeOpacity="0.3" rx="1"/>
      ))}
    </FrameBase>
  );
}

function InfographicMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Infographic">
      <rect x="20" y="14" width="60" height="2" fill={accent}/>
      <rect x="20" y="18" width="40" height="2" fill="#0F1B27" opacity="0.6"/>
      <circle cx="60" cy="60" r="22" fill="none" stroke={accent} strokeWidth="6" opacity="0.4"/>
      <circle cx="60" cy="60" r="22" fill="none" stroke={accent} strokeWidth="6" strokeDasharray="60 200" transform="rotate(-90 60 60)"/>
      <text x="60" y="64" fill="#0F1B27" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">42%</text>
      <g transform="translate(100 38)">
        <rect width="6" height="40" fill={accent} opacity="0.4" y="20"/>
        <rect x="10" width="6" height="50" fill={accent} opacity="0.6" y="10"/>
        <rect x="20" width="6" height="32" fill={accent} opacity="0.5" y="28"/>
        <rect x="30" width="6" height="58" fill={accent} y="2"/>
        <rect x="40" width="6" height="44" fill={accent} opacity="0.7" y="16"/>
        <rect x="50" width="6" height="28" fill={accent} opacity="0.4" y="32"/>
      </g>
      <rect x="20" y="118" width="60" height="2" fill="#0F1B27" opacity="0.4"/>
      <rect x="20" y="124" width="80" height="2" fill="#0F1B27" opacity="0.4"/>
      <rect x="20" y="130" width="40" height="2" fill="#0F1B27" opacity="0.4"/>
    </FrameBase>
  );
}

function EventMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Event Asset">
      <rect x="20" y="14" width="160" height="122" fill={accent} opacity="0.1"/>
      <rect x="20" y="14" width="160" height="122" fill="none" stroke={accent} strokeOpacity="0.4"/>
      <text x="100" y="50" fill="#0F1B27" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily="sans-serif" letterSpacing="2">SUMMIT 2024</text>
      <text x="100" y="78" fill={accent} fontSize="20" fontWeight="700" textAnchor="middle" fontFamily="'DM Sans', sans-serif" >Tomorrow,</text>
      <text x="100" y="96" fill={accent} fontSize="20" fontWeight="700" textAnchor="middle" fontFamily="'DM Sans', sans-serif" >today.</text>
      <rect x="80" y="108" width="40" height="2" fill={accent}/>
      <text x="100" y="124" fill="#0F1B27" opacity="0.6" fontSize="7" textAnchor="middle" fontFamily="sans-serif">28 NOV · MUMBAI</text>
    </FrameBase>
  );
}

function BannerMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Web Banner">
      <g transform="translate(20 28)">
        <rect width="160" height="32" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="2"/>
        <rect x="0" y="0" width="50" height="32" fill={accent} opacity="0.3"/>
        <rect x="58" y="8" width="50" height="3" fill="#0F1B27"/>
        <rect x="58" y="14" width="70" height="2" fill="#0F1B27" opacity="0.5"/>
        <rect x="58" y="18" width="40" height="2" fill="#0F1B27" opacity="0.5"/>
        <rect x="132" y="11" width="22" height="10" rx="5" fill={accent}/>
      </g>
      <g transform="translate(20 70)">
        <rect width="76" height="50" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="2"/>
        <rect x="0" y="0" width="76" height="22" fill={accent} opacity="0.3"/>
        <rect x="6" y="26" width="40" height="2" fill="#0F1B27"/>
        <rect x="6" y="30" width="60" height="2" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="40" width="20" height="6" rx="3" fill={accent}/>
      </g>
      <g transform="translate(104 70)">
        <rect width="76" height="50" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="2"/>
        <rect x="6" y="6" width="50" height="3" fill={accent}/>
        <rect x="6" y="14" width="64" height="2" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="18" width="50" height="2" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="30" width="64" height="14" fill={accent} opacity="0.2"/>
      </g>
    </FrameBase>
  );
}

function PrintMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Print">
      <g transform="translate(40 12)">
        <rect width="120" height="126" fill="#F2EFE9" rx="1"/>
        <rect x="0" y="0" width="120" height="36" fill={accent} opacity="0.85"/>
        <text x="60" y="22" fill="#F2EFE9" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="'DM Sans', sans-serif" letterSpacing="1">REPORT 2024</text>
        <rect x="60" y="28" width="0.5" height="4" fill="#F2EFE9"/>
        <text x="60" y="34" fill="#F2EFE9" fontSize="5" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1.5">QUARTERLY</text>
        <rect x="10" y="46" width="60" height="3" fill="#22222A"/>
        <rect x="10" y="52" width="100" height="2" fill="#22222A" opacity="0.6"/>
        <rect x="10" y="56" width="80" height="2" fill="#22222A" opacity="0.6"/>
        <rect x="10" y="68" width="48" height="50" fill={accent} opacity="0.25"/>
        <rect x="62" y="68" width="48" height="2" fill="#22222A" opacity="0.7"/>
        <rect x="62" y="72" width="48" height="1.5" fill="#22222A" opacity="0.4"/>
        <rect x="62" y="76" width="40" height="1.5" fill="#22222A" opacity="0.4"/>
        <rect x="62" y="80" width="44" height="1.5" fill="#22222A" opacity="0.4"/>
        <rect x="62" y="84" width="36" height="1.5" fill="#22222A" opacity="0.4"/>
        <rect x="62" y="96" width="20" height="2" fill={accent}/>
        <rect x="62" y="100" width="40" height="1.5" fill="#22222A" opacity="0.4"/>
        <rect x="62" y="104" width="44" height="1.5" fill="#22222A" opacity="0.4"/>
      </g>
    </FrameBase>
  );
}

function MotionMock({ accent, label = "Motion" }) {
  return (
    <FrameBase accent={accent} label={label}>
      <rect x="14" y="14" width="172" height="116" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="14" y="14" width="172" height="116" fill={accent} opacity="0.06"/>
      <circle cx="100" cy="72" r="20" fill="rgba(10,13,18,0.8)" stroke={accent} strokeOpacity="0.9"/>
      <polygon points="94,62 94,82 112,72" fill={accent}/>
      <rect x="14" y="118" width="40" height="2" fill={accent}/>
      <rect x="14" y="118" width="172" height="2" fill={accent} opacity="0.18"/>
      <text x="20" y="110" fill="#0F1B27" opacity="0.5" fontSize="5" fontFamily="sans-serif" letterSpacing="1">00:00 / 01:24</text>
    </FrameBase>
  );
}

function ReelsMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Reels">
      {[0,1,2].map(i => (
        <g key={i} transform={`translate(${50 + i*36} ${24 - i*4})`}>
          <rect width="44" height="80" rx="4" fill="#FFFFFF" stroke={accent} strokeOpacity={0.4 + i*0.15}/>
          <rect width="44" height="80" rx="4" fill={accent} opacity={0.08 + i*0.04}/>
          <circle cx="22" cy="32" r="6" fill="rgba(10,13,18,0.8)" stroke={accent} strokeOpacity="0.8"/>
          <polygon points={`20,29 20,35 25,32`} fill={accent}/>
          <rect x="6" y="62" width="20" height="1.5" fill="#0F1B27" opacity="0.7"/>
          <rect x="6" y="66" width="28" height="1.5" fill="#0F1B27" opacity="0.4"/>
          <rect x="6" y="70" width="14" height="1.5" fill="#0F1B27" opacity="0.4"/>
        </g>
      ))}
    </FrameBase>
  );
}

function PodcastMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Podcast">
      <circle cx="60" cy="74" r="36" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4"/>
      <circle cx="60" cy="74" r="28" fill={accent} opacity="0.18"/>
      <circle cx="60" cy="74" r="18" fill={accent} opacity="0.3"/>
      <rect x="56" y="62" width="8" height="20" rx="4" fill={accent}/>
      <path d="M48 80 Q60 92 72 80" stroke={accent} strokeWidth="1.5" fill="none"/>
      <line x1="60" y1="92" x2="60" y2="98" stroke={accent} strokeWidth="1.5"/>
      <rect x="108" y="48" width="70" height="3" fill={accent}/>
      <rect x="108" y="56" width="60" height="2" fill="#0F1B27" opacity="0.5"/>
      <rect x="108" y="60" width="64" height="2" fill="#0F1B27" opacity="0.5"/>
      <rect x="108" y="78" width="50" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="108" y="82" width="60" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <g transform="translate(108 96)">
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i => (
          <rect key={i} x={i*5} width="2" height={6 + Math.sin(i*0.6)*4 + Math.abs(Math.sin(i*0.4))*6} y={4 - Math.abs(Math.sin(i*0.4))*3} fill={accent} opacity="0.7"/>
        ))}
      </g>
    </FrameBase>
  );
}

function TrainingMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Training">
      <rect x="14" y="14" width="172" height="100" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="20" y="20" width="120" height="88" fill={accent} opacity="0.1"/>
      <rect x="146" y="20" width="34" height="88" fill={accent} opacity="0.18"/>
      <rect x="150" y="26" width="26" height="2" fill="#0F1B27"/>
      <rect x="150" y="32" width="20" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <rect x="150" y="36" width="22" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <rect x="150" y="48" width="14" height="2" fill={accent}/>
      <rect x="150" y="52" width="26" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <rect x="150" y="56" width="22" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <circle cx="80" cy="64" r="14" fill="rgba(10,13,18,0.8)" stroke={accent} strokeOpacity="0.9"/>
      <polygon points="76,58 76,70 88,64" fill={accent}/>
      <rect x="14" y="118" width="172" height="14" fill="#FFFFFF" stroke={accent} strokeOpacity="0.3" rx="2"/>
      <rect x="18" y="122" width="60" height="6" rx="3" fill={accent} opacity="0.7"/>
      <rect x="18" y="122" width="80" height="6" rx="3" fill={accent} opacity="0.2"/>
    </FrameBase>
  );
}

function WhiteboardMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Whiteboard">
      <rect x="14" y="14" width="172" height="116" fill="#F4F1E8" rx="2"/>
      <path d="M30 50 Q50 30 80 45 T140 40" stroke="#22222A" strokeWidth="1.5" fill="none" opacity="0.8"/>
      <circle cx="40" cy="78" r="8" fill="none" stroke="#22222A" strokeWidth="1.5"/>
      <line x1="40" y1="86" x2="40" y2="102" stroke="#22222A" strokeWidth="1.5"/>
      <line x1="40" y1="92" x2="30" y2="98" stroke="#22222A" strokeWidth="1.5"/>
      <line x1="40" y1="92" x2="50" y2="98" stroke="#22222A" strokeWidth="1.5"/>
      <line x1="40" y1="102" x2="32" y2="114" stroke="#22222A" strokeWidth="1.5"/>
      <line x1="40" y1="102" x2="48" y2="114" stroke="#22222A" strokeWidth="1.5"/>
      <rect x="70" y="70" width="40" height="24" fill="none" stroke="#22222A" strokeWidth="1.5" rx="2"/>
      <line x1="76" y1="78" x2="104" y2="78" stroke="#22222A" strokeWidth="1"/>
      <line x1="76" y1="84" x2="100" y2="84" stroke="#22222A" strokeWidth="1"/>
      <line x1="76" y1="90" x2="96" y2="90" stroke="#22222A" strokeWidth="1"/>
      <path d="M120 70 L140 80 L120 90 Z" fill="none" stroke="#22222A" strokeWidth="1.5"/>
      <path d="M58 82 L70 82" stroke="#22222A" strokeWidth="1.5" fill="none"/>
      <path d="M110 82 L120 82" stroke="#22222A" strokeWidth="1.5" fill="none"/>
      <circle cx="160" cy="92" r="6" fill={accent} opacity="0.6"/>
    </FrameBase>
  );
}

function StaticPostMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Static Post">
      <rect x="50" y="14" width="100" height="122" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="50" y="14" width="100" height="100" fill={accent} opacity="0.18"/>
      <text x="100" y="56" fill="#0F1B27" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1.5">THE FUTURE</text>
      <text x="100" y="72" fill={accent} fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="'DM Sans', sans-serif" >is now</text>
      <rect x="86" y="80" width="28" height="2" fill={accent}/>
      <text x="100" y="94" fill="#0F1B27" opacity="0.6" fontSize="5" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1">#netscribes</text>
      <rect x="54" y="118" width="40" height="2" fill="#0F1B27" opacity="0.7"/>
      <rect x="54" y="124" width="60" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="54" y="128" width="50" height="1.5" fill="#0F1B27" opacity="0.4"/>
    </FrameBase>
  );
}

function GifMock({ accent }) {
  return (
    <FrameBase accent={accent} label="GIF">
      <rect x="50" y="32" width="100" height="76" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="50" y="32" width="100" height="76" fill={accent} opacity="0.1" rx="3"/>
      {[0,1,2].map(i => (
        <circle key={i} cx={84 + i*16} cy={70} r="5" fill={accent} opacity={0.4 + i*0.2}>
          <animate attributeName="opacity" values={`0.3;1;0.3`} dur="1.2s" begin={`${i*0.2}s`} repeatCount="indefinite"/>
        </circle>
      ))}
      <rect x="56" y="100" width="20" height="3" fill={accent}/>
      <rect x="56" y="116" width="40" height="2" fill="#0F1B27" opacity="0.5"/>
      <text x="148" y="42" fill={accent} fontSize="6" fontWeight="700" textAnchor="end" fontFamily="sans-serif" letterSpacing="1">GIF</text>
    </FrameBase>
  );
}

function TeaserMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Teaser">
      <rect x="14" y="14" width="172" height="116" fill="#FFFFFF" rx="3"/>
      <rect x="14" y="14" width="172" height="116" fill={accent} opacity="0.18" rx="3"/>
      <text x="100" y="60" fill="#0F1B27" fontSize="16" fontWeight="800" textAnchor="middle" fontFamily="'DM Sans', sans-serif" >Coming</text>
      <text x="100" y="84" fill={accent} fontSize="22" fontWeight="800" textAnchor="middle" fontFamily="'DM Sans', sans-serif" >Tomorrow.</text>
      <rect x="90" y="96" width="20" height="2" fill={accent}/>
      <text x="100" y="116" fill="#0F1B27" opacity="0.6" fontSize="6" textAnchor="middle" fontFamily="sans-serif" letterSpacing="2">15 SEC TEASER</text>
    </FrameBase>
  );
}

function MemeMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Meme">
      <rect x="50" y="20" width="100" height="100" fill="#1A1E26" stroke={accent} strokeOpacity="0.3" rx="2"/>
      <text x="100" y="42" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="Impact, sans-serif" stroke="#000" strokeWidth="0.4">WHEN MARKETING</text>
      <text x="100" y="56" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="Impact, sans-serif" stroke="#000" strokeWidth="0.4">SAYS "JUST POST"</text>
      <rect x="70" y="62" width="60" height="36" fill={accent} opacity="0.3"/>
      <circle cx="86" cy="78" r="4" fill="#FFF"/>
      <circle cx="114" cy="78" r="4" fill="#FFF"/>
      <path d="M85 90 Q100 96 115 90" stroke="#FFF" strokeWidth="1.5" fill="none"/>
      <text x="100" y="116" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="Impact, sans-serif" stroke="#000" strokeWidth="0.4">ME, EXISTING</text>
    </FrameBase>
  );
}

function CarouselMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Carousel">
      {[0,1,2,3,4].map(i => (
        <g key={i} transform={`translate(${22 + i*32} ${30 + Math.abs(i-2)*4})`}>
          <rect width="42" height="72" fill="#FFFFFF" stroke={accent} strokeOpacity={i===2 ? 0.9 : 0.3} rx="3"/>
          <rect width="42" height="72" fill={accent} opacity={i===2 ? 0.2 : 0.06} rx="3"/>
          {i===2 && <>
            <rect x="6" y="10" width="14" height="2" fill={accent}/>
            <rect x="6" y="16" width="28" height="3" fill="#0F1B27"/>
            <rect x="6" y="22" width="20" height="3" fill="#0F1B27"/>
            <rect x="6" y="36" width="30" height="1.5" fill="#0F1B27" opacity="0.5"/>
            <rect x="6" y="40" width="26" height="1.5" fill="#0F1B27" opacity="0.5"/>
            <rect x="6" y="44" width="28" height="1.5" fill="#0F1B27" opacity="0.5"/>
            <rect x="6" y="60" width="14" height="6" rx="3" fill={accent}/>
          </>}
        </g>
      ))}
      <g transform="translate(86 124)">
        {[0,1,2,3,4].map(i => (
          <circle key={i} cx={i*6} cy="0" r="1.5" fill={accent} opacity={i===2 ? 1 : 0.3}/>
        ))}
      </g>
    </FrameBase>
  );
}

function CopyMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Copywriting">
      <text x="20" y="36" fill={accent} fontFamily="'DM Sans', sans-serif" fontSize="28" >"</text>
      <rect x="20" y="48" width="160" height="2" fill="#0F1B27" opacity="0.9"/>
      <rect x="20" y="56" width="140" height="2" fill="#0F1B27" opacity="0.9"/>
      <rect x="20" y="64" width="160" height="2" fill="#0F1B27" opacity="0.9"/>
      <rect x="20" y="72" width="100" height="2" fill="#0F1B27" opacity="0.9"/>
      <rect x="20" y="92" width="40" height="0.5" fill={accent}/>
      <rect x="20" y="100" width="50" height="2" fill={accent}/>
      <rect x="20" y="106" width="60" height="1.5" fill="#0F1B27" opacity="0.5"/>
    </FrameBase>
  );
}

function ComicMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Comic">
      {[0,1,2,3].map(i => {
        const x = 20 + (i%2)*84;
        const y = 16 + Math.floor(i/2)*60;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect width="76" height="52" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="2"/>
            <rect width="76" height="52" fill={accent} opacity="0.08" rx="2"/>
            <circle cx="22" cy="26" r="8" fill="none" stroke="#0F1B27" opacity="0.7"/>
            <line x1="22" y1="34" x2="22" y2="46" stroke="#0F1B27" opacity="0.7"/>
            <rect x="40" y="10" width="32" height="14" rx="6" fill="#0F1B27" opacity="0.85"/>
            <rect x="44" y="14" width="18" height="2" fill="#22222A"/>
            <rect x="44" y="18" width="22" height="2" fill="#22222A"/>
          </g>
        );
      })}
    </FrameBase>
  );
}

function GenericMock({ accent, label = "Sample" }) {
  return (
    <FrameBase accent={accent} label={label}>
      <rect x="30" y="30" width="60" height="90" fill={accent} opacity="0.18" rx="3"/>
      <rect x="100" y="30" width="70" height="40" fill={accent} opacity="0.1" rx="3"/>
      <rect x="100" y="78" width="70" height="42" fill="none" stroke={accent} strokeOpacity="0.4" rx="3"/>
    </FrameBase>
  );
}

const MOCK_BY_TYPE = {
  "Whitepaper": WhitepaperMock,
  "POV": POVMock,
  "TL Blog": POVMock, "TL Blogs": POVMock, "Blog": POVMock,
  "Report": WhitepaperMock, "Reports": WhitepaperMock, "Report Design": PrintMock,
  "eBook": EbookMock, "eBooks": EbookMock,
  "Case Study": CaseMock,
  "Emailer": EmailMock, "Emailer & Newsletters": EmailMock, "Emailer and Newsletters": EmailMock, "Newsletter": EmailMock,
  "Brochure": BrochureMock,
  "Video Script": ScriptMock,
  "Web Copies": (p) => <WebPageMock {...p} label="Web Copy"/>,
  "Landing Page": (p) => <WebPageMock {...p} label="Landing Page"/>,
  "Web Page": WebPageMock,
  "PPT / Deck": PPTMock, "PPT": PPTMock, "Deck": PPTMock,
  "Infographic": InfographicMock, "Infographics": InfographicMock,
  "Event Based Assets": EventMock,
  "Web Banners": BannerMock,
  "Print Publications": PrintMock,
  "Motion Graphics": MotionMock, "Motion Graphics with Character Animation": MotionMock,
  "Footage / Image Based": (p) => <MotionMock {...p} label="Footage"/>,
  "Reels and Shorts": ReelsMock, "Reels": ReelsMock,
  "Podcast Interviews": PodcastMock, "Podcast / Thought Leadership Interviews": PodcastMock, "Podcast": PodcastMock,
  "Training Videos": TrainingMock, "Training Video": TrainingMock,
  "Whiteboard Animation": WhiteboardMock,
  "Copywriting": CopyMock,
  "Static Post Design": StaticPostMock, "Static Posts": StaticPostMock,
  "GIFs": GifMock, "GIF": GifMock, "GIFs + Posts": GifMock,
  "Teasers": TeaserMock,
  "Memes": MemeMock,
  "Carousel": CarouselMock,
  "Corporate Comics": ComicMock,
};

function FormatMock({ type, accent }) {
  const Comp = MOCK_BY_TYPE[type] || GenericMock;
  return <Comp accent={accent} label={type}/>;
}

// ─── Header ───────────────────────────────────────────────────────

function Header({ onHome }) {
  return (
    <header style={{
      padding: "18px clamp(20px, 4vw, 44px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: `1px solid ${NS.rule}`,
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(245, 241, 234, 0.88)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    }}>
      <button onClick={onHome} style={{
        background: "none", border: "none", cursor: "pointer", padding: 0,
        display: "flex", alignItems: "center", gap: 12,
      }} aria-label="Home">
        <img src={logoSrc} alt="Netscribes" style={{ height: 28, width: "auto" }}/>
      </button>

      <nav style={{ display: "flex", alignItems: "center", gap: 24 }} className="ns-nav-links" />

      <button style={{
        padding: "10px 20px",
        borderRadius: 2,
        background: NS.blue,
        border: "none",
        color: "#FFFFFF",
        fontWeight: 600, fontSize: 13,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.01em",
        transition: "background 0.18s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = NS.blueDeep}
      onMouseLeave={e => e.currentTarget.style.background = NS.blue}
      >Request Samples →</button>
    </header>
  );
}

// ─── Hero copy block ──────────────────────────────────────────────

function HeroIntro() {
  return (
    <div style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "clamp(36px, 6vw, 72px) clamp(20px, 4vw, 44px) clamp(24px, 4vw, 40px)",
      borderBottom: `1px solid ${NS.rule}`,
    }}>
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 32,
        flexWrap: "wrap",
      }}>
        <div style={{ maxWidth: 720 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.26em",
            textTransform: "uppercase", color: NS.red,
            marginBottom: 24,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ display: "inline-block", width: 28, height: 1, background: NS.red }}/>
            Content · Design · Video · Social
          </p>
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(44px, 6.4vw, 76px)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            color: NS.ink,
            textWrap: "balance",
          }}>
            The work,{" "}
            <em style={{ fontStyle: "normal", color: NS.blue }}>across every format.</em>
          </h1>
        </div>
        <p style={{
          color: NS.inkSoft,
          fontSize: 15,
          lineHeight: 1.65,
          maxWidth: 360,
          fontWeight: 400,
        }}>
          Four practices, one library. Pick a service — every tile opens onto real samples, filterable by industry.
        </p>
      </div>
    </div>
  );
}

// ─── Hero tile grid ───────────────────────────────────────────────

function HeroTiles({ onSelect, mobile }) {
  return (
    <div style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "0 clamp(20px,4vw,44px)",
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      borderLeft: `1px solid ${NS.rule}`,
      borderRight: `1px solid ${NS.rule}`,
    }}>
      {CATS.map((cat, i) => (
        <HeroTile key={cat.id} cat={cat} index={i} onClick={() => onSelect(cat.id)} mobile={mobile}/>
      ))}
    </div>
  );
}

function HeroTile({ cat, index, onClick, mobile }) {
  const [hov, setHov] = useState(false);
  const isRight = !mobile && (index % 2 === 1);
  const isBottom = mobile ? (index === CATS.length - 1) : (index >= 2);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "left",
        background: hov ? cat.color : NS.surface,
        border: "none",
        borderRight: !isRight ? `1px solid ${NS.rule}` : "none",
        borderBottom: !isBottom ? `1px solid ${NS.rule}` : "none",
        padding: mobile ? "32px 24px" : "44px 40px 36px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        minHeight: mobile ? 220 : 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 24,
        transition: "background 0.32s cubic-bezier(0.22,1,0.36,1)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12,
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.12em",
          color: hov ? "rgba(255,255,255,0.7)" : NS.muted,
          transition: "color 0.32s",
        }}>{cat.num} / 04</span>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: hov ? "rgba(255,255,255,0.78)" : cat.color,
          padding: "5px 10px",
          border: `1px solid ${hov ? "rgba(255,255,255,0.45)" : cat.color + "55"}`,
          transition: "color 0.32s, border-color 0.32s",
        }}>{cat.tag}</span>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 14 }}>
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: mobile ? 44 : "clamp(46px, 5.2vw, 64px)",
          letterSpacing: "-0.025em",
          lineHeight: 0.98,
          color: hov ? "#FFFFFF" : NS.ink,
          transition: "color 0.32s",
        }}>{cat.label}</h2>
        <p style={{
          fontSize: 14,
          color: hov ? "rgba(255,255,255,0.85)" : NS.inkSoft,
          lineHeight: 1.5,
          maxWidth: 320,
          transition: "color 0.32s",
        }}>{cat.blurb}</p>
      </div>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: 16,
        borderTop: `1px solid ${hov ? "rgba(255,255,255,0.25)" : NS.ruleSoft}`,
        transition: "border-color 0.32s",
      }}>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
          color: hov ? "#FFFFFF" : cat.color,
          transition: "color 0.32s",
        }}>View samples</span>
        <span style={{
          fontSize: 18,
          color: hov ? "#FFFFFF" : cat.color,
          transition: "color 0.32s, transform 0.32s",
          transform: hov ? "translateX(4px)" : "none",
        }}>→</span>
      </div>
    </button>
  );
}

// ─── Category strip (selected state) ──────────────────────────────

function CategoryStrip({ selected, onSelect, mobile }) {
  return (
    <div style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "0 clamp(20px,4vw,44px)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        border: `1px solid ${NS.rule}`,
        background: NS.surface,
      }}>
        {CATS.map((cat, i) => {
          const active = cat.id === selected;
          const isLast = i === CATS.length - 1;
          const isRightEdge = mobile ? (i % 2 === 1) : isLast;
          const isBottomEdge = mobile ? (i >= 2) : true;
          return (
            <StripTile
              key={cat.id}
              cat={cat}
              active={active}
              onClick={() => onSelect(cat.id)}
              borderRight={!isRightEdge}
              borderBottom={mobile && !isBottomEdge}
              mobile={mobile}
            />
          );
        })}
      </div>
    </div>
  );
}

function StripTile({ cat, active, onClick, borderRight, borderBottom, mobile }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "left",
        background: active ? cat.color : (hov ? NS.paperDeep : NS.surface),
        borderRight: borderRight ? `1px solid ${NS.rule}` : "none",
        borderBottom: borderBottom ? `1px solid ${NS.rule}` : "none",
        borderTop: "none",
        borderLeft: "none",
        padding: mobile ? "18px 18px" : "22px 22px",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        fontFamily: "'DM Sans', sans-serif",
        transition: "background 0.22s",
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12,
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.12em",
          color: active ? "rgba(255,255,255,0.75)" : NS.muted,
        }}>{cat.num}</span>
        {active && (
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#FFFFFF",
          }}/>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <h3 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: mobile ? 24 : 30,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: active ? "#FFFFFF" : NS.ink,
        }}>{cat.label}</h3>
      </div>
      <span style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: active ? "rgba(255,255,255,0.78)" : cat.color,
      }}>{cat.tag}</span>
    </button>
  );
}

// ─── Section banner ──────────────────────────────────────────────

function SectionBanner({ cat, mobile }) {
  return (
    <div style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "0 clamp(20px,4vw,44px)",
    }}>
      <div style={{
        borderLeft: `1px solid ${NS.rule}`,
        borderRight: `1px solid ${NS.rule}`,
        borderBottom: `1px solid ${NS.rule}`,
        background: NS.surface,
        padding: mobile ? "24px 20px" : "32px 32px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
      }}>
        <div style={{ flex: "1 1 320px" }}>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
            textTransform: "uppercase", color: cat.color, marginBottom: 8,
          }}>Now showing · {cat.tag} samples</p>
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: mobile ? 32 : 44,
            letterSpacing: "-0.02em",
            color: NS.ink,
            lineHeight: 1.02,
          }}>{cat.label}</h2>
          <p style={{
            marginTop: 8,
            color: NS.inkSoft,
            fontSize: 14,
            maxWidth: 460,
            lineHeight: 1.55,
          }}>{cat.blurb}</p>
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          color: NS.muted,
          letterSpacing: "0.08em",
        }}>{cat.num} / 04</div>
      </div>
    </div>
  );
}

// ─── Filter row ──────────────────────────────────────────────────

function FilterRow({ industry, setIndustry, accent, mobile }) {
  return (
    <div style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "clamp(24px,4vw,40px) clamp(20px,4vw,44px) 20px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap",
    }}>
      <span style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
        textTransform: "uppercase", color: NS.muted,
        marginRight: 8,
      }}>Filter by industry</span>
      {[{ id: null, label: "All" }, ...INDUSTRIES].map(ind => {
        const active = industry === ind.id;
        return (
          <button
            key={ind.id || "all"}
            onClick={() => setIndustry(ind.id)}
            style={{
              padding: "7px 14px",
              borderRadius: 2,
              fontSize: 12,
              fontWeight: 500,
              border: `1px solid ${active ? accent : NS.rule}`,
              background: active ? accent : NS.surface,
              color: active ? "#FFFFFF" : NS.inkSoft,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.18s",
              whiteSpace: "nowrap",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = accent + "80"; e.currentTarget.style.color = NS.ink; } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = NS.rule; e.currentTarget.style.color = NS.inkSoft; } }}
          >{ind.label}</button>
        );
      })}
    </div>
  );
}

// ─── Detail panels per category ──────────────────────────────────

function ContentDetail({ accent, industry, onPreview, mobile }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      gap: mobile ? 14 : 18,
    }}>
      {CONTENT_SUBS.map(sub => sub.kind === "parent" ? (
        <ParentCard key={sub.id} sub={sub} accent={accent} industry={industry} onPreview={onPreview}/>
      ) : (
        <LeafCard key={sub.id} sub={sub} accent={accent} industry={industry} onPreview={onPreview}/>
      ))}
    </div>
  );
}

function ParentCard({ sub, accent, industry, onPreview }) {
  return (
    <div style={{
      background: NS.surface,
      border: `1px solid ${NS.rule}`,
      borderLeft: `3px solid ${accent}`,
      padding: "26px 26px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 20,
      position: "relative",
      overflow: "hidden",
    }}>
      <div>
        <p style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
          textTransform: "uppercase", color: accent, marginBottom: 10,
        }}>{sub.formats.length} formats</p>
        <h3 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: 30, lineHeight: 1.05,
          letterSpacing: "-0.015em",
          color: NS.ink,
        }}>{sub.name}</h3>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {sub.formats.map(fmt => (
          <button
            key={fmt}
            onClick={() => onPreview({ format: fmt, category: "content", industry, parent: sub.name })}
            style={{
              padding: "7px 13px",
              borderRadius: 2,
              background: NS.paper,
              border: `1px solid ${NS.rule}`,
              color: NS.inkSoft,
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              transition: "all 0.18s",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = accent;
              e.currentTarget.style.borderColor = accent;
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = NS.paper;
              e.currentTarget.style.borderColor = NS.rule;
              e.currentTarget.style.color = NS.inkSoft;
            }}
          >{fmt}</button>
        ))}
      </div>
    </div>
  );
}

function LeafCard({ sub, accent, industry, onPreview }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => onPreview({ format: sub.format, category: "content", industry })}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "left",
        background: hov ? accent : NS.surface,
        border: `1px solid ${hov ? accent : NS.rule}`,
        borderLeft: `3px solid ${accent}`,
        padding: "26px 26px 24px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.22s",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div>
        <p style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
          textTransform: "uppercase", color: hov ? "rgba(255,255,255,0.85)" : accent, marginBottom: 10,
          transition: "color 0.22s",
        }}>Direct sample</p>
        <h3 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: 30, lineHeight: 1.05,
          letterSpacing: "-0.015em",
          color: hov ? "#FFFFFF" : NS.ink,
          transition: "color 0.22s",
        }}>{sub.name}</h3>
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12,
      }}>
        <p style={{
          fontSize: 13,
          color: hov ? "rgba(255,255,255,0.85)" : NS.inkSoft,
          lineHeight: 1.5,
          transition: "color 0.22s",
        }}>
          {sub.id === "web"
            ? "Hero, value props, FAQs — ready to ship."
            : "Investor-ready decks with editorial polish."}
        </p>
        <span style={{
          width: 36, height: 36, borderRadius: "50%",
          background: hov ? "#FFFFFF" : accent + "14",
          color: hov ? accent : accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, flexShrink: 0,
          transition: "all 0.22s",
        }}>→</span>
      </div>
    </button>
  );
}

function FormatGrid({ formats, category, accent, industry, onPreview, mobile }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: mobile ? 12 : 16,
    }}>
      {formats.map(fmt => (
        <FormatCard key={fmt} format={fmt} category={category} accent={accent}
          onClick={() => onPreview({ format: fmt, category, industry })}/>
      ))}
    </div>
  );
}

function FormatCard({ format, category, accent, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "left",
        background: NS.surface,
        border: `1px solid ${hov ? accent : NS.rule}`,
        padding: 0,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.22s, transform 0.22s",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? `0 14px 32px ${accent}1F` : "0 0 0 transparent",
      }}
    >
      <div style={{ padding: 10, background: NS.paper, borderBottom: `1px solid ${NS.ruleSoft}` }}>
        <FormatMock type={format} accent={accent}/>
      </div>
      <div style={{ padding: "14px 16px 18px" }}>
        <h4 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 14, lineHeight: 1.3,
          color: NS.ink,
          letterSpacing: "-0.005em",
        }}>{format}</h4>
        <p style={{
          marginTop: 4,
          fontSize: 11,
          fontWeight: 600,
          color: hov ? accent : NS.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          transition: "color 0.22s",
        }}>{hov ? "View sample →" : "Format"}</p>
      </div>
    </button>
  );
}

// ─── Modal ────────────────────────────────────────────────────────

function SampleModal({ payload, onClose }) {
  const { format, category, industry, parent } = payload;
  const data = (CURATED[category] && CURATED[category][format]) || {
    title: `${format} Sample`,
    desc: `Sample ${format} piece showcasing Netscribes capabilities.`,
  };
  const accent = CAT_BY_ID[category].color;
  const indLabel = INDUSTRIES.find(i => i.id === (industry || data.industry))?.label;

  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", h);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", h);
    };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(15, 27, 39, 0.55)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
      animation: "ns-fade .25s ease",
      overflow: "auto",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 480,
        maxHeight: "calc(100vh - 40px)",
        background: NS.surface,
        border: `1px solid ${NS.rule}`,
        borderTop: `3px solid ${accent}`,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        animation: "ns-pop .35s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 30px 80px rgba(15,27,39,0.18)",
      }}>
        <div style={{ padding: 14, position: "relative", flexShrink: 0, background: NS.paper, borderBottom: `1px solid ${NS.rule}` }}>
          <button onClick={onClose} aria-label="Close" style={{
            position: "absolute", top: 14, right: 14, zIndex: 2,
            background: NS.surface, border: `1px solid ${NS.rule}`,
            color: NS.ink, cursor: "pointer", borderRadius: "50%",
            width: 30, height: 30, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>×</button>
          <div style={{ maxWidth: 280, margin: "0 auto" }}>
            <FormatMock type={format} accent={accent}/>
          </div>
        </div>
        <div style={{ padding: "20px 24px 24px", overflow: "auto", flexShrink: 1 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#FFFFFF",
              padding: "4px 10px", borderRadius: 2,
              background: accent,
            }}>{format}</span>
            {parent && (
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", color: NS.muted,
              }}>{parent}</span>
            )}
            {indLabel && (
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", color: NS.muted,
                marginLeft: "auto",
              }}>{indLabel}</span>
            )}
          </div>
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 28,
            color: NS.ink,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 10,
          }}>{data.title}</h2>
          <p style={{
            color: NS.inkSoft, fontSize: 13.5, lineHeight: 1.6, marginBottom: 14,
            fontFamily: "'DM Sans', sans-serif",
          }}>{data.desc}</p>
          {data.pages && (
            <p style={{
              fontSize: 10, color: NS.muted, marginBottom: 18,
              letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700,
            }}>{data.pages} pages</p>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 2,
              background: NS.blue,
              border: "none",
              color: "#FFFFFF",
              fontWeight: 600, fontSize: 13,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.01em",
            }}>Request this sample</button>
            <button style={{
              padding: "12px 18px",
              borderRadius: 2,
              background: NS.surface,
              border: `1px solid ${NS.rule}`,
              color: NS.ink, fontSize: 13, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
            }}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer CTA ───────────────────────────────────────────────────

function FooterCTA() {
  return (
    <section style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "clamp(48px,7vw,80px) clamp(20px,4vw,44px)",
    }}>
      <div style={{
        background: NS.blue,
        padding: "clamp(36px, 5vw, 56px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 24,
      }}>
        <div style={{ flex: "1 1 360px" }}>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
            textTransform: "uppercase", color: NS.redSoft,
            marginBottom: 14,
          }}>{"\n"}</p>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(30px, 3.4vw, 44px)",
            letterSpacing: "-0.022em",
            color: "#FFFFFF",
            lineHeight: 1.05,
            marginBottom: 12,
          }}>Have a brief in mind?</h3>
          <p style={{
            color: "rgba(255,255,255,0.78)", fontSize: 14, lineHeight: 1.6, maxWidth: 460,
          }}>
            Tell us the industry and format — we'll send the closest fits from our library within a working day.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={{
            padding: "14px 24px",
            borderRadius: 2,
            background: NS.red,
            border: "none",
            color: "#FFFFFF",
            fontWeight: 600, fontSize: 14,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.01em",
          }}>Request samples →</button>
          <button style={{
            padding: "14px 22px",
            borderRadius: 2,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.35)",
            color: "#FFFFFF", fontSize: 14, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
          }}>Talk to a strategist</button>
        </div>
      </div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────

function NetscribesShowcase() {
  const [selected, setSelected] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [modalPayload, setModalPayload] = useState(null);
  const mobile = useMedia("(max-width: 720px)");

  const handleSelect = id => {
    setSelected(prev => prev === id ? null : id);
    setIndustry(null);
    if (selected !== id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const detail = selected && (() => {
    const cat = CAT_BY_ID[selected];
    if (selected === "content")
      return <ContentDetail accent={cat.color} industry={industry} onPreview={setModalPayload} mobile={mobile}/>;
    const formats =
      selected === "design" ? DESIGN_FORMATS :
      selected === "videos" ? VIDEO_FORMATS :
                              SOCIAL_FORMATS;
    return <FormatGrid formats={formats} category={selected} accent={cat.color}
      industry={industry} onPreview={setModalPayload} mobile={mobile}/>;
  })();

  return (
    <div style={{
      minHeight: "100vh",
      background: NS.paper,
      color: NS.ink,
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
    }}>
      <GlobalStyles/>

      <Header onHome={() => { setSelected(null); setIndustry(null); }}/>

      <main>
        {!selected ? (
          <>
            <HeroIntro/>
            <HeroTiles onSelect={handleSelect} mobile={mobile}/>
          </>
        ) : (
          <div style={{
            paddingTop: "clamp(28px, 4vw, 48px)",
            animation: "ns-fade-up 0.4s both",
          }}>
            <CategoryStrip selected={selected} onSelect={handleSelect} mobile={mobile}/>
            <SectionBanner cat={CAT_BY_ID[selected]} mobile={mobile}/>
            <FilterRow
              industry={industry}
              setIndustry={setIndustry}
              accent={CAT_BY_ID[selected].color}
              mobile={mobile}
            />
            <div style={{
              maxWidth: 1160,
              margin: "0 auto",
              padding: "0 clamp(20px,4vw,44px) clamp(36px,5vw,56px)",
            }}>
              {detail}
            </div>
          </div>
        )}
      </main>

      <FooterCTA/>

      <div style={{
        borderTop: `1px solid ${NS.rule}`,
        padding: "28px 24px 36px",
        maxWidth: 1160,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <span style={{
          color: NS.muted, fontSize: 11, letterSpacing: "0.18em",
          textTransform: "uppercase", fontWeight: 600,
        }}>© NETSCRIBES</span>
      </div>

      {modalPayload && (
        <SampleModal payload={modalPayload} onClose={() => setModalPayload(null)}/>
      )}
    </div>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body, #root { margin: 0; padding: 0; background: ${NS.paper}; }
      body {
        font-family: 'DM Sans', system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
        color: ${NS.ink};
      }
      button { font-family: 'DM Sans', system-ui, sans-serif; }
      ::selection { background: ${NS.blue}; color: #fff; }
      @keyframes ns-fade { from { opacity:0 } to { opacity:1 } }
      @keyframes ns-pop { from { opacity:0; transform: translateY(12px) scale(0.97); } to { opacity:1; transform: none } }
      @keyframes ns-fade-up { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: none } }
      @media (max-width: 720px) {
        .ns-nav-tag { display: none }
      }
    `}</style>
  );
}
