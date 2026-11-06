# Shrikant Subhash Kudale — Dual Persona Portfolio

The official portfolio repository for **Shrikant Subhash Kudale**: AI & Analytics Engineer and Cognitive Science Researcher.

The platform is architected as a single researcher's notebook with two covers:
- **SIGNAL (AI & Engineering)**: Deep obsidian theme (`#060911`), algorithmic telemetry, edge vision on Raspberry Pi Zero 2 W, and Transformer biomarker research published in IJARSCT.
- **MEMORY (Psychology & Cognitive Science)**: Warm parchment, living organic gradients, 120-concept force-directed physics universe, and empirical dissertation hub on cognitive offloading across 120 students.
- **THE THREAD**: A shared golden thread line linking both worlds across reading progress, navigation indicators, and signature crossfade transitions.

---

## 🚀 How to Publish to GitHub (Step-by-Step)

The project has already been initialized as a clean Git repository on the `main` branch. Follow these 3 simple steps to publish it to your GitHub profile (`Shrikant-Kudale`):

### Step 1: Create a New Empty Repository on GitHub
1. Go to [https://github.com/new](https://github.com/new).
2. Enter your repository name (e.g., `portfolio` or `dual-persona-portfolio`).
3. Set visibility to **Public** (recommended) or **Private**.
4. **Important**: Do **NOT** check "Initialize with README", ".gitignore", or "license" (we already created them for you).
5. Click **Create repository**.

### Step 2: Push Your Local Code to GitHub
Open your terminal in this project folder and run:

```bash
# 1. Connect your local repository to your new GitHub repository
git remote add origin https://github.com/Shrikant-Kudale/dual-persona-portfolio.git

# 2. Push all code to GitHub on the main branch
git push -u origin main
```
*(If prompted, log in with your GitHub username and Personal Access Token or Git Credential Manager).*

---

## 🔑 Authentication & API Keys Guide: How & Where to Put Them

Your application connects to AI models (Gemini & Groq), GitHub live telemetry, and an admin content manager. Below is everything you need to know about each key, where to obtain it for free, and where to place it.

### 1. The Keys Explained

| Key Name | Purpose | Where to Get It (Free) |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Powers the conversational research assistant and JD role matcher | [Google AI Studio](https://aistudio.google.com/app/apikey) (Click "Create API Key") |
| `GROQ_API_KEY` | Ultra-fast LLaMA 3.3 (70B) inference for lightning responses (<1s) | [Groq Console](https://console.groq.com/keys) (Click "Create API Key") |
| `GITHUB_TOKEN` | Fetches your 53-week public commit heatmap without hitting rate limits | [GitHub Settings > Tokens](https://github.com/settings/tokens) (Generate classic token with `read:user`) |
| `ADMIN_GITHUB_LOGIN` | Restricts the built-in CMS (`/admin.html`) to only you (`Shrikant-Kudale`) | Set to your username: `Shrikant-Kudale` |
| `GITHUB_CLIENT_ID` | Enables one-click "Sign in with GitHub" on `/admin.html` (Optional) | [GitHub OAuth Apps](https://github.com/settings/developers) |
| `GITHUB_CLIENT_SECRET` | Secret key for your GitHub OAuth App (Optional) | Generated on the OAuth App page above |
| `APP_URL` | Your live website address (used for OAuth redirects) | E.g., `https://your-app.vercel.app` or custom domain |

---

### 2. Where to Put Keys for Local Development (`.env`)

1. In the root directory of your project, locate the file named `.env.example`.
2. Copy it to a new file named `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` in your editor and paste your real keys inside the quotes:
   ```env
   GROQ_API_KEY="gsk_xxxxxxxxxxxxxxxxxxxxxxxx"
   GEMINI_API_KEY="AIzaSyxxxxxxxxxxxxxxxxxxxxxxxx"
   GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxx"
   ADMIN_GITHUB_LOGIN="Shrikant-Kudale"
   GITHUB_CLIENT_ID="Ov23li..."
   GITHUB_CLIENT_SECRET="xxxxxxxxxxxxxxxxxxxx"
   APP_URL="http://localhost:3000"
   ```
4. **Note**: `.env` is already listed in `.gitignore`, so your real keys will **never** be exposed or committed to public GitHub!

---

### 3. Where to Put Keys on Vercel (When Deployed to Production)

When you deploy your site to [Vercel](https://vercel.com):

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click on your imported portfolio project.
2. Go to **Settings** > **Environment Variables** (in the left sidebar).
3. Add each key and value one by one:
   - Key: `GEMINI_API_KEY` -> Value: `AIzaSy...`
   - Key: `GROQ_API_KEY` -> Value: `gsk_...`
   - Key: `GITHUB_TOKEN` -> Value: `ghp_...`
   - Key: `ADMIN_GITHUB_LOGIN` -> Value: `Shrikant-Kudale`
   - Key: `APP_URL` -> Value: `https://your-domain.vercel.app`
4. Select all environments: **Production**, **Preview**, and **Development**.
5. Click **Save** and trigger a **Redeploy**. Your serverless functions will now automatically use the keys securely!

---

## 🛠 Local Commands

```bash
# Run local development server
npm run dev

# Check for TypeScript type safety
npm run lint

# Compile production bundle
npm run build
```

---

## ⚖️ Intellectual Property Notice

All experimental data, neural network architectures, psychometric instruments, and site designs are the proprietary intellectual property of **Shrikant Subhash Kudale** (Government of India Copyright Certificate No. **LD-20250172223**).

- Email: `shrikant.kudale05@gmail.com`
- Location: Pune, Maharashtra, India
