# SGWX Site Migration Guide

Migrating from your (developer) GitHub, Sanity, and Vercel accounts to the client's own instances.

---

## Recommended Plans

### GitHub: Free ($0/month)

The Free plan is all this project needs. It includes unlimited private repos,
2,000 CI/CD minutes/month (more than enough — Vercel handles builds), and
Dependabot security alerts. The Team plan ($4/user/mo) only becomes worth it
if the client wants branch protection rules, required reviewers, or code owners
— none of which are necessary for a content-managed marketing site.

| | Free | Team ($4/user/mo) |
|---|---|---|
| Private repos | Unlimited | Unlimited |
| CI/CD minutes | 2,000/mo | 3,000/mo |
| Branch protection | - | Yes |
| Required reviewers | - | Yes |
| **Verdict** | **Use this** | Only if multiple devs need review gates |

### Vercel: Pro ($20/month)

The Hobby plan is free but restricted to **personal, non-commercial use** — a
client's business site doesn't qualify. Pro is the correct tier and includes
1 TB bandwidth (vs 100 GB), 10M edge requests, and team collaboration.

| | Hobby (Free) | Pro ($20/user/mo) |
|---|---|---|
| Commercial use | No | **Yes** |
| Bandwidth | 100 GB/mo | 1 TB/mo |
| Edge requests | 1M/mo | 10M/mo |
| Team seats | 1 | Unlimited (paid) |
| Analytics | 50K events | Observability Plus |
| **Verdict** | Not allowed for business | **Use this** |

If the client is the only person deploying, it's $20/month. Each additional
developer seat is another $20/month.

### Sanity: Free ($0/month) — upgrade to Growth when needed

The Free plan covers this project comfortably today:

- **20 user seats** (more than enough for a small team)
- **10,000 documents** (this site has well under 1,000)
- **1M CDN requests/month** (plenty for a marketing site)
- **100 GB assets & bandwidth**

The main reason to upgrade to Growth ($15/seat/mo) would be if the client wants:
- **Private datasets** (Free only allows public datasets)
- **Scheduled publishing** or **AI Assist**
- **Comments and tasks** in the Studio
- More than 10,000 documents

| | Free | Growth ($15/seat/mo) |
|---|---|---|
| Seats | 20 | 50 |
| Documents | 10,000 | 25,000 |
| Datasets | 2 (public) | 2 (public or private) |
| CDN requests | 1M/mo | 1M/mo (overages available) |
| Scheduled publishing | - | Yes |
| Comments & tasks | - | Yes |
| **Verdict** | **Start here** | Upgrade when features needed |

### Full Pricing Reference

| | **GitHub** | | **Vercel** | | **Sanity** | |
|---|---|---|---|---|---|---|
| | **Free** | **Team** | **Hobby** | **Pro** | **Free** | **Growth** |
| **Price** | $0 | $4/user/mo | $0 | $20/user/mo | $0 | $15/seat/mo |
| **Commercial use** | Yes | Yes | No | Yes | Yes | Yes |
| **Seats / users** | Unlimited | Unlimited | 1 | Unlimited | 20 | 50 |
| **Bandwidth** | — | — | 100 GB/mo | 1 TB/mo | 100 GB | 100 GB |
| **CI/CD minutes** | 2,000/mo | 3,000/mo | — | — | — | — |
| **Edge / API requests** | — | — | 1M/mo | 10M/mo | 1M CDN/mo | 1M CDN/mo |
| **Storage / documents** | 500 MB pkg | 2 GB pkg | — | — | 10,000 docs | 25,000 docs |
| **Datasets** | — | — | — | — | 2 (public) | 2 (public/private) |
| **Branch protection** | - | Yes | — | — | — | — |
| **Required reviewers** | - | Yes | — | — | — | — |
| **Scheduled publishing** | — | — | — | — | - | Yes |
| **Comments & tasks** | — | — | — | — | - | Yes |
| **Analytics** | — | — | 50K events | Observability+ | — | — |
| **Enterprise** | $21/user/mo | | Custom | | Custom | |

### Monthly Cost Summary

| Service | Recommended Plan | Cost |
|---------|-----------------|------|
| GitHub | Free | $0 |
| Vercel | Pro (1 seat) | $20/mo |
| Sanity | Free | $0 |
| **Total** | | **$20/mo** |

> If the client later adds a developer to Vercel and upgrades Sanity to Growth
> for 2 seats, the total becomes $20 + $20 + $15 + $15 = **$70/mo**.

---

## Prerequisites

