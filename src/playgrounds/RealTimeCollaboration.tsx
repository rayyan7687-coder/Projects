import React, { useState, useRef, useEffect } from 'react';
import { Send, Users, Move } from 'lucide-react';

interface ChatMessage {
  user: string;
  text: string;
  timestamp: string;
}

interface Cursor {
  name: string;
  color: string;
  x: number;
  y: number;
}

export const RealTimeCollaboration: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { user: "Alice", text: "Let's modify the load balancer thresholds.", timestamp: "12:04 PM" },
    { user: "Bob", text: "Agreed. I am modifying the configuration line in index.tsx", timestamp: "12:05 PM" }
  ]);
  const [typedMessage, setTypedMessage] = useState('');
  const [editorCode, setEditorCode] = useState(`// Multi-User Collaborative Workspace Node
import { Server } from "socket.io";

const io = new Server(3000, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log(\`Client connected: \${socket.id}\`);

  socket.on("cursor-move", (coords) => {
    socket.broadcast.emit("remote-cursor", coords);
  });
});
`);

  // Mock Active Cursors
  const [remoteCursors, setRemoteCursors] = useState<Cursor[]>([
    { name: "Alice Jenkins", color: "indigo", x: 120, y: 150 },
    { name: "Bob Miller", color: "teal", x: 380, y: 220 }
  ]);

  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
      }
    }

    // Periodic remote cursor simulation movement
    const interval = setInterval(() => {
      setRemoteCursors(prev => prev.map(c => {
        const nextX = Math.max(20, Math.min(500, c.x + (Math.random() * 40 - 20)));
        const nextY = Math.max(20, Math.min(250, c.y + (Math.random() * 40 - 20)));
        return { ...c, x: parseFloat(nextX.toFixed(1)), y: parseFloat(nextY.toFixed(1)) };
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage) return;
    setMessages([
      ...messages,
      { user: "You (Architect)", text: typedMessage, timestamp: "Just now" }
    ]);
    setTypedMessage('');

    // Simulate auto remote participant answer
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { user: "Alice Jenkins", text: "Got it! Real-time socket sync processed the packet.", timestamp: "Just now" }
      ]);
    }, 1000);
  };

  // Canvas Drawing Actions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="space-y-8 py-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Real-Time Collaboration</h1>
        <p className="text-slate-500 dark:text-slate-400">Collaborate inside a multi-user workspace featuring integrated code editors, interactive whiteboard boards, and dynamic cursor tracking simulations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Collaborative Whiteboard Canvas panel (LHS) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                <Move className="h-5 w-5 text-indigo-500" /> Multi-User Whiteboard Shared Workspace
              </h3>
              <button
                onClick={clearCanvas}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Clear Drawing Board
              </button>
            </div>

            {/* Collaborative Interactive Canvas Wrapper */}
            <div className="relative border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950 overflow-hidden cursor-crosshair">

              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                width={700}
                height={300}
                className="w-full block bg-transparent"
              />

              {/* Absolute Simulated Remote Cursors */}
              {remoteCursors.map((cursor) => (
                <div
                  key={cursor.name}
                  style={{ top: `${cursor.y}px`, left: `${cursor.x}px` }}
                  className="absolute pointer-events-none transition-all duration-300 flex items-center gap-1.5"
                >
                  <svg className={`h-4 w-4 ${cursor.color === 'indigo' ? 'text-indigo-500 fill-indigo-500' : 'text-teal-500 fill-teal-500'}`} viewBox="0 0 24 24">
                    <path d="M4.5 3V17l4.5-4.5h6.5z" />
                  </svg>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-black text-white ${cursor.color === 'indigo' ? 'bg-indigo-600' : 'bg-teal-600'} whitespace-nowrap`}>
                    {cursor.name}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-400 font-semibold italic text-center">Click & drag your cursor inside the canvas block to draw. Watch remote users coordinate in real time.</p>
          </div>

          {/* Code Editor component */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-bold font-mono">index.tsx (Collaborative Editor)</span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold">2 active editors</span>
            </div>
            <textarea
              value={editorCode}
              onChange={(e) => setEditorCode(e.target.value)}
              rows={10}
              className="w-full text-xs font-mono p-5 bg-slate-900 text-teal-400 focus:outline-none border-0 leading-relaxed resize-none"
            />
          </div>
        </div>

        {/* Messaging Chat column (RHS) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-[660px]">
          <div className="space-y-4 flex flex-col h-full justify-between">

            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Users className="h-4.5 w-4.5 text-indigo-500" /> Session Active Chat
              </h4>
            </div>

            {/* Message streams scroll block */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
              {messages.map((m, idx) => (
                <div key={idx} className={`space-y-1 ${m.user.includes('You') ? 'text-right' : 'text-left'}`}>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{m.user} ({m.timestamp})</div>
                  <div className={`inline-block text-xs p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.user.includes('You')
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message send form footer */}
            <form onSubmit={handleSendMessage} className="border-t border-slate-100 dark:border-slate-800 pt-3 flex gap-2">
              <input
                required
                type="text"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                placeholder="Type real-time message..."
                className="flex-1 p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white"
              />
              <button type="submit" className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl cursor-pointer">
                <Send className="h-4 w-4" />
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};
