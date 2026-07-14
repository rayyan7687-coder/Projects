import React, { useState, useEffect } from 'react';
import { Power, Thermometer, Radio } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const SmartIoTMonitoring: React.FC = () => {
  const [deviceOnline, setDeviceOnline] = useState(true);
  const [cpuTemp, setCpuTemp] = useState(42);
  const [humidity, setHumidity] = useState(55);
  const [publishTopic, setPublishTopic] = useState('home/living/temp');
  const [mqttMessage, setMqttMessage] = useState('{"temp": 24.5}');
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Broker connected to MQTT://broker.hivemq.com:1883",
    "[SUBSCRIBE] Registered hook for 'home/#' topic",
    "[TELEMETRY] Broadcast CPU thermal levels -> 42.1°C"
  ]);

  // Chart data
  const [telemetryHistory, setTelemetryHistory] = useState<any[]>([
    { time: "10s ago", temp: 40, hum: 52 },
    { time: "8s ago", temp: 42, hum: 55 },
    { time: "6s ago", temp: 41, hum: 54 },
    { time: "4s ago", temp: 43, hum: 56 },
    { time: "2s ago", temp: 42, hum: 55 }
  ]);

  // Periodic sensor fluctuations
  useEffect(() => {
    if (!deviceOnline) return;

    const interval = setInterval(() => {
      const tempDelta = (Math.random() * 4 - 2);
      const humDelta = (Math.random() * 6 - 3);

      setCpuTemp(prev => {
        const next = Math.max(30, Math.min(85, parseFloat((prev + tempDelta).toFixed(1))));
        return next;
      });

      setHumidity(prev => {
        const next = Math.max(20, Math.min(95, parseFloat((prev + humDelta).toFixed(1))));
        return next;
      });

      // Update charts
      setTelemetryHistory(prev => {
        const nextHistory = [...prev.slice(1), {
          time: "Just now",
          temp: parseFloat((cpuTemp + tempDelta).toFixed(1)),
          hum: parseFloat((humidity + humDelta).toFixed(1))
        }];
        // Rename indices for aesthetics
        return nextHistory.map((h, i) => ({
          ...h,
          time: `${(nextHistory.length - 1 - i) * 2}s ago`
        }));
      });

      // Log
      setLogs(prev => [
        `[MQTT PUBLISH] topic: 'home/node1/telemetry' payload: {"temp":${(cpuTemp + tempDelta).toFixed(1)},"humidity":${(humidity + humDelta).toFixed(1)}}`,
        ...prev.slice(0, 9)
      ]);

    }, 2000);

    return () => clearInterval(interval);
  }, [deviceOnline, cpuTemp, humidity]);

  const handlePublishMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceOnline) {
      alert("Raspberry Pi is currently offline! Toggle the power grid to reconnect.");
      return;
    }
    setLogs(prev => [
      `[MQTT PUBLISH] Topic: '${publishTopic}' | Payload: ${mqttMessage}`,
      ...prev.slice(0, 9)
    ]);
    alert(`Successfully published MQTT broker package to ${publishTopic}`);
  };

  const clearMqttLogs = () => {
    setLogs([]);
  };

  return (
    <div className="space-y-8 py-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Smart IoT Monitoring Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Interact with a visual Raspberry Pi hardware model, execute MQTT publisher message triggers, and analyze incoming sensor waves.</p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDeviceOnline(!deviceOnline)}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
              deviceOnline ? 'bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Power className="h-4 w-4" />
            {deviceOnline ? "RaspPi Online" : "RaspPi Offline"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Hardware Visual Model Panel (LHS) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                Board Layout Spec
              </h3>
              <span className={`h-2.5 w-2.5 rounded-full ${deviceOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
            </div>

            {/* Simulated Motherboard Layout */}
            <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 p-4 text-white font-mono text-[9px] border border-emerald-800 shadow-inner flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

              <div className="flex justify-between items-start z-10">
                <div className="space-y-1">
                  <div className="font-bold text-xs uppercase text-emerald-400">Raspberry Pi 4</div>
                  <div className="text-emerald-500 font-semibold">Broadcom BCM2711</div>
                </div>
                <div className="flex gap-1.5">
                  <div className={`px-2 py-0.5 rounded border ${deviceOnline ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300' : 'bg-slate-800/40 border-slate-700/30 text-slate-500'}`}>
                    WiFi: 5Ghz
                  </div>
                </div>
              </div>

              {/* Pin Diagram Layout Mock */}
              <div className="flex gap-4 items-center z-10 pt-4">
                <div className="space-y-0.5">
                  <div className="font-bold text-[8px] text-emerald-500">GPIO HEADER (40 Pin)</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div key={idx} className={`h-3 w-1.5 rounded-sm ${deviceOnline ? 'bg-amber-400' : 'bg-slate-700'}`}></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 border-t border-emerald-800/80 pt-2 z-10">
                <span className="text-emerald-500 font-bold">ARM Cortex-A72</span>
                <span className="text-xs text-emerald-400 font-black">{cpuTemp}°C</span>
              </div>
            </div>
          </div>

          {/* Quick status specs */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80 text-center">
              <Thermometer className="h-5 w-5 text-indigo-500 mx-auto" />
              <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">CPU Thermal</div>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{cpuTemp}°C</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80 text-center">
              <Radio className="h-5 w-5 text-teal-500 mx-auto" />
              <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">Humidity</div>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{humidity}%</div>
            </div>
          </div>
        </div>

        {/* Telemetry Charts and IoT publishing (RHS) */}
        <div className="lg:col-span-8 space-y-6">

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                Real-Time Telemetry Monitor
              </h3>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={telemetryHistory}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="time" tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} stroke="#94a3b8" />
                  <YAxis tickLine={false} axisLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} stroke="#94a3b8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="#6366f1" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="hum" stroke="#14b8a6" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Publisher form */}
            <form onSubmit={handlePublishMessage} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">MQTT Publisher Terminal</h4>

              <div className="space-y-3 text-xs font-semibold">
                <div>
                  <label className="block text-slate-400 mb-1">Target Topic</label>
                  <input
                    required
                    type="text"
                    value={publishTopic}
                    onChange={(e) => setPublishTopic(e.target.value)}
                    placeholder="home/living/temp"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Payload JSON</label>
                  <input
                    required
                    type="text"
                    value={mqttMessage}
                    onChange={(e) => setMqttMessage(e.target.value)}
                    placeholder='{"temp": 24.5}'
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Publish Message Packet
              </button>
            </form>

            {/* Active Logs console */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between h-[230px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">MQTT broker logs console</span>
                <button
                  onClick={clearMqttLogs}
                  className="text-[9px] text-indigo-400 hover:underline font-bold"
                >
                  Clear Terminal
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1.5 text-[10px] font-mono leading-relaxed text-slate-300">
                {logs.length === 0 ? (
                  <div className="text-center text-slate-600 mt-8">Terminal logs cleared. Waiting for broadcasts...</div>
                ) : (
                  logs.map((log, idx) => (
                    <div key={idx} className="truncate select-text">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
