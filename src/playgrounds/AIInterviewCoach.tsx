import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, MessageSquare } from 'lucide-react';

const MOCK_QUESTIONS = [
  "How do you design a low-latency, resilient web services architecture for real-time applications?",
  "Can you describe your strategy for handling state and cache invalidation when working with Redis?",
  "What is your approach to setting up continuous delivery pipelines with Docker and Kubernetes?",
  "How do you ensure proper role-based authorization controls and secure data parsing in CRUD architectures?"
];

export const AIInterviewCoach: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [soundwave, setSoundwave] = useState<number[]>([10, 20, 10, 30, 40, 20, 15, 25, 30, 40, 50, 20, 10, 25, 10]);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [simulatedTranscription, setSimulatedTranscription] = useState('');
  const [coachFeedback, setCoachFeedback] = useState<any | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const timerRef = useRef<any>(null);
  const soundwaveIntervalRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      stopIntervals();
    };
  }, []);

  const stopIntervals = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (soundwaveIntervalRef.current) clearInterval(soundwaveIntervalRef.current);
  };

  const handleSpeakQuestion = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(MOCK_QUESTIONS[currentQuestionIdx]);
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis not supported on this browser, but you can read the question!");
    }
  };

  const startMockRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setSimulatedTranscription('');
    setCoachFeedback(null);

    timerRef.current = setInterval(() => {
      setRecordingSeconds(prev => {
        if (prev >= 15) {
          stopMockRecording();
          return 15;
        }
        return prev + 1;
      });
    }, 1000);

    soundwaveIntervalRef.current = setInterval(() => {
      setSoundwave(Array.from({ length: 15 }, () => Math.floor(Math.random() * 60) + 10));
    }, 150);
  };

  const stopMockRecording = () => {
    stopIntervals();
    setIsRecording(false);

    // Simulate generation of response transcribing
    setSimulatedTranscription(
      "To architect a highly resilient web service, I leverage load balancers, multi-container deployments across node regions, cache layers like Redis to offload PostgreSQL, and standard rate-limiting to protect API routes."
    );

    // Evaluate
    setTimeout(() => {
      setCoachFeedback({
        sentiment: "Highly Confident",
        cadence: "135 words/min (Optimal)",
        volume: "Moderate (-14dB)",
        fillerWordCount: 1, // Only one "um/like"
        technicalAccuracy: "92%",
        strengths: [
          "Excellent architectural vocabulary (Redis caching, region balancing, API rate-limiting).",
          "Maintained a solid vocal pacing without reliance on filler words.",
          "Demonstrates direct technical knowledge."
        ],
        improvements: [
          "Mention WebSockets/gRPC explicitly when referring to low-latency data streams.",
          "Add structured failure recovery protocols (e.g., circuit breaker patterns)."
        ]
      });
    }, 1200);
  };

  const handleNextQuestion = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setCurrentQuestionIdx((currentQuestionIdx + 1) % MOCK_QUESTIONS.length);
    setIsRecording(false);
    setSimulatedTranscription('');
    setCoachFeedback(null);
    stopIntervals();
  };

  return (
    <div className="space-y-8 py-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">AI Interview Coach</h1>
        <p className="text-slate-500 dark:text-slate-400">Perfect your interviewing with real-time vocal feedback, speech analytics, and structural accuracy scoring.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Interview Mock Area */}
        <div className="space-y-6 bg-slate-900 text-white p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between">

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider">
                Live Simulated Session
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                Question {currentQuestionIdx + 1} of {MOCK_QUESTIONS.length}
              </span>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 min-h-[140px] flex flex-col justify-between">
              <p className="text-lg font-bold leading-relaxed text-slate-100">
                "{MOCK_QUESTIONS[currentQuestionIdx]}"
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSpeakQuestion}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    speaking ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-indigo-400'
                  }`}
                >
                  <Volume2 className={`h-4 w-4 ${speaking ? 'animate-bounce' : ''}`} />
                  {speaking ? 'Synthesizer Active' : 'Read Question Aloud'}
                </button>
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                >
                  Next Question
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Recording Visualizer */}
          <div className="space-y-6 pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 bg-slate-950/50 p-6 rounded-2xl border border-slate-800">

              {isRecording ? (
                <div className="flex items-end justify-center gap-[4px] h-12 w-full px-8">
                  {soundwave.map((height, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${height}%` }}
                      className="w-1.5 bg-gradient-to-t from-indigo-500 to-teal-400 rounded-full transition-all duration-100"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 h-12 text-slate-500 text-xs font-medium">
                  Microphone idle. Click Start Recording to speak.
                </div>
              )}

              <div className="flex items-center justify-between w-full border-t border-slate-800/80 pt-4">
                <span className="text-xs text-slate-400 font-bold">
                  {isRecording ? `RECORDING TIME: ${recordingSeconds}s` : "MAX RECD LIMIT: 15s"}
                </span>

                {isRecording ? (
                  <button
                    onClick={stopMockRecording}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MicOff className="h-4 w-4" /> Stop Response
                  </button>
                ) : (
                  <button
                    onClick={startMockRecording}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Mic className="h-4 w-4" /> Start Response
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Right Feedback Column */}
        <div className="space-y-6">
          {!coachFeedback && !isRecording && !simulatedTranscription ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center text-slate-400 dark:text-slate-500">
              <MessageSquare className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-3" />
              <p className="font-bold text-sm">Vocal Assessment Waiting</p>
              <p className="text-xs mt-1">Start recording, speak your answer into the microhpone (or simulate), then stop to receive speech rate, transcription metrics, and AI coaching insights.</p>
            </div>
          ) : isRecording ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="relative flex items-center justify-center mb-4">
                <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping h-12 w-12"></div>
                <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  <Mic className="h-5 w-5 animate-pulse" />
                </div>
              </div>
              <p className="font-bold text-slate-900 dark:text-white">Active Speech Recognition Pipeline</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Awaiting voice streams. System is transcribing audio buffers dynamically...</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg flex items-center gap-1.5">
                  <Sparkles className="h-5 w-5 text-indigo-500" /> Speech Coaching Feedback
                </h3>
              </div>

              {/* Transcription */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Simulated Transcription</h4>
                <p className="text-sm italic text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 leading-relaxed font-medium">
                  "{simulatedTranscription}"
                </p>
              </div>

              {/* Performance Metrics */}
              {coachFeedback && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/20 text-center">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Cadence & Pacing</div>
                      <div className="text-sm font-black text-slate-900 dark:text-white mt-1">{coachFeedback.cadence}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/20 text-center">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Technical Match</div>
                      <div className="text-sm font-black text-slate-900 dark:text-white mt-1">{coachFeedback.technicalAccuracy}</div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div> Architectural Strengths
                      </div>
                      <ul className="list-disc pl-4 text-xs text-slate-600 dark:text-slate-300 font-medium space-y-1">
                        {coachFeedback.strengths.map((s: string, idx: number) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div> Structural Suggestions
                      </div>
                      <ul className="list-disc pl-4 text-xs text-slate-600 dark:text-slate-300 font-medium space-y-1">
                        {coachFeedback.improvements.map((s: string, idx: number) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
