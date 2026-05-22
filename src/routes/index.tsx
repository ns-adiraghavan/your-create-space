// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import logoSrc from "@/assets/netscribes-logo.png";

const THUMBNAILS: Record<string, Record<string, string>> = {
  content: {
    "Whitepaper": "/thumbnails/content/thought_leadership/Whitepaper.jpg",
    "POV": "/thumbnails/content/thought_leadership/POV.jpg",
    "TL Blog": "/thumbnails/content/thought_leadership/TL_Blog.jpg",
    "eBook": "/thumbnails/content/thought_leadership/ebook.jpg",
    "Case Study": "/thumbnails/content/short-form/Case_Study.jpg",
    "Emailer": "/thumbnails/content/short-form/Emailer.jpg",
    "Video Script": "/thumbnails/content/short-form/Video_Script.jpg",
    "Brochure": "/thumbnails/content/short-form/brochure.jpg",
  },
  gtm: {
    "GTM Studies": "/thumbnails/GTM/GTM.jpg",
  },
  design: {
    "Infographics": "/thumbnails/design/Infographics.jpg",
    "PPT": "/thumbnails/design/PPT.jpg",
    "Report Design": "/thumbnails/design/Report design.jpg",
    "Event Based Assets": "/thumbnails/design/Event based assets.jpg",
    "eBooks": "/thumbnails/design/ebooks.jpg",
    "Print Publications": "/thumbnails/design/Print publications.jpg",
  },
  videos: {
    "Motion Graphics": "/thumbnails/video/Motion graphics.jpg",
    "Motion Graphics with Character Animation": "/thumbnails/video/Motion graphics.jpg",
    "Footage / Image Based": "/thumbnails/video/Footage-Image based.jpg",
    "Reels and Shorts": "/thumbnails/video/Reels and shorts.jpg",
    "Podcast Interviews": "/thumbnails/video/Podcast.jpg",
    "Podcast / Thought Leadership Interviews": "/thumbnails/video/Podcast.jpg",
    "Training Videos": "/thumbnails/video/Training videos.jpg",
    "Whiteboard Animation": "/thumbnails/video/Whiteboard animation.jpg",
  },
  social: {
    "Static Post Design": "/thumbnails/social/Static post.jpg",
    "Carousel": "/thumbnails/social/Carousel.jpg",
    "GIFs": "/thumbnails/social/GIFs.jpg",
    "Teasers": "/thumbnails/social/Teaser.jpg",
    "Memes": "/thumbnails/social/Memes.jpg",
    "Corporate Comics": "/thumbnails/social/Corporate comics.jpg",
  },
};

function getThumbnail(category, format) {
  return THUMBNAILS[category]?.[format];
}

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
  { id: "content", num: "01", label: "Content",         color: NS.blue,     tag: "Editorial",   blurb: "Long & short-form copy" },
  { id: "design",  num: "02", label: "Design",          color: NS.red,      tag: "Visual",      blurb: "Layouts, reports, banners" },
  { id: "videos",  num: "03", label: "Videos",          color: NS.redDeep,  tag: "Motion",      blurb: "Explainers, training, reels" },
  { id: "social",  num: "04", label: "Social Media",    color: NS.blueDeep, tag: "Distributed", blurb: "Posts, carousels, campaigns" },
  { id: "gtm",     num: "05", label: "GTM Frameworks",  color: NS.blueSoft, tag: "Strategy",    blurb: "Go-to-market studies & playbooks" },
];

const CAT_BY_ID = Object.fromEntries(CATS.map(c => [c.id, c]));

const INDUSTRIES = [
  { id: "tech",    label: "Technology & Software" },
  { id: "auto",    label: "Automotive" },
  { id: "telecom", label: "Telecommunication" },
  { id: "bfsi",    label: "BFSI" },
  { id: "mfg",     label: "Manufacturing" },
  { id: "health",  label: "Healthcare" },
  { id: "retail",  label: "Retail & E-commerce" },
];

function driveFile(id) {
  return {
    driveEmbedUrl: `https://drive.google.com/file/d/${id}/preview`,
    driveViewUrl:  `https://drive.google.com/file/d/${id}/view`,
  };
}