The client needs:
- **GitHub** account (Free plan)
- **Sanity** account (Free plan)
- **Vercel** account (Pro plan — $20/mo)

---

## Phase 1: GitHub Repository Transfer

### Option A: Transfer the repository (recommended)
1. Go to **github.com/atlanticwaters/SGWX** → Settings → General → Danger Zone → **Transfer**
2. Enter the client's GitHub username or organization
3. The client accepts the transfer — all commit history, branches, and tags are preserved
4. Update your local remote:
   ```bash
   git remote set-url origin https://github.com/<CLIENT_ORG>/SGWX.git
   ```

### Option B: Push to a fresh repo
1. Client creates a new empty repo (e.g. `<CLIENT_ORG>/sgwx`)
2. Push from your local clone:
   ```bash
   git remote set-url origin https://github.com/<CLIENT_ORG>/sgwx.git
   git push -u origin main
   ```

---

## Phase 2: Sanity Project Migration

### 2a. Create the client's Sanity project
1. Client logs into **sanity.io/manage** and creates a new project (e.g. "Sageworx")
2. Note the new **Project ID** — it will replace `6a2n4h11`
3. Under the project, ensure a `production` dataset exists (created by default)

### 2b. Export content from the current project
On your machine (requires the Sanity CLI):
```bash
npx sanity dataset export production sgwx-export.tar.gz \
  --project-id 6a2n4h11
```
This exports all documents **and** uploaded assets (images, files).

### 2c. Import content into the client's project
```bash
npx sanity dataset import sgwx-export.tar.gz production \
  --project-id <CLIENT_PROJECT_ID>
```

### 2d. Generate API tokens for the client's project
In **sanity.io/manage** → client's project → Settings → API:

| Token | Role | Used For |
|-------|------|----------|
| `SANITY_API_TOKEN` | Viewer | Server-side reads (if needed) |
| `SANITY_API_WRITE_TOKEN` | Editor | Seed scripts, write operations |
| `SANITY_REVALIDATE_SECRET` | — | Webhook signature (generate any random string) |

### 2e. Configure CORS origins
In the client's Sanity project → Settings → API → CORS Origins, add:
- `http://localhost:3000` (for local dev — allow credentials)
- `https://<CLIENT_DOMAIN>` (production URL)
- The Vercel preview URL pattern, e.g. `https://*.vercel.app`

### 2f. Set up the revalidation webhook
In the client's Sanity project → Settings → API → Webhooks:
- **Name**: `Revalidate Next.js`
- **URL**: `https://<CLIENT_DOMAIN>/api/revalidate`
- **Trigger on**: Create, Update, Delete
- **Filter**: (leave blank to fire on all document types)
- **Secret**: Use the same value as `SANITY_REVALIDATE_SECRET`
- **HTTP method**: POST

---

## Phase 3: Vercel Project Setup

### 3a. Create the project
1. Client logs into **vercel.com** and imports the GitHub repo from Phase 1
2. Framework preset: **Next.js** (auto-detected)
3. No build overrides needed — defaults work

### 3b. Set environment variables
In Vercel → Project → Settings → Environment Variables, add:

| Variable | Value | Environments |
|----------|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `<CLIENT_PROJECT_ID>` | All |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | All |
| `SANITY_API_TOKEN` | (viewer token from 2d) | All |
| `SANITY_API_WRITE_TOKEN` | (editor token from 2d) | All |
| `SANITY_REVALIDATE_SECRET` | (random secret from 2d) | All |

### 3c. Custom domain
In Vercel → Project → Settings → Domains:
1. Add the client's domain (e.g. `sageworx.com`)
2. Follow Vercel's DNS instructions (CNAME or A record at the client's registrar)

### 3d. Deploy
Push to `main` (or trigger a redeploy in the Vercel dashboard). Verify the site loads and Sanity content appears.

---

## Phase 4: Update the Codebase

After migration, update the example env file so future developers know what's needed:

