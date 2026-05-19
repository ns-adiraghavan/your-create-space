// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import logoSrc from "@/assets/netscribes-logo.png";

export const Route = createFileRoute("/")({
  component: NetscribesShowcase,
});

const LOGO_SRC = logoSrc;

const ACCENTS = {
  content: { color: "#3B6FE0", solid: "#2A5BC8", label: "Content" },
  design:  { color: "#7B3FD4", solid: "#6930C3", label: "Design"  },
  videos:  { color: "#0EA88A", solid: "#0D9478", label: "Videos"  },
  social:  { color: "#D44E8A", solid: "#BF3E7A", label: "Social Media" },
};

const INDUSTRIES = [
  { id: "tech",    label: "Tech & Consulting", sub: "Enterprise · SaaS · IT" },
  { id: "auto",    label: "Automotive",         sub: "OEM · EV · Mobility" },
  { id: "telecom", label: "Telecom",             sub: "5G · ISP · Infrastructure" },
  { id: "bfsi",    label: "BFSI",               sub: "Banking · Fintech · Insurance" },
];

const IND_COLORS = ["#3B6FE0", "#D44E8A", "#0EA88A", "#7B3FD4"];

const SERVICE_DATA = {
  content: [
    { name: "Thought Leadership", tags: ["Whitepaper","POV","TL Blogs","Reports","eBook"] },
    { name: "Short-form Content",  tags: ["Emailer & Newsletters","Brochure","Case Study","Video Script"] },
    { name: "Web Copies",          tags: [] },
    { name: "PPT / Deck",          tags: [] },
  ],
  design: [
    { name: "Infographics",        tags: [] },
    { name: "PPT",                 tags: [] },
    { name: "Event Based Assets",  tags: [] },
    { name: "Landing Page",        tags: [] },
    { name: "Web Banners",         tags: [] },
    { name: "Print Publications",  tags: [] },
    { name: "eBooks",              tags: [] },
    { name: "Report Design",       tags: [] },
  ],
  videos: [
    { name: "Motion Graphics",        tags: ["Character Animation"] },
    { name: "Footage / Image Based",  tags: [] },
    { name: "Reels and Shorts",       tags: [] },
    { name: "Podcast Interviews",     tags: ["Thought Leadership"] },
    { name: "Training Videos",        tags: [] },
    { name: "Whiteboard Animation",   tags: [] },
  ],
  social: [
    { name: "Copywriting",        tags: [] },
    { name: "Static Post Design", tags: [] },
    { name: "GIFs",               tags: [] },
    { name: "Teasers",            tags: [] },
    { name: "Memes",              tags: [] },
    { name: "Carousel",           tags: [] },
    { name: "Corporate Comics",   tags: [] },
  ],
};

