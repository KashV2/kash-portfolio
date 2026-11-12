/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — edit everything on the site from here.
 * ─────────────────────────────────────────────────────────────
 *  Sources: master résumé (primary), LinkedIn project entries,
 *  Shredshox research summary + methods doc, Data Mine posters.
 *  Nothing here is invented — if you add something, keep it that way.
 */

export const profile = {
  name: "Kash Vallur",
  fullName: "Kashyap Vallur",
  headline: "Data Science @ Purdue · Data · ML · Full-Stack",
  // One-sentence value proposition shown in the hero.
  pitch:
    "I take messy, unstructured data and turn it into clean databases, automated pipelines, and analysis that surfaces the patterns hiding inside. I build systems that solve real business problems, backed by hands-on full-stack software engineering experience.",
  location: "West Lafayette, IN · open to remote",
  status: "Seeking Data Science, SWE, Data Engineering & ML roles",
  // Public contact info only. Do NOT add phone numbers or street addresses.
  email: "kasipanther@outlook.com",
  links: {
    github: "https://github.com/KashV2",
    linkedin: "https://www.linkedin.com/in/kashyap-vallur-563332238/",
  },
  headshot: { src: "media/headshot.webp", w: 400, h: 400, alt: "Portrait of Kash Vallur smiling, wearing a white collared shirt" },
  // File lives in /public. Set to null to hide the download button.
  resumeFile: "Kash_Vallur_Resume.pdf" as string | null,
};

/** Small, documented numbers for the hero readout strip. */
export const highlights = [
  { value: "40–60%", label: "fewer tokens per LLM request", source: "LoftxAI" },
  { value: "150", label: "remote contractors on role-based access", source: "Revaya" },
  { value: "97.2%", label: "PDF-extraction accuracy, best of 4 tools benchmarked", source: "Corteva × Data Mine" },
  { value: "1st", label: "Best Boiler Build track, Anthropic hackathon", source: "Boiler Buddy" },
];

export const about = {
  story: [
    "I'm a Data Science student at Purdue (Computer Science track, class of 2028). Most of what I build sits where statistics meets shipping software: a model is only done when someone else can rely on its output.",
    "Over the past year that has meant designing an event-detection pipeline for ski-sensor research, redesigning an AI startup's query flow so it called LLMs only when it needed to, and building the permissions, SSO, and automation layer for a 150-person remote workforce.",
    "I like problems where the data is messy and the answer has to make sense to someone who isn't me — a researcher, an HR manager, a sales team, or a student looking for help.",
  ],
  strengths: [
    {
      title: "Statistical modeling I can defend",
      body: "Mixture models, information criteria, clustering, regression — chosen by benchmarking alternatives and validated against ground truth.",
    },
    {
      title: "LLM systems with contracts",
      body: "Routing, schema-constrained JSON output, and hybrid RAG, so AI features are cheaper, faster, and predictable downstream.",
    },
    {
      title: "Stakeholder → schema",
      body: "Turning HR, sales, and research requirements into data models, workflows, and a project scope a team can build against.",
    },
  ],
};

/* ───────────── MEDIA ─────────────
 * All images live in /public/media (extracted from your decks, posters and methods doc).
 * w/h are the real pixel sizes — they reserve space so nothing jumps while loading.
 */
export interface MediaImage {
  src: string; // path inside /public, e.g. "media/shred-hampel.webp"
  alt: string; // what the image shows, for screen readers
  caption: string; // short visible caption
  w: number;
  h: number;
  source?: string; // which supplied file it came from
}
export interface Video {
  provider: "youtube" | "vimeo";
  id: string; // YouTube or Vimeo video id
  title: string; // used for the player's accessible title
  thumb?: string; // optional thumbnail URL (YouTube thumbnails are automatic)
  uploader?: string; // credit when the video lives on a teammate's account
}
/** @deprecated kept for older imports */
export type YouTubeVideo = Video;

const img = (src: string, w: number, h: number, alt: string, caption: string, source?: string): MediaImage => ({
  src: `media/${src}.webp`,
  w,
  h,
  alt,
  caption,
  source,
});

