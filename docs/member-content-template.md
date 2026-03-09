# Featured Team Member — Content Template

Each featured member displays the following fields. Fill in one block per person.

## Fields

| Field | Type | Required | Description |
|---|---|---|---|
| **name** | string | Yes | Full name |
| **slug** | slug | Yes | URL-friendly version of name (e.g., `jane-doe`) |
| **title** | string | No | Role/Title (e.g., "Chief Creative Officer") |
| **mantra** | text | No | A personal motto or guiding philosophy, displayed in quotes |
| **characterMetaphor** | string | No | A metaphorical description of this person's working style (shown on detail page only) |
| **bio** | text | No | A short bio paragraph |
| **favoriteTools** | string | No | Comma-separated list of tools/platforms they love |
| **link** | object | No | External link — has `label` (string) and `url` (URL) |
| **photo** | image | No | Headshot photo (square aspect ratio, hotspot enabled) |
| **isFeatured** | boolean | No | Set to `true` to show on the featured members section |
| **order** | number | No | Sort order (ascending) |

## Example Entry

```
Name: Jane Doe
Slug: jane-doe
Title: Chief Creative Officer
Mantra: Design is not what it looks like — it's how it works.
Character Metaphor: The Architect — builds invisible structures that make everything else possible.
Bio: Jane brings 15 years of brand strategy experience across CPG, fintech, and healthcare. She's led creative for Fortune 500 launches and bootstrapped startups alike, always obsessing over the intersection of story and system.
Favorite Tools: Figma, Notion, Midjourney, Miro
Link Label: LinkedIn
Link URL: https://linkedin.com/in/janedoe
Is Featured: true
Order: 1
```

## How It Displays

### On the featured cards (grid on model/members page):
- Photo (square)
- Name
- Title (uppercase mono label)
- Mantra (in quotes, italic)
- Bio
- Favorite Tools (with label)
- "View Profile" link + external link if provided

### On the detail page (`/members/[slug]`):
- All of the above, plus **Character Metaphor** (with its own label)
- Larger photo, blockquote-style mantra
