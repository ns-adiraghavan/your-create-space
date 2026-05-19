// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import logoSrc from "@/assets/netscribes-logo.png";

export const Route = createFileRoute("/")({
  component: NetscribesShowcase,
});

/* ──────────────────────────────────────────────────────────────────
   Netscribes Showcase — refined microsite
   ────────────────────────────────────────────────────────────────── */

// ─── Data ─────────────────────────────────────────────────────────

const CATS = [
  { id: "content", label: "Content",      color: "#6E94E8", tag: "Editorial",  blurb: "Long & short-form copy" },
  { id: "design",  label: "Design",       color: "#B49AE0", tag: "Visual",     blurb: "Layouts, reports, banners" },
  { id: "videos",  label: "Videos",       color: "#74C5B0", tag: "Motion",     blurb: "Explainers, training, reels" },
  { id: "social",  label: "Social Media", color: "#E69CB8", tag: "Distributed",blurb: "Posts, carousels, campaigns" },
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
    "Case Study":   { title: "How Infosys Scaled DevOps 3×",             industry: "tech",    pages: 4,  desc: "Client success story with data-driven narrative and exec summary." },
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

function useBobble(seed = 0, enabled = true) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const raf = useRef();
  const t0 = useRef(Date.now() - seed * 1200);
  useEffect(() => {
    if (!enabled) { setPos({ x: 0, y: 0 }); return; }
    const tick = () => {
      const t = (Date.now() - t0.current) / 1000;
      setPos({
        x: Math.sin(t * 0.36 + seed) * 6,
        y: Math.cos(t * 0.27 + seed * 1.3) * 7,
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [seed, enabled]);
  return pos;
}

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

function useElementSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    setSize({ w: rect.width, h: rect.height });
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
}

// ─── Format mocks ─────────────────────────────────────────────────

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
            <path d={`M 14 0 L 0 0 0 14`} fill="none" stroke={accent} strokeWidth="0.4" opacity="0.10"/>
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
          background:"rgba(10,13,18,0.78)",
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
        <rect width="72" height="122" fill="#0E1218" stroke={accent} strokeOpacity="0.5" rx="2"/>
        <rect x="6" y="8" width="40" height="3" fill={accent} opacity="0.9"/>
        <rect x="6" y="14" width="30" height="2" fill={accent} opacity="0.5"/>
        <rect x="6" y="24" width="60" height="1" fill="#ECEAE6" opacity="0.5"/>
        <rect x="6" y="28" width="60" height="1" fill="#ECEAE6" opacity="0.4"/>
        <rect x="6" y="32" width="48" height="1" fill="#ECEAE6" opacity="0.4"/>
        <rect x="6" y="40" width="28" height="20" fill={accent} opacity="0.18"/>
        <rect x="38" y="40" width="28" height="20" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="0.5"/>
        {[64,68,72,76,80,84,88,92,96,100,104,108].map(y => (
          <rect key={y} x="6" y={y} width={y%8===0?60:42} height="1" fill="#ECEAE6" opacity="0.35"/>
        ))}
        <rect x="6" y="114" width="14" height="3" fill={accent} opacity="0.7"/>
      </g>
    </FrameBase>
  );
}

function POVMock({ accent }) {
  return (
    <FrameBase accent={accent} label="POV">
      <text x="18" y="34" fill="#ECEAE6" fontFamily="serif" fontSize="14" fontStyle="italic" opacity="0.95">"</text>
      <rect x="18" y="38" width="120" height="3" fill="#ECEAE6" opacity="0.85"/>
      <rect x="18" y="44" width="160" height="3" fill="#ECEAE6" opacity="0.85"/>
      <rect x="18" y="50" width="100" height="3" fill="#ECEAE6" opacity="0.85"/>
      <rect x="18" y="62" width="3" height="22" fill={accent}/>
      <rect x="26" y="64" width="40" height="2" fill={accent} opacity="0.8"/>
      <rect x="26" y="70" width="60" height="1.5" fill="#ECEAE6" opacity="0.4"/>
      <rect x="26" y="74" width="46" height="1.5" fill="#ECEAE6" opacity="0.4"/>
      <rect x="26" y="78" width="56" height="1.5" fill="#ECEAE6" opacity="0.4"/>
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
      <rect x="20" y="28" width="60" height="3" fill="#ECEAE6" opacity="0.9"/>
      <rect x="20" y="34" width="80" height="3" fill="#ECEAE6" opacity="0.9"/>
      <g transform="translate(14 64)">
        {[0,1,2].map(i => (
          <g key={i} transform={`translate(${i*60} 0)`}>
            <text x="0" y="14" fill={accent} fontSize="14" fontWeight="700" fontFamily="sans-serif">{["3×","12M","42%"][i]}</text>
            <rect x="0" y="20" width="40" height="1.5" fill="#ECEAE6" opacity="0.4"/>
            <rect x="0" y="24" width="32" height="1.5" fill="#ECEAE6" opacity="0.4"/>
          </g>
        ))}
      </g>
      <rect x="14" y="104" width="60" height="1.5" fill="#ECEAE6" opacity="0.4"/>
      <rect x="14" y="110" width="80" height="1.5" fill="#ECEAE6" opacity="0.4"/>
      <rect x="14" y="116" width="50" height="1.5" fill="#ECEAE6" opacity="0.4"/>
    </FrameBase>
  );
}

function EbookMock({ accent }) {
  return (
    <FrameBase accent={accent} label="eBook">
      <g transform="translate(54 18)">
        <rect x="2" y="2" width="90" height="115" fill={accent} opacity="0.25" rx="2"/>
        <rect x="0" y="0" width="90" height="115" fill="#0E1218" stroke={accent} strokeOpacity="0.5" rx="2"/>
        <circle cx="20" cy="20" r="6" fill={accent} opacity="0.6"/>
        <rect x="10" y="36" width="60" height="3" fill="#ECEAE6"/>
        <rect x="10" y="42" width="70" height="3" fill="#ECEAE6" opacity="0.85"/>
        <rect x="10" y="48" width="48" height="3" fill="#ECEAE6" opacity="0.85"/>
        <rect x="10" y="68" width="40" height="1.5" fill={accent} opacity="0.7"/>
        <rect x="10" y="72" width="50" height="1" fill="#ECEAE6" opacity="0.4"/>
        <rect x="10" y="100" width="20" height="2" fill={accent}/>
      </g>
    </FrameBase>
  );
}

function EmailMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Emailer">
      <rect x="20" y="14" width="160" height="122" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="2"/>
      <rect x="20" y="14" width="160" height="20" fill={accent} opacity="0.22"/>
      <circle cx="32" cy="24" r="4" fill={accent}/>
      <rect x="42" y="22" width="30" height="2" fill="#ECEAE6" opacity="0.9"/>
      <rect x="42" y="27" width="20" height="1.5" fill="#ECEAE6" opacity="0.5"/>
      <rect x="28" y="42" width="60" height="3" fill="#ECEAE6"/>
      <rect x="28" y="48" width="80" height="2" fill="#ECEAE6" opacity="0.6"/>
      <rect x="28" y="60" width="144" height="32" fill={accent} opacity="0.1" rx="2"/>
      <rect x="36" y="68" width="40" height="2" fill={accent}/>
      <rect x="36" y="74" width="60" height="1.5" fill="#ECEAE6" opacity="0.5"/>
      <rect x="36" y="78" width="48" height="1.5" fill="#ECEAE6" opacity="0.5"/>
      <rect x="28" y="100" width="40" height="10" rx="5" fill={accent}/>
      <text x="48" y="107" fill="#0A0D12" fontSize="5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">READ MORE</text>
    </FrameBase>
  );
}

function BrochureMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Brochure">
      <g transform="translate(20 18)">
        <rect width="50" height="114" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="1"/>
        <rect x="0" y="0" width="50" height="40" fill={accent} opacity="0.3"/>
        <rect x="4" y="60" width="32" height="2" fill="#ECEAE6"/>
        <rect x="4" y="66" width="40" height="1.5" fill="#ECEAE6" opacity="0.5"/>
        <rect x="4" y="70" width="36" height="1.5" fill="#ECEAE6" opacity="0.5"/>
      </g>
      <g transform="translate(74 18)">
        <rect width="50" height="114" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="1"/>
        <rect x="6" y="10" width="20" height="2" fill={accent}/>
        <rect x="6" y="16" width="38" height="1.5" fill="#ECEAE6" opacity="0.5"/>
        <rect x="6" y="20" width="32" height="1.5" fill="#ECEAE6" opacity="0.5"/>
        <rect x="6" y="38" width="38" height="20" fill={accent} opacity="0.18"/>
        <rect x="6" y="64" width="38" height="1.5" fill="#ECEAE6" opacity="0.4"/>
        <rect x="6" y="68" width="30" height="1.5" fill="#ECEAE6" opacity="0.4"/>
      </g>
      <g transform="translate(128 18)">
        <rect width="50" height="114" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="1"/>
        <rect x="6" y="10" width="20" height="2" fill={accent}/>
        <rect x="6" y="16" width="38" height="1.5" fill="#ECEAE6" opacity="0.5"/>
        <rect x="6" y="20" width="28" height="1.5" fill="#ECEAE6" opacity="0.5"/>
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
        <rect width="160" height="120" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="2"/>
        <rect x="8" y="10" width="40" height="2" fill={accent}/>
        <rect x="8" y="16" width="80" height="1.5" fill="#ECEAE6" opacity="0.5"/>
        <rect x="8" y="24" width="20" height="6" rx="1" fill={accent} opacity="0.5"/>
        <rect x="32" y="26" width="80" height="1.5" fill="#ECEAE6" opacity="0.8"/>
        <rect x="32" y="30" width="60" height="1.5" fill="#ECEAE6" opacity="0.5"/>
        <rect x="8" y="42" width="20" height="6" rx="1" fill={accent} opacity="0.5"/>
        <rect x="32" y="44" width="100" height="1.5" fill="#ECEAE6" opacity="0.8"/>
        <rect x="32" y="48" width="80" height="1.5" fill="#ECEAE6" opacity="0.5"/>
        <rect x="32" y="52" width="50" height="1.5" fill="#ECEAE6" opacity="0.5"/>
        <rect x="8" y="64" width="20" height="6" rx="1" fill={accent} opacity="0.5"/>
        <rect x="32" y="66" width="70" height="1.5" fill="#ECEAE6" opacity="0.8"/>
        <rect x="32" y="70" width="100" height="1.5" fill="#ECEAE6" opacity="0.5"/>
        <rect x="8" y="86" width="20" height="6" rx="1" fill={accent} opacity="0.5"/>
        <rect x="32" y="88" width="60" height="1.5" fill="#ECEAE6" opacity="0.8"/>
        <rect x="32" y="92" width="80" height="1.5" fill="#ECEAE6" opacity="0.5"/>
      </g>
    </FrameBase>
  );
}