const CURATED = {
  tech: {
    content: [
      { title: "The Future of Cloud-Native Architecture", type: "Whitepaper", desc: "12-page enterprise whitepaper on multi-cloud strategy for technology leaders and CIOs." },
      { title: "How Infosys Scaled DevOps 3×",           type: "Case Study", desc: "Client success story with data-driven narrative, pull quotes, and exec summary." },
    ],
    design: [
      { title: "SaaS Security Landscape 2024",  type: "Infographic",   desc: "Visual breakdown of threat vectors, mitigation layers, and CISO-ready framing." },
      { title: "State of AI in Enterprise",     type: "Report Design", desc: "Annual report layout with editorial charts, callouts, and section dividers." },
    ],
    videos: [
      { title: "5G Network Explainer",        type: "Motion Graphics", desc: "60-second animated product explainer with character-driven storytelling." },
      { title: "Cloud Migration Walkthrough", type: "Training Video",  desc: "Internal L&D module, 8 mins, screencast + branded motion titles." },
    ],
    social: [
      { title: "Top 5 AI Trends — LinkedIn", type: "Carousel",     desc: "6-slide carousel with data stats, icons, and brand palette applied throughout." },
      { title: "DevOps Awareness Campaign",  type: "Static Posts",  desc: "4-post series for LinkedIn and Twitter, copy and design included." },
    ],
  },
  auto: {
    content: [
      { title: "EV Adoption: Where is the Market Headed?", type: "TL Blog", desc: "Thought leadership piece for mobility executives at OEMs and fleet operators." },
      { title: "Autonomous Driving Readiness Index",       type: "Report",  desc: "Benchmarking report across 10 markets with executive summary and data viz." },
    ],
    design: [
      { title: "Connected Car Platform Overview", type: "Brochure",    desc: "Product brochure with tech specs, layout hierarchy, and photography direction." },
      { title: "EV Battery Supply Chain",         type: "Infographic", desc: "End-to-end supply chain visualization with annotated process flow." },
    ],
    videos: [
      { title: "Safety Innovation Reel",  type: "Footage-based",   desc: "60-second brand highlight video using on-site footage and motion typography." },
      { title: "How ADAS Works",          type: "Whiteboard Anim", desc: "90-second whiteboard explainer for B2B audiences and conference use." },
    ],
    social: [
      { title: "World EV Day Campaign",  type: "Static Posts", desc: "Branded social set across LinkedIn, Instagram, and Twitter for EV awareness." },
      { title: "Road to Net Zero Reels", type: "Reels",        desc: "3-part vertical video series for Instagram and YouTube Shorts." },
    ],
  },
  telecom: {
    content: [
      { title: "Monetizing 5G: Beyond Connectivity", type: "Whitepaper", desc: "Strategic whitepaper for telecom C-suites on enterprise 5G revenue models." },
      { title: "Rural Connectivity with Jio",        type: "Case Study", desc: "Impact case study with data visualization and community testimonials." },
    ],
    design: [
      { title: "Fiber Broadband Launch",     type: "Landing Page", desc: "Consumer-facing landing page with pricing sections, FAQs, and CTA hierarchy." },
      { title: "Postpaid Upgrade Campaign",  type: "Web Banners",  desc: "Digital banner suite — leaderboard, MREC, and mobile interstitial formats." },
    ],
    videos: [
      { title: "How eSIM Works",            type: "Motion Graphics", desc: "Animated 90-second consumer explainer with voiceover and motion graphics." },
      { title: "Network Reliability Story", type: "Footage-based",   desc: "Brand film using infrastructure footage and customer testimonial format." },
    ],
    social: [
      { title: "Network Speed Campaign", type: "GIFs",     desc: "Animated GIF series optimised for Instagram Stories and Twitter/X." },
      { title: "5G Myth-busting Series", type: "Carousel", desc: "6-slide LinkedIn carousel debunking common 5G misconceptions." },
    ],
  },
  bfsi: {
    content: [
      { title: "Open Banking: Risk or Opportunity?", type: "POV",   desc: "Executive POV piece on regulatory shifts, written for BFSI decision-makers." },
      { title: "Wealth Management for HNIs",         type: "eBook", desc: "16-page gated content asset for lead generation, digital and print ready." },
    ],
    design: [
      { title: "Annual Financial Inclusion Report", type: "Report Design", desc: "Data-rich annual report for an NBFC with editorial charts and layout system." },
      { title: "Fintech Regulatory Timeline India", type: "Infographic",   desc: "Compliance timeline covering SEBI, RBI, and IRDAI milestones." },
    ],
    videos: [
      { title: "KYC Compliance Onboarding",     type: "Training Video", desc: "8-minute internal training module with screencast and motion title cards." },
      { title: "Investing 101 for Millennials",  type: "Reels",         desc: "Short-form vertical series for Instagram and YouTube, 60s per episode." },
    ],
    social: [
      { title: "Mutual Fund Awareness Month", type: "Copywriting",  desc: "30-day social content calendar with post copy and hashtag strategy." },
      { title: "Budget Reactions 2024",       type: "GIFs + Posts", desc: "Reactive content set published within 4 hours of the Union Budget announcement." },
    ],
  },
};

