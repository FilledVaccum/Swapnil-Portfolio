# Portfolio Website Design

**Date**: 2026-03-09
**Status**: Approved

## Overview

A personal portfolio website that serves as a living professional presence. Built with Astro (static site generator), content authored as Markdown + YAML in a private GitHub repo. Deployable anywhere as pure static HTML/CSS/JS.

### Core Principles

- **GitHub as single source of truth** for all content
- **LLM-friendly architecture** — add/remove features by creating/deleting files
- **Content-code separation** — content in `content/` and `data/`, code in `src/`
- **Portable** — pure static output, no server dependencies
- **Organic minimalism** — warm earth tones, generous whitespace, hand-drawn SVG accents

## Tech Stack

- **Framework**: Astro (static site generator)
- **Content**: Astro Content Collections (Markdown + frontmatter)
- **Structured data**: YAML files in `data/`
- **Styling**: Scoped CSS with CSS custom properties
- **Deployment**: Static output (`dist/`), host-agnostic
- **Fonts**: DM Serif Display (headings) + Source Serif 4 (body) via Google Fonts

## Visual Design System

### Color Palette

```
--color-cream:        #F5F0E8    (page background)
--color-cream-light:  #FAF7F2    (card backgrounds)
--color-stone:        #D4CBC2    (borders, dividers)
--color-clay:         #B07D62    (primary accent — links, highlights)
--color-sage:         #7A8B6F    (secondary accent — tags, categories)
--color-olive:        #5C6B4F    (tertiary accent — hover states)
--color-charcoal:     #2C2C2C    (primary text)
--color-warm-gray:    #6B6560    (secondary text — dates, metadata)
--color-terracotta:   #C4714E    (emphasis accent — active states)
```

### Typography

- **Headings**: DM Serif Display — warm, high-contrast serif
- **Body**: Source Serif 4 — readable, warm serif
- **Type scale**: 0.75rem (xs) to 2.75rem (3xl), body at 1.05rem
- **Line height**: 1.8 for body text

### Spacing & Layout

- Max content width: 720px (prose), 1200px (grids)
- Left-aligned content with asymmetric margins on desktop
- Single-column for prose, grid for card-based sections
- Vertical rhythm: 2rem+ gaps between sections

### Decorative Elements

- Hand-drawn SVG dividers (wavy lines, organic shapes)
- Subtle paper/grain texture overlay (CSS noise filter)
- Soft warm shadows on cards: `0 2px 20px rgba(44, 44, 44, 0.06)`
- Large rounded corners: `border-radius: 16px`
- Organic blob shapes as background accents (low opacity SVGs)

### Motion

- Page load: staggered fade-up reveals (CSS animation-delay)
- Scroll: gentle fade-in for cards (Intersection Observer)
- Hover: cards lift with shadow deepening; links get animated clay underline
- No heavy animations — quiet, confident tone

## Project Structure

```
Portfolio_Website/
├── src/
│   ├── content/              # All content lives here
│   │   ├── blog/             # Markdown articles
│   │   ├── paperself/        # Paper notes + takeaways
│   │   ├── bookself/         # Book reviews
│   │   ├── talks/            # Talk summaries
│   │   ├── list100/          # (uses data/list100.yaml instead)
│   │   ├── diagrams/         # Diagrams with inline SVGs
│   │   ├── projects/         # Project showcases
│   │   ├── ai/               # AI explorations + opinions
│   │   └── demos/            # Demo descriptions + embeds
│   ├── components/           # Reusable .astro components
│   ├── layouts/              # Page layouts
│   ├── pages/                # Routes (file-based routing)
│   └── styles/               # Global styles + CSS variables
├── public/                   # Static assets (SVGs, images)
├── data/                     # Global config YAML
├── docs/                     # Design docs, plans
├── astro.config.mjs
└── package.json
```

## Component Architecture

### Layout Components

- `BaseLayout.astro` — HTML shell, meta tags, font loading, global styles
- `ContentLayout.astro` — Prose pages (720px max-width)
- `GridLayout.astro` — Card-based pages (1200px max-width)

### Navigation

Top horizontal nav, sticky on scroll:
- Visible: Blog, Paperself, Bookself, Projects
- "More" dropdown: Talks, List100, Diagrams, AI, Demos
- Mobile: hamburger menu
- About: linked from name or dedicated nav item

### Shared Components

