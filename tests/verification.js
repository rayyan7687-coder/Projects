import { calculateAtsScore, calculateForecastProjection } from '../src/utils/algorithms.js';

function runTests() {
  console.log("=== RUNNING PORTFOLIO ARCHITECT SPECS ===");

  // Test 1: ATS Scoring Match
  const sampleResume = "Experienced senior React developer using TypeScript and Tailwind CSS.";
  const sampleJob = "Requirements: React, TypeScript, Tailwind, Docker, Kubernetes, AWS.";

  const score = calculateAtsScore(sampleResume, sampleJob);
  console.log(`ATS score: ${score}%`);
  if (score === 50) {
    console.log("✔ Test 1 passed: ATS scoring works correctly (50% match detected).");
  } else {
    console.error("✖ Test 1 failed: Expected 50% match but got: " + score);
    process.exit(1);
  }

  // Test 2: Finance Analytics Forecasting
  const linearResult = calculateForecastProjection(10000, 1000, 3, 'Linear');
  const arimaResult = calculateForecastProjection(10000, 1000, 3, 'ARIMA');
  console.log(`Linear Forecast (3m): $${linearResult}`);
  console.log(`ARIMA Forecast (3m): $${arimaResult}`);

  if (linearResult > 10000 && arimaResult > 10000) {
    console.log("✔ Test 2 passed: Forecasting projections computed positive yields successfully.");
  } else {
    console.error("✖ Test 2 failed: Projections registered error parameters.");
    process.exit(1);
  }

  console.log("✔ ALL CORE VERIFICATION TESTS COMPLETED SUCCESSFULLY!");
}

runTests();