export const MEDIA = {
  shredIoU: img("shred-iou-overview", 1600, 809, "Full ski run signal with BIC-GMM event windows shaded by intensity, ground-truth spans, and a bar chart of IoU per window", "Pipeline overview — detected windows, ground truth, and IoU per window", "Shredshox methods doc"),
  shredBic: img("shred-bic-windows", 1202, 670, "Two stacked plots of a Vail ski run's AsY channel with BIC-GMM envelopes and shaded detection windows graded High, Medium and Low", "Vail run, AsY channel — BIC-GMM envelopes and graded detection windows", "Shredshox methods doc"),
  shredDirichletDetail: img("shred-dirichlet-detail", 1025, 388, "One AccX event with several green Gaussian curves overlaid, showing Dirichlet Process GMM sub-events", "Per-event detail — Dirichlet Process GMM “mini-Gaussians” inside one event", "Shredshox methods doc"),
  shredDirichletEvent: img("shred-dirichlet-event", 466, 312, "AsX event 1, graded Low, from 11.5 to 131.6 seconds, with sub-event curves labelled m1 to m4", "AsX event 1 (Low, 11.5–131.6 s) split into sub-events m1–m4", "Shredshox research summary"),
  shredHampel: img("shred-hampel", 1453, 831, "Two plots: raw AccX signal with large spikes, and the Hampel-filtered signal with spikes removed", "Raw vs. Hampel-filtered AccX — artifacts removed, motion kept", "Shredshox methods doc"),
  shredLabel: img("shred-labeling-tool", 953, 572, "Interactive plot with a hover tooltip at 927.98 seconds, used to select ground-truth event boundaries", "The interactive HTML tool I built to label ground-truth windows", "Shredshox methods doc"),
  shredCompare: img("shred-comparison", 840, 361, "Terminal output of event comparison results: shape similarity, peak ratio, spectral similarity, skewness and zero-crossing ratio", "Comparison-metrics output for two events", "Shredshox methods doc"),
  cortevaUI: img("corteva-chatbot-ui", 963, 558, "Dark chatbot interface titled Corteva Agriscience Products answering a question with a structured product overview", "The DeepCrop chatbot interface answering a product question", "Corteva TDM Symposium poster"),
  cortevaArch: img("corteva-architecture", 1409, 804, "Architecture diagram with frontend, backend RAG service with LLM, embedding and storage, and an extraction pipeline with a web scraper and Azure Document Intelligence", "System architecture — frontend, hybrid RAG backend, extraction pipeline", "Corteva TDM Symposium poster"),
  cortevaBench: img("corteva-benchmark", 1521, 600, "Table of extraction accuracy: Azure 97.2 percent, Marker 70.8 percent, MarkerOCR 47.2 percent, PyMuPDF 50.9 percent", "Extraction benchmark — Azure Document Intelligence 97.2% vs. open-source tools", "Corteva TDM Symposium poster"),
  cortevaLabel: img("corteva-label-extraction", 1275, 440, "A product label with highlighted regions marking extracted fields such as active ingredient and storage instructions", "Field extraction from a real product label", "Corteva TDM Symposium poster"),
  cortevaPoster: img("corteva-poster", 2000, 1500, "Full DeepCrop research poster from the 2025 Data Mine symposium", "Full poster — The Data Mine Symposium 2025", "Corteva TDM Symposium poster"),
  allisonGps: img("allison-gps-reduction", 1018, 459, "Side-by-side plots of an original dense GPS path and the reduced path after dynamic RDP simplification", "Original vs. reduced GPS path (2,958 → 489 points)", "Allison TDM Symposium poster"),
  allisonClusters: img("allison-clusters", 1132, 1206, "Scatter plot of vehicles colored by cluster, above a table describing each cluster's trip length, shift frequency and usage type", "Clustering results and cluster descriptions", "Allison TDM Symposium poster"),
  allisonElevation: img("allison-elevation", 832, 523, "Line chart of rolling average speed and elevation change over time", "Rolling speed and elevation from the Elevation API", "Allison TDM Symposium poster"),
  allisonOutliers: img("allison-outliers", 855, 774, "Scatter plot of gear shift count versus stop count with regression line and extreme outliers highlighted", "Outlier detection — stops vs. gear shifts (r = 0.86)", "Allison TDM Symposium poster"),
  allisonPoster: img("allison-poster", 2000, 1333, "Full Clustering Vehicles by Usage Patterns research poster", "Full poster — The Data Mine Symposium 2025", "Allison TDM Symposium poster"),
  deltaFlow: img("delta-flow", 1568, 555, "Flow diagram: lead info funnels into a scoring system referencing Salesforce data, producing scored leads that Delta decides whether to act on", "LeadsLLM flow — from raw lead to scored, actionable output", "Delta Faucet Spring 2026 poster"),
  deltaLeads: img("delta-scored-leads", 1565, 589, "Table of anonymized scored leads with units, developer, strategy, level, opportunity rating and score", "Sample scored-lead output (anonymized)", "Delta Faucet Spring 2026 poster"),
  // Original documents, shown first (rendered from the files you supplied)
  shredDeck2: img("shred-deck-p2", 1360, 1760, "Shredshox research summary page describing the BIC-GMM and Dirichlet event detection pipeline", "Research summary deck — page 2", "Shredshox RESEC summary deck"),
  shredDeck3: img("shred-deck-p3", 1360, 1760, "Shredshox research summary page with results and next steps", "Research summary deck — page 3", "Shredshox RESEC summary deck"),
  sleepPred: img("sleep-actual-vs-pred", 833, 545, "Scatter plot of actual versus predicted sleep quality with points close to the diagonal reference line", "Actual vs. predicted sleep quality on the test set (R² = 0.925)", "sleep_score_guesser notebook"),
  sleepImportance: img("sleep-feature-importance", 679, 433, "Horizontal bar chart of feature importance where sleep duration is about 0.8 and every other factor is below 0.06", "Feature importance — sleep duration dominates", "sleep_score_guesser notebook"),
  sleepOthers: img("sleep-factor-compare", 696, 433, "Horizontal bar chart of the remaining factors led by age, heart rate, daily steps and stress level", "The other factors, with sleep duration set aside", "sleep_score_guesser notebook"),
  sleepResiduals: img("sleep-residuals", 1189, 390, "Two plots: residuals versus predicted values scattered around zero, and a histogram of residuals", "Residual diagnostics", "sleep_score_guesser notebook"),
  sleepCorr: img("sleep-correlations", 1143, 834, "Heatmap of feature correlations with sleep quality: sleep duration 0.92, age 0.71, stress level −0.87", "Feature correlations with sleep quality", "sleep_score_guesser notebook"),
  sleepAge: img("sleep-age-groups", 833, 570, "Bar chart of average sleep quality by age group rising from under 30 to over 50", "Average sleep quality by age group", "sleep_score_guesser notebook"),
  deltaPhotoTeam: img("delta-symposium-team", 1280, 960, "Kash and three teammates standing beside the LeadsLLM poster at a crowded poster session", "With teammates at the LeadsLLM poster — The Data Mine symposium", "Event photo"),
  deltaPhotoGroup: img("delta-symposium-group", 1280, 960, "The LeadsLLM team gathered around their poster at the symposium", "The LeadsLLM team at The Data Mine symposium", "Event photo"),
  deltaPhotoHq: img("delta-hq", 800, 1065, "The team standing outside Delta Faucet Company's office building in the snow", "Team visit to Delta Faucet's offices", "Event photo"),
  deltaPhotoShowroom: img("delta-showroom", 1280, 960, "The team posing in Delta's showroom in front of illuminated shower fixture displays", "Inside Delta's showroom during the team visit", "Event photo"),
  deltaPoster: img("delta-poster", 2000, 1333, "Full Delta Faucet LeadsLLM research poster", "Full poster — Spring 2026", "Delta Faucet Spring 2026 poster"),
};