- `Nav.astro` — navigation + mobile menu
- `Footer.astro` — social links, copyright, SVG flourish
- `Card.astro` — reusable card (image, title, description, tags, date)
- `TagList.astro` — horizontal tag pills
- `CategoryFilter.astro` — client-side filter bar for subcategories
- `ContentHeader.astro` — title + date + tags + reading time
- `SVGDivider.astro` — hand-drawn wavy line dividers
- `SEOHead.astro` — meta tags, Open Graph

### Section-Specific Components

- `BookCard.astro` — cover, title, author, rating, one-line take
- `PaperCard.astro` — title, authors, takeaway, link
- `ProjectCard.astro` — screenshot/SVG, title, tech stack, description
- `List100Item.astro` — number, text, status indicator
- `DiagramViewer.astro` — SVG rendering with optional zoom
- `DemoEmbed.astro` — iframe or embedded interactive
- `TalkCard.astro` — title, event, date, video/slides link

### Subcategory Strategy

- Frontmatter `category` field (e.g., `category: "ML"`)
- Horizontal filter bar on section pages: `All | ML | DL | GenAI`
- Client-side filtering, no routing changes
- New category = new frontmatter value, zero code changes

## Content Schemas

### Blog (`content/blog/*.md`)
```yaml
title: string (required)
date: date (required)
tags: string[] (required)
description: string (required)
draft: boolean (default: false)
```

### Paperself (`content/paperself/*.md`)
```yaml
title: string (required)
authors: string[] (required)
date: date (required)          # date reviewed
year: number (required)        # publication year
tags: string[] (required)
link: string (required)        # paper URL
rating: number (1-5, optional)
draft: boolean (default: false)
```

### Bookself (`content/bookself/*.md`)
```yaml
title: string (required)
author: string (required)
date: date (required)
tags: string[] (required)
cover: string (optional)       # image path
rating: number (1-5, optional)
status: enum [reading, finished, abandoned]
draft: boolean (default: false)
```

### Talks (`content/talks/*.md`)
```yaml
title: string (required)
event: string (required)
date: date (required)
tags: string[] (required)
video: string (optional)       # video URL
slides: string (optional)      # slides URL/path
draft: boolean (default: false)
```

### List100 (`data/list100.yaml`)
```yaml
items:
  - id: number
    text: string
    status: enum [done, in-progress, todo]
    date_completed: date (optional)
    note: string (optional)
```

### Diagrams (`content/diagrams/*.md`)
```yaml
title: string (required)
date: date (required)
tags: string[] (required)
category: string (optional)
draft: boolean (default: false)
```

### Projects (`content/projects/*.md`)
```yaml
title: string (required)
date: date (required)
tags: string[] (required)
tech: string[] (required)
github: string (optional)
live: string (optional)
image: string (optional)
featured: boolean (default: false)
draft: boolean (default: false)
```

### AI (`content/ai/*.md`)
```yaml
title: string (required)
date: date (required)
tags: string[] (required)
category: enum [exploration, tool, opinion, tutorial] (optional)
draft: boolean (default: false)
```

### Demos (`content/demos/*.md`)
```yaml
title: string (required)
date: date (required)
tags: string[] (required)
category: string (optional)    # ML, DL, GenAI
embed_url: string (optional)   # external demo iframe
draft: boolean (default: false)
```

### About (`data/about.yaml`)
```yaml
name: string
tagline: string
bio: string (Markdown)
social:
  github: string
  linkedin: string
  twitter: string
```

## Homepage Structure

1. **Hero** — Name, tagline, one-line bio, organic SVG blob accent
2. **Featured Projects** — 2-3 cards (`featured: true`)
3. **Recent Blog Posts** — Latest 5 with dates and tags
4. **Recent Reads** — 3 latest from Paperself + Bookself combined
5. **Footer** — Social links, SVG flourish

## Deferred Features (Add Later)

| Feature | When to Add | How |
|---------|------------|-----|
| Search | 20+ posts | Pagefind (static search plugin) |
| RSS feed | Public sharing | @astrojs/rss plugin |
| Analytics | After deploy | Script tag (Plausible/Umami) |
| Newsletter | Have audience | Form component + service |
| Comments | If needed | giscus (GitHub Discussions) |
| Contact form | If needed | Social links sufficient for now |
| Dark mode | If wanted | CSS variables + toggle component |

## Reference Sites

- https://arpitbhayani.me/ — content-first, clean navigation, papershelf/bookshelf pattern
- https://huyenchip.com/ — minimal, personal, human connection over visual hierarchy
