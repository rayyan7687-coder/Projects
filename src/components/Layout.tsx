import React from 'react';
import { Moon, Sun, ChevronDown, Sparkles, Terminal, ArrowLeft } from 'lucide-react';
import { PROJECTS_LIST } from '../types/projects';

interface LayoutProps {
  children: React.ReactNode;
  activeProjectId: number | null;
  onSelectProject: (projectId: number | null) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeProjectId,
  onSelectProject,
  darkMode,
  setDarkMode,
}) => {
  const currentProject = PROJECTS_LIST.find(p => p.id === activeProjectId);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo / Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectProject(null)}
              className="flex items-center gap-2 group cursor-pointer text-left bg-transparent border-0 p-0"
            >
              <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
                J
              </div>
              <div className="text-left">
                <span className="block font-black text-slate-900 dark:text-white tracking-tight leading-tight text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  JULES ARCHITECT
                </span>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider leading-none">
                  Interactive Showcase
                </span>
              </div>
            </button>

            {activeProjectId !== null && (
              <button
                onClick={() => onSelectProject(null)}
                className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer ml-2"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Home
              </button>
            )}
          </div>

          {/* Center Project Fast-Switcher (Dropdown) */}
          <div className="relative group/dropdown">
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer">
              <Terminal className="h-3.5 w-3.5 text-indigo-500" />
              {currentProject ? currentProject.title : "Quick Select Playground"}
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 hidden group-hover/dropdown:block hover:block z-50">
              <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                Interactive Platforms
              </div>
              <button
                onClick={() => onSelectProject(null)}
                className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                  activeProjectId === null
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                Portfolio Home
              </button>
              {PROJECTS_LIST.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onSelectProject(project.id)}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    activeProjectId === project.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span>{project.title}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">{project.category.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Area: Light/Dark Mode & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer transition-all"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="#contact"
              onClick={() => onSelectProject(null)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" /> Contact
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 mt-20 py-10 text-center text-slate-500 dark:text-slate-400 text-xs font-medium space-y-2">
        <p>© 2026 Jules Engineering Portfolio. Designed with high fidelity, pixel-perfect UX, and production-grade concepts.</p>
        <p className="text-slate-400 dark:text-slate-600">Built using React 19, TypeScript, and Tailwind CSS. All rights reserved.</p>
      </footer>
    </div>
  );
};