const CURATED = {
  content: {
    "Whitepaper": [
      { title: "Augmented Analytics & the Digital Automotive Space", desc: "Thought leadership paper on how augmented analytics is reshaping OEM strategy and the connected-car ecosystem.", industry: "auto", ...driveFile("1fKIm4sSLQWWu2dyL9He0GVrGobBmuWUj") },
      { title: "New Cybersecurity Requirements for Supply Chains", desc: "Deep-dive whitepaper on post-COVID cybersecurity mandates across global supply chain verticals.", industry: "tech", ...driveFile("1FXF1JK7xJyaAUp2aR7kpdjWEhxKfqwkB") },
      { title: "Building Cyber Resilience and Data Integrity into Supply Chains", desc: "Enterprise whitepaper examining third-party breach vectors and frameworks for supply chain cyber resilience.", industry: "mfg", ...driveFile("1TARJXanFpUGcNOFOemRLSe_KOKy7y7fH") },
      { title: "Custodians of Digital Experience: Communications Service Providers", desc: "Whitepaper on how telcos can own the end-to-end digital customer experience in a 5G world.", industry: "telecom", ...driveFile("1kDd-Ad9Rg2CuLJ0DbRyzTO9cuVhiEcU2") },
      { title: "The Quantum Leap in Automotive Simulation", desc: "Whitepaper on how quantum computing is transforming automotive simulation — crash testing, aerodynamics, and EV battery optimisation at scale.", industry: "auto", ...driveFile("1pmW2AT2Uo4LLK_FC_CjCJtts-n0_4w8e") },
      { title: "ESG vs EHS: A Modern Supply Chain Conundrum", desc: "Whitepaper examining the tension between ESG reporting requirements and EHS compliance across global supply chains — frameworks, risks, and reconciliation strategies.", industry: "mfg", ...driveFile("1YbBQqNzudAzitKDZxcrUxXCAgxDr9clp") },
      { title: "Digital Life Insurance: The Blockchain Opportunity", desc: "Whitepaper exploring how blockchain technology is reshaping digital life insurance — smart contracts, fraud reduction, and transparent claims processing.", industry: "bfsi", ...driveFile("1NXky9U-mFMvxL2lik85imBSEHGVFokJn") },
      { title: "Commercial Payer Marketplace: A Strategic Overview", desc: "Whitepaper analysing the commercial health insurance payer landscape — competitive dynamics, member retention, and digital-first service models.", industry: "health", ...driveFile("1G9AS3bBaN782JOD4BKyEwI-kKWpYqdVE") },
      { title: "Women in Supply Chain: Closing the Leadership Gap", desc: "Whitepaper on gender diversity in supply chain leadership — benchmarks, barriers, and best practices for building inclusive procurement and logistics organisations.", industry: "mfg", ...driveFile("19tiDSgMGxnaAI97JHFA3wkJUARxLp-po") },
    ],
    "POV": [
      { title: "Over The Top Services: New Business Models", desc: "Executive POV on OTT's impact on telecom revenue, cord-cutting culture, and emerging commercial models.", industry: "telecom", ...driveFile("1KdrrjLwsAXJ0caKmlZk6BWVHeVjILqxg") },
      { title: "Smart Plants: Transforming Your Plant with Optimal ROI", desc: "POV on the Industry 4.0 journey to smart manufacturing — IIoT, cyber-physical systems, and phased ROI.", industry: "mfg", ...driveFile("1D7OVQhk3Jn9E6cE6Jgi-W_E6Llb2Yxgk") },
      { title: "The Market of One: Involving Customers to Deliver Unique Value", desc: "Manufacturing POV on mass customisation strategies, from engineer-to-order to AI-driven recommendation systems.", industry: "mfg", ...driveFile("1pgiZMxTdSTEdbXQ78cIOfi4F9WrrQMbm") },
      { title: "Shaping Retail of the Future", desc: "POV on how data, experience design, and omnichannel strategies are redefining retail for the next decade.", industry: "retail", ...driveFile("1AMlejZaIGxORHa_7yImz9JmmE1KQy1sc") },
      { title: "Enabling Condition Monitoring at Scale", desc: "POV on deploying IoT-based condition monitoring across industrial assets — reducing unplanned downtime and shifting to predictive maintenance models.", industry: "mfg", ...driveFile("1Tjokdxr4l9g5UcfgbF_BdoezOIkh19al") },
      { title: "Cloud Smart: A Strategic Framework for Enterprise Cloud Adoption", desc: "POV on moving beyond lift-and-shift to cloud-native architecture — governance, FinOps, and value realisation for enterprise IT leaders.", industry: "tech", ...driveFile("1JqbY38OBamxJMPjU3GXUrv_mhKXdtFcE") },
    ],
    "TL Blog": [
      { title: "Towards Green Mobility: How COVID Accelerated EV Adoption", desc: "1,000-word blog on OEM investment case for EVs — incentives, shifting consumer behaviour, and engineering services.", industry: "auto", ...driveFile("1fi50I848zvgZjNgwgPEnC2-Zb-LkTSZ9") },
      { title: "Telecom: OpEx vs CapEx Considerations for FinOps", desc: "Thought leadership blog for telco cloud leaders on governing cloud spend through FinOps and CoE models.", industry: "telecom", ...driveFile("1J18THPkenCv12jJugm4faKGiD3geLq8M") },
      { title: "The IoT Powerhouse: A Game Changer for Retail and CPG", desc: "Blog exploring IoT use cases in retail — smart inventory, supply chain transparency, and the connected store.", industry: "retail", ...driveFile("15crBWTOsoAiVB8YdpreDMORets0hHvN_") },
      { title: "Evolution of Engineering Services and Outsourcing in Europe", desc: "Analysis of pandemic-driven digitalisation reshaping ESP roles and OEM outsourcing in European auto and aerospace.", industry: "auto", ...driveFile("1No-QXoFm-Txma2v2IQM17Ztl32I3uP3l") },
      { title: "Value-First Transformation: Blueprint for P&L Impact", desc: "Sanitised article on aligning ERP transformations to business outcomes from day one.", industry: "tech", ...driveFile("1G9GhIj_lll_j7RQ-t_yNkAKoQU7l2Ry5") },
      { title: "SD-WAN in Public Healthcare: A Connected Future", desc: "Blog on SD-WAN adoption across public health networks — improving clinical connectivity, telemedicine delivery, and network resilience.", industry: "health", ...driveFile("1yxIHpXKC0o6T6fSUYHt7-gbq-t2Y5HKi") },
      { title: "Autonomous Cars and the Consumer Trust Challenge", desc: "Blog exploring consumer attitudes toward self-driving vehicles — safety perceptions, adoption barriers, and OEM communication strategy.", industry: "auto", ...driveFile("16u7Ywi7R7Hkefmrncx5EwM2F4lC7WkW_") },
      { title: "IoT Transforming Retail and CPG Operations", desc: "Blog on IoT-driven transformation in retail and consumer goods — smart shelves, demand sensing, and connected supply chain visibility.", industry: "retail", ...driveFile("1jt1d9RB35ixAyQxz8EWbpDtOcZUuBPP8") },
      { title: "ABC Leveraging Blockchain for Supply Chain Transparency", desc: "Article on blockchain deployment for end-to-end supply chain traceability — provenance verification, smart contracts, and regulatory compliance.", industry: "mfg", ...driveFile("12aEzWzQmSsBCYrZ4oNh4DydJdra13Qt8") },
    ],
    "eBook": [
      { title: "Thought Leadership eBook: The Future of Healthcare", desc: "Full-length designed eBook on digital health, precision medicine, and the next decade of healthcare delivery.", industry: "health", ...driveFile("1wdUpR8X9YZ2Dd4bhL56Veyph8l3evcKj") },
      { title: "Thought Leadership eBook: IoT and Logistics", desc: "eBook exploring IoT-enabled visibility, predictive maintenance, and last-mile optimisation across logistics networks.", industry: "mfg", ...driveFile("1Vvuq80dY3_P0G9yH1fRDtGluQeTVNJeH") },
      { title: "Thought Leadership eBook: Digital Twins", desc: "Comprehensive guide on deploying digital twin technology in manufacturing and smart infrastructure.", industry: "tech", ...driveFile("1mov4NqP0_DC8jOr6JygM5fn8ObkPS_7F") },
      { title: "Thought Leadership E-Book: Intelligent Process Automation", desc: "Strategic eBook on combining RPA, AI, and analytics for end-to-end intelligent automation programs.", industry: "tech", ...driveFile("1KLIRrMmpPgoIyoC2m5f3GCFxT-KoAp0z") },
      { title: "Engineering Innovation at Scale", desc: "eBook exploring how engineering-led companies are scaling innovation — digital engineering, product lifecycle management, and platform-based development.", industry: "mfg", ...driveFile("1p-J_vSqcOCQAJ322rbn6_JY-6emSAPwl") },
      { title: "The Connected Worker: eBook for Manufacturing Leaders", desc: "eBook on connected worker platforms — wearables, AR-assisted maintenance, and digital skills development for the factory floor.", industry: "mfg", ...driveFile("1OYzkQWx6-xlTXkw5_z88_uaQJBNDgpnW") },
      { title: "Elevating Virtual Event Experiences in Life Sciences", desc: "eBook on next-level webinar and virtual event strategies for pharma and life sciences — engagement models, compliance considerations, and HCP outreach.", industry: "health", ...driveFile("1KnWkQ7Z16RSYmHRZkTGK93Z3BoqTSQEx") },
      { title: "Edge Computing: The Next Frontier", desc: "eBook on the business case for edge computing — latency-sensitive applications, industrial IoT deployments, and the convergence of edge and cloud architectures.", industry: "tech", ...driveFile("1Pchu-UbCarVbDnXMSq7IwPDuTT7TyUX7") },
    ],
    "Emailer": [
      { title: "Fintech Email Newsletter: Life Insurance Market Intelligence", desc: "Monthly competitive intelligence newsletter for insurance — premium data, bancassurance rankings, and IRDAI updates.", industry: "bfsi", ...driveFile("1b7S2waOKatMYZPElkgRrc7eSuV1CaSXP") },
      { title: "Banking E-mailer: Sustainability Report Launch", desc: "HTML emailer announcing a bank's annual sustainability report — hero section, data highlights, and CTA.", industry: "bfsi", ...driveFile("1Me5JfZFCXKIdn-Hid_-uwCbZJ5NeCpSr") },
      { title: "Newsletter: 5G Connected Ambulance & Telecom Partnership Updates", desc: "Internal newsletter covering 5G healthcare pilots, NaaS partnerships, and data centre research for a telco.", industry: "telecom", ...driveFile("18yT7QcDTNaLPDC3Q09k5Ux-237H13XDw") },
      { title: "Mailer: Discover Total Supply Chain Visibility", desc: "Demand-gen mailer for a supply chain SaaS — bold hero stat, value proposition, and video CTA.", industry: "mfg", ...driveFile("1sfSJ8ywW4D8ol8tw8tVaeGdwMm4K5Hns") },
      { title: "Newsletter: Workload Automation Quarterly", desc: "Branded newsletter covering workload automation trends, product updates, and industry adoption insights for enterprise IT audiences.", industry: "tech", ...driveFile("1r0EzsXp-OHBDyRbcM7C893Kpnfs9hzC2") },
      { title: "Emailer: Career Insights for Job Seekers", desc: "Multi-design-option emailer presenting career insights and job search strategies — clean layout with strong visual hierarchy.", industry: "tech", ...driveFile("1zvrGAVKbQt4ZuJiTRE6gAAtzaQeRPyZY") },
      { title: "Mailer: Terra's New Age Supply Chain Solution", desc: "Promotional mailer for Terra's next-gen supply chain platform — benefit-forward messaging with bold CTA for logistics and manufacturing audiences.", industry: "mfg", ...driveFile("1lniEkWckjP9WDJH_RUg2S3mJ5EofzeIo") },
      { title: "Newsletter: India Market Intelligence", desc: "Market intelligence newsletter covering business and economic developments across India — structured for investor and analyst audiences.", industry: "bfsi", ...driveFile("1lrpbmhEVVwGlQO8EQrgur1d7K3jsDBPC") },
    ],
    "Case Study": [
      { title: "Terra Helps Scottish Compressed Air Specialist Standardise H&S", desc: "4-page case study on how a compressed air company achieved supply chain compliance and H&S certification.", industry: "mfg", ...driveFile("18mcP0jQts8BWgKbZwJiSUwHD0OHR9L6h") },
      { title: "French Oil & Gas Major Enables Real-Time Business Flow Observability", desc: "Case study on deploying iControl to eliminate manual monitoring gaps and proactively flag pipeline outages.", industry: "mfg", ...driveFile("1B2KCM9XCBvo9GG-IXBhepgHWtyGHPa1A") },
      { title: "Europe's Largest Airport Improves Operational Efficiency with IoT", desc: "Smart bin monitoring, check-in desk occupancy sensing, and water management at a 44M-passenger airport.", industry: "tech", ...driveFile("1agrcgo_D7Bo5FyjMZ7qbwd8eEX0StdP7") },
      { title: "Digital Transformation: Consumer Goods Case Study", desc: "Delivering immersive consumer experiences across 850+ brand touchpoints in 58 locales.", industry: "retail", ...driveFile("1sRxqlFbCSZn2fZtQs36XBTmUrDbhB_zD") },
      { title: "Workday HR-IT Governance: A Case Study", desc: "Case study on implementing Workday for HR-IT governance — streamlining people operations, payroll compliance, and workforce analytics.", industry: "tech", ...driveFile("1xQdr1fSfxl-FCftHy5CRloUxpAscAwJe") },
      { title: "IoT Solutions for Airport Operational Efficiency", desc: "Case study on deploying IoT sensor networks across a major airport — smart bin management, check-in desk occupancy, and utilities monitoring.", industry: "tech", ...driveFile("1Zz1MPUqIcxDK9mLzMnlNwaa58YG3NFWG") },
      { title: "Airport Facility Management Transformation", desc: "Case study on end-to-end facility management transformation at a major international airport — vendor consolidation, SLA governance, and cost optimisation.", industry: "tech", ...driveFile("1iPwlUMWIWU4Pg40Z1yM0V8eJZxlFC7sF") },
      { title: "Adapting KPIs for Organisational Change", desc: "Case study on how a large enterprise redesigned its KPI framework during a major transformation — aligning metrics to new strategic priorities.", industry: "tech", ...driveFile("1a0NEDWlbV2rjvwyAr84ZmLv2wgm8GPam") },
      { title: "Simplifying Performance Management at Scale", desc: "Case study on rolling out a simplified performance management system across a global workforce — adoption strategy and outcomes.", industry: "tech", ...driveFile("1LtUyHvFhWwF3tyd0ibEZez8_8QYd-vJN") },
    ],
    "Video Script": [
      { title: "Video Script: RPA Testimonial — CFO Office", desc: "Fully blocked 60s testimonial script for an RPA deployment in a global technology firm's finance function.", industry: "tech", ...driveFile("1lxr04nr7GJKnj_lJ_wWzP8RhNIcCDNLR") },
      { title: "Video Script: Explainer for Cognitive Process Automation", desc: "Animated explainer script with scene-level visualization directions for a CPA / AI+RPA product.", industry: "tech", ...driveFile("1J6lm-WcCzp4GCKSheO-4j3k2-U9cIXpj") },
      { title: "Video Script & Visualization: Procurement", desc: "Motion-graphic script with detailed visual directions for a supply chain procurement explainer.", industry: "mfg", ...driveFile("1fZ03ybEle3yfzXmY6jByO3Eklrbd7S9T") },
    ],
    "Brochure": [
      { title: "Brochure: IT Services Delivery Center", desc: "Corporate brochure for an IT services delivery centre — capabilities overview, engagement models, and value proposition for enterprise clients.", industry: "tech", ...driveFile("1N-b6nxkdTi4-bPEAGP1VOoQd4HOY4Wg5") },
      { title: "Brochure: Netscribes Intelligence Store — Premium Technology Analysis", desc: "Product brochure for the Netscribes Intelligence Store — positioning, coverage areas, and subscription tiers for technology research buyers.", industry: "tech", ...driveFile("1zgM_qZXSagPFyR4NsZuUWMr9-NjdXrnN") },
      { title: "Brochure: Automotive Engineering Services", desc: "Capabilities brochure for an automotive engineering services provider — ADAS, electrification, and embedded systems service lines.", industry: "auto", ...driveFile("1aB9ZDrNnDgBLivesN4qcBi8wfX3UoWYT") },
      { title: "Brochure: eMobility Twin Architecture", desc: "Technical brochure on a digital twin platform for eMobility — real-time vehicle simulation, battery modelling, and fleet analytics.", industry: "auto", ...driveFile("1up-cZulF6lA27isdnrCZZbXnFe4KbFE7") },
      { title: "Brochure: V2V Solution", desc: "Product brochure for a vehicle-to-vehicle communication solution — safety use cases, connectivity architecture, and OEM integration.", industry: "auto", ...driveFile("1ZmJPM6V87rMIMPPznMSZHA3eYMqixJEi") },
      { title: "Brochure: Convenience Store Analytics", desc: "Solution brochure for a retail analytics platform targeting convenience store operators — footfall, basket size, and planogram optimisation.", industry: "retail", ...driveFile("1ij5BcfwjvCLcDDxj9SwJNFhwdTsN8XMe") },
      { title: "Brochure: Data De-Identification Service", desc: "Service brochure on data de-identification and privacy engineering — compliance with GDPR, HIPAA, and enterprise data governance frameworks.", industry: "health", ...driveFile("1Hu-DqNWYltwJrHrt99r_M-g-pxutNlub") },
      { title: "Brochure: Business Flow Observability Solution", desc: "Product brochure for an iControl-based business flow observability platform — real-time monitoring, anomaly detection, and ops integration.", industry: "mfg", ...driveFile("11hniIUaa9Ahr7I26ehBI8CKBKexLCfAS") },
    ],
  },
  design: {
    "Infographics": [
      { title: "Infographic: Building Next-Gen Enterprise Networks on SD-WAN", desc: "Single-page infographic mapping the architectural benefits of SD-WAN for enterprise telecom decision-makers.", industry: "telecom", ...driveFile("1EtXeb0gxJmHo_ntCPRgFN1-8wU763E9u") },
      { title: "Infographic: Cyber Attack Risk Reduction While Working from Home", desc: "Visually driven infographic on WFH cybersecurity best practices for enterprise IT and tech audiences.", industry: "tech", ...driveFile("1i6j6bkGbcr0DiP-2Mj4Y87Qr3FfWX2wR") },
      { title: "Infographic: Making SME Retailers Future-Ready", desc: "Retail-focused infographic on technology adoption pathways for SME retailers and CPG brands.", industry: "retail", ...driveFile("1r4dRv8NR3sz7ciE12Lh3RG1HbAWIuhL3") },
      { title: "Infographic: How Decision-Makers View KPI Information", desc: "Data-visualisation infographic on how senior leaders consume and act on KPI dashboards — research-backed design for enterprise audiences.", industry: "tech", ...driveFile("1a9EKSJ3OGHKMiOzv99NAyw2A6ch4RGht") },
      { title: "Infographic: KPI Reporting and Decision-Makers", desc: "Companion infographic on KPI reporting cadences and formats preferred by C-suite and operational leaders.", industry: "tech", ...driveFile("1rz2SkLg3fmE9cPfXqSw7KKfV1S8tFQs5") },
      { title: "Infographic: How to Reduce Cyber Attacks During Increased WFH", desc: "Practical cybersecurity infographic for remote-work environments — endpoint protection, phishing awareness, and zero-trust principles.", industry: "tech", ...driveFile("1qOdj1Ihusr6b0y7TDgZ3j2tK6vNWQ_KN") },
      { title: "Infographic: Obliterating Application Security Threats", desc: "Cybersecurity infographic mapping application-layer attack vectors and mitigation strategies for enterprise security teams.", industry: "tech", ...driveFile("1SIMa2Rsg4Sumj0hua6jy-3uLxNh5iIPv") },
      { title: "Infographic: Global Leadership Study", desc: "Visual summary of a global leadership research study — leadership style benchmarks, regional differences, and development priorities.", industry: "tech", ...driveFile("1eg9Wsns9_H-XktJZZryEIEd6n5WKrCH4") },
    ],
    "PPT": [
      { title: "SlideShare: Transforming to an Agile Supply Chain", desc: "Designed slide deck on supply chain agility — frameworks, KPIs, and case illustrations for manufacturing leaders.", industry: "mfg", ...driveFile("1W_MZkboku-S06z65gtOLpsLDmzpaG50n") },
      { title: "SlideShare: Multi-Modal Insurance", desc: "Presentation on multi-modal insurance product design and distribution strategy for BFSI decision-makers.", industry: "bfsi", ...driveFile("1eE4c4XanRb0b4SCmKrbk1jdlCcvsEZDH") },
      { title: "SlideShare: AI Across Industries", desc: "Broad-use thought leadership deck on cross-industry AI applications.", industry: "tech", ...driveFile("1SjDvHFFNFSKjcd7C3QlZrpA3T5PfayNq") },
    ],
    "Report Design": [
      { title: "Survey Summary Report: Enterprise Content and Collaboration in the Cloud", desc: "Research report with designed data visualisation on cloud adoption patterns across enterprise content management.", industry: "tech", ...driveFile("1hkUIVi9f2vWqkW6wj3DqV2-xIqidRNYF") },
      { title: "Survey Summary Report: Supply Chain Analytics", desc: "Benchmarking report on supply chain analytics maturity and technology investment priorities.", industry: "mfg", ...driveFile("1DzgOtgBYFxOWT2s5VOBnT-NVLF9CXfrp") },
      { title: "Report: ConnEurope — Connected Future", desc: "Designed research report on connectivity trends and digital infrastructure development across Continental Europe.", industry: "telecom", ...driveFile("1hJp0NkK7TmaCZ9sq6MKb3-egI9MOEwUd") },
      { title: "Research Report: India PE-VC Funds", desc: "Structured research report on PE/VC fund activity, deals, and sector focus in India.", industry: "bfsi", ...driveFile("1_2bf9IXspRLFymyXkMkVZv21_k9WA5ox") },
      { title: "Report: Hospitality Industry Trends", desc: "Designed research report on post-pandemic hospitality recovery, guest experience innovation, and digital transformation across hotels and resorts.", industry: "retail", ...driveFile("11sr9XbLAX_7s_xkOylqMhGGjctwS0Ldq") },
      { title: "Report: CPG Market Dynamics", desc: "Designed report on consumer packaged goods market trends — private label growth, retail channel shifts, and D2C disruption.", industry: "retail", ...driveFile("1F6gJFYEgMxOXem25oan07DzJj38vsywH") },
      { title: "Survey Summary Report: Procurement Talent", desc: "Research report on procurement talent gaps, skills benchmarking, and workforce development strategies for supply chain leaders.", industry: "mfg", ...driveFile("1lNX_qlatl5tlzP7eN8ABDCNPBCUPmxbO") },
      { title: "Non-Traditional Data Use by Insurers", desc: "Research report on alternative data sources — telematics, social signals, IoT — being adopted by insurers for underwriting and pricing.", industry: "bfsi", ...driveFile("1RvJosTXos1MOVddwe7gmSDcVSYcJNT7d") },
      { title: "Survey Summary Report: Finance Data & Analytics", desc: "Benchmark report on data and analytics maturity in finance functions — tool adoption, talent gaps, and CFO priorities.", industry: "bfsi", ...driveFile("1l62b_71R93kdjHq8X9gEE-RIln3mARkH") },
    ],
    "Web Banners": [
      { title: "Web Banner: Robust Connectivity for Fleet Management", desc: "Digital web banner for a telecom connectivity solution targeting fleet operators — bold headline with clear CTA.", industry: "telecom", ...driveFile("187HBFR9ct1P9HRqAThNk0P-aVdC_7w8h") },
      { title: "Web Banner: Navigating IoT Connectivity Challenges", desc: "Banner for an IoT connectivity platform — industry insight messaging designed for enterprise tech audiences.", industry: "tech", ...driveFile("1fvZ3KkILb0cf-SeoP3OoQLyWRJBtuTdd") },
      { title: "Web Banner: Borderless Global Connectivity for Automobiles", desc: "Automotive connectivity web banner highlighting cross-border network coverage for connected vehicle platforms.", industry: "auto", ...driveFile("1ymv9SOJqgx8O2Z_9eFuP-m8Ye19N8_HM") },
      { title: "Web Banner: Hyperconnected Ecosystem", desc: "Web banner for a telecom/IoT brand promoting a hyperconnected enterprise ecosystem narrative.", industry: "telecom", ...driveFile("1wbcLn1aaK2HgGo_TTGkswi7Gs4lAFlQM") },
      { title: "Web Banner: Emailer Design Options", desc: "Multi-format banner and emailer design set demonstrating layout versatility across digital touchpoints.", industry: "tech", ...driveFile("1Ko5epJ-1hwuXwtBemAyujCmATK3kuhHR") },
    ],
    "Event Based Assets": [
      { title: "Standee: Hi-Tech Industry Event", desc: "Large-format pull-up standee design for a hi-tech trade event — brand identity applied to print at scale.", industry: "tech", ...driveFile("1eNfZ-Ev3nF5-HZSVA2aG6GdiA98sR59Z") },
    ],
    "eBooks": [
      { title: "eBook Design: The Future of Healthcare", desc: "Fully typeset and designed eBook on digital health — precision medicine, connected care, and emerging delivery models.", industry: "health", ...driveFile("1smkXa0orgul64oH-Y_qD5KLd-KGB4Za3") },
      { title: "eBook Design: IoT and Logistics", desc: "Layout-designed eBook on IoT-driven logistics transformation — warehouse automation, visibility, last-mile.", industry: "mfg", ...driveFile("1W7pfbElz4Qgr8dpoSDk1uvTGFWC1Zvvz") },
      { title: "eBook Design: Connecting the Shop Floor to the Top Floor", desc: "eBook bridging operational and executive perspectives on smart manufacturing and real-time data flows.", industry: "mfg", ...driveFile("10mMP5QcENI0izBU-ursNyMU86WmDD49k") },
    ],
    "Print Publications": [
      { title: "Water Pollution Awareness Poster Series", desc: "Multi-page designed poster series — bold environmental editorial design demonstrating print publication capabilities.", industry: "tech", ...driveFile("14XuWA1wZNUskNQwaHFz5_hF1WZc0scbn") },
      { title: "Flyer: Mission Statement", desc: "Single-page corporate flyer — clean editorial layout for print and digital distribution.", industry: "tech", ...driveFile("17daEsLFKwGzeQRmainib5LKaAxQI6iPD") },
    ],
  },
  videos: {
    "Motion Graphics": [
      { title: "Infographic Video: ABC SD-WAN", desc: "90-second animated infographic explainer on SD-WAN architecture and enterprise network benefits.", industry: "telecom", ...driveFile("1l9uZ39A1r32kW0Pf1Xs-yFFJE00WG-KE") },
      { title: "Managing Large Workforce", desc: "Motion graphics video on workforce management platform capabilities — animated data flows and ROI highlights.", industry: "tech", ...driveFile("11CxwH0FbhJ0gf-qcLZkZUv8g8apofEms") },
    ],
    "Footage / Image Based": [
      { title: "Terra OQSURE Brand Video", desc: "Footage and image-based brand video for OQSURE supply chain risk management platform.", industry: "mfg", ...driveFile("1TjpEuHa2c0TRsQon2ouGRUkbIhFmDIp_") },
      { title: "Sports Three Case Study Film", desc: "Case study brand film combining footage, testimonials, and motion graphics.", industry: "mfg", ...driveFile("1SgsXJIWO7SrnZuH2GcwY6_r-RQa9hWIz") },
    ],
    "Reels and Shorts": [
      { title: "Minxie Fashion — Social Post Reel", desc: "Vertical-format social media reel for a fashion brand — product showcase with motion text and branded colour.", industry: "retail", ...driveFile("1Y8g-pIpkEtv8n5fktvJ2xiZxRo3DAEA3") },
      { title: "Minxie Fashion — Product Sample Reel", desc: "Short-form product reel for a fashion brand — close-up styling shots with fluid transitions and platform-native format.", industry: "retail", ...driveFile("1QYJPyb4np2u7hwYLFStLvMndLCp-SPHT") },
    ],
    "Podcast Interviews": [
      { title: "Terra Supply Chain Podcast", desc: "Edited podcast interview on supply chain resilience and contractor management — captioned, with branded title cards.", industry: "mfg", ...driveFile("1toPnFOS2PQz-0Ck6xmLCm0uJjq3mB2YZ") },
    ],
    "Training Videos": [
      { title: "Training Video: Use Cases on Rule 9you", desc: "Internal training video on compliance rule-sets — screencast with motion title cards and structured module breaks.", industry: "bfsi", ...driveFile("17348wZOD4jTpso8YO8u6FBRYNxSlK3zl") },
    ],
    "Whiteboard Animation": [
      { title: "Whiteboard Animation: Mind the Gap", desc: "Whiteboard-style animated video bridging the gap between business expectations and technology delivery.", industry: "tech", ...driveFile("1q-19U7s37sc7B2SIZzNi0llUn_kNdvyt") },
      { title: "Whiteboard Training Video", desc: "Whiteboard animation for internal training — process walkthrough with illustrated scenes and voice-over.", industry: "tech", ...driveFile("1L2g6Mrl0C-UZE1zv10suFQjjVrbhrhMn") },
      { title: "Whiteboard Animation: Interview Promotion", desc: "Promotional whiteboard video driving registrations for an executive interview content series.", industry: "tech", ...driveFile("12d6Wu-_mJHDpAWf5EqZdsd6X3kdEG54C") },
    ],
  },
  social: {
    "Static Post Design": [
      { title: "Social Creative: Future of Digital Insurance", desc: "Static post design for an insurance brand — clean data-driven layout for LinkedIn.", industry: "bfsi", ...driveFile("1nE7QZz-qTENdWW6eWJxx15RhHLPCNktM") },
      { title: "Social Creative: AI Making Sci-Fi a Reality (WEF)", desc: "WEF Davos social static for a tech brand — editorial typography on AI futures for LinkedIn.", industry: "tech", ...driveFile("1k900f3w1unwbEw_FoSF286iXTHRT4Zti") },
      { title: "Social Creative: Internet of Everyone (WEF)", desc: "WEF-themed branded social static — bold statement format with editorial layout for tech brand LinkedIn.", industry: "tech", ...driveFile("1k7n8UW4fD7CuH3CH9vMJGWMSdn1KtSF2") },
      { title: "Social Creative: Insurtech in Indian Insurance (Carousel)", desc: "Carousel-format social design on insurtech disruption in Indian insurance market.", industry: "bfsi", ...driveFile("1hKMk5qRnmHFLmvO5mQ8WJEJ5ITNxc9v_") },
      { title: "Social Creatives: VelocITy Rubrik Campaign", desc: "Multi-post social media creative set for a technology event campaign — bold branded design for LinkedIn and Twitter.", industry: "tech", ...driveFile("1m_F2OzJxPJQRjnA1NxSqTUe2Zrjl4cuX") },
      { title: "Social Creatives: Ready to Fast-Track Your Cloud Journey", desc: "Branded social post series for a cloud services provider — benefit-led messaging with consistent visual identity.", industry: "tech", ...driveFile("1Jm4430TRRdgKXddxXR9peD9Z-8Eo4e5A") },
      { title: "Social Creative: Drive Growth with Enhanced Performance", desc: "Static post design for a B2B tech brand — concise performance messaging with strong visual hierarchy for LinkedIn.", industry: "tech", ...driveFile("1-xurR9_LQ2oM2J7xH5gqJhhqPWXHi60F") },
      { title: "Social Creatives: Swiggy Campaign", desc: "Platform-native social media creative for a Swiggy campaign — bold colour, food-forward imagery, and engagement-led copy.", industry: "retail", ...driveFile("1Q0SfNPljTuYlmMQuozfG4OGE4kt-fCsH") },
    ],
    "GIFs": [
      { title: "GIF: Think Digital Transformation — Award Campaign", desc: "Looping animated GIF for a digital transformation award campaign — kinetic type, social-optimised.", industry: "tech", ...driveFile("1xvJlPDQdga9mIdaYPf0QklBTdYR8zrD0") },
      { title: "GIF: Into a Digital Future — Award Campaign", desc: "Award campaign GIF companion asset — animated logo reveal with motion-graphic data points.", industry: "tech", ...driveFile("1A8wcMznffneAjMmYEIxV0ANNg0U8WK2f") },
      { title: "GIF: Storage Water Heater — Product Features", desc: "Product feature GIF for a retail/manufacturing brand — animated benefit callouts for Instagram Stories.", industry: "retail", ...driveFile("1tLwrGAD1Y_jNdARiaY9W1ue95p3-iScN") },
      { title: "GIF: Voice Recognition Technology", desc: "Animated GIF demonstrating voice recognition capability — clean tech-forward motion design for social and digital channels.", industry: "tech", ...driveFile("1RP1JiK1xX368RKmLfzz5slWomRRwq8N7") },
      { title: "GIF: Autonomous Cars — Social Campaign", desc: "Looping animated social GIF for an automotive brand campaign on autonomous driving — kinetic typography and motion graphics.", industry: "auto", ...driveFile("1e6jKXGpBwUeGMj7j6aXtGnVgo-jE6Wlu") },
      { title: "GIF: Tech Award Campaign", desc: "Branded GIF for a technology award campaign — animated reveal with bold brand identity.", industry: "tech", ...driveFile("1ZRnstcoCXBT3l05WjeWMYU8luYvbp_6i") },
      { title: "GIF: Survey Promotional — Research Panel", desc: "Animated promotional GIF for a market research survey campaign — clear incentive messaging and CTA for panel recruitment.", industry: "tech", ...driveFile("1DtU84M3YcblOr2LWxd2mgxwZ953PxsRY") },
    ],
    "Teasers": [
      { title: "Video Teaser: Perspectives Volume", desc: "15-second social teaser driving views to a thought leadership content series — fast cuts with branded typography.", industry: "tech", ...driveFile("1PaTvYixFwW7u7rH1AaF2mLURYobn0bFN") },
    ],
    "Memes": [
      { title: "Meme Series: Trading — Part 1", desc: "Four-part branded meme series for a BFSI/fintech brand — platform-native humour with on-brand visual treatment.", industry: "bfsi", ...driveFile("11jPMfO7vVdN3OtHLb1P-8CsTJqXe1nNI") },
      { title: "Meme Series: Trading — Part 2", desc: "Four-part branded meme series for a BFSI/fintech brand — platform-native humour with on-brand visual treatment.", industry: "bfsi", ...driveFile("1_A81RWru1KbsmNOxOcHFQVGjrbvkEaRA") },
      { title: "Meme Series: Trading — Part 3", desc: "Four-part branded meme series for a BFSI/fintech brand — platform-native humour with on-brand visual treatment.", industry: "bfsi", ...driveFile("1El0FiSXLGAV_fhAR_6xf6MXzZ4OjHxOF") },
      { title: "Meme Series: Trading — Part 4", desc: "Four-part branded meme series for a BFSI/fintech brand — platform-native humour with on-brand visual treatment.", industry: "bfsi", ...driveFile("19jBuPumxzjS82asIHgWdrGPyA9HtgULI") },
    ],
    "Carousel": [
      { title: "Carousel: Tech Solutions Streamline Collaborations", desc: "5-slide LinkedIn carousel on enterprise tech benefits — each slide pairs a bold stat with a reason-to-believe visual.", industry: "tech", ...driveFile("1IJCyMq4oemXYN8g4rKi9N23o_96geyPN") },
      { title: "Carousel: The Future of Digital Insurance", desc: "Multi-slide BFSI carousel exploring digital insurance trends — visual storytelling format for LinkedIn.", industry: "bfsi", ...driveFile("1Q89pJoLt0eh7WBfJ0J6AflJwHDP0-VwB") },
      { title: "Carousel: Insurtech in Indian Insurance", desc: "Carousel deep-dive into insurtech innovation in the Indian insurance market — data-rich slides with branded visual treatment.", industry: "bfsi", ...driveFile("1CDORRyZg-np05BWrAsFU0l40f5TUvyeU") },
      { title: "Carousel: The Evolution of D2C Insurance", desc: "Carousel tracing the rise of direct-to-consumer insurance models — channel disruption, customer expectations, and digital-first providers.", industry: "bfsi", ...driveFile("1RlWuTcRHA8PARP6TRUTWBkMH0fZ8UP3t") },
    ],
    "Corporate Comics": [
      { title: "Corporate Comic: Worker Safety Solution", desc: "Single-panel branded comic on workplace safety automation — on-brand illustration style for LinkedIn.", industry: "mfg", ...driveFile("1z-m4dJZpouBMxNiUI9ektFBblL203Gp_") },
    ],
  },
  gtm: {
    "GTM Studies": [
      { title: "AI Adoption in Telecom Sector", desc: "Global benchmarking study on AI maturity across telecom operators — primary research across 300 decision-makers and 10 expert IDIs spanning NA, Europe, APAC, and MEA, with GTM and thought leadership recommendations.", industry: "telecom", ...driveFile("1uunITQV7F9LnbYhzo5BkbMVjgXUeRRlo") },
      { title: "Enterprise Connectivity Service Delivery for Indian SMEs", desc: "Competitive benchmarking study mapping end-to-end service delivery processes of five leading enterprise connectivity providers for B2B SME clients across India’s tier-1 cities.", industry: "telecom", ...driveFile("1Ooa0rlcgV0QUWPwlDBsx0DE-XrGXu44B") },
      { title: "ISP Market Landscape Study: Nigeria & DRC", desc: "Market entry study on the ISP landscape in Nigeria and Democratic Republic of Congo — covering ICT value chain, regulatory framework, competitive dynamics, and market opportunities across B2B and consumer segments.", industry: "telecom", ...driveFile("152PAHbSYaOlGH50TfUUpsXzJ5DId4y2o") },
    ],
  },
};