const SVC_BUBBLES = [
  { id: "content", cx: 26, cy: 28, r: 115 },
  { id: "design",  cx: 65, cy: 20, r: 100 },
  { id: "videos",  cx: 18, cy: 66, r:  96 },
  { id: "social",  cx: 63, cy: 66, r: 110 },
];

const IND_BUBBLES = [
  { idx: 0, cx: 26, cy: 28, r: 116 },
  { idx: 1, cx: 65, cy: 20, r: 100 },
  { idx: 2, cx: 18, cy: 66, r:  98 },
  { idx: 3, cx: 63, cy: 66, r: 112 },
];

function useBobble(seed = 0) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const raf = useRef();
  const t0 = useRef(Date.now() - seed * 900);
  useEffect(() => {
    const tick = () => {
      const t = (Date.now() - t0.current) / 1000;
      setPos({ x: Math.sin(t * 0.52 + seed) * 9, y: Math.cos(t * 0.39 + seed) * 11 });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [seed]);
  return pos;
}

function ServiceBubble({ id, cx, cy, r, seed, onClick }) {
  const bob = useBobble(seed);
  const acc = ACCENTS[id];
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "absolute", left: `${cx}%`, top: `${cy}%`,
        width: r * 2, height: r * 2,
        transform: `translate(-50%,-50%) translate(${bob.x}px,${bob.y}px) scale(${hov ? 1.06 : 1})`,
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "pointer", zIndex: 5,
      }}
    >
      <div style={{
        width: "100%", height: "100%", borderRadius: "50%",
        background: hov
          ? `radial-gradient(circle at 40% 38%, ${acc.color}EE, ${acc.solid}CC)`
          : `radial-gradient(circle at 40% 38%, ${acc.color}35, ${acc.color}18 70%)`,
        border: `2px solid ${hov ? acc.color + "EE" : acc.color + "55"}`,
        boxShadow: hov
          ? `0 0 0 6px ${acc.color}22, 0 8px 48px ${acc.color}55`
          : `0 4px 24px ${acc.color}20`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        transition: "all 0.35s ease",
      }}>
        <span style={{
          fontFamily: "'Noto Sans', sans-serif", fontWeight: 700,
          fontSize: r > 105 ? 18 : 15,
          color: hov ? "#FFFFFF" : "#C8D8F0",
          textAlign: "center", padding: "0 20px", lineHeight: 1.3,
        }}>{acc.label}</span>
        <span style={{
          marginTop: 6, fontSize: 11, fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: hov ? "rgba(255,255,255,0.7)" : `${acc.color}99`,
          opacity: hov ? 1 : 0, transition: "opacity 0.25s",
        }}>Explore →</span>
      </div>
    </div>
  );
}

function IndustryBubble({ idx, cx, cy, r, seed, onClick }) {
  const bob = useBobble(seed);
  const ind = INDUSTRIES[idx];
  const color = IND_COLORS[idx];
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "absolute", left: `${cx}%`, top: `${cy}%`,
        width: r * 2, height: r * 2,
        transform: `translate(-50%,-50%) translate(${bob.x}px,${bob.y}px) scale(${hov ? 1.05 : 1})`,
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "pointer", zIndex: 5,
      }}
    >
      <div style={{
        width: "100%", height: "100%", borderRadius: "50%",
        background: hov
          ? `radial-gradient(circle at 40% 38%, ${color}EE, ${color}AA)`
          : `radial-gradient(circle at 40% 38%, ${color}35, ${color}15 70%)`,
        border: `2px solid ${hov ? color + "EE" : color + "50"}`,
        boxShadow: hov
          ? `0 0 0 6px ${color}20, 0 8px 48px ${color}50`
          : `0 4px 24px ${color}18`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 5,
        transition: "all 0.35s ease", padding: "0 18px", textAlign: "center",
      }}>
        <span style={{
          fontFamily: "'Noto Sans', sans-serif", fontWeight: 700,
          fontSize: r > 108 ? 17 : 15,
          color: hov ? "#FFFFFF" : "#C8D8F0", lineHeight: 1.3,
        }}>{ind.label}</span>
        <span style={{
          fontSize: 11, color: hov ? "rgba(255,255,255,0.7)" : "rgba(180,200,230,0.55)", lineHeight: 1.4,
        }}>{ind.sub}</span>
      </div>
    </div>
  );
}

