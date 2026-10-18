import ludo        from "../assets/ludo.png";
import personalLib from "../assets/personal book library.png";
import project1    from "../assets/project1.png";
import project2    from "../assets/project2.png";
import project3    from "../assets/project3.png";
import project4    from "../assets/project4.png";
import project5    from "../assets/project5.png";
import solarSystem from "../assets/solar_system.png";
import todo         from "../assets/todo.png";
import pfm          from "../assets/pfm.png";
import mentorship   from "../assets/mentorship.png";
import musicHub     from "../assets/Music Hub.png";
import localFix     from "../assets/LocalFix1.png";

import myImage      from "../assets/my_image.png";
import myImg        from "../assets/my_img.png";
import festivalImages from "../assets/festival_images.jpg";
import myResume     from "../assets/my_resume.pdf";
import myCV         from "../assets/my_CV.pdf";

import cpp          from "../assets/c++.svg";
import c            from "../assets/c-1.svg";
import css          from "../assets/css-3.svg";
import figma        from "../assets/figma-1.svg";
import git          from "../assets/git-icon.svg";
import github       from "../assets/github.png";
import html         from "../assets/html-1.svg";
import java         from "../assets/java.png";
import js           from "../assets/logo-javascript.svg";
import nodejs       from "../assets/nodejs-1.svg";
import python       from "../assets/python-5.svg";
import react        from "../assets/react-2.svg";
import tailwind     from "../assets/Tailwind_CSS.png";
import sql          from "../assets/sql.png";

export const ASSET_IMAGES = {
  // Projects
  mentorship,
  musicHub,
  "Music Hub": musicHub,
  music_hub: musicHub,
  localFix,
  LocalFix1: localFix,
  localFix1: localFix,
  local_fix: localFix,
  pfm,
  ludo,
  solarSystem,
  solar_system: solarSystem,
  project4,
  todo,
  personalLib,
  "personal book library": personalLib,
  personal_book_library: personalLib,
  project1,
  project2,
  project3,
  project5,
  festivalImages,
  festival_images: festivalImages,

  // Avatar / Profile
  myImage,
  my_image: myImage,
  myImg: myImg || myImage,
  my_img: myImg || myImage,

  // Tools & Skills
  html,
  css,
  js,
  react,
  tailwind,
  nodejs,
  python,
  git,
  github,
  figma,
  sql,
  java,
  c,
  cpp,
};

export const ASSET_DOCUMENTS = {
  myResume,
  myCV,
};

// Automatically discover and bundle ALL files in src/assets/ dynamically!
// If the user renames or adds any new file with any name, it is automatically indexed and resolved!
export const ALL_RAW_ASSETS = import.meta.glob("../assets/*", { eager: true, import: "default" });

export const NORMALIZED_ASSETS = {};
try {
  for (const [relPath, assetUrl] of Object.entries(ALL_RAW_ASSETS || {})) {
    const fileNameWithExt = relPath.replace(/^.*[\\/]/, "");
    const baseName = fileNameWithExt.replace(/\.[^/.]+$/, "");
    const cleanKey = baseName.toLowerCase().replace(/[^a-z0-9]/g, "");

    NORMALIZED_ASSETS[fileNameWithExt] = assetUrl;
    NORMALIZED_ASSETS[fileNameWithExt.toLowerCase()] = assetUrl;
    NORMALIZED_ASSETS[baseName] = assetUrl;
    NORMALIZED_ASSETS[baseName.toLowerCase()] = assetUrl;
    if (cleanKey) {
      NORMALIZED_ASSETS[cleanKey] = assetUrl;
    }
  }
} catch (e) {
  console.warn("Dynamic asset registry error:", e);
}

