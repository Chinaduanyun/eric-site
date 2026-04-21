const withBase = (path) => {
  if (typeof path !== "string" || !path.startsWith('/')) return path;
  const normalizedPath = path.replace(/\.(png|jpe?g)$/i, '.webp');
  return `${import.meta.env.BASE_URL}${normalizedPath.slice(1)}`;
};

const messages = {
  loading: "加载中...",
  langToggle: "EN",
  nav: {
    home: "Eric的个人主页",
    career: "心理与经历",
    "vibe-coding": "项目实践",
    awards: "奖项荣誉",
    "ai-tools": "AI 工具",
    contact: "联系"
  },
  hero: {
    before: "I USE PSYCHOLOGY TO",
    after: "BETTER EXPERIENCES.",
    rotatingWords: ["DESIGN", "BUILD", "MEASURE", "PREDICT"],
    subtitle: "Psych student · Full-stack dev · UI design · Data & AI"
  },
  viewMore: "查看更多",
  letsWork: "Let's work",
  together: "together",
  readCode: "查看 GitHub",

  aboutMe: [
    {
      when: "Mindex｜智能知识库系统",
      description: "基于「LLM Wiki」模式的智能知识库系统：LLM 将原始资料增量编译为结构化互链 Wiki，知识一次编译、持续维护。负责全栈架构设计、LLM Ingest/Lint/Query 三大管线开发与产品化推进。",
      from: "2026.03",
      to: "至今"
    },
    {
      when: "AI + SFBT 研究｜奇迹提问可视化平台",
      description: "针对 SFBT 场景中的表达困难，设计在线图像编辑交互平台，整合拖拽操作、AI 图像生成与引导式流程，降低心理表达门槛。使用扣子搭建 AI 对话智能体，完成提示词与工作流编排。",
      from: "2024.01",
      to: "2025.03"
    },
    {
      when: "心理测评游戏化｜面子意识量表 Web App",
      description: "基于 PsychoGAT 范式将传统心理量表重设计为游戏化交互体验，搭建 AI 模拟用户测试模块，独立完成 Web 原型部署与可用性验证。",
      from: "2025.02",
      to: "2025.12"
    },
    {
      when: "AI心理筛查系统研发｜智愈心灵",
      description: "围绕大学生心理健康场景，主导用户调研、心理评价系统与对话交互设计，将心理学问题拆解为产品逻辑与体验流程。获挑战杯二等奖，产出一项 AI 心理评估发明专利。",
      from: "2023.05",
      to: "2025.03"
    },
    {
      when: "UI/UX 研究与设计｜校园资讯 App",
      description: "组织用户访谈与可用性评估，通过启发式评估和认知走查识别校园资讯 App 核心痛点。使用 Axure 与 AI 工具推进原型迭代，输出完整 UX 调研报告。",
      from: "2024.05",
      to: "2024.08"
    }
  ],

  projects: [
    {
      title: "Mindex",
      description: "基于「LLM Wiki」模式的智能知识库系统。LLM 将原始资料增量编译为结构化双链 Wiki，知识一次编译、持续维护。包含 Ingest（源文件理解→变更规划→执行）、Lint（质量检查）、Query（语义搜索对话）三大核心管线，以及智能知识库维护 Agent。",
      stage: "项目阶段：全栈系统 / LLM 知识管线 / Agent 辅助功能 / 开发中",
      link: "https://github.com/Chinaduanyun",
      background: "/projects/mindex/header.jpg",
      hoverImage: "/projects/mindex/hover.png",
      images: ["/projects/mindex/monitor/01.png"]
    },
    {
      title: '校园资讯平台',
      description: "产品可用性课程项目——校园资讯平台高保真原型。关注产品可用性、信息结构与真实用户路径，而不仅是界面视觉。",
      stage: "项目阶段：高保真原型 / 产品可用性课程项目 / 在线展示可访问",
      link: "https://github.com/Chinaduanyun/Psychology-community",
      background: "/projects/campus-info/header.jpg",
      hoverImage: "/projects/campus-info/hover.png",
      images: ["/projects/campus-info/monitor/01.png", "/projects/campus-info/monitor/02.png"]
    },
    {
      title: "拍立得租赁平台",
      description: "人机交互课程项目，做成了接近真实产品的形态。含用户端 7 页 + 商户端 5 页高保真原型与可运行前端 MVP，覆盖浏览、下单、收藏、评价、商品管理等完整流程。移动端优先，localStorage 持久化。",
      stage: "项目阶段：高保真原型 + 前端 MVP / 双端流程完整 / 移动端优先",
      link: "https://github.com/Chinaduanyun/Insta_Rental_Platform",
      background: "/projects/insta-rental/header.jpg",
      hoverImage: "/projects/insta-rental/hover.png",
      images: ["/projects/insta-rental/monitor/01.png", "/projects/insta-rental/monitor/02.png", "/projects/insta-rental/monitor/03.png", "/projects/insta-rental/monitor/04.png"]
    },
    {
      title: "奇迹提问实验管理与图像生成系统",
      description: "围绕「奇迹问句」研究场景的实验管理与 AI 辅助系统。支持实验创建、过程记录与结果录入，整合录音转写、AI 图像生成等模块。核心交互：画布式图标编辑 + AI 辅助生成生活化图片，降低心理表达门槛。",
      stage: "项目阶段：实验管理系统 / 多模态 AI 工作流 / 心理研究工具产品化",
      link: "https://github.com/Chinaduanyun/Miracle-Question-Prompts-Guide",
      background: "/projects/miracle-question/header.jpg",
      hoverImage: "/projects/miracle-question/hover.png",
      images: ["/projects/miracle-question/monitor/01.png", "/projects/miracle-question/monitor/02.png", "/projects/miracle-question/monitor/03.png", "/projects/miracle-question/monitor/04.png"]
    },
    {
      title: "Global Game Jam 2026",
      description: "48 小时全球游戏开发马拉松。主导需求文档与项目架构设计，开发 Unity Editor 关卡编辑器，使用 GitHub Copilot 进行 AI vibe coding。完成 WebGL 打包部署，交付完整单人回合制策略游戏。",
      stage: "项目阶段：48h Game Jam / Unity + WebGL / AI vibe coding",
      link: "https://github.com/Chinaduanyun",
      background: "/projects/ggj-2026/header.jpg",
      hoverImage: "/projects/ggj-2026/hover.png",
      images: ["/projects/ggj-2026/monitor/01.png"]
    },
    {
      title: "Eric的个人主页",
      description: "持续迭代的个人网站，作为自我表达和信息架构的实验场。用一个不断成长的网站替代静态简历，展示思考方式与技术实践。",
      stage: "项目阶段：个人官网 / 持续迭代中",
      link: "https://duanyun.me/",
      background: "/projects/duanyun-me/header.jpg",
      hoverImage: "/projects/duanyun-me/hover.png",
      images: ["/projects/duanyun-me/monitor/01.png", "/projects/duanyun-me/monitor/02.png", "/projects/duanyun-me/monitor/03.png", "/projects/duanyun-me/monitor/04.png"]
    }
  ],

  awards: {
    title: "奖项荣誉",
    subtitle: "心理学、设计与技术交叉实践的阶段性成果。",
    items: [
      {
        title: "发明专利｜一种基于 BPRS 的简明精神病量表的心理评估方法及系统",
        level: "国家级",
        time: "2025.04",
        detail: "专利号 202410363734.X。把心理评估方法真正推进到可被系统实现，是我很看重的一步。"
      },
      {
        title: "多次获得挑战杯竞赛二等奖",
        level: "校级",
        time: "2025.05",
        detail: "项目：智愈心灵——基于 BPRS 的 AI 心理疾病早期筛查与评估系统。"
      },
      {
        title: "全国大学生心理与行为在线实验精英赛二等奖",
        level: "校级",
        time: "2025.09",
        detail: "项目：基于 PsychoGAT 范式的游戏化心理量表。"
      },
      {
        title: "浙江省大学生多媒体作品设计竞赛二等奖",
        level: "省级",
        time: "2024.04",
        detail: "这类视觉表达训练也反过来影响了我今天做产品界面和内容叙事的方式。"
      },
      {
        title: "优秀共青团员 / 优秀共青团干部",
        level: "校级",
        time: "2023–2025",
        detail: "连续多年获得，意味着我并不只是在做个人项目，也长期在真实组织里承担责任。"
      },
      {
        title: "三好学生、优秀学生干部、二等奖学金等综合荣誉",
        level: "校级",
        time: "2023.12–2025.01",
        detail: "包含社会工作奖学金、社会活动积极分子等。这些称号本身不是重点，背后反映的是稳定输出和长期投入。"
      },
      {
        title: "视觉中国签约供稿人",
        level: "行业级",
        time: "2023",
        detail: "长期供稿，具备专业影像创作与视觉叙事能力。"
      },
      {
        title: "数据分析专业技能证书 + 优秀心理与行为分析研究员",
        level: "行业级",
        time: "2023–2024",
        detail: "数据分析专业技能证书（2023）、优秀心理与行为分析研究员 LEVEL I（2024），系统验证数据分析与心理行为研究能力。"
      }
    ]
  },

  aiTools: {
    title: "AI 工具集",
    subtitle: "心理研究、产品设计与 AI 开发中的常用工具。",
    tools: [
      { name: "Claude Code", icon: "/ai-tools/icons/claude-code.svg", url: "https://docs.anthropic.com/en/docs/claude-code", desc: "AI 编程终端，快速理解项目结构、重构原型和推进开发。", large: true },
      { name: "VS Code", icon: "/ai-tools/icons/vscode.png", url: "https://code.visualstudio.com/", desc: "轻量但高效的编辑器，适合日常开发、脚本整理与多语言协作。", large: true },
      { name: "R", icon: "/ai-tools/icons/r.svg", url: "https://www.r-project.org/", desc: "用于统计分析、实验数据处理与心理学研究中的建模工作。", large: false },
      { name: "Obsidian", icon: "/ai-tools/icons/obsidian.svg", url: "https://obsidian.md", desc: "基于本地 Markdown 的知识管理工具，用于研究笔记、任务流和产品思考。", large: false },
      { name: "Coze", icon: "/ai-tools/icons/coze.png", url: "https://www.coze.com", desc: "用于搭建 AI 对话智能体、设计提示词和编排工作流。", large: true },
      { name: "Python", icon: "/ai-tools/icons/python.ico", url: "https://www.python.org", desc: "用于实验数据处理、分析流程和研究型小工具开发。", large: true },
      { name: "Cursor", icon: "/ai-tools/icons/cursor.png", url: "https://cursor.com", desc: "AI 原生编辑器，适合快速从想法走到原型。", large: false },
      { name: "GitHub Copilot", icon: "/ai-tools/icons/github-copilot.png", url: "https://github.com/features/copilot", desc: "在 Game Jam 和原型开发中高频使用的协作式编码助手。", large: false },
      { name: "SPSS", icon: "/ai-tools/icons/spss.svg", url: "https://www.ibm.com/products/spss-statistics", desc: "心理学数据分析、实验结果整理与验证的基础工具。", large: false },
      { name: "Figma", icon: "/ai-tools/icons/figma.png", url: "https://www.figma.com", desc: "做界面结构、视觉探索和产品表达时的常用画布。", large: false },
      { name: "Axure", icon: "/ai-tools/icons/axure.ico", url: "https://www.axure.com", desc: "更偏向信息架构与交互流程梳理的原型工具。", large: true },
      { name: "RStudio", icon: "/ai-tools/icons/rstudio.svg", url: "https://posit.co/download/rstudio-desktop/", desc: "R 语言分析、可视化与研究型工作流的集成环境。", large: false },
      { name: "Google AI Studio", icon: "/ai-tools/icons/google-ai-studio.svg", url: "https://aistudio.google.com", desc: "快速验证模型能力和多模态交互思路的实验场。", large: false }
    ]
  },

  contact: {
    "联系我": [
      {
        text: "hz_eric@qq.com",
        href: "mailto:hz_eric@qq.com"
      },
      {
        text: "+86 13306525599",
        href: "tel:+8613306525599"
      }
    ],
    "社交媒体": [
      {
        text: "微信：wehadaday",
        href: "#"
      }
    ],
    "开源项目": [
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