function ServiceTypeCard({ catKey, active, onClick }) {
  const acc = ACCENTS[catKey];
  const subtitles = {
    content: "Whitepapers · Blogs · Case Studies",
    design:  "Infographics · Reports · Banners",
    videos:  "Explainers · Reels · Training",
    social:  "Carousels · Copywriting · GIFs",
  };
  return (
    <div onClick={onClick} style={{
      borderRadius: 16, padding: "28px 24px 24px",
      background: active ? acc.color : `${acc.color}16`,
      border: `1.5px solid ${active ? acc.color : acc.color + "35"}`,
      cursor: "pointer", transition: "all 0.28s ease",
      transform: active ? "translateY(-5px)" : "none",
      boxShadow: active ? `0 14px 44px ${acc.color}45` : "none",
    }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = `${acc.color}26`; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = `${acc.color}16`; }}
    >
      <div style={{
        width: 28, height: 3, borderRadius: 2, marginBottom: 20,
        background: active ? "rgba(255,255,255,0.65)" : acc.color,
      }}/>
      <h3 style={{
        fontFamily: "'Noto Sans', sans-serif", fontWeight: 700,
        fontSize: 17, lineHeight: 1.3,
        color: active ? "#FFFFFF" : "#D0DDF0", marginBottom: 7,
      }}>{acc.label}</h3>
      <p style={{
        fontSize: 12, fontWeight: 400,
        color: active ? "rgba(255,255,255,0.72)" : "rgba(160,185,225,0.55)",
        lineHeight: 1.55,
      }}>{subtitles[catKey]}</p>
    </div>
  );
}

function SampleCard({ item, accent, onPreview }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16, padding: "28px 26px 24px",
        background: `${accent}14`,
        border: `1.5px solid ${hov ? accent + "70" : accent + "28"}`,
        transition: "all 0.22s ease",
        transform: hov ? "translateY(-3px)" : "none",
      }}
    >
      <div style={{ width: 28, height: 3, borderRadius: 2, background: accent, marginBottom: 18 }}/>
      <p style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase", color: accent, marginBottom: 10,
      }}>{item.type}</p>
      <h3 style={{
        fontFamily: "'Noto Sans', sans-serif", fontWeight: 700,
        fontSize: 16, color: "#E0EAF8", lineHeight: 1.45, marginBottom: 10,
      }}>{item.title}</h3>
      <p style={{ fontSize: 13, color: "#7A8FA8", lineHeight: 1.65, marginBottom: 22 }}>{item.desc}</p>
      <button
        onClick={() => onPreview(item, accent)}
        style={{
          padding: "9px 20px", borderRadius: 100,
          border: `1.5px solid ${accent}55`,
          background: "transparent", color: accent,
          fontSize: 13, fontWeight: 600, cursor: "pointer",
          fontFamily: "'Noto Sans', sans-serif", transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `${accent}20`; e.currentTarget.style.borderColor = accent; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = `${accent}55`; }}
      >View sample →</button>
    </div>
  );
}