**`.env.local` for the client's setup:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<CLIENT_PROJECT_ID>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<viewer_token>
SANITY_API_WRITE_TOKEN=<editor_token>
SANITY_REVALIDATE_SECRET=<webhook_secret>
```

No code changes are required — all Sanity config is read from environment variables.

---

## Phase 5: Verification Checklist

- [ ] Site loads at client's domain
- [ ] Sanity Studio accessible at `<CLIENT_DOMAIN>/studio`
- [ ] Client can log into Studio and edit content
- [ ] Content changes trigger revalidation (edit a page, see it update)
- [ ] Images load correctly (served from `cdn.sanity.io`)
- [ ] All pages render: `/`, `/model`, `/process`, `/members`, `/work`, `/spotlights`
- [ ] Case study and blog post detail pages work
- [ ] Preview/draft mode works in Studio (if applicable)

---

## Phase 6: Cleanup (after verification)

1. **Revoke your old tokens** — in your original Sanity project, delete the API tokens
2. **Archive or delete your Sanity project** (optional — you may want to keep it as a backup temporarily)
3. **Remove the repo from your GitHub** if it was transferred (already done) or delete your copy if you used Option B
4. **Remove `.env.local`** from your local machine (contains old tokens)

---

## Seed Scripts

The `scripts/` directory contains seed scripts that were used to populate initial content. These are included in the repo for reference but generally won't need to be re-run since the dataset export/import (Phase 2) carries over all content. If the client ever needs to reset or re-seed content, the scripts would need their `.env.local` updated with the new project credentials.

---

## Claude-Executable Migration

> **How to use:** Complete the dashboard setup in Phase 1–3 first (GitHub repo,
> Sanity project + tokens + CORS + webhook, Vercel project + env vars + domain).
> Then paste this doc into Claude Code along with the values below and say
> **"Run the migration."**

### Values Claude needs from you

Provide these before running — Claude will fill them into the commands:

```
CLIENT_GITHUB_REPO=         # e.g. sageworx-co/sgwx
CLIENT_SANITY_PROJECT_ID=   # e.g. abc123xy
SANITY_API_TOKEN=           # Viewer token from client's Sanity project
SANITY_API_WRITE_TOKEN=     # Editor token from client's Sanity project
SANITY_REVALIDATE_SECRET=   # Random string (must match webhook config)
CLIENT_DOMAIN=              # e.g. sageworx.com
```

### Step 1: Export Sanity dataset from current project

```bash
npx sanity dataset export production sgwx-export.tar.gz \
  --project-id 6a2n4h11
```

### Step 2: Import into client's Sanity project

```bash
npx sanity dataset import sgwx-export.tar.gz production \
  --project-id $CLIENT_SANITY_PROJECT_ID
```

### Step 3: Point git remote to client's repo

```bash
git remote set-url origin https://github.com/$CLIENT_GITHUB_REPO.git
git push -u origin main
```

### Step 4: Write the new .env.local

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SANITY_PROJECT_ID=$CLIENT_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=$SANITY_API_TOKEN
SANITY_API_WRITE_TOKEN=$SANITY_API_WRITE_TOKEN
SANITY_REVALIDATE_SECRET=$SANITY_REVALIDATE_SECRET
EOF
```

### Step 5: Update .env.local.example to match

```bash
cat > .env.local.example << 'EOF'
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_viewer_token
SANITY_API_WRITE_TOKEN=your_editor_token
SANITY_REVALIDATE_SECRET=your_webhook_secret
EOF
```

### Step 6: Verify the build

```bash
npm run build
```

### Step 7: Verify Sanity connection

```bash
# Quick check that the client's Sanity project responds
npx sanity documents query '*[_type == "homepage"][0]{title}' \
  --project-id $CLIENT_SANITY_PROJECT_ID \
  --dataset production
```

### Step 8: Commit and push

```bash
git add .env.local.example
git commit -m "chore: update env example for client project"
git push origin main
```

### What Claude can NOT do (dashboard-only steps)

These require browser access and must be done manually before running the above:

| Step | Where | What |
|------|-------|------|
| Create Sanity project | sanity.io/manage | New project, note the Project ID |
| Generate tokens | Sanity → Settings → API | Viewer + Editor tokens |
| Add CORS origins | Sanity → Settings → API | localhost:3000, production domain, *.vercel.app |
| Create webhook | Sanity → Settings → Webhooks | POST to /api/revalidate with secret |
| Create Vercel project | vercel.com | Import the GitHub repo |
| Set env vars | Vercel → Settings → Env Vars | All 5 variables from above |
| Add custom domain | Vercel → Settings → Domains | Point DNS to Vercel |
| Configure DNS | Client's registrar | CNAME or A record per Vercel instructions |

---

## Architecture Reference

| Component | Technology | Notes |
|-----------|-----------|-------|
| Framework | Next.js 16 (App Router) | Deployed on Vercel |
| CMS | Sanity v4 | Studio embedded at `/studio` |
| Styling | Tailwind CSS v4 | Theme tokens in `globals.css` |
| Animations | Framer Motion | Used throughout |
| Images | `cdn.sanity.io` | Via `@sanity/image-url` |
| Revalidation | Webhook → `/api/revalidate` | On-demand ISR |