function WebPageMock({ accent, label = "Web Page" }) {
  return (
    <FrameBase accent={accent} label={label}>
      <rect x="14" y="14" width="172" height="122" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="14" y="14" width="172" height="8" fill={accent} opacity="0.18"/>
      <circle cx="20" cy="18" r="1" fill={accent}/>
      <circle cx="24" cy="18" r="1" fill={accent} opacity="0.6"/>
      <circle cx="28" cy="18" r="1" fill={accent} opacity="0.4"/>
      <rect x="20" y="30" width="80" height="3" fill="#ECEAE6"/>
      <rect x="20" y="36" width="120" height="3" fill="#ECEAE6"/>
      <rect x="20" y="42" width="60" height="3" fill="#ECEAE6"/>
      <rect x="20" y="56" width="60" height="2" fill="#ECEAE6" opacity="0.5"/>
      <rect x="20" y="60" width="80" height="2" fill="#ECEAE6" opacity="0.5"/>
      <rect x="20" y="64" width="44" height="2" fill="#ECEAE6" opacity="0.5"/>
      <rect x="20" y="76" width="24" height="8" rx="4" fill={accent}/>
      <rect x="120" y="30" width="60" height="80" fill={accent} opacity="0.18" rx="2"/>
      <rect x="14" y="116" width="172" height="20" fill={accent} opacity="0.06"/>
    </FrameBase>
  );
}

function PPTMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Deck">
      <rect x="40" y="20" width="120" height="68" fill="#0E1218" stroke={accent} strokeOpacity="0.5" rx="2"/>
      <rect x="48" y="30" width="40" height="3" fill={accent}/>
      <rect x="48" y="38" width="80" height="3" fill="#ECEAE6"/>
      <rect x="48" y="44" width="60" height="3" fill="#ECEAE6"/>
      <rect x="48" y="58" width="40" height="20" fill={accent} opacity="0.18"/>
      <rect x="92" y="58" width="40" height="20" fill="none" stroke={accent} strokeOpacity="0.4"/>
      {[0,1,2].map(i => (
        <rect key={i} x={20 + i*60} y={102} width="50" height="28" fill="#0E1218" stroke={accent} strokeOpacity="0.3" rx="1"/>
      ))}
    </FrameBase>
  );
}

function InfographicMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Infographic">
      <rect x="20" y="14" width="60" height="2" fill={accent}/>
      <rect x="20" y="18" width="40" height="2" fill="#ECEAE6" opacity="0.6"/>
      <circle cx="60" cy="60" r="22" fill="none" stroke={accent} strokeWidth="6" opacity="0.4"/>
      <circle cx="60" cy="60" r="22" fill="none" stroke={accent} strokeWidth="6" strokeDasharray="60 200" transform="rotate(-90 60 60)"/>
      <text x="60" y="64" fill="#ECEAE6" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">42%</text>
      <g transform="translate(100 38)">
        <rect width="6" height="40" fill={accent} opacity="0.4" y="20"/>
        <rect x="10" width="6" height="50" fill={accent} opacity="0.6" y="10"/>
        <rect x="20" width="6" height="32" fill={accent} opacity="0.5" y="28"/>
        <rect x="30" width="6" height="58" fill={accent} y="2"/>
        <rect x="40" width="6" height="44" fill={accent} opacity="0.7" y="16"/>
        <rect x="50" width="6" height="28" fill={accent} opacity="0.4" y="32"/>
      </g>
      <rect x="20" y="118" width="60" height="2" fill="#ECEAE6" opacity="0.4"/>
      <rect x="20" y="124" width="80" height="2" fill="#ECEAE6" opacity="0.4"/>
      <rect x="20" y="130" width="40" height="2" fill="#ECEAE6" opacity="0.4"/>
    </FrameBase>
  );
}

function EventMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Event Asset">
      <rect x="20" y="14" width="160" height="122" fill={accent} opacity="0.1"/>
      <rect x="20" y="14" width="160" height="122" fill="none" stroke={accent} strokeOpacity="0.4"/>
      <text x="100" y="50" fill="#ECEAE6" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily="sans-serif" letterSpacing="2">SUMMIT 2024</text>
      <text x="100" y="78" fill={accent} fontSize="20" fontWeight="700" textAnchor="middle" fontFamily="serif" fontStyle="italic">Tomorrow,</text>
      <text x="100" y="96" fill={accent} fontSize="20" fontWeight="700" textAnchor="middle" fontFamily="serif" fontStyle="italic">today.</text>
      <rect x="80" y="108" width="40" height="2" fill={accent}/>
      <text x="100" y="124" fill="#ECEAE6" opacity="0.6" fontSize="7" textAnchor="middle" fontFamily="sans-serif">28 NOV · MUMBAI</text>
    </FrameBase>
  );
}

function BannerMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Web Banner">
      <g transform="translate(20 28)">
        <rect width="160" height="32" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="2"/>
        <rect x="0" y="0" width="50" height="32" fill={accent} opacity="0.3"/>
        <rect x="58" y="8" width="50" height="3" fill="#ECEAE6"/>
        <rect x="58" y="14" width="70" height="2" fill="#ECEAE6" opacity="0.5"/>
        <rect x="58" y="18" width="40" height="2" fill="#ECEAE6" opacity="0.5"/>
        <rect x="132" y="11" width="22" height="10" rx="5" fill={accent}/>
      </g>
      <g transform="translate(20 70)">
        <rect width="76" height="50" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="2"/>
        <rect x="0" y="0" width="76" height="22" fill={accent} opacity="0.3"/>
        <rect x="6" y="26" width="40" height="2" fill="#ECEAE6"/>
        <rect x="6" y="30" width="60" height="2" fill="#ECEAE6" opacity="0.5"/>
        <rect x="6" y="40" width="20" height="6" rx="3" fill={accent}/>
      </g>
      <g transform="translate(104 70)">
        <rect width="76" height="50" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="2"/>
        <rect x="6" y="6" width="50" height="3" fill={accent}/>
        <rect x="6" y="14" width="64" height="2" fill="#ECEAE6" opacity="0.5"/>
        <rect x="6" y="18" width="50" height="2" fill="#ECEAE6" opacity="0.5"/>
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
        <text x="60" y="22" fill="#F2EFE9" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="serif" letterSpacing="1">REPORT 2024</text>
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
      <rect x="14" y="14" width="172" height="116" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="14" y="14" width="172" height="116" fill={accent} opacity="0.06"/>
      <circle cx="100" cy="72" r="20" fill="rgba(10,13,18,0.8)" stroke={accent} strokeOpacity="0.9"/>
      <polygon points="94,62 94,82 112,72" fill={accent}/>
      <rect x="14" y="118" width="40" height="2" fill={accent}/>
      <rect x="14" y="118" width="172" height="2" fill={accent} opacity="0.18"/>
      <text x="20" y="110" fill="#ECEAE6" opacity="0.5" fontSize="5" fontFamily="sans-serif" letterSpacing="1">00:00 / 01:24</text>
    </FrameBase>
  );
}

function ReelsMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Reels">
      {[0,1,2].map(i => (
        <g key={i} transform={`translate(${50 + i*36} ${24 - i*4})`}>
          <rect width="44" height="80" rx="4" fill="#0E1218" stroke={accent} strokeOpacity={0.4 + i*0.15}/>
          <rect width="44" height="80" rx="4" fill={accent} opacity={0.08 + i*0.04}/>
          <circle cx="22" cy="32" r="6" fill="rgba(10,13,18,0.8)" stroke={accent} strokeOpacity="0.8"/>
          <polygon points={`20,29 20,35 25,32`} fill={accent}/>
          <rect x="6" y="62" width="20" height="1.5" fill="#ECEAE6" opacity="0.7"/>
          <rect x="6" y="66" width="28" height="1.5" fill="#ECEAE6" opacity="0.4"/>
          <rect x="6" y="70" width="14" height="1.5" fill="#ECEAE6" opacity="0.4"/>
        </g>
      ))}
    </FrameBase>
  );
}

function PodcastMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Podcast">
      <circle cx="60" cy="74" r="36" fill="#0E1218" stroke={accent} strokeOpacity="0.4"/>
      <circle cx="60" cy="74" r="28" fill={accent} opacity="0.18"/>
      <circle cx="60" cy="74" r="18" fill={accent} opacity="0.3"/>
      <rect x="56" y="62" width="8" height="20" rx="4" fill={accent}/>
      <path d="M48 80 Q60 92 72 80" stroke={accent} strokeWidth="1.5" fill="none"/>
      <line x1="60" y1="92" x2="60" y2="98" stroke={accent} strokeWidth="1.5"/>
      <rect x="108" y="48" width="70" height="3" fill={accent}/>
      <rect x="108" y="56" width="60" height="2" fill="#ECEAE6" opacity="0.5"/>
      <rect x="108" y="60" width="64" height="2" fill="#ECEAE6" opacity="0.5"/>
      <rect x="108" y="78" width="50" height="1.5" fill="#ECEAE6" opacity="0.4"/>
      <rect x="108" y="82" width="60" height="1.5" fill="#ECEAE6" opacity="0.4"/>
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
      <rect x="14" y="14" width="172" height="100" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="20" y="20" width="120" height="88" fill={accent} opacity="0.1"/>
      <rect x="146" y="20" width="34" height="88" fill={accent} opacity="0.18"/>
      <rect x="150" y="26" width="26" height="2" fill="#ECEAE6"/>
      <rect x="150" y="32" width="20" height="1.5" fill="#ECEAE6" opacity="0.5"/>
      <rect x="150" y="36" width="22" height="1.5" fill="#ECEAE6" opacity="0.5"/>
      <rect x="150" y="48" width="14" height="2" fill={accent}/>
      <rect x="150" y="52" width="26" height="1.5" fill="#ECEAE6" opacity="0.5"/>
      <rect x="150" y="56" width="22" height="1.5" fill="#ECEAE6" opacity="0.5"/>
      <circle cx="80" cy="64" r="14" fill="rgba(10,13,18,0.8)" stroke={accent} strokeOpacity="0.9"/>
      <polygon points="76,58 76,70 88,64" fill={accent}/>
      <rect x="14" y="118" width="172" height="14" fill="#0E1218" stroke={accent} strokeOpacity="0.3" rx="2"/>
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
      <rect x="50" y="14" width="100" height="122" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="50" y="14" width="100" height="100" fill={accent} opacity="0.18"/>
      <text x="100" y="56" fill="#ECEAE6" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1.5">THE FUTURE</text>
      <text x="100" y="72" fill={accent} fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="serif" fontStyle="italic">is now</text>
      <rect x="86" y="80" width="28" height="2" fill={accent}/>
      <text x="100" y="94" fill="#ECEAE6" opacity="0.6" fontSize="5" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1">#netscribes</text>
      <rect x="54" y="118" width="40" height="2" fill="#ECEAE6" opacity="0.7"/>
      <rect x="54" y="124" width="60" height="1.5" fill="#ECEAE6" opacity="0.4"/>
      <rect x="54" y="128" width="50" height="1.5" fill="#ECEAE6" opacity="0.4"/>
    </FrameBase>
  );
}

function GifMock({ accent }) {
  return (
    <FrameBase accent={accent} label="GIF">
      <rect x="50" y="32" width="100" height="76" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="50" y="32" width="100" height="76" fill={accent} opacity="0.1"/>
      {[0,1,2].map(i => (
        <circle key={i} cx={84 + i*16} cy={70} r="5" fill={accent} opacity={0.4 + i*0.2}>
          <animate attributeName="opacity" values={`0.3;1;0.3`} dur="1.2s" begin={`${i*0.2}s`} repeatCount="indefinite"/>
        </circle>
      ))}
      <rect x="56" y="100" width="20" height="3" fill={accent}/>
      <rect x="56" y="116" width="40" height="2" fill="#ECEAE6" opacity="0.5"/>
      <text x="148" y="42" fill={accent} fontSize="6" fontWeight="700" textAnchor="end" fontFamily="sans-serif" letterSpacing="1">GIF</text>
    </FrameBase>
  );
}

function TeaserMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Teaser">
      <rect x="14" y="14" width="172" height="116" fill="#0E1218" rx="3"/>
      <rect x="14" y="14" width="172" height="116" fill={accent} opacity="0.18" rx="3"/>
      <text x="100" y="60" fill="#ECEAE6" fontSize="16" fontWeight="800" textAnchor="middle" fontFamily="serif" fontStyle="italic">Coming</text>
      <text x="100" y="84" fill={accent} fontSize="22" fontWeight="800" textAnchor="middle" fontFamily="serif" fontStyle="italic">Tomorrow.</text>
      <rect x="90" y="96" width="20" height="2" fill={accent}/>
      <text x="100" y="116" fill="#ECEAE6" opacity="0.6" fontSize="6" textAnchor="middle" fontFamily="sans-serif" letterSpacing="2">15 SEC TEASER</text>
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
          <rect width="42" height="72" fill="#0E1218" stroke={accent} strokeOpacity={i===2 ? 0.9 : 0.3} rx="3"/>
          <rect width="42" height="72" fill={accent} opacity={i===2 ? 0.2 : 0.06} rx="3"/>
          {i===2 && <>
            <rect x="6" y="10" width="14" height="2" fill={accent}/>
            <rect x="6" y="16" width="28" height="3" fill="#ECEAE6"/>
            <rect x="6" y="22" width="20" height="3" fill="#ECEAE6"/>
            <rect x="6" y="36" width="30" height="1.5" fill="#ECEAE6" opacity="0.5"/>
            <rect x="6" y="40" width="26" height="1.5" fill="#ECEAE6" opacity="0.5"/>
            <rect x="6" y="44" width="28" height="1.5" fill="#ECEAE6" opacity="0.5"/>
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
      <text x="20" y="36" fill={accent} fontFamily="serif" fontSize="28" fontStyle="italic">"</text>
      <rect x="20" y="48" width="160" height="2" fill="#ECEAE6" opacity="0.9"/>
      <rect x="20" y="56" width="140" height="2" fill="#ECEAE6" opacity="0.9"/>
      <rect x="20" y="64" width="160" height="2" fill="#ECEAE6" opacity="0.9"/>
      <rect x="20" y="72" width="100" height="2" fill="#ECEAE6" opacity="0.9"/>
      <rect x="20" y="92" width="40" height="0.5" fill={accent}/>
      <rect x="20" y="100" width="50" height="2" fill={accent}/>
      <rect x="20" y="106" width="60" height="1.5" fill="#ECEAE6" opacity="0.5"/>
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
            <rect width="76" height="52" fill="#0E1218" stroke={accent} strokeOpacity="0.4" rx="2"/>
            <rect width="76" height="52" fill={accent} opacity="0.08" rx="2"/>
            <circle cx="22" cy="26" r="8" fill="none" stroke="#ECEAE6" opacity="0.7"/>
            <line x1="22" y1="34" x2="22" y2="46" stroke="#ECEAE6" opacity="0.7"/>
            <rect x="40" y="10" width="32" height="14" rx="6" fill="#ECEAE6" opacity="0.85"/>
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

// ─── Bubble Stage ─────────────────────────────────────────────────

function BubbleStage({ selected, onSelect, mobile, focusedContent }) {
  const heroPositions = {
    content: { fx: 0.28, fy: 0.34 },
    design:  { fx: 0.70, fy: 0.26 },
    videos:  { fx: 0.26, fy: 0.72 },
    social:  { fx: 0.72, fy: 0.74 },
  };

  const [ref, size] = useElementSize();
  const heroHeight = mobile ? 440 : 520;
  const focusedHeight = mobile ? 220 : 160;
  const stageHeight = selected ? focusedHeight : heroHeight;

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: stageHeight,
        transition: "height 0.65s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {selected && (
        <div
          key={selected}
          style={{
            position: "absolute",
            inset: 0,
            paddingLeft: mobile ? 0 : 116,
            paddingRight: mobile ? 0 : 170,
            paddingTop: mobile ? 70 : 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: 0,
            animation: "ns-fade .5s .2s forwards",
          }}
        >
          {focusedContent}
        </div>
      )}
      {size.w > 0 && CATS.map((cat, i) => (
        <Bubble
          key={cat.id}
          cat={cat}
          seed={i}
          mobile={mobile}
          mode={!selected ? "hero" : (selected === cat.id ? "anchor" : "switcher")}
          hero={heroPositions[cat.id]}
          switcherIndex={
            selected
              ? CATS.filter(c => c.id !== selected).findIndex(c => c.id === cat.id)
              : 0
          }
          stageW={size.w}
          stageH={stageHeight}
          onClick={() => onSelect(cat.id)}
        />
      ))}
    </div>
  );
}

