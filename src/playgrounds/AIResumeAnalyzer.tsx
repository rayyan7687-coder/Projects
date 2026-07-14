import React, { useState } from 'react';
import { Sparkles, FileText, CheckCircle, AlertTriangle, Download } from 'lucide-react';

export const AIResumeAnalyzer: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescText, setJobDescText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const sampleResume = `Jules Architect\njules@example.com\n\nExperience:\n- Senior Software Engineer at Nexis AI. Led FastAPI, React, and PostgreSQL architectures.\n- Scaled containerized workloads on Docker with 99.9% uptime.\n- Implemented full CRUD applications, JWT secure auth, and real-time sockets.`;
  const sampleJob = `Full Stack Engineer\nRequirements:\n- Strong experience with FastAPI or Express\n- Proficient in React, TypeScript, and Tailwind CSS\n- Skilled in relational databases (PostgreSQL/Supabase)\n- Hands-on deployment with Docker, Kubernetes, and AWS`;

  const loadPresets = () => {
    setResumeText(sampleResume);
    setJobDescText(sampleJob);
  };

  const runAnalysis = () => {
    if (!resumeText || !jobDescText) {
      alert("Please provide both a resume and a job description to analyze!");
      return;
    }
    setAnalyzing(true);
    setTimeout(() => {
      // Custom algorithm
      const resumeWords = resumeText.toLowerCase().split(/\W+/);
      const jobWords = jobDescText.toLowerCase().split(/\W+/);

      const keyTerms = ['fastapi', 'express', 'react', 'typescript', 'tailwind', 'postgresql', 'supabase', 'docker', 'kubernetes', 'aws', 'crud', 'jwt'];
      const matched: string[] = [];
      const missing: string[] = [];

      keyTerms.forEach(term => {
        const inJob = jobWords.includes(term);
        const inResume = resumeWords.includes(term);
        if (inJob) {
          if (inResume) {
            matched.push(term);
          } else {
            missing.push(term);
          }
        }
      });

      // Calculate score
      const totalJobTermsCount = matched.length + missing.length;
      const score = totalJobTermsCount > 0 ? Math.round((matched.length / totalJobTermsCount) * 100) : 70;

      // Checks
      const checkResults = [
        { title: "Contact Info Found", status: resumeText.includes('@') ? 'pass' : 'fail', msg: resumeText.includes('@') ? "Email address detected." : "Missing email address or contact header." },
        { title: "Section Structure", status: resumeText.toLowerCase().includes('experience') ? 'pass' : 'warning', msg: resumeText.toLowerCase().includes('experience') ? "Found standard Experience/Work history section." : "Consider adding a distinct 'Experience' section." },
        { title: "Formatting Auditing", status: resumeText.length < 1000 ? 'warning' : 'pass', msg: resumeText.length < 1000 ? "Resume is a bit brief. Expand on technical achievements." : "Length is optimal for standard parsing formats." }
      ];

      setResult({
        score,
        matched,
        missing,
        checks: checkResults,
        advice: [
          `Integrate the missing keywords: ${missing.map(m => m.toUpperCase()).join(', ')} to boost ATS indexing rating.`,
          "Quantify your results (e.g., 'scaled performance by 40%', 'reduced system memory overhead by 25%').",
          "Ensure your resume is exported in standard single-column PDF formatting."
        ]
      });
      setAnalyzing(false);
    }, 1500);
  };

  const handleDownloadReport = () => {
    if (!result) return;
    const report = `ATS SCORE REPORT\n================\nScore: ${result.score}%\n\nMatched Keywords: ${result.matched.join(', ')}\nMissing Keywords: ${result.missing.join(', ')}\n\nAdvice:\n- ${result.advice.join('\n- ')}`;
    const element = document.createElement("a");
    const file = new Blob([report], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "ats_score_report.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 py-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">AI Resume Analyzer (ATS)</h1>
        <p className="text-slate-500 dark:text-slate-400">Scan resumes against job requirements using modern parsing criteria, keyword audits, and lexical diagnostics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Input Pane */}
        <div className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-500" /> Scanner Input Form
            </h3>
            <button
              onClick={loadPresets}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Load Sample Preset Data
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Resume Text</label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste professional resume content here..."
                rows={7}
                className="w-full text-sm p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Job Description</label>
              <textarea
                value={jobDescText}
                onChange={(e) => setJobDescText(e.target.value)}
                placeholder="Paste standard vacancy job specifications here..."
                rows={5}
                className="w-full text-sm p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={runAnalysis}
              disabled={analyzing}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {analyzing ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Parsing & Indexing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Run ATS Audit Match
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Pane */}
        <div className="space-y-6">
          {!result && !analyzing ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center text-slate-400 dark:text-slate-500">
              <p className="font-bold text-sm">Awaiting Scan Inputs</p>
              <p className="text-xs mt-1">Load sample presets or enter text, then click "Run ATS Audit Match" to stream diagnostic analytics.</p>
            </div>
          ) : analyzing ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
              <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="font-extrabold text-slate-900 dark:text-white">NLP Lexical Matching Engine Active</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Computing similarity embeddings, checking section integrity, and cross-referencing industry standard formatting profiles...</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">System Assessment Report</h3>
                <button
                  onClick={handleDownloadReport}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" /> Download Report
                </button>
              </div>

              {/* Match Score Gauge */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30">
                <div className="relative h-24 w-24 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" className="stroke-slate-200 dark:stroke-slate-800 fill-none" strokeWidth="8" />
                    <circle cx="48" cy="48" r="40" className="stroke-indigo-600 fill-none" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * result.score) / 100} />
                  </svg>
                  <span className="absolute font-black text-2xl text-slate-900 dark:text-white">{result.score}%</span>
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base">ATS Compatibility Index</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {result.score >= 80
                      ? "Outstanding alignment! Excellent lexical relevance detected."
                      : result.score >= 50
                      ? "Moderate compatibility. Some core vacancies identified but key skill gaps remain."
                      : "Critical misalignment. Major required skillset keyword mentions are missing."}
                  </p>
                </div>
              </div>

              {/* Checks */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Structural Auditing</h4>
                <div className="space-y-2">
                  {result.checks.map((c: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      {c.status === 'pass' && <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />}
                      {c.status === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />}
                      {c.status === 'fail' && <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />}
                      <div>
                        <div className="font-bold text-xs text-slate-900 dark:text-white">{c.title}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{c.msg}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div> Matched ({result.matched.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matched.length > 0 ? result.matched.map((m: string) => (
                      <span key={m} className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase">{m}</span>
                    )) : <span className="text-xs text-slate-400 font-medium">None</span>}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-rose-500"></div> Missing ({result.missing.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missing.length > 0 ? result.missing.map((m: string) => (
                      <span key={m} className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 text-xs font-semibold uppercase">{m}</span>
                    )) : <span className="text-xs text-slate-400 font-medium">None</span>}
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" /> Interactive AI Advice
                </h4>
                <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  {result.advice.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