const methodsPages = Array.from({ length: 9 }, (_, i) =>
  img(`shred-methods-p${i + 1}`, 935, 1210, `Page ${i + 1} of my Shredshox research methods documentation`, `Methods documentation — page ${i + 1} of 9`, "Shredshox methods doc"),
);

export const VIDEOS = {
  boilerBuddy: { provider: "youtube", id: "2WO4yncbKJQ", title: "Boiler Buddy demo" } as Video,
  forecastRx: { provider: "youtube", id: "uFcaLoqUcBY", title: "ForecastRX demo" } as Video,
  swoleLeveling: {
    provider: "vimeo",
    id: "1070782705",
    title: "Swole Leveling demo",
    thumb: "https://i.vimeocdn.com/video/1999377918-50b20098fec559864f57f9b25d835843c32b1c343dd491febf60f564e2db5500-d?f=webp&region=us",
    uploader: "Tharun Senthil",
  } as Video,
};

/**
 * HERO ASSET SLOTS — Cyberpunk 2077 vehicle + Johnny Silverhand.
 * Leave src as null to show the original placeholder scene.
 * Only add images you have the rights to use (e.g. your own renders/screenshots
 * permitted by CD PROJEKT RED's fan-content guidelines), and fill in `credit`.
 *   vehicle:   2400×1030 px (≈21:9), WebP/PNG, vehicle facing LEFT, dark or transparent background
 *   character: 900×1200 px (3:4), PNG with transparent background, subject facing LEFT
 * Drop the files in /public/media and set src to e.g. "media/hero-vehicle.webp".
 */
