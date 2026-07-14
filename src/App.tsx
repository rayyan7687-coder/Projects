import { Layout } from './components/Layout';
import { PortfolioHome } from './components/PortfolioHome';

// Interactive Playgrounds
import { AIResumeAnalyzer } from './playgrounds/AIResumeAnalyzer';
import { AIInterviewCoach } from './playgrounds/AIInterviewCoach';
import { FullStackECommerce } from './playgrounds/FullStackECommerce';
import { SmartIoTMonitoring } from './playgrounds/SmartIoTMonitoring';
import { DevOpsCICDPlatform } from './playgrounds/DevOpsCICDPlatform';
import { HospitalManagementSystem } from './playgrounds/HospitalManagementSystem';
import { RealTimeCollaboration } from './playgrounds/RealTimeCollaboration';
import { AIRAGKnowledgeAssistant } from './playgrounds/AIRAGKnowledgeAssistant';
import { PersonalFinanceAnalytics } from './playgrounds/PersonalFinanceAnalytics';
import { useEffect, useState } from 'react';

export default function App() {
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme-preference');
    return saved ? saved === 'dark' : true; // Default dark mode for ultimate tech aesthetic
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme-preference', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme-preference', 'light');
    }
  }, [darkMode]);

  const handleSelectProject = (projectId: number | null) => {
    setActiveProjectId(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout
      activeProjectId={activeProjectId}
      onSelectProject={handleSelectProject}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    >
      {activeProjectId === null && (
        <PortfolioHome onSelectProject={handleSelectProject} />
      )}

      {activeProjectId === 1 && <AIResumeAnalyzer />}
      {activeProjectId === 2 && <AIInterviewCoach />}
      {activeProjectId === 3 && <FullStackECommerce />}
      {activeProjectId === 4 && <SmartIoTMonitoring />}
      {activeProjectId === 5 && <DevOpsCICDPlatform />}
      {activeProjectId === 6 && <HospitalManagementSystem />}
      {activeProjectId === 7 && <RealTimeCollaboration />}
      {activeProjectId === 8 && <AIRAGKnowledgeAssistant />}
      {activeProjectId === 9 && <PersonalFinanceAnalytics />}
    </Layout>
  );
}
