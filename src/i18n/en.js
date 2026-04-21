const withBase = (path) => {
  if (typeof path !== "string" || !path.startsWith('/')) return path;
  const normalizedPath = path.replace(/\.(png|jpe?g)$/i, '.webp');
  return `${import.meta.env.BASE_URL}${normalizedPath.slice(1)}`;
};

const messages = {
  loading: "Loading...",
  langToggle: "中",
  nav: {
    home: "Eric的个人主页",
    career: "experience",
    "vibe-coding": "projects",
    awards: "awards",
    "ai-tools": "AI tools",
    contact: "contact"
  },
  hero: {
    before: "I USE PSYCHOLOGY TO",
    after: "BETTER EXPERIENCES.",
    rotatingWords: ["DESIGN", "BUILD", "MEASURE", "PREDICT"],
    subtitle: "Psych student · Full-stack dev · UI design · Data & AI"
  },
  viewMore: "View more",
  letsWork: "Let's work",
  together: "together",
  readCode: "View GitHub",

  aboutMe: [
    {
      when: "Mindex | Intelligent Knowledge Base System",
      description: "An intelligent knowledge base system built on the 'LLM Wiki' pattern: LLMs incrementally compile raw sources into a structured, interlinked wiki—knowledge is compiled once and maintained over time. Responsible for full-stack architecture design and development of the Ingest/Lint/Query LLM pipelines.",
      from: "2026.03",
      to: "Present"
    },
    {
      when: "AI + SFBT Research | Miracle Question Visualization Platform",
      description: "Designed an online visual editing platform combining drag-and-drop, AI image generation, and guided workflows to lower the barrier to expressing psychological states in SFBT research. Built an AI dialogue agent in Coze for prompt design and workflow orchestration.",
      from: "2024.01",
      to: "2025.03"
    },
    {
      when: "Gamified Psychometrics | Face-Consciousness Scale Web App",
      description: "Redesigned a traditional psychological scale into a gamified interaction flow based on the PsychoGAT paradigm. Built an AI simulated-user testing module and independently deployed the Web prototype for usability validation.",
      from: "2025.02",
      to: "2025.12"
    },
    {
      when: "AI Mental Health Screening System R&D | Zhiyu Xinling",
      description: "Led user research, psychometric system design, and conversational interaction design for a college mental-health platform. Turned abstract psychology problems into executable product logic and experience flows. Won a Challenge Cup award and produced an AI-based BPRS assessment patent.",
      from: "2023.05",
      to: "2025.03"
    },
    {
      when: "UI/UX Research & Design | Campus Info App",
      description: "Conducted user interviews and usability studies, applying heuristic evaluation and cognitive walkthroughs to identify pain points in a campus information app. Iterated prototypes with Axure and AI tools; delivered a complete UX research report.",
      from: "2024.05",
      to: "2024.08"
    }
  ],

  projects: [
    {
      title: "Mindex",
      description: "An intelligent knowledge base system built on the 'LLM Wiki' pattern. LLMs incrementally compile raw sources into structured, interlinked wiki pages—knowledge compiled once and maintained over time. Features three core pipelines: Ingest (source understanding → mutation planning → apply), Lint (quality checks), and Query (semantic search + conversation), plus an intelligent knowledge-base maintenance Agent.",
      stage: "Status: full-stack system / LLM knowledge pipelines / Agent-assisted / in development",
      link: "https://github.com/Chinaduanyun",
      background: "/projects/mindex/header.jpg",
      hoverImage: "/projects/mindex/hover.png",
      images: ["/projects/mindex/monitor/01.png"]
    },
    {
      title: "Campus Info Platform Prototype",
      description: "A high-fidelity prototype for a campus information platform, built as a product-usability course project. Focused on usability, information architecture, and real user paths—not just visual polish.",
      stage: "Status: high-fidelity prototype / product-usability course project / public demo available",
      link: "https://github.com/Chinaduanyun/Psychology-community",
      background: "/projects/campus-info/header.jpg",
      hoverImage: "/projects/campus-info/hover.png",
      images: ["/projects/campus-info/monitor/01.png", "/projects/campus-info/monitor/02.png"]
    },
    {
      title: "Insta Rental Platform",
      description: "An HCI course project pushed to near-production quality. 7 user-side + 5 merchant-side high-fidelity pages with a runnable front-end MVP. Covers browsing, ordering, favorites, reviews, and merchant management. Mobile-first with localStorage persistence.",
      stage: "Status: high-fidelity prototype + front-end MVP / full user-merchant flow / mobile-first",
      link: "https://github.com/Chinaduanyun/Insta_Rental_Platform",
      background: "/projects/insta-rental/header.jpg",
      hoverImage: "/projects/insta-rental/hover.png",
      images: ["/projects/insta-rental/monitor/01.png", "/projects/insta-rental/monitor/02.png", "/projects/insta-rental/monitor/03.png", "/projects/insta-rental/monitor/04.png"]
    },
    {
      title: "Miracle Question Experiment Management & Image Generation System",
      description: "An experiment-management and AI workflow system for miracle-question research. Supports experiment creation, process logging, and result entry with speech-to-text and AI image generation. Core interaction: canvas-based icon editing with AI-generated imagery to lower the barrier for expressing abstract psychological ideas.",
      stage: "Status: experiment management system / multimodal AI workflow / productization for psychology research tools",
      link: "https://github.com/Chinaduanyun/Miracle-Question-Prompts-Guide",
      background: "/projects/miracle-question/header.jpg",
      hoverImage: "/projects/miracle-question/hover.png",
      images: ["/projects/miracle-question/monitor/01.png", "/projects/miracle-question/monitor/02.png", "/projects/miracle-question/monitor/03.png", "/projects/miracle-question/monitor/04.png"]
    },
    {
      title: "Global Game Jam 2026",
      description: "A 48-hour global game development marathon. Led game design documentation and project architecture, developed a Unity Editor level editor, and used GitHub Copilot for AI vibe coding. Shipped a single-player turn-based strategy board game with full level flow via WebGL.",
      stage: "Status: 48h Game Jam / Unity + WebGL / AI vibe coding",
      link: "https://github.com/Chinaduanyun",
      background: "/projects/ggj-2026/header.jpg",
      hoverImage: "/projects/ggj-2026/hover.png",
      images: ["/projects/ggj-2026/monitor/01.png"]
    },
    {
      title: "Eric的个人主页",
      description: "A continuously evolving personal website serving as an experiment in self-presentation and information architecture. Replacing a static resume with a living site that shows how I think, build, and connect disciplines.",
      stage: "Status: personal website / continuously evolving",
      link: "https://duanyun.me/",
      background: "/projects/duanyun-me/header.jpg",
      hoverImage: "/projects/duanyun-me/hover.png",
      images: ["/projects/duanyun-me/monitor/01.png", "/projects/duanyun-me/monitor/02.png", "/projects/duanyun-me/monitor/03.png", "/projects/duanyun-me/monitor/04.png"]
    }
  ],

  awards: {
    title: "Awards & Honors",
    subtitle: "Tangible milestones from bringing psychology, design, and technology together.",
    items: [
      {
        title: "Invention Patent | AI Psychological Assessment Method and System Based on BPRS",
        level: "National",
        time: "2025.04",
        detail: "Patent No. 202410363734.X — an important step for me in turning psychological assessment into something that can actually be systematized and implemented."
      },
      {
        title: "Multiple Challenge Cup Competition Second Prizes",
        level: "University",
        time: "2025.05",
        detail: "Project: Zhiyu Xinling — an AI-based early screening and psychological assessment system built on BPRS."
      },
      {
        title: "National Student Psychology & Behavior Online Experiment Competition — Second Prize",
        level: "University",
        time: "2025.09",
        detail: "Project: a gamified psychological scale built on the PsychoGAT paradigm."
      },
      {
        title: "Zhejiang Multimedia Design Competition — Second Prize",
        level: "Provincial",
        time: "2024.04",
        detail: "This experience in visual storytelling also shaped the way I think about interface design and product presentation today."
      },
      {
        title: "Outstanding Communist Youth League Member / Cadre",
        level: "University",
        time: "2023–2025",
        detail: "Awarded over multiple years — a reminder that I don’t just build personal projects, I also take sustained responsibility in real organizations."
      },
      {
        title: "Academic & Student Leadership Honors",
        level: "University",
        time: "2023.12–2025.01",
        detail: "Including merit scholarship, student leadership awards, and social work honors — reflecting consistency and long-term commitment."
      },
      {
        title: "Visual China Group — Contracted Contributor",
        level: "Industry",
        time: "2023",
        detail: "Long-term contributor with professional imagery creation and visual storytelling capability."
      },
      {
        title: "Data Analysis Certificate + Psychology & Behavior Research Analyst",
        level: "Industry",
        time: "2023–2024",
        detail: "Data Analysis Professional Skills Certificate (2023) and Outstanding Psychology & Behavior Research Analyst LEVEL I (2024), validating data analysis and behavioral research competency."
      }
    ]
  },

  aiTools: {
    title: "AI Toolkit",
    subtitle: "Core tools used in psychology research, product design, and AI-driven development.",
    tools: [
      { name: "Claude Code", icon: "/ai-tools/icons/claude-code.svg", url: "https://docs.anthropic.com/en/docs/claude-code", desc: "AI coding terminal for understanding codebases, reshaping prototypes, and building faster.", large: true },
      { name: "VS Code", icon: "/ai-tools/icons/vscode.png", url: "https://code.visualstudio.com/", desc: "A lightweight but powerful editor for daily development, scripting, and multi-language work.", large: true },
      { name: "R", icon: "/ai-tools/icons/r.svg", url: "https://www.r-project.org/", desc: "Used for statistical analysis, experimental data processing, and research modeling.", large: false },
      { name: "Obsidian", icon: "/ai-tools/icons/obsidian.svg", url: "https://obsidian.md", desc: "Local-first Markdown knowledge base for research notes, tasks, and product thinking.", large: false },
      { name: "Coze", icon: "/ai-tools/icons/coze.png", url: "https://www.coze.com", desc: "Great for building AI agents, prompt systems, and workflow orchestration.", large: true },
      { name: "Python", icon: "/ai-tools/icons/python.ico", url: "https://www.python.org", desc: "Used for experiment data processing, analysis pipelines, and small research tools.", large: true },
      { name: "Cursor", icon: "/ai-tools/icons/cursor.png", url: "https://cursor.com", desc: "An AI-native editor that helps me move quickly from ideas to prototypes.", large: false },
      { name: "GitHub Copilot", icon: "/ai-tools/icons/github-copilot.png", url: "https://github.com/features/copilot", desc: "A coding companion I used heavily in Game Jam projects and rapid prototyping.", large: false },
      { name: "SPSS", icon: "/ai-tools/icons/spss.svg", url: "https://www.ibm.com/products/spss-statistics", desc: "A core tool in my psychology experiments and data validation workflow.", large: false },
      { name: "Figma", icon: "/ai-tools/icons/figma.png", url: "https://www.figma.com", desc: "My go-to canvas for interface structure, visual exploration, and communicating product ideas.", large: false },
      { name: "Axure", icon: "/ai-tools/icons/axure.ico", url: "https://www.axure.com", desc: "Useful for information architecture and interaction-flow prototyping.", large: true },
      { name: "RStudio", icon: "/ai-tools/icons/rstudio.svg", url: "https://posit.co/download/rstudio-desktop/", desc: "My usual environment for R-based analysis, visualization, and research workflows.", large: false },
      { name: "Google AI Studio", icon: "/ai-tools/icons/google-ai-studio.svg", url: "https://aistudio.google.com", desc: "A quick playground for validating multimodal and model interaction ideas.", large: false }
    ]
  },

  contact: {
    "Contact": [
      {
        text: "hz_eric@qq.com",
        href: "mailto:hz_eric@qq.com"
      },
      {
        text: "+86 13306525599",
        href: "tel:+8613306525599"
      }
    ],
    "Social": [
      {
        text: "WeChat: wehadaday",
        href: "#"
      }
    ],
    "Open source": [
      {
        text: "GitHub",
        href: "https://github.com/Chinaduanyun",
        target: "_blank"
      }
    ]
  }
};

messages.projects = messages.projects.map((project) => ({
  ...project,
  background: withBase(project.background),
  hoverImage: withBase(project.hoverImage),
  images: project.images.map(withBase)
}));

messages.aiTools.tools = messages.aiTools.tools.map((tool) => ({
  ...tool,
  icon: withBase(tool.icon)
}));

export default messages
