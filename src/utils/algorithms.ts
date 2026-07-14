/**
 * RAG and ATS Assistant Algorithms Testing File
 */

// Simple mock implementation of keyword counting
export function calculateAtsScore(resumeText: string, jobText: string): number {
  const resumeWords = resumeText.toLowerCase().split(/\W+/);
  const jobWords = jobText.toLowerCase().split(/\W+/);

  const keyTerms = ['fastapi', 'express', 'react', 'typescript', 'tailwind', 'postgresql', 'supabase', 'docker', 'kubernetes', 'aws'];
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

  const total = matched.length + missing.length;
  return total > 0 ? Math.round((matched.length / total) * 100) : 70;
}

// Simple forecasting ML mockup
export function calculateForecastProjection(baseValue: number, monthlySavings: number, months: number, model: 'Linear' | 'ARIMA'): number {
  let currentSum = baseValue;
  for (let i = 1; i <= months; i++) {
    let multiplier = 1;
    if (model === 'ARIMA') {
      multiplier = 1 + (Math.sin(i) * 0.12) + (Math.cos(i * 1.5) * 0.08);
    } else {
      multiplier = 1.05;
    }
    currentSum = currentSum + (monthlySavings * multiplier);
  }
  return Math.round(currentSum);
}