const CONTENT_SUBS = [
  { id: "tl",    name: "Thought Leadership", kind: "parent", formats: ["Whitepaper","POV","TL Blog","eBook"] },
  { id: "short", name: "Short-form",         kind: "parent", formats: ["Emailer","Case Study","Video Script","Brochure"] },
];

const DESIGN_FORMATS = Object.keys(CURATED.design);
const VIDEO_FORMATS  = Object.keys(CURATED.videos);
const SOCIAL_FORMATS = Object.keys(CURATED.social);
const GTM_FORMATS    = ["GTM Studies"];

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

function POVMock({ accent, label = "POV" }) {
  return (
    <FrameBase accent={accent} label={label}>
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
  "TL Blog": (p) => <POVMock {...p} label="TL blog"/>, "TL Blogs": (p) => <POVMock {...p} label="TL blog"/>, "Blog": (p) => <POVMock {...p} label="TL blog"/>,
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

// ─── Lead capture modals ──────────────────────────────────────────

function useLockScroll(onClose) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", h);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", h);
    };
  }, [onClose]);
}

function FormField({ label, type = "text", value, onChange, required, textarea, autoFocus }) {
  const shared = {
    value,
    onChange: e => onChange(e.target.value),
    required,
    autoFocus,
    style: {
      width: "100%",
      padding: "11px 13px",
      fontSize: 14,
      fontFamily: "'DM Sans', sans-serif",
      color: NS.ink,
      background: NS.paper,
      border: `1px solid ${NS.rule}`,
      borderRadius: 2,
      outline: "none",
      transition: "border-color 0.18s, background 0.18s",
      resize: textarea ? "vertical" : "none",
    },
    onFocus: e => { e.currentTarget.style.borderColor = NS.blue; e.currentTarget.style.background = NS.surface; },
    onBlur:  e => { e.currentTarget.style.borderColor = NS.rule; e.currentTarget.style.background = NS.paper; },
  };
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <span style={{
        display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
        textTransform: "uppercase", color: NS.muted, marginBottom: 6,
      }}>{label}{required && " *"}</span>
      {textarea
        ? <textarea {...shared} rows={4}/>
        : <input type={type} {...shared}/>}
    </label>
  );
}

