import React, { useState } from 'react';
import { Database, Search, FileText, Sparkles } from 'lucide-react';

interface DocumentChunk {
  id: number;
  text: string;
  source: string;
  similarity: number;
}

export const AIRAGKnowledgeAssistant: React.FC = () => {
  const [ingestedDocs, setIngestedDocs] = useState<string[]>([]);
  const [docInput, setDocInput] = useState('');
  const [queryInput, setQueryInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [retrievedChunks, setRetrievedChunks] = useState<DocumentChunk[]>([]);
  const [synthesizedAnswer, setSynthesizedAnswer] = useState('');

  // Default Vector Knowledge DB
  const [vectorDb, setVectorDb] = useState<DocumentChunk[]>([
    { id: 1, text: "For real-time message sync pipelines, Socket.io manages fallbacks to HTTP long-polling and implements heartbeat checks to trace client connections.", source: "WebSocket Manual.txt", similarity: 0 },
    { id: 2, text: "The Hospital Management System uses strict Role-Based Access Control. Users are authenticated with JWT tokens. Only clinical Admins can purge records.", source: "Auth Policy.pdf", similarity: 0 },
    { id: 3, text: "Predictive ML models, such as linear trends and ARIMA, compute forecasted asset paths and financial ledger trajectories using historical standard variances.", source: "Finance Analytics Engine.docx", similarity: 0 },
    { id: 4, text: "Stripe payment API integrations use webhook token validations. The payment handler logs gross simulated transactions on success.", source: "Checkout Guide.txt", similarity: 0 }
  ]);

  const handleIngestDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docInput) return;

    const nextId = vectorDb.length + 1;
    const newChunk: DocumentChunk = {
      id: nextId,
      text: docInput,
      source: "User Uploaded Doc",
      similarity: 0
    };

    setVectorDb([...vectorDb, newChunk]);
    setIngestedDocs([...ingestedDocs, `Doc #${nextId}: Ingested, text chunked & vectorized.`]);
    setDocInput('');
    alert("Document ingested, parsed into semantic segments, and mapped to Vector Database.");
  };

  const handleRunRAGQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput) {
      alert("Please enter a question to query the vector space!");
      return;
    }

    setLoading(true);
    setRetrievedChunks([]);
    setSynthesizedAnswer('');

    setTimeout(() => {
      const queryWords = queryInput.toLowerCase().split(/\W+/);

      // Calculate cosine similarity mock
      const computed = vectorDb.map(chunk => {
        const chunkWords = chunk.text.toLowerCase().split(/\W+/);
        let intersection = 0;
        queryWords.forEach(w => {
          if (w.length > 2 && chunkWords.includes(w)) {
            intersection += 1;
          }
        });
        const similarity = parseFloat((intersection / Math.max(1, queryWords.length)).toFixed(2));
        return { ...chunk, similarity };
      });

      // Sort by similarity descending
      const sorted = computed.sort((a, b) => b.similarity - a.similarity);
      const topMatches = sorted.slice(0, 2);

      setRetrievedChunks(topMatches);

      // LLM synthesized response mock logic
      const topMatch = topMatches[0];
      if (topMatch && topMatch.similarity > 0.1) {
        setSynthesizedAnswer(
          `Synthesized LLM Answer (Grounded in context fragments): Based on retrieved context from "${topMatch.source}", ${topMatch.text.slice(0, 1).toLowerCase()}${topMatch.text.slice(1)}`
        );
      } else {
        setSynthesizedAnswer(
          "Synthesized LLM Answer: The vector space query returned low-scoring matches. No relevant grounding documents were found in the current vector store. Try asking about 'real-time sockets', 'Stripe payments', 'hospital CRUD', or 'forecasting trends'."
        );
      }
      setLoading(false);
    }, 1200);
  };

  const loadPresetKnowledge = () => {
    setQueryInput("How does the real-time websocket sync handle connection failures?");
  };

  return (
    <div className="space-y-8 py-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">AI RAG Knowledge Assistant</h1>
        <p className="text-slate-500 dark:text-slate-400">Upload knowledge documents to ingest text chunks, trace similarity mappings across vector stores, and inspect Synthesized LLM answers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LHS Ingest Document & Vector DB Display */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
              <Database className="h-5 w-5 text-indigo-500" /> Vector Database Store
            </h3>

            {/* Chunk view scroll block */}
            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
              {vectorDb.map(chunk => (
                <div key={chunk.id} className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850/80 rounded-xl text-[10px] space-y-1">
                  <div className="flex items-center justify-between text-slate-400 font-extrabold uppercase">
                    <span>Source: {chunk.source}</span>
                    <span>Chunk #{chunk.id}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {chunk.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ingest document form */}
          <form onSubmit={handleIngestDocument} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1">
              <FileText className="h-4.5 w-4.5 text-indigo-500" /> Ingest New Document Text
            </h4>
            <textarea
              required
              value={docInput}
              onChange={(e) => setDocInput(e.target.value)}
              placeholder="Paste specific paragraph files or guides to add into the vector knowledge indexing pool..."
              rows={4}
              className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
            />
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl cursor-pointer">
              Vectorize Document Text
            </button>
          </form>
        </div>

        {/* RHS RAG Query Sandbox Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                <Search className="h-5 w-5 text-indigo-500" /> Semantic RAG Prompt Sandbox
              </h3>
              <button
                onClick={loadPresetKnowledge}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Load Sample Prompt
              </button>
            </div>

            <form onSubmit={handleRunRAGQuery} className="flex gap-2">
              <input
                required
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Ask something about sockets, payments, CRUD policies..."
                className="flex-1 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <button type="submit" className="px-5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1">
                Retrieve & Synthesize
              </button>
            </form>
          </div>

          {/* Answer Area */}
          {!loading && retrievedChunks.length === 0 && !synthesizedAnswer ? (
            <div className="text-center py-12 bg-slate-100 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
              Waiting for search parameters query. Click "Retrieve & Synthesize" to run search matches.
            </div>
          ) : loading ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <div className="h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="font-bold text-xs text-slate-900 dark:text-white">Retrieving Document Fragments...</p>
              <p className="text-[10px] text-slate-400 mt-1">Calculating similarities, filtering cosine indexes, and grounding synthesizers...</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 animate-fade-in">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Retrieved Matches</span>

                {retrievedChunks.map((chunk) => (
                  <div key={chunk.id} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-start gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="text-[10px] text-slate-400 font-bold">Chunk #{chunk.id} (From: {chunk.source})</div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {chunk.text}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-xs font-black text-emerald-600 dark:text-emerald-400">Score: {chunk.similarity}</span>
                      <span className="block text-[8px] text-slate-400 uppercase font-bold">Cosine Match</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grounded synthesis block */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-2xl space-y-2">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" /> Grounded LLM Response
                </span>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {synthesizedAnswer}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