function SubcategoryCard({ sub, accent, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16, padding: "24px 22px 20px",
        background: hov ? `${accent}18` : `${accent}0C`,
        border: `1.5px solid ${hov ? accent + "55" : accent + "25"}`,
        cursor: "pointer", transition: "all 0.22s ease",
        transform: hov ? "translateY(-3px)" : "none",
      }}
    >
      <div style={{
        width: 24, height: 3, borderRadius: 2, marginBottom: 14,
        background: hov ? accent : `${accent}70`, transition: "background 0.22s",
      }}/>
      <h3 style={{
        fontFamily: "'Noto Sans', sans-serif", fontWeight: 700,
        fontSize: 14, color: "#D0DDF0", lineHeight: 1.4,
        marginBottom: sub.tags.length ? 10 : 0,
      }}>{sub.name}</h3>
      {sub.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {sub.tags.map(t => (
            <span key={t} style={{
              fontSize: 10, padding: "3px 9px", borderRadius: 100,
              background: `${accent}18`, color: accent,
              fontWeight: 500, letterSpacing: "0.04em",
            }}>{t}</span>
          ))}
        </div>
      )}
      <p style={{
        marginTop: 14, fontSize: 12, color: accent, fontWeight: 600,
        opacity: hov ? 1 : 0, transition: "opacity 0.18s",
      }}>View samples →</p>
    </div>
  );
}