function LeadModal({ title, eyebrow, blurb, fields, submitLabel, accent = NS.blue, onClose, onSubmit }) {
  useLockScroll(onClose);
  const [values, setValues] = useState(() => Object.fromEntries(fields.map(f => [f.name, ""])));
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit?.(values);
    setSubmitted(true);
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1100,
      background: "rgba(15, 27, 39, 0.55)",
      backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, animation: "ns-fade .25s ease", overflow: "auto",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 440,
        background: NS.surface,
        border: `1px solid ${NS.rule}`,
        borderTop: `3px solid ${accent}`,
        animation: "ns-pop .35s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 30px 80px rgba(15,27,39,0.18)",
        position: "relative",
      }}>
        <button onClick={onClose} aria-label="Close" style={{
          position: "absolute", top: 14, right: 14, zIndex: 2,
          background: NS.surface, border: `1px solid ${NS.rule}`,
          color: NS.ink, cursor: "pointer", borderRadius: "50%",
          width: 30, height: 30, fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>×</button>

        <div style={{ padding: "26px 28px 24px" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "14px 0 8px" }}>
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
                textTransform: "uppercase", color: NS.red, marginBottom: 14,
              }}>You're in</p>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: 24, color: NS.ink, lineHeight: 1.15,
                letterSpacing: "-0.02em", marginBottom: 10,
              }}>Thank you, {values.name?.split(" ")[0] || "there"}.</h2>
              <p style={{
                color: NS.inkSoft, fontSize: 13.5, lineHeight: 1.6, marginBottom: 22,
              }}>We'll be in touch shortly with what you asked for.</p>
              <button onClick={onClose} style={{
                padding: "11px 22px", borderRadius: 2, background: accent,
                border: "none", color: "#FFFFFF", fontWeight: 600, fontSize: 13,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.01em",
              }}>Close</button>
            </div>
          ) : (
            <>
              {eyebrow && <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
                textTransform: "uppercase", color: accent, marginBottom: 12,
              }}>{eyebrow}</p>}
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: 24, color: NS.ink, lineHeight: 1.15,
                letterSpacing: "-0.02em", marginBottom: 8,
              }}>{title}</h2>
              {blurb && <p style={{
                color: NS.inkSoft, fontSize: 13.5, lineHeight: 1.6, marginBottom: 20,
              }}>{blurb}</p>}
              <form onSubmit={handleSubmit}>
                {fields.map((f, i) => (
                  <FormField
                    key={f.name}
                    label={f.label}
                    type={f.type}
                    textarea={f.textarea}
                    required={f.required}
                    autoFocus={i === 0}
                    value={values[f.name]}
                    onChange={v => setValues(s => ({ ...s, [f.name]: v }))}
                  />
                ))}
                <button type="submit" style={{
                  width: "100%", padding: "13px 0", borderRadius: 2,
                  background: accent, border: "none", color: "#FFFFFF",
                  fontWeight: 600, fontSize: 14, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.01em",
                  marginTop: 4,
                }}>{submitLabel}</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