function Bubble({ cat, seed, mode, hero, switcherIndex, onClick, mobile, stageW, stageH }) {
  const isHero = mode === "hero";
  const isAnchor = mode === "anchor";
  const bob = useBobble(seed, isHero);
  const [hov, setHov] = useState(false);

  let cx, cy, size, labelSize = 18;
  if (isHero) {
    // bubbles 5% bigger
    const r = mobile ? 78 : 109;
    cx = hero.fx * stageW;
    cy = hero.fy * stageH;
    size = r * 2;
    labelSize = mobile ? 14 : 18;
  } else if (isAnchor) {
    const r = mobile ? 32 : 40;
    cx = mobile ? 36 : 54;
    cy = stageH / 2;
    size = r * 2;
  } else {
    const r = mobile ? 14 : 17;
    const gap = mobile ? 8 : 10;
    const fromRight = (switcherIndex + 1) * (r * 2 + gap) - gap;
    cx = stageW - fromRight + r;
    cy = stageH / 2;
    size = r * 2;
  }

  const hoverScale = isHero ? 1.04 : 1.12;
  const showLabel = isHero;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={cat.label}
      title={!isHero ? cat.label : undefined}
      style={{
        position: "absolute",
        left: cx,
        top: cy,
        width: size,
        height: size,
        transform: `translate(-50%,-50%) translate(${bob.x}px,${bob.y}px) scale(${hov ? hoverScale : 1})`,
        transition: "left 0.7s cubic-bezier(0.22,1,0.36,1), top 0.7s cubic-bezier(0.22,1,0.36,1), width 0.7s cubic-bezier(0.22,1,0.36,1), height 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.34,1.4,0.64,1)",
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        zIndex: isAnchor ? 4 : (isHero ? 3 : 2),
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          position: "relative",
          background: isAnchor
            ? `radial-gradient(circle at 38% 32%, ${cat.color}55, ${cat.color}22 70%)`
            : isHero
              ? (hov
                  ? `radial-gradient(circle at 38% 32%, ${cat.color}48, ${cat.color}10 72%)`
                  : `radial-gradient(circle at 38% 32%, ${cat.color}28, ${cat.color}08 70%)`)
              : `radial-gradient(circle at 38% 32%, ${cat.color}40, ${cat.color}12 70%)`,
          border: `1px solid ${cat.color}${isAnchor ? "AA" : (hov ? "AA" : "44")}`,
          boxShadow: isHero
            ? (hov ? `0 18px 60px ${cat.color}30, inset 0 0 0 1px ${cat.color}30` : `0 8px 36px ${cat.color}1A`)
            : isAnchor
              ? `0 6px 24px ${cat.color}28`
              : `0 2px 10px ${cat.color}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: isHero ? "0 24px" : 0,
          transition: "background 0.4s, box-shadow 0.4s, border-color 0.4s",
        }}
      >
        {isHero && (
          <div style={{
            position: "absolute", inset: -8,
            borderRadius: "50%",
            border: `1px dashed ${cat.color}${hov ? "55" : "22"}`,
            transition: "border-color 0.4s",
            pointerEvents: "none",
          }}/>
        )}
        {showLabel && (
          <>
            <span style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: labelSize + 12,
              letterSpacing: "-0.01em",
              color: hov ? "#FFFFFF" : "#ECEAE6",
              lineHeight: 1,
              transition: "color 0.3s",
            }}>{cat.label}</span>
            <span style={{
              marginTop: 8,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: `${cat.color}`,
              opacity: hov ? 1 : 0.7,
            }}>{cat.tag}</span>
            <span style={{
              marginTop: 6,
              fontSize: 11,
              color: "#7A7E88",
              fontWeight: 400,
              maxWidth: 160,
              lineHeight: 1.45,
              opacity: hov ? 0.9 : 0.6,
              transition: "opacity 0.3s",
            }}>{cat.blurb}</span>
          </>
        )}
        {isAnchor && (
          <div style={{
            width: "55%", height: "55%", borderRadius: "50%",
            background: cat.color,
            boxShadow: `0 0 32px ${cat.color}80`,
          }}/>
        )}
      </div>
    </button>
  );
}

// ─── Header ───────────────────────────────────────────────────────

function Header({ onHome, accentColor }) {
  return (
    <header style={{
      padding: "20px clamp(20px, 4vw, 44px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(10,13,18,0.78)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
    }}>
      <button onClick={onHome} style={{
        background: "none", border: "none", cursor: "pointer", padding: 0,
        display: "flex", alignItems: "center", gap: 12,
      }} aria-label="Home">
        <img src={logoSrc} alt="Netscribes" style={{ height: 24, width: "auto" }}/>
      </button>

      <nav style={{
        display: "flex", alignItems: "center", gap: 24,
      }} className="ns-nav-links">
        <span style={{
          fontSize: 12, color: "#7A7E88", letterSpacing: "0.16em",
          textTransform: "uppercase", fontWeight: 500,
        }} className="ns-nav-tag">{"\n"}</span>
      </nav>

      <button style={{
        padding: "9px 18px",
        borderRadius: 100,
        background: accentColor || "#ECEAE6",
        border: "none",
        color: "#0A0D12",
        fontWeight: 600, fontSize: 13,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        transition: "background 0.5s, transform 0.2s",
        letterSpacing: "-0.005em",
      }}>Request Samples →</button>
    </header>
  );
}

// ─── Hero copy block ──────────────────────────────────────────────

function HeroIntro({ accent }) {
  return (
    <div style={{
      textAlign: "center",
      maxWidth: 720,
      margin: "0 auto",
      padding: "0 24px 8px",
    }}>
      <p style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "#5A5E68",
        marginBottom: 22,
      }}>Content · Design · Video · Social</p>
      <h1 style={{
        fontFamily: "'Instrument Serif', serif",
        fontWeight: 400,
        fontSize: "clamp(40px, 6vw, 68px)",
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
        color: "#ECEAE6",
        marginBottom: 22,
        textWrap: "balance",
      }}>
        The work,{" "}
        <em style={{ fontStyle: "italic", color: accent, transition: "color 0.6s" }}>
          across every format.
        </em>
      </h1>
      <p style={{
        color: "#7A7E88",
        fontSize: 15,
        lineHeight: 1.65,
        maxWidth: 460,
        margin: "0 auto",
        fontWeight: 400,
      }}>
        Pick a service — explore real samples by format and by industry.
      </p>
    </div>
  );
}

function FocusedHeader({ cat, mobile }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 6,
      maxWidth: 520,
    }}>
      <p style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
        textTransform: "uppercase", color: cat.color,
      }}>{cat.tag} Samples</p>
      <h2 style={{
        fontFamily: "'Instrument Serif', serif",
        fontWeight: 400,
        fontSize: mobile ? 36 : 48,
        letterSpacing: "-0.02em",
        color: "#ECEAE6",
        lineHeight: 1,
      }}>{cat.label}</h2>
      <p style={{ color: "#7A7E88", fontSize: 14, fontWeight: 400 }}>{cat.blurb}</p>
    </div>
  );
}

function FilterRow({ industry, setIndustry, accent, mobile }) {
  return (
    <div style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "0 clamp(20px,4vw,44px)",
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 24,
      marginTop: mobile ? 16 : 0,
    }}>
      <span style={{
        fontSize: 10, fontWeight: 600, letterSpacing: "0.18em",
        textTransform: "uppercase", color: "#5A5E68",
        marginRight: 4,
      }}>Filter</span>
      {[{ id: null, label: "All industries" }, ...INDUSTRIES].map(ind => {
        const active = industry === ind.id;
        return (
          <button
            key={ind.id || "all"}
            onClick={() => setIndustry(ind.id)}
            style={{
              padding: "6px 14px",
              borderRadius: 100,
              fontSize: 12,
              fontWeight: 500,
              border: `1px solid ${active ? accent + "AA" : "rgba(255,255,255,0.08)"}`,
              background: active ? `${accent}1F` : "transparent",
              color: active ? "#ECEAE6" : "#7A7E88",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.22s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#ECEAE6"; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#7A7E88"; }}
          >{ind.label}</button>
        );
      })}
    </div>
  );
}

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
      borderRadius: 14,
      background: "rgba(255,255,255,0.018)",
      border: `1px solid ${accent}28`,
      padding: "24px 24px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 18,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 3, height: "100%", background: accent,
      }}/>
      <div>
        <p style={{
          fontSize: 10, fontWeight: 600, letterSpacing: "0.18em",
          textTransform: "uppercase", color: `${accent}`, marginBottom: 8,
        }}>{sub.formats.length} formats</p>
        <h3 style={{
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
          fontSize: 26, lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: "#ECEAE6",
        }}>{sub.name}</h3>
      </div>
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 6,
      }}>
        {sub.formats.map(fmt => (
          <button
            key={fmt}
            onClick={() => onPreview({ format: fmt, category: "content", industry, parent: sub.name })}
            style={{
              padding: "7px 14px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.03)",
              border: `1px solid rgba(255,255,255,0.08)`,
              color: "#C2C0BC",
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              transition: "all 0.2s",
              letterSpacing: "-0.005em",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${accent}22`;
              e.currentTarget.style.borderColor = `${accent}90`;
              e.currentTarget.style.color = "#ECEAE6";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "#C2C0BC";
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
        borderRadius: 14,
        background: hov ? `${accent}10` : "rgba(255,255,255,0.018)",
        border: `1px solid ${hov ? accent + "70" : accent + "28"}`,
        padding: "24px 24px 22px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.25s",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 3, height: "100%", background: accent,
      }}/>
      <div>
        <p style={{
          fontSize: 10, fontWeight: 600, letterSpacing: "0.18em",
          textTransform: "uppercase", color: accent, marginBottom: 8,
        }}>Direct sample</p>
        <h3 style={{
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
          fontSize: 26, lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: "#ECEAE6",
        }}>{sub.name}</h3>
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12,
      }}>
        <p style={{ fontSize: 13, color: "#7A7E88", lineHeight: 1.5 }}>
          {sub.id === "web"
            ? "Hero, value props, FAQs — ready to ship."
            : "Investor-ready decks with editorial polish."}
        </p>
        <span style={{
          width: 36, height: 36, borderRadius: "50%",
          background: hov ? accent : `${accent}28`,
          color: hov ? "#0A0D12" : accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, flexShrink: 0,
          transition: "all 0.25s",
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
        borderRadius: 14,
        background: hov ? `${accent}0E` : "rgba(255,255,255,0.018)",
        border: `1px solid ${hov ? accent + "70" : "rgba(255,255,255,0.08)"}`,
        padding: 0,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.22s",
        transform: hov ? "translateY(-2px)" : "none",
      }}
    >
      <div style={{ padding: 10 }}>
        <FormatMock type={format} accent={accent}/>
      </div>
      <div style={{ padding: "4px 16px 18px" }}>
        <h4 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 14, lineHeight: 1.3,
          color: "#ECEAE6",
          letterSpacing: "-0.005em",
        }}>{format}</h4>
        <p style={{
          marginTop: 4,
          fontSize: 11,
          color: hov ? accent : "#7A7E88",
          fontWeight: 500,
          letterSpacing: "0.04em",
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
      background: "rgba(6,8,12,0.85)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
      animation: "ns-fade .25s ease",
      overflow: "auto",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 480,
        maxHeight: "calc(100vh - 40px)",
        background: "#0E1218",
        border: `1px solid ${accent}44`,
        borderRadius: 18,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        animation: "ns-pop .35s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ padding: 12, position: "relative", flexShrink: 0 }}>
          <button onClick={onClose} aria-label="Close" style={{
            position: "absolute", top: 14, right: 14, zIndex: 2,
            background: "rgba(10,13,18,0.7)", border: `1px solid ${accent}44`,
            color: "#ECEAE6", cursor: "pointer", borderRadius: "50%",
            width: 30, height: 30, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)",
          }}>×</button>
          <div style={{ maxWidth: 280, margin: "0 auto", borderRadius: 12, overflow: "hidden" }}>
            <FormatMock type={format} accent={accent}/>
          </div>
        </div>
        <div style={{ padding: "4px 24px 22px", overflow: "auto", flexShrink: 1 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: accent,
              padding: "4px 10px", borderRadius: 100,
              background: `${accent}1A`, border: `1px solid ${accent}38`,
            }}>{format}</span>
            {parent && (
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#7A7E88",
              }}>{parent}</span>
            )}
            {indLabel && (
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#7A7E88",
                marginLeft: "auto",
              }}>{indLabel}</span>
            )}
          </div>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: 24,
            color: "#ECEAE6",
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            marginBottom: 8,
          }}>{data.title}</h2>
          <p style={{ color: "#9A9C9F", fontSize: 13, lineHeight: 1.6, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
            {data.desc}
          </p>
          {data.pages && (
            <p style={{
              fontSize: 10, color: "#5A5E68", marginBottom: 16,
              letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600,
            }}>{data.pages} pages</p>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{
              flex: 1,
              padding: "11px 0",
              borderRadius: 100,
              background: accent,
              border: "none",
              color: "#0A0D12",
              fontWeight: 700, fontSize: 13,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "-0.005em",
            }}>Request this sample</button>
            <button style={{
              padding: "11px 18px",
              borderRadius: 100,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#ECEAE6", fontSize: 13, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer CTA ───────────────────────────────────────────────────

function FooterCTA({ accent }) {
  return (
    <section style={{
      maxWidth: 1160,
      margin: "72px auto 56px",
      padding: "0 clamp(20px, 4vw, 44px)",
    }}>
      <div style={{
        padding: "clamp(28px, 4vw, 48px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 24,
      }}>
        <div style={{ flex: "1 1 360px" }}>
          <p style={{
            fontSize: 10, fontWeight: 600, letterSpacing: "0.22em",
            textTransform: "uppercase", color: accent || "#7A7E88",
            marginBottom: 12,
            transition: "color 0.6s",
          }}>Briefed and ready</p>
          <h3 style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: "clamp(26px, 3vw, 36px)",
            letterSpacing: "-0.02em",
            color: "#ECEAE6",
            lineHeight: 1.1,
            marginBottom: 10,
          }}>Have a brief in mind?</h3>
          <p style={{ color: "#7A7E88", fontSize: 14, lineHeight: 1.6, maxWidth: 460 }}>
            Tell us the industry and format — we’ll send the closest fits from our library within a working day.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={{
            padding: "13px 24px",
            borderRadius: 100,
            background: accent || "#ECEAE6",
            border: "none",
            color: "#0A0D12",
            fontWeight: 600, fontSize: 14,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "background 0.5s",
          }}>Request samples →</button>
          <button style={{
            padding: "13px 22px",
            borderRadius: 100,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ECEAE6", fontSize: 14, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
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

  const accentColor = selected ? CAT_BY_ID[selected].color : "#ECEAE6";

  const handleSelect = id => {
    setSelected(prev => prev === id ? null : id);
    setIndustry(null);
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
      background: "#0A0D12",
      color: "#ECEAE6",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <GlobalStyles/>

      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 60% 40% at 50% 20%, ${accentColor}0E, transparent 70%)`,
        transition: "background 0.8s ease",
      }}/>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}/>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Header onHome={() => { setSelected(null); setIndustry(null); }} accentColor={accentColor}/>

        <main style={{
          padding: selected
            ? "clamp(20px,4vw,40px) 0 clamp(48px,7vw,80px)"
            : "clamp(48px,7vw,84px) 0 clamp(48px,7vw,80px)",
        }}>
          {!selected && <HeroIntro accent={accentColor}/>}

          <div style={{
            maxWidth: 1160,
            margin: !selected ? "32px auto 0" : "0 auto",
            padding: "0 clamp(20px,4vw,44px)",
            position: "relative",
          }}>
            <BubbleStage
              selected={selected}
              onSelect={handleSelect}
              mobile={mobile}
              focusedContent={selected && <FocusedHeader cat={CAT_BY_ID[selected]} mobile={mobile}/>}
            />
          </div>

          {selected && (
            <div style={{ animation: "ns-fade-up 0.5s 0.3s both" }}>
              <FilterRow
                industry={industry}
                setIndustry={setIndustry}
                accent={CAT_BY_ID[selected].color}
                mobile={mobile}
              />
              <div style={{
                maxWidth: 1160,
                margin: "0 auto",
                padding: "0 clamp(20px,4vw,44px)",
              }}>
                {detail}
              </div>
            </div>
          )}
        </main>

        <FooterCTA accent={accentColor}/>

        <div style={{
          textAlign: "center", padding: "32px 24px 48px",
          color: "#3A3E48", fontSize: 11, letterSpacing: "0.16em",
          textTransform: "uppercase", fontWeight: 500,
        }}>
          © NETSCRIBES
        </div>
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
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body, #root { margin: 0; padding: 0; background: #0A0D12; }
      body { font-family: 'DM Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
      button { font-family: 'DM Sans', system-ui, sans-serif; }
      ::selection { background: rgba(180,154,224,0.35); color: #fff; }
      @keyframes ns-fade { from { opacity:0 } to { opacity:1 } }
      @keyframes ns-pop { from { opacity:0; transform: translateY(12px) scale(0.97); } to { opacity:1; transform: none } }
      @keyframes ns-fade-up { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform: none } }
      @media (max-width: 720px) {
        .ns-nav-tag { display: none }
      }
    `}</style>
  );
}