function SampleModal({ item, accent, onClose }) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(2,5,12,0.9)", backdropFilter: "blur(14px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 520,
        background: "#0D1525",
        border: `1.5px solid ${accent}50`,
        borderRadius: 22, overflow: "hidden",
        boxShadow: `0 32px 80px rgba(0,0,0,0.8), 0 0 60px ${accent}18`,
      }}>
        <div style={{
          height: 200,
          background: `repeating-linear-gradient(45deg, ${accent}09 0, ${accent}09 1px, transparent 0, transparent 50%)`,
          backgroundSize: "22px 22px",
          borderBottom: `1px solid ${accent}22`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          <div style={{
            padding: "10px 22px", borderRadius: 10,
            background: `${accent}22`, border: `1px solid ${accent}50`,
            fontFamily: "'Noto Sans', sans-serif", fontWeight: 700,
            fontSize: 16, color: "#E8EDF5",
          }}>{item.type}</div>
          <button onClick={onClose} style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(255,255,255,0.07)", border: "none",
            color: "#8A9BB0", cursor: "pointer", borderRadius: "50%",
            width: 30, height: 30, fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>×</button>
        </div>
        <div style={{ padding: "26px 30px 30px" }}>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: accent, marginBottom: 8,
          }}>Sample Preview</p>
          <h2 style={{
            fontFamily: "'Noto Sans', sans-serif", fontWeight: 700,
            fontSize: 19, color: "#E8EDF5", lineHeight: 1.4, marginBottom: 10,
          }}>{item.title}</h2>
          <p style={{ color: "#7A8FA8", fontSize: 14, lineHeight: 1.7, marginBottom: 22 }}>{item.desc}</p>
          <div style={{
            padding: "14px 16px", borderRadius: 10,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 22, color: "#4A5A70",
            fontSize: 13, fontStyle: "italic",
          }}>
            Connect your file storage in Lovable to display live previews and downloads here.
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{
              flex: 1, padding: "12px 0", borderRadius: 100,
              background: accent, border: "none",
              color: "#fff", fontWeight: 700, fontSize: 14,
              cursor: "pointer", fontFamily: "'Noto Sans', sans-serif",
            }}>Request this Sample</button>
            <button style={{
              padding: "12px 18px", borderRadius: 100,
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.12)",
              color: "#8A9BB0", fontSize: 14, cursor: "pointer",
            }}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NetscribesShowcase() {
  const [flow, setFlow]     = useState("service");
  const [selSvc, setSelSvc] = useState(null);
  const [selInd, setSelInd] = useState(null);
  const [selCat, setSelCat] = useState(null);
  const [indFilter, setIndFilter] = useState(null);
  const [modal, setModal]   = useState(null);

  const accent = selSvc ? ACCENTS[selSvc].color
               : selCat ? ACCENTS[selCat].color
               : "#3B6FE0";

  const switchFlow = f => { setFlow(f); setSelSvc(null); setSelInd(null); setSelCat(null); setIndFilter(null); };
  const curatedSamples = selInd && selCat ? (CURATED[selInd]?.[selCat] || []) : [];

  return (
    <div style={{
      minHeight: "100vh", background: "#05080F",
      fontFamily: "'Noto Sans', sans-serif", color: "#E8EDF5",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
        .g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
        .g2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
        @media(max-width:900px){ .g4{grid-template-columns:repeat(2,1fr);} .g3{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:560px){ .g4,.g3,.g2{grid-template-columns:1fr;} }
        .fi { animation: fu .38s ease forwards; }
        @keyframes fu { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:none;} }
        .back { background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); color:#8A9BB0; padding:8px 16px; border-radius:100px; font-size:13px; cursor:pointer; font-family:'Noto Sans',sans-serif; font-weight:600; transition:all .2s; }
        .back:hover { color:#E8EDF5; border-color:rgba(255,255,255,.25); }
        .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent); margin:0 44px; }
      `}</style>

      <div style={{
        position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        background:`radial-gradient(ellipse 55% 45% at 15% 15%, ${accent}0F 0%, transparent 70%)`,
        transition:"background 0.8s",
      }}/>
      <div style={{
        position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        backgroundImage:"radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)",
        backgroundSize:"28px 28px",
      }}/>

      <div style={{ position:"relative", zIndex:1 }}>

        {/* NAV */}
        <header style={{
          padding:"16px 44px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          borderBottom:"1px solid rgba(255,255,255,0.06)",
          backdropFilter:"blur(16px)",
          background:"rgba(5,8,15,0.8)",
          position:"sticky", top:0, zIndex:100,
        }}>
          <button
            onClick={() => { setSelSvc(null); setSelInd(null); setSelCat(null); }}
            style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}
          >
            <img src={LOGO_SRC} alt="Netscribes" style={{ height:26, width:"auto" }}/>
          </button>

          <div style={{
            display:"flex", gap:3, padding:4,
            background:"rgba(255,255,255,0.04)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:100,
          }}>
            {["service","industry"].map(f => (
              <button key={f} onClick={() => switchFlow(f)} style={{
                padding:"8px 20px", borderRadius:100, border:"none",
                fontSize:13, fontWeight:600, cursor:"pointer",
                fontFamily:"'Noto Sans',sans-serif", transition:"all .2s",
                background: flow===f ? "rgba(255,255,255,0.1)" : "transparent",
                color: flow===f ? "#E8EDF5" : "#6A7A90",
              }}>By {f==="service" ? "Service" : "Industry"}</button>
            ))}
          </div>

          <button style={{
            padding:"9px 22px", borderRadius:100,
            background:accent, border:"none",
            color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer",
            fontFamily:"'Noto Sans',sans-serif", transition:"background 0.4s",
          }}>Get Samples →</button>
        </header>

        {/* SERVICE: bubble picker */}
        {flow==="service" && !selSvc && (
          <div className="fi" style={{ padding:"52px 44px 64px", maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:8 }}>
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#3A4A60", marginBottom:14 }}>
                Content Services Showcase
              </p>
              <h1 style={{
                fontFamily:"'Noto Sans',sans-serif", fontWeight:700,
                fontSize:50, letterSpacing:"-0.03em", lineHeight:1.1,
                color:"#E8EDF5", marginBottom:14,
              }}>
                What do you need<br/>
                <span style={{ color:accent, transition:"color .4s" }}>created?</span>
              </h1>
              <p style={{ color:"#6A7A90", fontSize:15, maxWidth:400, margin:"0 auto", lineHeight:1.75, fontWeight:300 }}>
                Select a service category to explore samples across formats and industries.
              </p>
            </div>
            <div style={{ position:"relative", width:"100%", height:460, marginTop:8 }}>
              {SVC_BUBBLES.map((b,i) => (
                <ServiceBubble key={b.id} {...b} seed={i} onClick={() => setSelSvc(b.id)}/>
              ))}
            </div>
          </div>
        )}

        {/* SERVICE: subcategory grid */}
        {flow==="service" && selSvc && (
          <div className="fi" style={{ padding:"44px 44px 72px", maxWidth:1100, margin:"0 auto" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <button className="back" onClick={() => setSelSvc(null)}>← Back</button>
                <div style={{ height:36, width:4, borderRadius:2, background:ACCENTS[selSvc].color }}/>
                <div>
                  <h2 style={{ fontFamily:"'Noto Sans',sans-serif", fontWeight:700, fontSize:24, letterSpacing:"-0.02em", color:"#E8EDF5" }}>
                    {ACCENTS[selSvc].label}
                  </h2>
                  <p style={{ color:"#3A4A60", fontSize:12 }}>{SERVICE_DATA[selSvc].length} formats · filter by industry</p>
                </div>
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {[{id:null, label:"All"}, ...INDUSTRIES].map(ind => (
                  <button key={ind.id || "all"}
                    onClick={() => setIndFilter(ind.id === indFilter ? null : ind.id)}
                    style={{
                      padding:"6px 14px", borderRadius:100, fontSize:12, fontWeight:600,
                      border:`1.5px solid ${indFilter===ind.id ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                      background: indFilter===ind.id ? "rgba(255,255,255,0.08)" : "transparent",
                      color: indFilter===ind.id ? "#E8EDF5" : "#5A6A80",
                      cursor:"pointer", fontFamily:"'Noto Sans',sans-serif", transition:"all .2s",
                    }}
                  >{ind.label}</button>
                ))}
              </div>
            </div>
            {indFilter && (
              <div style={{
                marginBottom:22, padding:"11px 16px",
                background:`${ACCENTS[selSvc].color}0C`,
                border:`1px solid ${ACCENTS[selSvc].color}28`,
                borderRadius:10, fontSize:13, color:"#6A7A90",
              }}>
                Showing <span style={{ color:ACCENTS[selSvc].color, fontWeight:700 }}>{ACCENTS[selSvc].label}</span> samples for{" "}
                <span style={{ color:"#E8EDF5", fontWeight:600 }}>{INDUSTRIES.find(i=>i.id===indFilter)?.label}</span>
              </div>
            )}
            <div className="g3">
              {SERVICE_DATA[selSvc].map((sub,i) => (
                <div key={sub.name} className="fi" style={{ animationDelay:`${i*0.05}s` }}>
                  <SubcategoryCard sub={sub} accent={ACCENTS[selSvc].color}
                    onClick={() => setModal({
                      title:`${sub.name} Sample${indFilter ? " — "+INDUSTRIES.find(x=>x.id===indFilter)?.label : ""}`,
                      type: sub.name,
                      desc:`A sample ${sub.name.toLowerCase()} piece${indFilter ? " for the "+INDUSTRIES.find(x=>x.id===indFilter)?.label+" sector" : " showcasing Netscribes content capabilities"}.`,
                      _accent: ACCENTS[selSvc].color,
                    })}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INDUSTRY: bubble picker */}
        {flow==="industry" && !selInd && (
          <div className="fi" style={{ padding:"52px 44px 64px", maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:8 }}>
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#3A4A60", marginBottom:14 }}>
                Industry Showcase
              </p>
              <h1 style={{
                fontFamily:"'Noto Sans',sans-serif", fontWeight:700,
                fontSize:50, letterSpacing:"-0.03em", lineHeight:1.1,
                color:"#E8EDF5", marginBottom:14,
              }}>
                Which sector are you<br/>
                <span style={{ color:"#7B3FD4" }}>building for?</span>
              </h1>
              <p style={{ color:"#6A7A90", fontSize:15, maxWidth:420, margin:"0 auto", lineHeight:1.75, fontWeight:300 }}>
                Pick an industry for a curated cross-service showcase.
              </p>
            </div>
            <div style={{ position:"relative", width:"100%", height:460, marginTop:8 }}>
              {IND_BUBBLES.map((b,i) => (
                <IndustryBubble key={b.idx} {...b} seed={i}
                  onClick={() => { setSelInd(INDUSTRIES[b.idx].id); setSelCat(null); }}/>
              ))}
            </div>
          </div>
        )}

        {/* INDUSTRY: type card selector + samples */}
        {flow==="industry" && selInd && (
          <div className="fi" style={{ padding:"44px 44px 72px", maxWidth:1100, margin:"0 auto" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:32, flexWrap:"wrap" }}>
              <button className="back" onClick={() => { setSelInd(null); setSelCat(null); }}>← Back</button>
              <div style={{ height:36, width:4, borderRadius:2, background:IND_COLORS[INDUSTRIES.findIndex(i=>i.id===selInd)] }}/>
              <div>
                <h2 style={{ fontFamily:"'Noto Sans',sans-serif", fontWeight:700, fontSize:24, letterSpacing:"-0.02em", color:"#E8EDF5" }}>
                  {INDUSTRIES.find(i=>i.id===selInd)?.label}
                </h2>
                <p style={{ color:"#3A4A60", fontSize:12 }}>Select a content type to see curated samples</p>
              </div>
            </div>

            <div className="g4" style={{ marginBottom: selCat ? 40 : 0 }}>
              {Object.keys(ACCENTS).map((k,i) => (
                <div key={k} className="fi" style={{ animationDelay:`${i*0.07}s` }}>
                  <ServiceTypeCard catKey={k} active={selCat===k} onClick={() => setSelCat(selCat===k ? null : k)}/>
                </div>
              ))}
            </div>

            {selCat && curatedSamples.length > 0 && (
              <div className="fi">
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
                  <div style={{ height:1, flex:1, background:`linear-gradient(90deg, ${ACCENTS[selCat].color}40, transparent)` }}/>
                  <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:ACCENTS[selCat].color }}>
                    {ACCENTS[selCat].label} · {INDUSTRIES.find(i=>i.id===selInd)?.label}
                  </span>
                  <div style={{ height:1, flex:1, background:`linear-gradient(90deg, transparent, ${ACCENTS[selCat].color}40)` }}/>
                </div>
                <div className="g2">
                  {curatedSamples.map((item,i) => (
                    <div key={i} style={{ animationDelay:`${i*0.08}s` }}>
                      <SampleCard item={item} accent={ACCENTS[selCat].color}
                        onPreview={(item,ac) => setModal({ ...item, _accent: ac })}/>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="divider"/>
        <section style={{
          margin:"32px 44px 68px",
          borderRadius:18,
          background:`linear-gradient(135deg, ${accent}0E, rgba(255,255,255,0.015))`,
          border:`1px solid ${accent}25`,
          padding:"38px 46px",
          display:"flex", alignItems:"center",
          justifyContent:"space-between", flexWrap:"wrap", gap:22,
          transition:"border-color .4s, background .4s",
        }}>
          <div>
            <h3 style={{ fontFamily:"'Noto Sans',sans-serif", fontWeight:700, fontSize:21, letterSpacing:"-0.02em", marginBottom:6, color:"#E8EDF5" }}>
              Want samples for your brief?
            </h3>
            <p style={{ color:"#6A7A90", fontSize:14, fontWeight:300 }}>
              Tell us your industry and content type — we will get the right examples to you.
            </p>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button style={{
              padding:"12px 26px", borderRadius:100, background:accent,
              border:"none", color:"#fff", fontWeight:700, fontSize:14,
              cursor:"pointer", fontFamily:"'Noto Sans',sans-serif", transition:"background .4s",
            }}>Request Samples →</button>
            <button style={{
              padding:"12px 20px", borderRadius:100, background:"transparent",
              border:"1.5px solid rgba(255,255,255,0.12)",
              color:"#C8D8F0", fontSize:14, cursor:"pointer",
            }}>Talk to Us</button>
          </div>
        </section>
      </div>

      {modal && <SampleModal item={modal} accent={modal._accent || accent} onClose={() => setModal(null)}/>}
    </div>
  );
}