function StrategistModal({ onClose }) {
  return (
    <LeadModal
      eyebrow="Talk to a strategist"
      title="Let's scope it together."
      blurb="Share a few details and a strategist will reach out within one working day."
      submitLabel="Send message →"
      accent={NS.red}
      fields={[
        { name: "name",    label: "Full name",     required: true },
        { name: "email",   label: "Work email",    type: "email", required: true },
        { name: "phone",   label: "Phone number",  type: "tel" },
        { name: "message", label: "Message",       textarea: true, required: true },
      ]}
      onClose={onClose}
    />
  );
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
            {"\n"}
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
            A partner for you,{" "}
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
          Pick a service — every tile opens onto real samples, filterable by industry.
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
  const total = CATS.length;
  const cols = mobile ? 1 : 2;
  const lastRowStart = Math.floor((total - 1) / cols) * cols;
  const spanFull = !mobile && (index === total - 1) && (total % cols === 1);
  const isRight = !mobile && (spanFull || index % 2 === 1);
  const isBottom = index >= lastRowStart;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "left",
        gridColumn: spanFull ? "1 / -1" : undefined,
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
        }}>{cat.num} / {String(CATS.length).padStart(2, "0")}</span>
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
          fontWeight: 700,
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
        gridTemplateColumns: mobile ? "repeat(2, 1fr)" : `repeat(${CATS.length}, 1fr)`,
        border: `1px solid ${NS.rule}`,
        background: NS.surface,
      }}>
        {CATS.map((cat, i) => {
          const active = cat.id === selected;
          const isLast = i === CATS.length - 1;
          const mobileCols = 2;
          const mobileLastRowStart = Math.floor((CATS.length - 1) / mobileCols) * mobileCols;
          const isRightEdge = mobile ? (i % 2 === 1 || isLast) : isLast;
          const isBottomEdge = mobile ? (i >= mobileLastRowStart) : true;
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
          fontWeight: 700,
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
  const visibleSubs = CONTENT_SUBS
    .map(sub => {
      const formats = sub.formats.filter(fmt => {
        if (!industry) return true;
        const list = CURATED.content[fmt] || [];
        return list.some(s => s.industry === industry);
      });
      return { ...sub, formats };
    })
    .filter(sub => sub.formats.length > 0);

  const [openId, setOpenId] = useState(visibleSubs[0]?.id ?? null);
  useEffect(() => {
    if (!visibleSubs.find(s => s.id === openId)) {
      setOpenId(visibleSubs[0]?.id ?? null);
    }
  }, [industry]);

  if (visibleSubs.length === 0) {
    const indLabel = INDUSTRIES.find(i => i.id === industry)?.label;
    return (
      <p style={{ textAlign: "center", color: NS.muted, fontSize: 13, padding: "40px 0", fontFamily: "'DM Sans', sans-serif" }}>
        No Content samples for {indLabel} yet.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 14 : 18 }}>
      {visibleSubs.map(sub => (
        <ParentCard
          key={sub.id}
          sub={sub}
          accent={accent}
          industry={industry}
          onPreview={onPreview}
          open={openId === sub.id}
          onToggle={() => setOpenId(prev => prev === sub.id ? null : sub.id)}
          mobile={mobile}
        />
      ))}
    </div>
  );
}

function ParentCard({ sub, accent, industry, onPreview, open, onToggle, mobile }) {
  return (
    <div style={{
      background: NS.surface,
      border: `1px solid ${NS.rule}`,
      borderLeft: `3px solid ${accent}`,
      overflow: "hidden",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          textAlign: "left",
          background: "transparent",
          border: "none",
          padding: mobile ? "22px 22px" : "26px 28px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", color: accent, marginBottom: 8,
          }}>{sub.formats.length} formats</p>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: mobile ? 26 : 30, lineHeight: 1.05,
            letterSpacing: "-0.015em",
            color: NS.ink,
          }}>{sub.name}</h3>
        </div>
        <span style={{
          width: 38, height: 38, borderRadius: "50%",
          background: accent + "14", color: accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0,
          transition: "transform 0.25s",
          transform: open ? "rotate(45deg)" : "none",
        }}>+</span>
      </button>
      {open && (
        <div style={{
          padding: mobile ? "0 16px 20px" : "0 24px 26px",
          borderTop: `1px solid ${NS.ruleSoft}`,
          paddingTop: mobile ? 16 : 22,
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: mobile ? 12 : 16,
          }}>
            {sub.formats.map(fmt => {
              const list = CURATED.content[fmt] || [];
              const disabled = !!industry && !list.some(s => s.industry === industry);
              return (
                <FormatCard
                  key={fmt}
                  format={fmt}
                  category="content"
                  accent={accent}
                  disabled={disabled}
                  onClick={() => !disabled && onPreview({ format: fmt, category: "content", industry, parent: sub.name })}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function FormatGrid({ formats, category, accent, industry, onPreview, mobile }) {
  const visible = industry
    ? formats.filter(fmt => {
        const list = (CURATED[category] && CURATED[category][fmt]) || [];
        return list.some(s => s.industry === industry);
      })
    : formats;

  if (visible.length === 0) {
    const indLabel = INDUSTRIES.find(i => i.id === industry)?.label;
    const catLabel = CAT_BY_ID[category]?.label;
    return (
      <p style={{ textAlign: "center", color: NS.muted, fontSize: 13, padding: "40px 0", fontFamily: "'DM Sans', sans-serif" }}>
        No {catLabel} samples for {indLabel} yet.
      </p>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: mobile ? 12 : 16,
    }}>
      {visible.map(fmt => (
        <FormatCard key={fmt} format={fmt} category={category} accent={accent}
          onClick={() => onPreview({ format: fmt, category, industry })}/>
      ))}
    </div>
  );
}

function FormatCard({ format, category, accent, onClick, disabled }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "left",
        background: NS.surface,
        border: `1px solid ${hov && !disabled ? accent : NS.rule}`,
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.22s, transform 0.22s",
        transform: hov && !disabled ? "translateY(-3px)" : "none",
        boxShadow: hov && !disabled ? `0 14px 32px ${accent}1F` : "0 0 0 transparent",
      }}
    >
      <div style={{ padding: 10, background: NS.paper, borderBottom: `1px solid ${NS.ruleSoft}` }}>
        {getThumbnail(category, format) ? (
          <div style={{
            position: "relative", width: "100%", aspectRatio: "4/3",
            borderRadius: 14, overflow: "hidden",
            border: `1px solid ${accent}24`,
          }}>
            <img src={getThumbnail(category, format)} alt={format}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
            <div style={{
              position: "absolute", left: 10, bottom: 10,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 9, fontWeight: 600, letterSpacing: "0.14em",
              textTransform: "uppercase", color: accent,
              padding: "3px 8px", borderRadius: 100,
              background: "rgba(255,255,255,0.92)",
              border: `1px solid ${accent}40`,
              backdropFilter: "blur(8px)",
            }}>{format === "TL Blog" ? "Blogs" : format}</div>
          </div>
        ) : (
          <FormatMock type={format} accent={accent}/>
        )}
      </div>
      <div style={{ padding: "14px 16px 18px" }}>
        <h4 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 14, lineHeight: 1.3,
          color: NS.ink,
          letterSpacing: "-0.005em",
        }}>{format === "TL Blog" ? "Blogs" : format}</h4>
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

// ─── Sample Picker + Viewer ───────────────────────────────────────

function useEscClose(onClose) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", h);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", h);
    };
  }, [onClose]);
}

