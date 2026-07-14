import React from 'react';
import { Terminal, Award, Layers, Mail, ArrowRight, ExternalLink, Sparkles, ChevronRight } from 'lucide-react';
import { PROJECTS_LIST } from '../types/projects';

interface PortfolioHomeProps {
  onSelectProject: (projectId: number) => void;
}

export const PortfolioHome: React.FC<PortfolioHomeProps> = ({ onSelectProject }) => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-8 md:p-16 text-white border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,119,198,0.25),transparent_50%)]"></div>

        <div className="relative max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Full-Stack & AI Systems Architect
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Crafting the Future of <br className="hidden md:inline" /> Intelligent Software
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
            Welcome to my Interactive Portfolio Playground. Below is a suite of 9 high-fidelity, interactive, and beautifully designed full-stack system simulators. Click any project to open its live interactive dashboard, where you can experiment, run simulated live tasks, and explore the core architectural patterns.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer text-sm"
            >
              Explore Interactive Playgrounds <ArrowRight className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-3">
              <a href="#" className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 font-bold text-xs" title="GitHub">
                GitHub
              </a>
              <a href="#" className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 font-bold text-xs" title="LinkedIn">
                LinkedIn
              </a>
              <a href="mailto:jules@example.com" className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 flex items-center gap-1.5 font-bold text-xs" title="Contact Email">
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Matrix / Architectural DNA */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              Engineering Competencies
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">My core skills structured across layers of modern enterprise infrastructure.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400 w-fit">
              <Terminal className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">AI & Data Engineering</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">LLM integration, real-time Natural Language Processing (NLP), Vector Databases, similarity search, and machine learning forecasting.</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["LangChain", "OpenAI API", "Hugging Face", "FAISS", "Vector DBs", "FastAPI", "NLP Pipelines"].map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">{s}</span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-teal-600 dark:text-teal-400 w-fit">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Full-Stack Architecture</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">High-performance scalable client applications, RESTful and real-time APIs, robust RBAC systems, and reactive transactional flows.</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["React", "Node.js", "Express", "PostgreSQL", "Redis", "Stripe", "WebSockets", "Socket.io", "TypeScript"].map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 text-xs font-semibold">{s}</span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="p-3 bg-violet-50 dark:bg-violet-950/40 rounded-xl text-violet-600 dark:text-violet-400 w-fit">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">DevOps & Cloud Infrastructure</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">CI/CD automation, Docker orchestration, Kubernetes baselining, load balancing, real-time message brokering, and edge networking.</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Docker", "Kubernetes", "AWS Cloud", "Nginx", "GitHub Actions", "MQTT", "Linux Shell", "Supabase"].map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-md bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 text-xs font-semibold">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Hub */}
      <section id="projects" className="space-y-6 scroll-mt-20">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            Interactive Project Playgrounds
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Select any project to launch its simulated full-stack sandbox environments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_LIST.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-400 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {project.category}
                  </span>
                  <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${
                    project.difficulty === 'Expert'
                      ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/30 dark:border-rose-900 dark:text-rose-400'
                      : project.difficulty === 'Advanced'
                      ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-400'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-400'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-lg flex items-center justify-between gap-1">
                    {project.title}
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 shrink-0" />
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium border border-slate-100 dark:border-slate-800/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{project.impactFactor}</span>
                <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  Launch <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="bg-slate-50 dark:bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800/50 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">Professional Journey</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">A timeline of scaling business systems and pioneering intelligence layers.</p>
        </div>

        <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 ml-4 space-y-10">
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 bg-indigo-600 rounded-full h-4 w-4 border-4 border-white dark:border-slate-950"></div>
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">2024 - Present</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Senior Full-Stack & Intelligent Systems Architect</h3>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Nexis AI Corp</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mt-2">
                Pioneered high-performance LLM-powered orchestration pipelines, improving content relevance by 45%. Designed and implemented low-latency MQTT IoT interfaces and reactive state synchronization engines.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 bg-teal-600 rounded-full h-4 w-4 border-4 border-white dark:border-slate-950"></div>
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">2022 - 2024</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lead Software Engineer</h3>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Apex Ledger & WebTech</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mt-2">
                Directed development of robust transaction ledgers and real-time analytical dashboards. Established automated Kubernetes deployment platforms, cutting release overhead and cycle times by 30%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Contact / Recruiter Connect Section */}
      <section id="contact" className="bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-8 md:p-12 rounded-3xl border border-indigo-100 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="space-y-4 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">Ready to hire or collaborate?</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            I am currently open to senior engineering roles, architectural positions, or consulting opportunities. Send a message, or download my comprehensive resume details directly from the analyzer playground.
          </p>
          <div className="flex gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Active & Available for Roles
            </span>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert('Message sent! (This is a mock portfolio form - simulated successfully).'); }} className="w-full md:w-auto min-w-[320px] bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white">Quick Recruiter Connect</h3>
          <div className="space-y-3">
            <input required type="text" placeholder="Your Name" className="w-full text-sm p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input required type="email" placeholder="Your Email" className="w-full text-sm p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <textarea required rows={3} placeholder="Project/Role Details" className="w-full text-sm p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
          </div>
          <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-lg transition-colors cursor-pointer">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};
