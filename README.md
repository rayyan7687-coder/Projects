# Interactive Multi-Project Portfolio Playground

Welcome to the **Interactive Portfolio Playground**! This is a high-fidelity single-page React + TypeScript + Tailwind CSS application showcasing **9 distinct project sandboxes** inside a single, beautifully designed dashboard.

It is specifically designed to showcase architectural and engineering mastery of modern skills (NLP, LLM APIs, WebRTC, Full Stack, IoT/MQTT, DevOps, RBAC, WebSockets, vector RAG databases, and ML forecasting) to hiring managers, viewers, or clients.

---

## 🚀 How to Run the Project Locally

### 1. Run using a Live Development Server (Recommended)
This is a standard React + Vite frontend application. You **cannot** simply open the raw `index.html` file in your browser directly (using `file://` protocols or double-clicking it) because browsers block JavaScript module imports (`type="module"`) due to CORS security policies.

To run it locally on your computer with hot-reloading:

1. **Install Node.js** (if you haven't already).
2. Open VS Code and open your terminal (`Ctrl + \`` or `Cmd + \``).
3. Install dependencies by running:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Click the link shown in the terminal (usually `http://localhost:5173`) to view and interact with the application.

---

### 2. View/Run the Production Build (VS Code Live Server)
If you want to run the compiled, optimized production version of the portfolio:

1. Build the production files:
   ```bash
   npm run build
   ```
2. This creates a folder named **`dist`** containing compiled HTML, CSS, and JS files.
3. If you are using the **Live Server** extension in VS Code:
   - Make sure you serve the **`dist`** folder, NOT the root folder!
   - Right-click the `dist/index.html` file and select **"Open with Live Server"**.
   - Because we configured the compiler to use relative paths (`base: './'`), the assets will load perfectly!

---

### 3. Deploying on GitHub Pages
This project is pre-configured to deploy easily onto static hosts like **GitHub Pages**, **Vercel**, or **Netlify**.

To deploy to **GitHub Pages**:
1. Install the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add these scripts to your `package.json` file inside `"scripts"`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run the deployment command:
   ```bash
   npm run deploy
   ```
4. Go to your GitHub repository settings -> **Pages** -> and ensure the Source is set to the `gh-pages` branch. Your interactive portfolio will live online!

---

## 🎨 9 High-Fidelity Playgrounds Built-In

1. **AI Resume Analyzer (ATS):** Parse resumes against a job description, compute interactive similarity indexes, inspect structural audits, and export complete ATS feedback reports.
2. **AI Interview Coach:** Simulates real-time interactive voice feedback, reads questions via custom text-to-speech, visualizes real-time soundwaves, displays live speech pacing indicators, and coaches with technical sentiment grids.
3. **Full Stack E-Commerce Platform:** Browse products, filter categories, add items to the cart, simulate safe checkout using Stripe sandbox patterns, and inspect the real-time store gross sales metrics.
4. **Smart IoT Monitoring Dashboard:** Visualizes a simulated ARM Cortex Pi board, graphs live temperature & humidity telemetry data in real-time, logs MQTT packet flows, and allows sending custom topic payloads.
5. **DevOps CI/CD Deployment Platform:** Edit deployment YAML manifests, toggle build pipelines (success/simulate failure), stream real-time pipeline logs, and inspect an active Kubernetes traffic router/pod visualizer.
6. **Hospital Management System:** Toggle user roles (Admin, Doctor, Patient) to test Role-Based Access Control (RBAC), run full medical records CRUD actions, book patient consults, and examine sagittal cerebral brain MRI plates.
7. **Real-Time Collaboration App:** Interactive canvas sketch whiteboard with multi-cursor simulation, remote configuration panel parameters, and real-time support messaging window.
8. **AI RAG Knowledge Assistant:** Ingest document custom text lines, visualize a vector database memory index, perform cosine similarity matches, and generate AI-prompt grounded context answers.
9. **Personal Finance Analytics Platform:** Manage transactions with live ledgers, filter budget categories, and test machine learning forecast trends (Linear vs. ARIMA modeling styles).
