import React, { useState } from 'react';
import { Play, RotateCw, Terminal, CheckCircle2, XCircle, Settings, Shield } from 'lucide-react';

interface Pod {
  name: string;
  status: 'Running' | 'Pending' | 'Failed';
  traffic: number;
}

export const DevOpsCICDPlatform: React.FC = () => {
  const [pipelineState, setPipelineState] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [yamlConfig, setYamlConfig] = useState(`name: DevOps CI/CD Deployment Pipeline
on: [push, pull_request]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Run Jest & Pytest Suites
        run: npm run test --all

      - name: Compile Docker Containers
        run: docker build -t gateway:v2.0 .

      - name: Deploy to Kubernetes Cluster
        uses: aws-actions/k8s-deploy@v1
`);

  // Simulated Kubernetes pods
  const [pods, setPods] = useState<Pod[]>([
    { name: "api-gateway-7f8a", status: "Running", traffic: 40 },
    { name: "auth-service-2b1d", status: "Running", traffic: 25 },
    { name: "analytics-db-5c4e", status: "Running", traffic: 15 },
    { name: "payment-handler-9c3f", status: "Pending", traffic: 0 }
  ]);

  const runPipeline = () => {
    setPipelineState('running');
    setConsoleLogs([]);

    const logs = [
      "[INFO] Triggered commit verification hook for branch 'main'...",
      "[BUILD] Initializing workspace node configuration & virtual environments...",
      "[TEST] Running verification suites. Over 14 unit specs completed (100% pass rate).",
      "[DOCKER] Packaging image bundles. Resolving multi-stage layer cached modules...",
      "[DOCKER] Exporting tarball to cloud repository registry successfully.",
      "[AWS K8S] Deploying update rollout to EKS cluster. Executing rolling-restart updates...",
      "[SUCCESS] CI/CD build successfully deployed to Kubernetes pods!"
    ];

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logs.length) {
        setConsoleLogs(prev => [...prev, logs[currentLogIdx]]);

        // Randomly update pods traffic as pipeline progresses
        if (currentLogIdx === 5) {
          setPods([
            { name: "api-gateway-7f8a", status: "Running", traffic: 45 },
            { name: "auth-service-2b1d", status: "Running", traffic: 30 },
            { name: "analytics-db-5c4e", status: "Running", traffic: 20 },
            { name: "payment-handler-9c3f", status: "Running", traffic: 5 } // Turned online
          ]);
        }
        currentLogIdx++;
      } else {
        clearInterval(interval);
        setPipelineState('success');
      }
    }, 800);
  };

  const failPipeline = () => {
    setPipelineState('running');
    setConsoleLogs([]);

    const logs = [
      "[INFO] Triggered commit verification hook...",
      "[BUILD] Initializing Ubuntu runner environments...",
      "[TEST] Executing verification test specs...",
      "[FAIL] Error: Assert Exception in 'test_forecasting_logic.py' line 42.",
      "[FAIL] Expected predicted trajectory variance to be < 0.05 but registered 0.24 instead.",
      "[FATAL] CI/CD process interrupted. Deployment aborted due to code regression!"
    ];

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logs.length) {
        setConsoleLogs(prev => [...prev, logs[currentLogIdx]]);

        if (currentLogIdx === 4) {
          // Break payment handler pod
          setPods(prev => prev.map(p => p.name.includes('payment') ? { ...p, status: 'Failed', traffic: 0 } : p));
        }
        currentLogIdx++;
      } else {
        clearInterval(interval);
        setPipelineState('failed');
      }
    }, 800);
  };

  return (
    <div className="space-y-8 py-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">DevOps CI/CD Deployment</h1>
        <p className="text-slate-500 dark:text-slate-400">Trigger simulated Github Actions runner workflows, modify config YAML files, and inspect active Kubernetes pods in real time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* YAML & Runner Trigger Column */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                <Settings className="h-5 w-5 text-indigo-500" /> Pipeline Workflow YAML
              </h3>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Deploy Manifest</span>
            </div>

            <textarea
              value={yamlConfig}
              onChange={(e) => setYamlConfig(e.target.value)}
              rows={12}
              className="w-full text-xs font-mono p-4 bg-slate-950 text-indigo-300 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={runPipeline}
              disabled={pipelineState === 'running'}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="h-4 w-4" /> Run Build Success
            </button>
            <button
              onClick={failPipeline}
              disabled={pipelineState === 'running'}
              className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-400 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCw className="h-4 w-4" /> Simulate Breakage
            </button>
          </div>
        </div>

        {/* Console Logs Terminal & Pod Cluster (RHS) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Running Status Header */}
          <div className="p-4 rounded-2xl border flex items-center justify-between bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                pipelineState === 'success' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' :
                pipelineState === 'failed' ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400' :
                pipelineState === 'running' ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 animate-spin' :
                'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {pipelineState === 'success' ? <CheckCircle2 className="h-5 w-5" /> :
                 pipelineState === 'failed' ? <XCircle className="h-5 w-5" /> :
                 pipelineState === 'running' ? <RotateCw className="h-5 w-5" /> :
                 <Terminal className="h-5 w-5" />}
              </div>
              <div>
                <div className="font-extrabold text-sm text-slate-900 dark:text-white">Workflow Runner Status</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {pipelineState === 'idle' && "Ready to launch"}
                  {pipelineState === 'running' && "Runner working..."}
                  {pipelineState === 'success' && "All steps compiled and parsed successfully"}
                  {pipelineState === 'failed' && "Process exited. Critical test regression"}
                </div>
              </div>
            </div>
          </div>

          {/* Console logs */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 h-[220px] flex flex-col justify-between">
            <div className="text-[10px] text-slate-400 font-extrabold uppercase border-b border-slate-800 pb-2 mb-2">
              Virtual CI/CD Terminal Stream
            </div>
            <div className="flex-1 overflow-y-auto space-y-1.5 text-[10px] font-mono text-slate-300">
              {consoleLogs.length === 0 ? (
                <div className="text-slate-600 text-center mt-12">Click "Run Build Success" to start action workflows.</div>
              ) : (
                consoleLogs.map((log, idx) => (
                  <div key={idx} className={log.includes('FAIL') || log.includes('FATAL') ? 'text-rose-400' : log.includes('SUCCESS') ? 'text-emerald-400' : ''}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Kubernetes pod visual clusters */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-indigo-500" /> Virtual Kubernetes Cluster Pod Topology
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pods.map((pod) => (
                <div key={pod.name} className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{pod.name}</div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        pod.status === 'Running' ? 'bg-emerald-500' :
                        pod.status === 'Failed' ? 'bg-rose-500' :
                        'bg-amber-400 animate-pulse'
                      }`}></span>
                      {pod.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-black text-indigo-600 dark:text-indigo-400">{pod.traffic}%</span>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">Traffic</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