function SamplePicker({ payload, onClose, onPick }) {
  const { format, category, industry, parent } = payload;
  const accent = CAT_BY_ID[category].color;
  const samples = (CURATED[category] && CURATED[category][format]) || [];
  useEscClose(onClose);

  const ordered = industry
    ? [...samples].sort((a, b) => {
        const am = a.industry === industry ? 0 : 1;
        const bm = b.industry === industry ? 0 : 1;
        return am - bm;
      })
    : samples;

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
        width: "100%", maxWidth: 640,
        maxHeight: "calc(100vh - 40px)",
        background: NS.surface,
        border: `1px solid ${NS.rule}`,
        borderTop: `3px solid ${accent}`,
        display: "flex", flexDirection: "column",
        animation: "ns-pop .35s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 30px 80px rgba(15,27,39,0.18)",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px", borderBottom: `1px solid ${NS.ruleSoft}`,
          gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
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
          </div>
          <button onClick={onClose} aria-label="Close" style={{
            background: NS.surface, border: `1px solid ${NS.rule}`,
            color: NS.ink, cursor: "pointer", borderRadius: "50%",
            width: 30, height: 30, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>×</button>
        </div>
        <div style={{ padding: "16px 24px 8px" }}>
          <p style={{ color: NS.inkSoft, fontSize: 13 }}>
            {ordered.length} samples — pick one to preview
          </p>
        </div>
        <div style={{ padding: "8px 16px 20px", overflow: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {ordered.map((s, i) => {
            const matches = !industry || s.industry === industry;
            const indLabel = INDUSTRIES.find(x => x.id === s.industry)?.label;
            return (
              <button
                key={i}
                onClick={() => onPick(s)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 14, textAlign: "left",
                  background: NS.surface,
                  border: `1px solid ${NS.rule}`,
                  padding: "14px 16px",
                  cursor: "pointer",
                  opacity: matches ? 1 : 0.5,
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "border-color 0.18s, transform 0.18s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = NS.rule; }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: NS.muted, marginBottom: 6,
                  }}>{indLabel || s.industry}</p>
                  <p style={{
                    fontSize: 15, fontWeight: 500, color: NS.ink, lineHeight: 1.35,
                    letterSpacing: "-0.005em",
                  }}>{s.title}</p>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: accent,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  flexShrink: 0,
                }}>Preview →</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SampleViewer({ payload, onClose, onBack }) {
  const { sample, format, category, parent } = payload;
  const accent = CAT_BY_ID[category].color;
  const indLabel = INDUSTRIES.find(i => i.id === sample.industry)?.label;
  const mobile = useMedia("(max-width: 720px)");
  useEscClose(onClose);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(15, 27, 39, 0.55)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: mobile ? 12 : 20,
      animation: "ns-fade .25s ease",
      overflow: "auto",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 960,
        height: mobile ? "auto" : "86vh",
        maxHeight: "calc(100vh - 40px)",
        background: NS.surface,
        border: `1px solid ${NS.rule}`,
        borderTop: `3px solid ${accent}`,
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        animation: "ns-pop .35s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 30px 80px rgba(15,27,39,0.18)",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          flex: mobile ? "none" : 1,
          width: mobile ? "100%" : "auto",
          height: mobile ? "55vw" : "auto",
          background: NS.paperDeep,
          position: "relative",
          overflow: "hidden",
        }}>
          {sample.driveEmbedUrl ? (
            <iframe
              src={sample.driveEmbedUrl}
              title={sample.title}
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              allow="autoplay"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 24,
            }}>
              <FormatMock type={format} accent={accent}/>
            </div>
          )}
        </div>
        <div style={{
          width: mobile ? "100%" : 280,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          padding: "28px 24px",
          background: NS.surface,
          borderLeft: mobile ? "none" : `1px solid ${NS.rule}`,
          borderTop: mobile ? `1px solid ${NS.rule}` : "none",
          position: "relative",
        }}>
          <button onClick={onClose} aria-label="Close" style={{
            position: "absolute", top: 14, right: 14, zIndex: 2,
            background: NS.surface, border: `1px solid ${NS.rule}`,
            color: NS.ink, cursor: "pointer", borderRadius: "50%",
            width: 30, height: 30, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>×</button>
          <div>
            <span style={{
              display: "inline-block",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#FFFFFF",
              padding: "4px 10px", borderRadius: 2,
              background: accent,
            }}>{format}</span>
            {indLabel && (
              <p style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", color: NS.muted, marginTop: 8,
              }}>{indLabel}</p>
            )}
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 22, lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: NS.ink,
              marginTop: 16,
            }}>{sample.title}</h2>
            <p style={{
              fontSize: 13, color: NS.inkSoft, lineHeight: 1.6, marginTop: 10,
            }}>{sample.desc}</p>
            {parent && (
              <p style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", color: NS.muted, marginTop: 12,
              }}>{parent}</p>
            )}
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            {sample.driveViewUrl && (
              <a
                href={sample.driveViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "12px 0",
                  borderRadius: 2,
                  background: NS.blue,
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: 13,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                }}
              >
                Open in Drive ↗
              </a>
            )}
            {onBack && (
              <button onClick={onBack} style={{
                background: "transparent", border: "none",
                color: NS.muted, fontSize: 12, cursor: "pointer",
                padding: "4px 0", textAlign: "center",
                fontFamily: "'DM Sans', sans-serif",
              }}>← Back to all samples</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer CTA ───────────────────────────────────────────────────

function FooterCTA({ onTalkStrategist }) {
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
          <button
            onClick={onTalkStrategist}
            style={{
            padding: "14px 24px",
            borderRadius: 2,
            background: NS.red,
            border: "none",
            color: "#FFFFFF", fontSize: 14, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.01em",
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
  const [pickerPayload, setPickerPayload] = useState(null);
  const [viewerPayload, setViewerPayload] = useState(null);

  const handlePreview = (payload) => {
    const { format, category } = payload;
    const samples = (CURATED[category] && CURATED[category][format]) || [];
    if (samples.length === 1) {
      setViewerPayload({ ...payload, sample: samples[0] });
    } else if (samples.length > 1) {
      setPickerPayload(payload);
    } else {
      setViewerPayload({
        ...payload,
        sample: { title: `${format} Sample`, desc: `Sample ${format} piece showcasing Netscribes capabilities.` },
      });
    }
  };
  const [strategistOpen, setStrategistOpen] = useState(false);
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
      return <ContentDetail accent={cat.color} industry={industry} onPreview={handlePreview} mobile={mobile}/>;
    const formats =
      selected === "design" ? DESIGN_FORMATS :
      selected === "videos" ? VIDEO_FORMATS :
      selected === "gtm"    ? GTM_FORMATS :
                              SOCIAL_FORMATS;
    return <FormatGrid formats={formats} category={selected} accent={cat.color}
      industry={industry} onPreview={handlePreview} mobile={mobile}/>;
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

      <Header
        onHome={() => { setSelected(null); setIndustry(null); }}
      />

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

      <FooterCTA
        onTalkStrategist={() => setStrategistOpen(true)}
      />

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
        <span 
          className="text-zinc-950"
          style={{
            color: NS.muted, fontSize: 11, letterSpacing: "0.18em",
            textTransform: "uppercase", fontWeight: 600,
          }}>{"\n"}</span>
      </div>

      {pickerPayload && !viewerPayload && (
        <SamplePicker
          payload={pickerPayload}
          onClose={() => setPickerPayload(null)}
          onPick={(sample) => setViewerPayload({ ...pickerPayload, sample })}
        />
      )}

      {viewerPayload && (
        <SampleViewer
          payload={viewerPayload}
          onClose={() => { setViewerPayload(null); setPickerPayload(null); }}
          onBack={(() => {
            const { format, category } = viewerPayload;
            const list = (CURATED[category] && CURATED[category][format]) || [];
            return list.length > 1 ? () => setViewerPayload(null) : null;
          })()}
        />
      )}

      {strategistOpen && (
        <StrategistModal onClose={() => setStrategistOpen(false)}/>
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
