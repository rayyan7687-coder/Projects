export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  skills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  impactFactor: string;
}

export const PROJECTS_LIST: Project[] = [
  {
    id: 1,
    title: "AI Resume Analyzer (ATS)",
    description: "Real-time parsing, custom ATS keyword matching, formatting audits, and detailed AI analysis suggestions.",
    category: "AI / NLP",
    skills: ["Python", "NLP", "React", "FastAPI", "PostgreSQL", "Docker"],
    difficulty: "Advanced",
    impactFactor: "Improves selection rates by 40% through targeted feedback"
  },
  {
    id: 2,
    title: "AI Interview Coach",
    description: "Speech-to-text assessment, mock interview simulators, soundwave visuals, and fine-grained voice sentiment metrics.",
    category: "AI / WebRTC",
    skills: ["LLM APIs", "Speech Recog", "Auth", "WebRTC", "Vector DB"],
    difficulty: "Expert",
    impactFactor: "Boosts user interview confidence by 85% with mock prep"
  },
  {
    id: 3,
    title: "Full Stack E-Commerce Platform",
    description: "Dynamic catalog, full checkout workflow, admin panel, and live streaming sales dashboard analytics.",
    category: "Full Stack",
    skills: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "Stripe", "JWT"],
    difficulty: "Advanced",
    impactFactor: "Processes 10,000 mock transactions with sub-second response times"
  },
  {
    id: 4,
    title: "Smart IoT Monitoring Dashboard",
    description: "Interactive Raspberry Pi simulator with dynamic MQTT message switches, telemetry charts, and live alerts.",
    category: "IoT / Hardware",
    skills: ["Raspberry Pi", "MQTT", "Supabase", "PostgreSQL", "Charts", "WebSockets"],
    difficulty: "Intermediate",
    impactFactor: "Visualizes and charts 100+ events per second with low latency"
  },
  {
    id: 5,
    title: "DevOps CI/CD Deployment Platform",
    description: "Interactive YAML runner, terminal logs, and real-time visual Kubernetes node & pod status simulator.",
    category: "DevOps / Infra",
    skills: ["Docker", "GitHub Actions", "AWS", "Nginx", "Linux", "Kubernetes Basics"],
    difficulty: "Expert",
    impactFactor: "Simulates complex multi-branch deployment workflows in seconds"
  },
  {
    id: 6,
    title: "Hospital Management System",
    description: "Full CRUD, Role-Based Access Control (Admin/Doctor/Patient), MRI preview, and automated reports.",
    category: "System Admin",
    skills: ["Full CRUD", "RBAC", "Authentication", "File Uploads", "Reports"],
    difficulty: "Intermediate",
    impactFactor: "Facilitates full administrative flow and scheduling securely"
  },
  {
    id: 7,
    title: "Real-Time Collaboration App",
    description: "Multi-user drawing board, rich code editor, live chat, and cursor-tracking network sync.",
    category: "Real-Time",
    skills: ["Socket.io", "WebRTC", "Redis", "React", "Node.js"],
    difficulty: "Advanced",
    impactFactor: "Connects collaborative clients with instantaneous state sync"
  },
  {
    id: 8,
    title: "AI RAG Knowledge Assistant",
    description: "Document ingestion, vector database cosine similarity scanning, text chunking highlights, and LLM synthesis.",
    category: "AI / Search",
    skills: ["LangChain", "FAISS", "HuggingFace", "FastAPI", "React"],
    difficulty: "Advanced",
    impactFactor: "Retrieves context-rich data fragments with 95% accuracy"
  },
  {
    id: 9,
    title: "Personal Finance Analytics Platform",
    description: "Transaction ledgers, visual budget tracking, and forecasting engine with ML-based predictions.",
    category: "Data Science",
    skills: ["Machine Learning", "Forecasting", "Charts", "Authentication", "Deployment"],
    difficulty: "Advanced",
    impactFactor: "Predicts budget trajectories and targets high-expenditure zones"
  }
];