export const heroAssets = {
  vehicle: { src: null as string | null, alt: "", w: 2400, h: 1030, credit: "" },
  character: { src: null as string | null, alt: "", w: 900, h: 1200, credit: "" },
  disclaimer: "Fan-made portfolio. Not affiliated with or endorsed by CD PROJEKT RED.",
};

export type ProjectKind = "Research" | "Professional" | "Hackathon · Team" | "Team Research" | "Mentorship" | "Personal" | "Academic";

export interface ProjectLink {
  label: string; // descriptive link text, e.g. "Watch the Boiler Buddy demo on YouTube"
  href: string;
}

export interface Project {
  id: string;
  title: string;
  kind: ProjectKind;
  org?: string;
  when: string;
  tagline: string;
  problem: string;
  contribution: string[];
  outcome?: string;
  stack: string[];
  links?: ProjectLink[];
  /** Public GitHub repository, if shareable. */
  repo?: string;
  /** How the showcase is laid out — chosen by what evidence exists. */
  layout: "research" | "video" | "poster";
  cover?: MediaImage;
  video?: Video;
  gallery?: MediaImage[];
  /** Original documents (deck pages, posters) — shown before any extracted figures. */
  documents?: { title: string; pages: MediaImage[] }[];
  /** Pipeline stages rendered as a diagram (flagship project only). */
  pipeline?: { step: string; detail: string }[];
}

