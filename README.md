# Sageworx Website

Marketing site for Sageworx, built with Next.js and Sanity CMS.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| CMS | Sanity v4 (Studio at `/studio`) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Images | Sanity CDN (`cdn.sanity.io`) |
| Hosting | Vercel |

---

## Getting Started (Local Development)

### Prerequisites

- **Node.js 18+** (20 recommended)
- **npm** (comes with Node)

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/<YOUR_ORG>/SGWX.git
   cd SGWX
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file from the example:
   ```bash
   cp .env.local.example .env.local
   ```

4. Fill in the environment variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_viewer_token
   SANITY_API_WRITE_TOKEN=your_editor_token
   SANITY_REVALIDATE_SECRET=your_webhook_secret
   ```
   These values are in the Vercel dashboard under **Project > Settings > Environment Variables**.

5. Start the dev server:
   ```bash
   npm run dev
   ```
   The site runs at **http://localhost:3000** and Sanity Studio at **http://localhost:3000/studio**.

---

## Site Pages

| Path | Description |
|------|-------------|
| `/` | Homepage |
| `/model` | The Sageworx Model |
| `/process` | Six-step process |
| `/members` | Team member listing |
| `/members/[slug]` | Individual member profile |
| `/work` | Case studies |
| `/work/[slug]` | Individual case study |
| `/spotlights` | Blog / spotlights |
| `/spotlights/[slug]` | Individual spotlight post |
| `/studio` | Sanity Studio (content editor) |

---

## Managing Content (Sanity Studio)

Sanity Studio is the content management interface. Access it at:

**https://your-domain.com/studio**

### Logging In

1. Go to `/studio` on the live site
2. Sign in with the Google or email account that was added to the Sanity project
3. You'll see the content editor with documents organized in the sidebar

### Adding or Inviting Team Members to Studio

1. Go to **[sanity.io/manage](https://sanity.io/manage)**
2. Select the Sageworx project
3. Go to **Members** and invite by email
4. Assign the **Editor** role (can create/edit/publish) or **Viewer** role (read-only)

### Content Types You Can Edit

| Document Type | What It Controls |
|---------------|-----------------|
| **Homepage** | Hero, logos, feature cards, comparison table, experts section |
| **Model Page** | The Sageworx Model page sections |
| **Process Page** | Six-step process content |
| **Members Page** | Team listing page intro |
| **Member** | Individual team member profiles (name, title, bio, photo) |
| **Work Page** | Case studies listing page intro |
| **Case Study** | Individual case study (title, client, images, body) |
| **Spotlights Page** | Blog listing page intro |
| **Blog Post** | Individual blog/spotlight entry |
| **Site Settings** | Global settings (site title, navigation, footer) |

### Editing a Page

1. Click the document in the Studio sidebar
2. Make your changes in the editor
3. Click **Publish** (green button, bottom right)
4. The live site updates automatically within a few seconds (via webhook revalidation)

### Uploading Images

- Drag and drop images into any image field in Studio
- Images are hosted on Sanity's CDN -- no need to manage hosting
- Supported formats: JPG, PNG, SVG, WebP, GIF

---

## Deployment

**Pushing to the `main` branch triggers an automatic deploy on Vercel.**

There is no staging environment -- `main` is production. To deploy a change:

1. Make your code changes locally
2. Commit and push to `main`:
   ```bash
   git add .
   git commit -m "your change description"
   git push origin main
   ```
3. Vercel builds and deploys automatically (takes ~1-2 minutes)
4. Check the deploy status at **[vercel.com](https://vercel.com)** > your project > Deployments

Content changes made in Sanity Studio do **not** require a deploy -- they go live automatically via the revalidation webhook.

---

## Admin Tasks

### Checking if the Site is Down

1. Visit your domain -- if it loads, you're good
2. Check the Vercel dashboard for failed deployments
3. Check [status.vercel.com](https://status.vercel.com) for platform issues
4. Check [status.sanity.io](https://status.sanity.io) for CMS issues

### Viewing Deploy Logs

1. Log in to **[vercel.com](https://vercel.com)**
2. Select the SGWX project
3. Click **Deployments** to see build history and logs

### Custom Domain / DNS

Managed in **Vercel > Project > Settings > Domains**. If you need to change the domain or fix DNS:

1. Go to Vercel project settings > Domains
2. Add or modify the domain
3. Update DNS records at your registrar (Vercel provides the exact records needed)

### Environment Variables

If you need to update API tokens or secrets:

1. Go to **Vercel > Project > Settings > Environment Variables**
2. Edit the relevant variable
3. Redeploy for the change to take effect (Deployments > three-dot menu > Redeploy)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Connects to your Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | Which dataset to read (`production`) |
| `SANITY_API_TOKEN` | Read-only token for server-side data fetching |
| `SANITY_API_WRITE_TOKEN` | Write token for seed scripts |
| `SANITY_REVALIDATE_SECRET` | Shared secret for the Sanity webhook |

### Sanity Webhook (Content Revalidation)

This is what makes content changes go live instantly. If content edits stop appearing on the site:

1. Go to **[sanity.io/manage](https://sanity.io/manage)** > your project > **API** > **Webhooks**
2. Verify the webhook exists with:
   - **URL**: `https://your-domain.com/api/revalidate`
   - **Trigger on**: Create, Update, Delete
   - **Secret**: Must match the `SANITY_REVALIDATE_SECRET` in Vercel
3. Check the webhook delivery log for errors

### Sanity CORS (If Studio Won't Load)

If you get CORS errors when accessing Studio:

1. Go to **[sanity.io/manage](https://sanity.io/manage)** > your project > **API** > **CORS Origins**
2. Ensure these origins exist:
   - `http://localhost:3000` (with credentials)
   - `https://your-domain.com` (with credentials)
   - `https://*.vercel.app` (for preview deploys)

---

## Monthly Costs

| Service | Plan | Cost |
|---------|------|------|
| GitHub | Free | $0 |
| Vercel | Pro (1 seat) | $20/mo |
| Sanity | Free | $0 |
| **Total** | | **$20/mo** |

See [MIGRATION.md](MIGRATION.md) for detailed plan comparisons and upgrade paths.

---

## Project Structure

```
SGWX/
├── public/                  # Static assets (fonts, images)
├── scripts/                 # Sanity seed scripts (initial content setup)
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/revalidate/  # Webhook endpoint for Sanity
│   │   ├── studio/          # Sanity Studio (embedded)
│   │   ├── model/           # Model page
│   │   ├── process/         # Process page
│   │   ├── members/         # Members listing + detail
│   │   ├── work/            # Case studies listing + detail
│   │   ├── spotlights/      # Blog listing + detail
│   │   └── page.tsx         # Homepage
│   ├── components/          # React components
│   ├── lib/sanity/          # Sanity client, queries, helpers
│   └── sanity/
│       ├── schemaTypes/     # Content model definitions
│       └── structure.ts     # Studio sidebar organization
├── sanity.config.ts         # Sanity Studio configuration
├── MIGRATION.md             # Full migration guide (developer → client)
└── package.json
```

---

## Migration Guide

For transferring ownership of the GitHub repo, Sanity project, and Vercel deployment to new accounts, see **[MIGRATION.md](MIGRATION.md)**. It covers:

- Recommended plans and pricing for each service
- Step-by-step GitHub repo transfer
- Sanity content export/import
- Vercel project setup and environment variables
- DNS and custom domain configuration
- Post-migration verification checklist