// Finds ANY resume or CV file regardless of what the user names the file!
export function findDocumentAsset(kind, preferredFallback) {
  const normKind = String(kind || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const entries = Object.entries(ALL_RAW_ASSETS || {});

  // 1. Resume search (matches my_resume.pdf, resume.pdf, Debajyoti_Resume.pdf, any *resume*.pdf)
  if (normKind.includes("resume")) {
    const match = entries.find(([path]) => {
      const lower = path.toLowerCase();
      return lower.endsWith(".pdf") && lower.includes("resume");
    });
    if (match) return match[1];

    const fallbackPdf = entries.find(([path]) => {
      const lower = path.toLowerCase();
      return lower.endsWith(".pdf") && !lower.includes("cv");
    });
    if (fallbackPdf) return fallbackPdf[1];

    return preferredFallback || myResume || "/resume.pdf";
  }

  // 2. CV search (matches my_CV.pdf, cv.pdf, Curriculum_Vitae.pdf, any *cv*.pdf)
  if (normKind.includes("cv") || normKind.includes("curriculum") || normKind.includes("vitae")) {
    const match = entries.find(([path]) => {
      const lower = path.toLowerCase();
      return lower.endsWith(".pdf") && (lower.includes("cv") || lower.includes("vitae") || lower.includes("curriculum"));
    });
    if (match) return match[1];

    const anyPdf = entries.find(([path]) => path.toLowerCase().endsWith(".pdf"));
    if (anyPdf) return anyPdf[1];

    return preferredFallback || myCV || "/cv.pdf";
  }

  // 3. Fallback search by filename
  for (const [path, url] of entries) {
    const clean = path.replace(/^.*[\\/]/, "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (clean.includes(normKind) || normKind.includes(clean)) {
      return url;
    }
  }

  return preferredFallback || myResume || "/resume.pdf";
}

// Finds ANY image or thumbnail file regardless of what the user names the file!
export function findImageAsset(query, fallback) {
  if (!query && !fallback) return ASSET_IMAGES.mentorship;

  const rawCandidate = query || fallback;
  if (typeof rawCandidate === "string") {
    if (
      rawCandidate.startsWith("data:") ||
      rawCandidate.startsWith("blob:") ||
      rawCandidate.startsWith("http://") ||
      rawCandidate.startsWith("https://")
    ) {
      return rawCandidate;
    }
  }

  // 1. Direct match in ASSET_IMAGES
  if (query && ASSET_IMAGES[query]) return ASSET_IMAGES[query];

  // 2. Normalized key in NORMALIZED_ASSETS
  const cleanQ = String(query || "").trim().replace(/^\/src\/assets\//, "").replace(/\.[^/.]+$/, "");
  const normQ = cleanQ.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (normQ && NORMALIZED_ASSETS[normQ]) {
    return NORMALIZED_ASSETS[normQ];
  }

  const entries = Object.entries(ALL_RAW_ASSETS || {});

  // 3. Profile / avatar search (matches my_image, my_img, avatar, profile, photo, debajyoti, etc.)
  if (
    normQ.includes("avatar") ||
    normQ.includes("profile") ||
    normQ.includes("myimage") ||
    normQ.includes("myimg") ||
    normQ.includes("photo") ||
    normQ.includes("debajyoti")
  ) {
    const avatarMatch = entries.find(([path]) => {
      const lower = path.toLowerCase();
      return (
        (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".webp")) &&
        (lower.includes("image") || lower.includes("img") || lower.includes("avatar") || lower.includes("profile") || lower.includes("photo"))
      );
    });
    if (avatarMatch) return avatarMatch[1];
    return myImage;
  }

  // 4. Project keyword search
  if (normQ) {
    const match = entries.find(([path]) => {
      const cleanPath = path.replace(/^.*[\\/]/, "").toLowerCase().replace(/[^a-z0-9]/g, "");
      return cleanPath.includes(normQ) || normQ.includes(cleanPath);
    });
    if (match) return match[1];
  }

  // 5. Fallback search
  if (fallback) {
    const cleanFb = String(fallback).trim().replace(/^\/src\/assets\//, "").replace(/\.[^/.]+$/, "");
    const normFb = cleanFb.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (normFb && NORMALIZED_ASSETS[normFb]) {
      return NORMALIZED_ASSETS[normFb];
    }
    const fbMatch = entries.find(([path]) => {
      const cleanPath = path.replace(/^.*[\\/]/, "").toLowerCase().replace(/[^a-z0-9]/g, "");
      return cleanPath.includes(normFb) || normFb.includes(cleanPath);
    });
    if (fbMatch) return fbMatch[1];
    if (!fallback.startsWith("/src/assets/") && !fallback.includes("/assets/")) {
      return fallback;
    }
  }

  return ASSET_IMAGES.mentorship;
}

export const PORTFOLIO_BUILD_TIMESTAMP =
  typeof __PORTFOLIO_BUILD_TIME__ !== "undefined"
    ? __PORTFOLIO_BUILD_TIME__
    : new Date().toISOString();

export const PORTFOLIO_BUILD_VERSION =
  typeof __PORTFOLIO_BUILD_TIME__ !== "undefined"
    ? `v-${__PORTFOLIO_BUILD_TIME__.replace(/[^0-9a-zA-Z]/g, "")}`
    : "2026.10.18-v3.3";

export const CLOUD_SYNC_CONFIG = {
  provider: "jsonbin",
  binId: "6ad4a366ac6210605a3bdc6c",
  apiKey: "$2a$10$U99V8hUfuRvBhjmYWTBemuaQgwy7j6e1SVodaHbPTvXqMs1juVG9u",
};

export function computeDataFingerprint(data) {
  try {
    const raw = JSON.stringify({
      v: PORTFOLIO_BUILD_VERSION,
      p: data?.personal,
      pr: data?.projects,
      sk: data?.skillsCategories,
      st: data?.stats,
      sv: data?.services,
      ed: data?.education,
      ex: data?.experience,
      tl: data?.frameworksAndTools,
      tm: data?.testimonials,
    });
    let hash = 5381;
    for (let i = 0; i < raw.length; i++) {
      hash = ((hash << 5) + hash) + raw.charCodeAt(i);
      hash = hash & hash;
    }
    return `fp-${Math.abs(hash).toString(36)}`;
  } catch {
    return `fp-${Date.now()}`;
  }
}

export const defaultPortfolioData = {
  version: PORTFOLIO_BUILD_VERSION,
  personal: {
    name: "Debajyoti Samanta",
    firstName: "Debajyoti",
    roleTitle: "Full-Stack Developer & UI/UX Designer",
    roles: [
      "Full-Stack Developer",
      "UI/UX Designer",
      "React Engineer",
      "Creative Coder",
      "Software Developer"
    ],
    status: "Available for work",
    bioIntro: "Crafting beautiful, robust digital experiences with modern web technologies, fluid animations, and high-performance architectures.",
    bioAbout: "I specialize in building full-stack applications with React, Node.js, and modern UI engineering. Passionate about clean architecture, micro-interactions, responsive accessibility, and intuitive user experiences.",
    location: "West Bengal, India",
    email: "debajyotisamanta2003@gmail.com",
    whatsapp: "+91 XXXXXXXXXX",
    whatsappUrl: "https://api.whatsapp.com/send?phone=91XXXXXXXXXX&text=Hello!",
    resumeUrl: myResume,
    cvUrl: myCV,
    resumeName: "Debajyoti_Samanta_Resume.pdf",
    cvName: "Debajyoti_Samanta_CV.pdf",
    avatar: myImage,
    avatarKey: "myImage",
    resumeKey: "myResume",
    cvKey: "myCV",
  },

  stats: [
    { id: "stat-1", value: "15+", label: "Projects", color: "var(--clr-primary-dim)", glow: "var(--clr-primary-glow)" },
    { id: "stat-2", value: "3+", label: "Yrs Exp", color: "var(--clr-cyan-bright)", glow: "var(--clr-cyan-glow)" },
    { id: "stat-3", value: "25+", label: "Repositories", color: "var(--clr-pink-dim)", glow: "var(--clr-pink-glow)" },
    { id: "stat-4", value: "100%", label: "Passion", color: "var(--clr-green-dim)", glow: "var(--clr-green-glow)" },
  ],

  socials: [
    { id: "soc-1", name: "LinkedIn", href: "https://www.linkedin.com/in/debajyoti-samanta-b49b292b5/", icon: "ri-linkedin-box-fill", color: "#0A66C2" },
    { id: "soc-2", name: "GitHub", href: "https://github.com/debajyotiSamanta", icon: "ri-github-fill", color: "#8b5cf6" },
    { id: "soc-3", name: "Instagram", href: "https://www.instagram.com/unique_engineer_07/", icon: "ri-instagram-fill", color: "#E1306C" },
    { id: "soc-4", name: "Facebook", href: "https://www.facebook.com/debajyoti.samanta.588680", icon: "ri-facebook-circle-fill", color: "#1877F2" },
  ],

  skillsCategories: [
    {
      id: "frontend",
      label: "Frontend Dev",
      icon: "ri-code-box-line",
      color: "var(--clr-primary-dim)",
      bg: "rgba(124,58,237,0.10)",
      border: "rgba(124,58,237,0.22)",
      glow: "rgba(124,58,237,0.25)",
      skills: [
        { name: "React.js", level: 92, icon: "ri-reactjs-line" },
        { name: "JavaScript (ES6+)", level: 90, icon: "ri-javascript-line" },
        { name: "HTML5 / CSS3", level: 95, icon: "ri-html5-line" },
        { name: "Tailwind CSS", level: 88, icon: "ri-css3-line" },
        { name: "UI/UX & Responsive Design", level: 93, icon: "ri-layout-masonry-line" },
      ],
    },
    {
      id: "backend",
      label: "Backend Dev",
      icon: "ri-server-line",
      color: "var(--clr-cyan-bright)",
      bg: "rgba(6,182,212,0.08)",
      border: "rgba(6,182,212,0.20)",
      glow: "rgba(6,182,212,0.22)",
      skills: [
        { name: "Node.js", level: 84, icon: "ri-nodejs-line" },
        { name: "Express.js", level: 82, icon: "ri-server-line" },
        { name: "REST APIs", level: 88, icon: "ri-route-line" },
        { name: "WebSockets & WebRTC", level: 75, icon: "ri-broadcast-line" },
        { name: "Authentication / JWT", level: 85, icon: "ri-shield-keyhole-line" },
      ],
    },
    {
      id: "database",
      label: "Database",
      icon: "ri-database-2-line",
      color: "var(--clr-pink-dim)",
      bg: "rgba(236,72,153,0.08)",
      border: "rgba(236,72,153,0.20)",
      glow: "rgba(236,72,153,0.22)",
      skills: [
        { name: "MongoDB", level: 86, icon: "ri-database-2-line" },
        { name: "Mongoose ODM", level: 84, icon: "ri-file-code-line" },
        { name: "SQL / MySQL", level: 78, icon: "ri-table-line" },
        { name: "Data Modeling", level: 82, icon: "ri-organization-chart" },
      ],
    },
    {
      id: "tools",
      label: "Tools & Others",
      icon: "ri-tools-line",
      color: "var(--clr-green-dim)",
      bg: "rgba(16,185,129,0.08)",
      border: "rgba(16,185,129,0.20)",
      glow: "rgba(16,185,129,0.22)",
      skills: [
        { name: "Git & GitHub", level: 90, icon: "ri-git-branch-line" },
        { name: "Figma (UI Design)", level: 85, icon: "ri-palette-line" },
        { name: "Vite / Webpack", level: 83, icon: "ri-speed-up-line" },
        { name: "Vercel / Netlify Deploy", level: 89, icon: "ri-cloud-line" },
        { name: "C / C++ & Java", level: 80, icon: "ri-terminal-box-line" },
      ],
    },
  ],

  frameworksAndTools: [
    { id: "tool-1",  name: "HTML5",       imgKey: "html",     hue: "#e34c26" },
    { id: "tool-2",  name: "CSS3",        imgKey: "css",      hue: "#264de4" },
    { id: "tool-3",  name: "JavaScript",  imgKey: "js",       hue: "#f0db4f" },
    { id: "tool-4",  name: "React",       imgKey: "react",    hue: "#61dafb" },
    { id: "tool-5",  name: "Tailwind",    imgKey: "tailwind",  hue: "#38bdf8" },
    { id: "tool-6",  name: "Node.js",     imgKey: "nodejs",   hue: "#8bc500" },
    { id: "tool-7",  name: "Python",      imgKey: "python",   hue: "#ffd845" },
    { id: "tool-8",  name: "Git",         imgKey: "git",      hue: "#f05030" },
    { id: "tool-9",  name: "GitHub",      imgKey: "github",   hue: "#8b5cf6" },
    { id: "tool-10", name: "Figma",       imgKey: "figma",    hue: "#ff7262" },
    { id: "tool-11", name: "SQL",         imgKey: "sql",      hue: "#06b6d4" },
    { id: "tool-12", name: "Java",        imgKey: "java",     hue: "#ea8c1e" },
    { id: "tool-13", name: "C",           imgKey: "c",        hue: "#5c6bc0" },
    { id: "tool-14", name: "C++",         imgKey: "cpp",      hue: "#00599c" },
  ],

  education: [
    {
      id: "edu-1",
      title: "B-Tech (Information Technology)",
      institution: "Meghnad Saha Institute of Technology",
      period: "2023 – 2027",
      score: "Pursuing",
      icon: "ri-graduation-cap-line",
      accent: "var(--clr-primary-dim)",
      glow: "rgba(124,58,237,0.25)",
      bg: "rgba(124,58,237,0.08)",
      border: "rgba(124,58,237,0.22)",
      chip: "chip-violet",
    },
    {
      id: "edu-2",
      title: "Higher Secondary Education",
      institution: "Raghunath Bari Ramtarak High School",
      period: "2020 – 2022",
      score: "83.8%",
      icon: "ri-book-2-line",
      accent: "var(--clr-cyan-bright)",
      glow: "rgba(6,182,212,0.22)",
      bg: "rgba(6,182,212,0.06)",
      border: "rgba(6,182,212,0.20)",
      chip: "chip-cyan",
    },
    {
      id: "edu-3",
      title: "Secondary Education",
      institution: "Kaminachak Sasibhusan Kanailal Vidyayatan",
      period: "2018 – 2020",
      score: "85%",
      icon: "ri-pencil-ruler-2-line",
      accent: "var(--clr-pink-dim)",
      glow: "rgba(236,72,153,0.22)",
      bg: "rgba(236,72,153,0.06)",
      border: "rgba(236,72,153,0.20)",
      chip: "chip-pink",
    },
  ],

  experience: [
    {
      id: "exp-1",
      title: "Frontend Developer",
      institution: "Hackerspace — MSIT Official Coding Club",
      period: "2024 – Present",
      description: "Building responsive web interfaces, designing modern UI/UX systems, and mentoring student developers in web standards.",
      icon: "ri-code-line",
      accent: "var(--clr-primary-dim)",
      glow: "rgba(124,58,237,0.25)",
      bg: "rgba(124,58,237,0.08)",
      border: "rgba(124,58,237,0.22)",
      chip: "chip-violet",
    },
    {
      id: "exp-2",
      title: "CDP Lead",
      institution: "Hackerspace — MSIT Official Coding Club",
      period: "2024 – Present",
      description: "Leading the Coding Development Program, organizing technical hackathons, and conducting competitive coding workshops.",
      icon: "ri-team-line",
      accent: "var(--clr-cyan-bright)",
      glow: "rgba(6,182,212,0.22)",
      bg: "rgba(6,182,212,0.06)",
      border: "rgba(6,182,212,0.20)",
      chip: "chip-cyan",
    },
  ],

  services: [
    {
      id: "uiux",
      icon: "ri-layout-4-line",
      title: "UI/UX Design",
      tagline: "Intuitive interfaces that delight",
      desc: "Creating intuitive, aesthetic interfaces that users love. Focused on user-centered design principles and modern aesthetics, ensuring consistency across all interactive user flows.",
      accent: "var(--clr-primary-dim)",
      glow: "rgba(124,58,237,0.25)",
      bg: "rgba(124,58,237,0.08)",
      border: "rgba(124,58,237,0.22)",
      chip: "chip-violet",
      features: [
        "Wireframing & interactive prototyping",
        "Figma components & variables setup",
        "Design system token architectures",
        "Aesthetic visual asset guidelines",
        "User flows & usability testing",
      ],
    },
    {
      id: "fullstack",
      icon: "ri-code-s-slash-line",
      title: "Full-Stack Dev",
      tagline: "End-to-end web solutions",
      desc: "Building responsive, performant full-stack applications using modern technologies. From concept to cloud deployment with clean, scalable architecture and secure data structures.",
      accent: "var(--clr-cyan-bright)",
      glow: "rgba(6,182,212,0.22)",
      bg: "rgba(6,182,212,0.07)",
      border: "rgba(6,182,212,0.20)",
      chip: "chip-cyan",
      features: [
        "Responsive React applications",
        "Robust Node.js & Express REST APIs",
        "MongoDB databases & ODM schemas",
        "Optimized build systems & cloud deployments",
        "Authentication & role-based access control",
      ],
    },
    {
      id: "brand",
      icon: "ri-palette-line",
      title: "Brand Design",
      tagline: "Visual identities that stand out",
      desc: "Developing cohesive visual identities that represent your brand — logo design, color systems, and comprehensive brand guidelines tailored to fit your target audiences.",
      accent: "var(--clr-pink-dim)",
      glow: "rgba(236,72,153,0.22)",
      bg: "rgba(236,72,153,0.07)",
      border: "rgba(236,72,153,0.20)",
      chip: "chip-pink",
      features: [
        "Vector logomarks & visual style guidelines",
        "Curated typography systems & pairings",
        "Custom digital brand templates",
        "Consistency audits & styling standards",
        "Color palette & icon system",
      ],
    },
    {
      id: "software",
      icon: "ri-terminal-box-line",
      title: "Software Dev",
      tagline: "Scalable, maintainable systems",
      desc: "Developing robust, scalable software solutions with clean architecture. Expertise spanning the full product stack from databases to interactive user interfaces.",
      accent: "var(--clr-green-dim)",
      glow: "rgba(16,185,129,0.22)",
      bg: "rgba(16,185,129,0.07)",
      border: "rgba(16,185,129,0.20)",
      chip: "chip-green",
      features: [
        "Modular backend architecture & APIs",
        "Secure authentication & data protection",
        "High-performance queries & search indexes",
        "WebRTC, WebSockets & real-time features",
        "Testing, CI/CD & DevOps pipelines",
      ],
    },
  ],

  projectsCategories: ["All", "Full-Stack", "Game", "Web", "React"],

  projects: [
    {
      id: "proj-1",
      imgKey: "mentorship",
      title: "MentorSpace",
      subtitle: "Mentorship Platform",
      tag: "Full-Stack",
      chip: "chip-cyan",
      desc: "A one-on-one mentorship platform with real-time WebRTC video/audio, collaborative multilingual code editor, and secure role-based authentication. Built for seamless mentor-student connections.",
      tech: ["React", "Node.js", "WebRTC", "MongoDB", "Express"],
      link: "https://mentorship-platform-frontend-delta.vercel.app/",
      featured: true,
      accentColor: "#22d3ee",
    },
    {
      id: "proj-2",
      imgKey: "musicHub",
      title: "Music Hub",
      subtitle: "Premium Streaming Platform",
      tag: "Full-Stack",
      chip: "chip-cyan",
      desc: "A full-stack music streaming platform with user accounts, custom playlists, secure MongoDB database integration, and premium audio playback queue management.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      link: "https://my-music-hub-ashen.vercel.app/",
      featured: true,
      accentColor: "#a78bfa",
    },
    {
      id: "proj-3",
      imgKey: "localFix",
      title: "LocalFix",
      subtitle: "Local Service Provider Platform",
      tag: "Full-Stack",
      chip: "chip-cyan",
      desc: "A comprehensive platform connecting local service providers with customers. Features service listings, user reviews, secure messaging, and geo-location-based search for local service discovery.",
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      link: "https://locallie.vercel.app/",
      accentColor: "#34d399",
    },
    {
      id: "proj-4",
      imgKey: "pfm",
      title: "Finance Manager",
      subtitle: "Personal Finance Dashboard",
      tag: "Full-Stack",
      chip: "chip-cyan",
      desc: "Track income, expenses, set budgets and monitor spending habits through an intuitive dashboard interface with custom reports and analytics.",
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      link: "https://personal-finance-manager-orcin.vercel.app/",
      accentColor: "#22d3ee",
    },
    {
      id: "proj-5",
      imgKey: "ludo",
      title: "Ludo Multiplayer",
      subtitle: "Real-Time Board Game",
      tag: "Game",
      chip: "chip-pink",
      desc: "Fun and interactive multiplayer Ludo game with smooth gameplay and engaging real-time visuals utilizing WebSockets for seamless connectivity.",
      tech: ["HTML5", "CSS3", "JavaScript", "Socket.io", "Node.js"],
      link: "https://golden-pixie-4d1097.netlify.app/",
      accentColor: "#f472b6",
    },
    {
      id: "proj-6",
      imgKey: "solarSystem",
      title: "3D Solar System",
      subtitle: "Interactive 3D Simulation",
      tag: "Web",
      chip: "chip-violet",
      desc: "Visually stunning 3D solar system simulation — explore planets and celestial bodies interactively utilizing WebGL shaders and Three.js.",
      tech: ["HTML5", "CSS3", "JavaScript", "Three.js", "WebGL"],
      link: "https://solar-system-five-rho.vercel.app/",
      accentColor: "#c4b5fd",
    },
    {
      id: "proj-7",
      imgKey: "project4",
      title: "Fitness Tracker",
      subtitle: "Workout Dashboard",
      tag: "Web",
      chip: "chip-violet",
      desc: "Monitor fitness goals, track workouts and visualize progress through interactive graphs and custom routines with Chart.js.",
      tech: ["HTML5", "CSS3", "JavaScript", "Chart.js", "LocalStorage"],
      link: "https://fitness-tracker-dashboard-gray.vercel.app/",
      accentColor: "#a78bfa",
    },
    {
      id: "proj-8",
      imgKey: "todo",
      title: "To-Do App",
      subtitle: "Smart Task Manager",
      tag: "React",
      chip: "chip-cyan",
      desc: "Clean and efficient React task manager with intuitive UI, category filters, and priority management for daily to-dos.",
      tech: ["React", "Vite", "CSS3 Modules", "LocalStorage", "JavaScript"],
      link: "https://todo-sigma-snowy.vercel.app/",
      accentColor: "#22d3ee",
    },
    {
      id: "proj-9",
      imgKey: "personalLib",
      title: "Book Library",
      subtitle: "Personal Reading Tracker",
      tag: "Web",
      chip: "chip-violet",
      desc: "Manage your book collection, add new entries, rate titles, and track reading progress through a sleek responsive interface.",
      tech: ["HTML5", "CSS3", "JavaScript", "JSON Store", "Responsive"],
      link: "https://debajyotisamanta.github.io/Personal-Book-Library/",
      accentColor: "#f472b6",
    },
    {
      id: "proj-10",
      imgKey: "project1",
      title: "CodeCanvas",
      subtitle: "Responsive Web Design",
      tag: "Web",
      chip: "chip-violet",
      desc: "Visually stunning responsive web page showcasing modern design principles, fluid typography, and premium sections with animations.",
      tech: ["HTML5", "CSS3", "Responsive", "UI/UX", "Vanilla JS"],
      link: "https://debajyotisamanta.github.io/CODECANVAS/",
      accentColor: "#c4b5fd",
    },
    {
      id: "proj-11",
      imgKey: "project2",
      title: "Landing Page",
      subtitle: "Responsive Design",
      tag: "Web",
      chip: "chip-violet",
      desc: "Sleek landing page with modern aesthetics, clean grids, and smooth scrolling animations for an engaging user experience.",
      tech: ["HTML5", "CSS3", "Animations", "UI/UX", "Mobile First"],
      link: "https://debajyotisamanta.github.io/CodeClauseInternship_ResponsiveLandingPage/",
      accentColor: "#a78bfa",
    },
    {
      id: "proj-12",
      imgKey: "project3",
      title: "Age Calculator",
      subtitle: "Glassmorphic Web App",
      tag: "Web",
      chip: "chip-violet",
      desc: "Intuitive age calculator web app — precise time calculation with a clean, glassmorphic layout and smooth interactions.",
      tech: ["HTML5", "CSS3", "JavaScript", "DateTime API", "Glassmorphism"],
      link: "https://code-alpha-project-age-calculator-tau.vercel.app/",
      accentColor: "#34d399",
    },
    {
      id: "proj-13",
      imgKey: "project5",
      title: "Event Manager",
      subtitle: "Event Management System",
      tag: "Web",
      chip: "chip-violet",
      desc: "Comprehensive event management system — create, manage and track events with detailed client listings and scheduling.",
      tech: ["HTML5", "CSS3", "JavaScript", "LocalDB", "Event Planning"],
      link: "https://debajyotisamanta.github.io/CodeClauseInternship_Event_management_System/",
      accentColor: "#22d3ee",
    },
  ],

  testimonials: [
    {
      id: "test-1",
      quote: "Debajyoti's attention to detail and modern design approach transformed our vision into reality. Highly professional and excellent communication throughout the project.",
      name: "Sarah Johnson",
      role: "Startup Founder",
      avatar: "SJ",
      rating: 5,
      accent: "var(--clr-primary-dim)",
      glow: "rgba(124,58,237,0.22)",
      bg: "rgba(124,58,237,0.08)",
      border: "rgba(124,58,237,0.20)",
    },
    {
      id: "test-2",
      quote: "Outstanding full-stack developer. The mentorship platform he built exceeded all expectations — WebRTC implementation was flawless and the UI design was absolutely premium.",
      name: "Rahul Mehta",
      role: "Project Collaborator",
      avatar: "RM",
      rating: 5,
      accent: "var(--clr-cyan-bright)",
      glow: "rgba(6,182,212,0.18)",
      bg: "rgba(6,182,212,0.06)",
      border: "rgba(6,182,212,0.18)",
    },
    {
      id: "test-3",
      quote: "Working with Debajyoti on our coding club projects was an incredible experience. His leadership in the CDP program and technical mentorship helped dozens of students grow.",
      name: "Priya Sharma",
      role: "MSIT — Hackerspace",
      avatar: "PS",
      rating: 5,
      accent: "var(--clr-pink-dim)",
      glow: "rgba(236,72,153,0.18)",
      bg: "rgba(236,72,153,0.06)",
      border: "rgba(236,72,153,0.18)",
    },
    {
      id: "test-4",
      quote: "I believe in building secure, scalable applications that protect user data. Authentication, performance, and great UX are the pillars of every product I create.",
      name: "Debajyoti Samanta",
      role: "Full-Stack Developer",
      avatar: "DS",
      rating: 5,
      accent: "var(--clr-green-dim)",
      glow: "rgba(16,185,129,0.18)",
      bg: "rgba(16,185,129,0.06)",
      border: "rgba(16,185,129,0.18)",
    },
  ],

  contact: {
    heading: "Let's Build Something Extraordinary",
    subheading: "Have a project in mind, need a full-stack engineer, or want to collaborate? My inbox is always open.",
    availability: ["Freelance Projects", "Full-time Roles", "Open Source", "Collaborations"],
  },
};