export const featuredProjects: Project[] = [
  {
    id: "shredshox",
    layout: "research",
    cover: MEDIA.shredBic,
    documents: [
      { title: "Research summary deck", pages: [MEDIA.shredDeck2, MEDIA.shredDeck3] },
      { title: "Methods documentation", pages: methodsPages },
    ],
    gallery: [MEDIA.shredIoU, MEDIA.shredBic, MEDIA.shredDirichletDetail, MEDIA.shredDirichletEvent, MEDIA.shredHampel, MEDIA.shredLabel, MEDIA.shredCompare],
    title: "Automated Ski Event Detection",
    kind: "Research",
    org: "Shredshox · Ray Ewry Sports Engineering Center",
    when: "Jan 2026 – present",
    tagline: "An end-to-end pipeline that finds, decomposes, and grades vibration events in raw ski IMU data.",
    problem:
      "Shredshox instruments adaptive ski equipment with 9-channel IMU sensors. To compare its equipment against regular skis, the team first needed events found automatically — manual annotation of every run doesn't scale.",
    contribution: [
      "Benchmarked Hampel, Savitzky-Golay, median, and lowpass/highpass/bandpass/notch filters across 10 ski-run datasets to choose a cleaning chain that removes sensor artifacts without erasing real motion.",
      "Derived a modified BIC score, Score(k) = −2 log L + 0.1·k·log n, for a GMM that localizes event start and end times across sliding windows from 2.5 s to 3000 s (benchmarked against AIC).",
      "Used a Dirichlet Process GMM to split each event into sub-events without a preset count, then trained per-channel K-means models on standardized peak magnitudes to grade intensity as Low / Medium / High.",
      "Built an interactive HTML labeling tool for ground truth and scored detections with Intersection over Union, plus a comparison suite (waveform and FFT cosine similarity, peak ratio, skew/kurtosis, zero-crossing rate).",
    ],
    outcome:
      "A reproducible raw-signal-to-labeled-event system with quantified accuracy, now the basis for comparing Shredshox and standard ski signals.",
    stack: ["Python", "scikit-learn", "SciPy", "GMM / BIC", "Dirichlet Process", "K-means", "FFT"],
    pipeline: [
      { step: "Clean", detail: "Hampel + 0.5–25 Hz band filters" },
      { step: "Localize", detail: "BIC-optimized GMM" },
      { step: "Grade", detail: "Per-channel K-means" },
      { step: "Decompose", detail: "Dirichlet Process GMM" },
      { step: "Validate", detail: "IoU vs. hand labels" },
    ],
  },
  {
    id: "boiler-buddy",
    repo: "https://github.com/KashV2/cbc",
    layout: "video",
    video: VIDEOS.boilerBuddy,
    title: "Boiler Buddy",
    kind: "Hackathon · Team",
    org: "Anthropic hackathon at Purdue",
    when: "Apr 2026",
    tagline: "A Purdue-themed AI mental-health support app with a voice agent and crisis routing — built in two hours.",
    problem:
      "Students face real barriers to reaching mental-health care, and an AI tool in this space has to earn trust before it can help.",
    contribution: [
      "Built a stateless voice agent on the Claude API with continuous mic input, multi-voice output, and a synchronized animated avatar.",
      "Added crisis detection that surfaces 988 and Purdue CAPS emergency resources, plus a curated hub of campus and national services.",
      "Chose a privacy-first architecture with no personal health data stored — a product decision driven by user safety, not convenience.",
    ],
    outcome: "Won the Best Boiler Build track.",
    stack: ["React", "TypeScript", "Claude API", "ElevenLabs API"],
    links: [{ label: "Watch the Boiler Buddy demo on YouTube", href: "https://www.youtube.com/watch?v=2WO4yncbKJQ" }],
  },
  {
    id: "forecastrx",
    repo: "https://github.com/KashV2/health-compass-pro",
    layout: "video",
    video: VIDEOS.forecastRx,
    title: "ForecastRX",
    kind: "Hackathon · Team",
    org: "Catapult · ML@Purdue",
    when: "Apr 2026",
    tagline: "Forecasts a patient's healthcare costs and matches them to clinical trials that could offset them.",
    problem: "Patients struggle both to find clinical trials they qualify for and to understand what their care will cost.",
    contribution: [
      "Defined the core product problem and led feature scoping across a five-person team in a 36-hour build.",
      "Combined ML and financial modeling to forecast expenses and visualize monthly spending against insurance coverage.",
      "Integrated ClinicalTrials.gov data and a 578K-record public dataset to match users on eligibility and compensation and estimate whether participation offsets costs.",
    ],
    outcome: "Shipped and presented a working product within the 36-hour window.",
    stack: ["React", "TypeScript", "Python", "OpenAI API"],
    links: [{ label: "Watch the ForecastRX demo on YouTube", href: "https://www.youtube.com/watch?v=uFcaLoqUcBY" }],
  },
  {
    id: "swole-leveling",
    repo: "https://github.com/KashV2/swole-leveling-homebase",
    layout: "video",
    video: VIDEOS.swoleLeveling,
    title: "Swole Leveling",
    kind: "Hackathon · Team",
    when: "Team build",
    tagline: "A gamified lifting tracker inspired by Solo Leveling's power-progression mechanics.",
    problem: "Reinforcing habit formation in strength training by making consistency itself the reward.",
    contribution: [
      "Built XP for every logged rep, weighted by exercise, with multipliers for 4+ day-a-week training streaks.",
      "Designed and built an interactive body diagram, hand-drawn from individual anatomical vectors, that shows which muscle groups were trained that week.",
      "Integrated a third-party exercise API for a searchable library with instructional GIFs, and built the prototype end to end in Ionic, React, and TypeScript.",
      "Aligned the team on the Solo Leveling-inspired theme and palette, and scoped an ML workout-recommendation model as the next feature.",
    ],
    outcome: "A fully functional end-to-end prototype.",
    stack: ["Ionic", "React", "TypeScript", "JavaScript", "REST API"],
  },
  {
    id: "deepcrop",
    layout: "poster",
    cover: MEDIA.cortevaUI,
    documents: [{ title: "Symposium poster", pages: [MEDIA.cortevaPoster] }],
    gallery: [MEDIA.cortevaUI, MEDIA.cortevaArch, MEDIA.cortevaBench, MEDIA.cortevaLabel],
    title: "DeepCrop",
    kind: "Team Research",
    org: "The Data Mine × Corteva Agriscience",
    when: "Aug 2024 – May 2025",
    tagline: "A RAG chatbot for querying hundreds of crop-product labels and Safety Data Sheets.",
    problem:
      "Labels and SDSs hold critical composition and safety details, but inconsistent and scanned layouts make them hard to search or extract automatically.",
    contribution: [
      "Designed a hybrid RAG pipeline — vector retrieval plus graph-based context — after a pure Graph RAG approach hit scalability limits.",
      "Benchmarked Azure Document Intelligence, Marker, Marker OCR, and PyMuPDF on 400+ scraped documents to pick the extraction engine for bulk processing.",
    ],
    outcome: "Azure Document Intelligence reached 97.2% accuracy and cut manual review time by 70%.",
    stack: ["Python", "RAG", "Azure Document Intelligence", "Vector search", "React"],
  },
  {
    id: "fleet-clustering",
    layout: "poster",
    cover: MEDIA.allisonGps,
    documents: [{ title: "Symposium poster", pages: [MEDIA.allisonPoster] }],
    gallery: [MEDIA.allisonGps, MEDIA.allisonClusters, MEDIA.allisonElevation, MEDIA.allisonOutliers],
    title: "Clustering Vehicles by Usage",
    kind: "Team Research",
    org: "The Data Mine × Allison Transmission",
    when: "Aug 2024 – May 2025",
    tagline: "Segmenting a vehicle fleet into usage categories from GPS telematics.",
    problem:
      "Allison transmissions run in fire trucks, school buses, and garbage trucks with very different driving patterns; the goal was to categorize vehicles by how and where they operate.",
    contribution: [
      "Built a dynamic Ramer-Douglas-Peucker reduction that kept city routes dense and highways sparse, shrinking a 2,958-point GPS dataset to 489 points (~83%).",
      "Engineered features — log scaling, correlation-based redundancy removal, API-sourced elevation and road grade — and benchmarked K-means, DBSCAN, and GMM clustering.",
    ],
    outcome: "Segmented vehicles into fleet categories such as highway long-haul vs. urban stop-and-go.",
    stack: ["Python", "RDP algorithm", "K-means", "DBSCAN", "GMM", "Elevation API"],
  },
  {
    id: "leadsllm",
    layout: "poster",
    cover: MEDIA.deltaFlow,
    documents: [{ title: "Symposium poster", pages: [MEDIA.deltaPoster] }],
    gallery: [MEDIA.deltaFlow, MEDIA.deltaLeads, MEDIA.deltaPhotoTeam, MEDIA.deltaPhotoGroup, MEDIA.deltaPhotoHq, MEDIA.deltaPhotoShowroom],
    title: "LeadsLLM",
    kind: "Mentorship",
    org: "The Data Mine × Delta Faucet · Teaching Assistant",
    when: "Aug 2025 – present",
    tagline: "LLM-scored lead scraping and prioritization for a 700,000-lead backlog.",
    problem: "Over 60% of Delta's leads were being discarded because manual scoring and filtering couldn't keep up.",
    contribution: [
      "Mentored a 10-student team building GPT-OSS lead scoring that outputs standardized, sales-ready CSV reports.",
      "Guided tooling strategy — cutting underperforming scraping APIs in favor of scalable methods — and translated Delta's business goals into a structured project scope.",
    ],
    stack: ["Python", "GPT-OSS", "SerpAPI", "Beautiful Soup"],
  },
  {
    id: "sleep-score",
    repo: "https://github.com/KashV2/Sleep-score-predictor",
    layout: "poster",
    cover: MEDIA.sleepPred,
    gallery: [MEDIA.sleepPred, MEDIA.sleepImportance, MEDIA.sleepCorr, MEDIA.sleepOthers, MEDIA.sleepResiduals, MEDIA.sleepAge],
    title: "Sleep Score Predictor",
    kind: "Personal",
    org: "Independent analysis · Jupyter notebook",
    when: "Personal project",
    tagline: "A Random Forest that predicts sleep quality from health and lifestyle data, and explains what drives it.",
    problem: "Which everyday health and lifestyle factors actually predict how well someone sleeps?",
    contribution: [
      "Cleaned and feature-engineered a 374-record sleep-health dataset: one-hot encoding categorical fields and splitting blood pressure into systolic and diastolic.",
      "Trained a Random Forest Regressor to predict sleep quality, then ran feature-importance and correlation analysis to explain it.",
      "Validated the fit with actual-vs-predicted and residual diagnostics.",
    ],
    outcome: "R² = 0.925 and RMSE = 0.36; sleep duration was the dominant driver.",
    stack: ["Python", "pandas", "scikit-learn", "matplotlib", "seaborn"],
  },
];

/** Smaller projects shown as a compact list under the featured grid. */
export const moreProjects: Project[] = [];

export interface Role {
  role: string;
  org: string;
  when: string;
  where: string;
  current?: boolean;
  /** One-line, impact-first summary shown on the chapter. */
  summary: string;
  /** Supporting visual from your supplied files (optional). */
  media?: MediaImage;
  /** Shown instead of media when no visual exists — must be a documented number. */
  keyFigure?: { value: string; label: string };
  /** "work" = internships & TA roles (Experience), "research" = Research section. */
  category: "work" | "research";
  /** Organization logo. Local files go in /public/media. */
  logo?: { src: string; alt: string; tile?: boolean }; // tile = show on a white badge
  /** Event / team photos shown with the chapter (first one is the lead image). */
  photos?: MediaImage[];
  /** Themed backdrop + entrance for the chapter (see ChapterScene.tsx). */
  theme: "clock" | "property" | "llm" | "ski" | "water" | "crops" | "route";
  /** Project id to open from this chapter, if any. */
  projectId?: string;
  points: string[];
}

export const experience: Role[] = [
  {
    role: "Software Engineering Intern",
    org: "Revaya",
    theme: "property",
    category: "work",
    logo: { src: "media/logo-revaya.png", alt: "Revaya logo", tile: true },
    summary: "Designed the access, sign-on, and timekeeping backbone for a 150-person remote contractor workforce.",
    keyFigure: { value: "150", label: "remote contractors on role-based access + SSO" },
    when: "May 2026 – present",
    where: "Remote",
    current: true,
    points: [
      "Designed an object-oriented, role-based permissions system and data schema from scratch, giving 150 remote contractors secure, scalable access with separate contractor and HR-manager workflows.",
      "Configured multi-provider OAuth (Google, Google Chat, Slack) through Supabase Auth for single sign-on across all three surfaces.",
      "Replaced manual tracking with automated timekeeping, attendance, and clock-in/out workflows in n8n and PostgreSQL — the pipelines behind the role-based dashboard I scoped with stakeholders.",
    ],
  },
  {
    role: "Machine Learning Intern",
    org: "LoftxAI",
    theme: "llm",
    category: "work",
    logo: { src: "media/logo-loftx.png", alt: "LOFTx.ai logo", tile: true },
    summary: "Cut tokens per request 40–60% by redesigning when the product actually needs to call an LLM.",
    keyFigure: { value: "40–60%", label: "fewer tokens per request" },
    when: "May 2025 – May 2026",
    where: "Seattle, WA",
    points: [
      "Spotted excess LLM calls and redesigned the query flow end to end: frequent lookups now hit structured PostgreSQL queries, with Ollama (Gemma) or GPT-class models called only when needed — cutting tokens per request by 40–60% along with cost and latency.",
      "Enforced response-format and schema constraints so the AI layer reliably returned valid JSON for chart generation, giving downstream features a dependable output contract.",
    ],
  },
  {
    role: "Undergraduate Teaching Assistant",
    org: "The Data Mine · Delta Faucet",
    theme: "water",
    category: "work",
    summary: "Mentoring a 10-student team taking on a 700,000-lead backlog with LLM scoring.",
    photos: [MEDIA.deltaPoster, MEDIA.deltaPhotoTeam, MEDIA.deltaPhotoGroup, MEDIA.deltaPhotoHq, MEDIA.deltaPhotoShowroom],
    projectId: "leadsllm",
    when: "Aug 2025 – present",
    where: "West Lafayette, IN",
    current: true,
    points: [
      "Mentor a 10-student team building LeadsLLM for a 700,000-lead backlog, and act as the bridge between the team's technical work and Delta's corporate stakeholders.",
    ],
  },
  {
    role: "Undergraduate Research Assistant — Ski Vibration Analysis",
    org: "Shredshox · Ray Ewry Sports Engineering Center",
    theme: "ski",
    category: "research",
    logo: { src: "media/logo-resec.png", alt: "RESEC — Ray Ewry Sports Engineering Center logo" },
    summary: "Turning raw 9-channel ski IMU recordings into automatically detected, graded, and validated events.",
    media: MEDIA.shredBic,
    projectId: "shredshox",
    when: "Jan 2026 – present",
    where: "Indianapolis, IN · Remote",
    current: true,
    points: [
      "Building an automated event-detection pipeline for 9-channel ski IMU data — filtering, BIC-GMM localization, Dirichlet GMM decomposition, K-means intensity tiers, and IoU validation.",
    ],
  },
  {
    role: "Undergraduate Researcher",
    org: "The Data Mine · Corteva Agriscience",
    theme: "crops",
    category: "research",
    summary: "Built a hybrid-RAG chatbot over product labels and SDSs, backed by a 97.2%-accurate extraction engine.",
    media: MEDIA.cortevaUI,
    projectId: "deepcrop",
    when: "Aug 2024 – May 2025",
    where: "West Lafayette, IN",
    points: [
      "Built the DeepCrop hybrid-RAG chatbot over product labels and SDSs; benchmarked four PDF-extraction tools on 400+ documents and selected one with 97.2% accuracy, cutting manual review time by 70%.",
    ],
  },
  {
    role: "Undergraduate Researcher",
    org: "The Data Mine · Allison Transmission",
    theme: "route",
    category: "research",
    summary: "Compressed GPS telematics ~83% and clustered vehicles into usage-based fleet categories.",
    media: MEDIA.allisonGps,
    projectId: "fleet-clustering",
    when: "Aug 2024 – May 2025",
    where: "West Lafayette, IN",
    points: [
      "Reduced GPS telematics data by ~83% with a dynamic RDP algorithm and benchmarked K-means, DBSCAN, and GMM to segment vehicles into usage-based fleet categories.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "C++", "C", "TypeScript", "JavaScript", "R", "SQL (PostgreSQL)"] },
  {
    group: "AI / ML",
    items: ["LLM APIs (Claude, OpenAI GPT, Ollama)", "RAG", "Model fine-tuning", "Prompt engineering", "K-means", "GMM + BIC", "Dirichlet Process models", "Predictive modeling"],
  },
  {
    group: "Statistics & Analysis",
    items: ["ANOVA", "Paired t-test", "Linear regression", "Statistical modeling", "Data cleaning", "Feature engineering", "Data visualization"],
  },
  {
    group: "Signal Processing",
    items: ["Hampel filter", "Savitzky-Golay", "Low/high/band-pass & notch filters", "FFT spectral analysis", "IoU validation"],
  },
  { group: "Data & Cloud", items: ["PostgreSQL", "ETL pipelines", "AWS Textract", "Azure Document Intelligence", "REST APIs"] },
  { group: "Frameworks & Tools", items: ["React", "Ionic", "Supabase + Supabase Auth", "n8n", "Git / GitHub"] },
  {
    group: "Product & Collaboration",
    items: ["Requirements gathering", "Stakeholder management", "Workflow design", "User-centered design", "Agile sprints"],
  },
];

export const education = {
  school: "Purdue University",
  degree: "B.S. Data Science — Computer Science track",
  when: "Expected May 2028",
  where: "West Lafayette, IN",
  honors: ["Dean's List / Semester Honors — Spring 2026"],
  coursework: [
    "Data Structures & Algorithms for DS/AI",
    "Object-Oriented Programming",
    "Statistical Theory",
    "Applied Regression Analysis",
    "Probability",
    "Linear Algebra",
    "Multivariate Calculus",
  ],
};

/**
 * HERO SIGNAL — real output from the Shredshox pipeline.
 * Run 2024-12-06 09:12:39, channel AsX (°/s), macro-event #2 (graded "High").
 * Each entry is one Dirichlet-GMM sub-event: mean (s), std (s), mixture weight.
 */
export const heroSignal = {
  caption: "Shredshox run 2024-12-06 · channel AsX · event 02",
  grade: "HIGH",
  components: [
    { mean: 158.4184, std: 10.679, weight: 0.1122 },
    { mean: 160.9187, std: 10.8304, weight: 0.1126 },
    { mean: 164.3489, std: 4.8424, weight: 0.2202 },
    { mean: 187.99, std: 5.5589, weight: 0.0813 },
    { mean: 206.8949, std: 10.9461, weight: 0.0983 },
    { mean: 210.9013, std: 2.3964, weight: 0.1719 },
    { mean: 236.0424, std: 9.2496, weight: 0.0901 },
    { mean: 252.0353, std: 2.3964, weight: 0.1134 },
  ],
};

/** Hero "work reel" — real media shown on the opening screen. */
export const heroReel: ({ kind: "video"; projectId: string; label: string } | { kind: "image"; projectId: string; label: string; image: MediaImage })[] = [
  { kind: "video", projectId: "boiler-buddy", label: "Boiler Buddy — hackathon winner" },
  { kind: "image", projectId: "shredshox", label: "Ski event detection", image: MEDIA.shredIoU },
  { kind: "video", projectId: "forecastrx", label: "ForecastRX — 36-hour build" },
  { kind: "image", projectId: "deepcrop", label: "DeepCrop RAG chatbot", image: MEDIA.cortevaUI },
];
