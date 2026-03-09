# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a static portfolio website with Astro, using Markdown + YAML content from GitHub as the single source of truth, styled with organic minimalism.

**Architecture:** Astro static site with Content Collections for Markdown content and YAML data files for structured data. File-based routing, scoped CSS with custom properties, no JS framework dependencies. Pure static HTML/CSS/JS output.

**Tech Stack:** Astro 5.x, TypeScript (config only), CSS custom properties, Google Fonts (DM Serif Display + Source Serif 4)

**Design Doc:** `docs/plans/2026-03-09-portfolio-website-design.md`

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`

**Step 1: Initialize Astro project**

Run:
```bash
cd /Users/swtiwari/Documents/Claude_Code/Portfolio_Website
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

If prompted to overwrite, allow it. The minimal template gives us a clean starting point.

**Step 2: Install dependencies**

Run:
```bash
npm install
```

Expected: `node_modules/` created, `package-lock.json` generated.

**Step 3: Verify dev server starts**

Run:
```bash
npm run dev
```

Expected: Server starts at `localhost:4321`. Kill it after confirming.

**Step 4: Create directory structure**

Run:
```bash
mkdir -p src/content/blog src/content/paperself src/content/bookself src/content/talks src/content/diagrams src/content/projects src/content/ai src/content/demos
mkdir -p src/components src/layouts src/styles
mkdir -p data public/images/books public/images/projects public/svg
```

**Step 5: Set up .gitignore**

Ensure `.gitignore` includes:
```
node_modules/
dist/
.astro/
.env
.DS_Store
```

**Step 6: Initialize git and commit**

Run:
```bash
git init
git add -A
git commit -m "feat: initialize Astro project with directory structure"
```

---

### Task 2: Design System — Global Styles & CSS Variables

**Files:**
- Create: `src/styles/global.css`
- Create: `src/styles/variables.css`
- Create: `src/styles/typography.css`
- Create: `src/styles/animations.css`

**Step 1: Create CSS variables**

Create `src/styles/variables.css`:
```css
:root {
  /* Colors */
  --color-cream: #F5F0E8;
  --color-cream-light: #FAF7F2;
  --color-stone: #D4CBC2;
  --color-clay: #B07D62;
  --color-sage: #7A8B6F;
  --color-olive: #5C6B4F;
  --color-charcoal: #2C2C2C;
  --color-warm-gray: #6B6560;
  --color-terracotta: #C4714E;

  /* Typography scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1.05rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-3xl: 2.75rem;

  /* Font families */
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body: 'Source Serif 4', Georgia, serif;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 5rem;

  /* Layout */
  --max-width-prose: 720px;
  --max-width-page: 1200px;

  /* Shadows */
  --shadow-card: 0 2px 20px rgba(44, 44, 44, 0.06);
  --shadow-card-hover: 0 4px 30px rgba(44, 44, 44, 0.1);

  /* Borders */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```

**Step 2: Create typography styles**

Create `src/styles/typography.css`:
```css
h1, h2, h3, h4 {
  font-family: var(--font-display);
  color: var(--color-charcoal);
  line-height: 1.2;
  font-weight: 400;
}

h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }
h4 { font-size: var(--text-lg); }

p, li, blockquote {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--color-charcoal);
}

a {
  color: var(--color-clay);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-olive);
}

small, .text-meta {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
}

code {
  font-size: 0.9em;
  background: var(--color-cream-light);
  padding: 0.15em 0.4em;
  border-radius: var(--radius-sm);
}

pre {
  background: var(--color-charcoal);
  color: var(--color-cream);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  overflow-x: auto;
  line-height: 1.5;
}

pre code {
  background: none;
  padding: 0;
  color: inherit;
}

blockquote {
  border-left: 3px solid var(--color-clay);
  padding-left: var(--space-lg);
  margin-left: 0;
  font-style: italic;
  color: var(--color-warm-gray);
}
```

**Step 3: Create animations**

Create `src/styles/animations.css`:
```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp var(--transition-slow) ease forwards;
  opacity: 0;
}

.animate-fade-up:nth-child(1) { animation-delay: 0ms; }
.animate-fade-up:nth-child(2) { animation-delay: 80ms; }
.animate-fade-up:nth-child(3) { animation-delay: 160ms; }
.animate-fade-up:nth-child(4) { animation-delay: 240ms; }
.animate-fade-up:nth-child(5) { animation-delay: 320ms; }

.fade-in-on-scroll {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity var(--transition-slow) ease, transform var(--transition-slow) ease;
}

.fade-in-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 4: Create global styles**

Create `src/styles/global.css`:
```css
@import './variables.css';
@import './typography.css';
@import './animations.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-charcoal);
  background-color: var(--color-cream);
  line-height: 1.8;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

::selection {
  background-color: var(--color-clay);
  color: var(--color-cream);
}
```

**Step 5: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

**Step 6: Commit**

```bash
git add src/styles/
git commit -m "feat: add design system — CSS variables, typography, animations"
```

---

### Task 3: Base Layout + Font Loading

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/SEOHead.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create SEOHead component**

Create `src/components/SEOHead.astro`:
```astro
---
interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { title, description = "Personal portfolio and blog", image } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
{image && <meta property="og:image" content={new URL(image, Astro.site)} />}

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap"
  rel="stylesheet"
/>
```

**Step 2: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:
```astro
---
import SEOHead from '../components/SEOHead.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <SEOHead title={title} description={description} image={image} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Step 3: Update index.astro to use BaseLayout**

Replace `src/pages/index.astro` with:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home">
  <main>
    <h1>Portfolio</h1>
    <p>Site is under construction.</p>
  </main>
</BaseLayout>

<style>
  main {
    max-width: var(--max-width-prose);
    margin: var(--space-2xl) auto;
    padding: 0 var(--space-lg);
  }
</style>
```

**Step 4: Add site URL to Astro config**

Replace `astro.config.mjs` with:
```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
});
```

**Step 5: Verify dev server renders correctly**

Run:
```bash
npm run dev
```

Open `localhost:4321`. Confirm: cream background, DM Serif Display heading, Source Serif 4 body text, warm color scheme visible. Kill server.

**Step 6: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds, `dist/index.html` exists.

**Step 7: Commit**

```bash
git add src/layouts/ src/components/SEOHead.astro src/pages/index.astro astro.config.mjs
git commit -m "feat: add BaseLayout with SEO head and font loading"
```

---

### Task 4: Content & Grid Layouts

**Files:**
- Create: `src/layouts/ContentLayout.astro`
- Create: `src/layouts/GridLayout.astro`

**Step 1: Create ContentLayout (prose pages)**

Create `src/layouts/ContentLayout.astro`:
```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<BaseLayout title={title} description={description} image={image}>
  <main class="content-layout">
    <slot />
  </main>
</BaseLayout>

<style>
  .content-layout {
    max-width: var(--max-width-prose);
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-lg);
  }

  @media (min-width: 768px) {
    .content-layout {
      padding-left: calc(var(--space-lg) + 5vw);
    }
  }
</style>
```

**Step 2: Create GridLayout (card-based pages)**

Create `src/layouts/GridLayout.astro`:
```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <main class="grid-layout">
    <slot />
  </main>
</BaseLayout>

<style>
  .grid-layout {
    max-width: var(--max-width-page);
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-lg);
  }
</style>
```

**Step 3: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/layouts/ContentLayout.astro src/layouts/GridLayout.astro
git commit -m "feat: add ContentLayout and GridLayout"
```

---

### Task 5: Navigation Component

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Create Nav component**

Create `src/components/Nav.astro`:
```astro
---
const currentPath = Astro.url.pathname;

const primaryLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/paperself', label: 'Paperself' },
  { href: '/bookself', label: 'Bookself' },
  { href: '/projects', label: 'Projects' },
];

const moreLinks = [
  { href: '/talks', label: 'Talks' },
  { href: '/list100', label: 'List100' },
  { href: '/diagrams', label: 'Diagrams' },
  { href: '/ai', label: 'AI' },
  { href: '/demos', label: 'Demos' },
];
---

<nav class="nav">
  <div class="nav-inner">
    <a href="/" class="nav-name">Your Name</a>

    <div class="nav-links" id="nav-links">
      {primaryLinks.map(link => (
        <a href={link.href} class:list={['nav-link', { active: currentPath.startsWith(link.href) }]}>
          {link.label}
        </a>
      ))}

      <div class="nav-more">
        <button class="nav-link nav-more-btn" id="more-btn">
          More <span class="more-arrow">&#9662;</span>
        </button>
        <div class="nav-dropdown" id="nav-dropdown">
          {moreLinks.map(link => (
            <a href={link.href} class:list={['dropdown-link', { active: currentPath.startsWith(link.href) }]}>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <a href="/about" class:list={['nav-link', { active: currentPath.startsWith('/about') }]}>About</a>
    </div>

    <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

  <!-- Mobile menu -->
  <div class="nav-mobile" id="mobile-menu">
    {[...primaryLinks, ...moreLinks].map(link => (
      <a href={link.href} class:list={['mobile-link', { active: currentPath.startsWith(link.href) }]}>
        {link.label}
      </a>
    ))}
    <a href="/about" class:list={['mobile-link', { active: currentPath.startsWith('/about') }]}>About</a>
  </div>
</nav>

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--color-cream);
    border-bottom: 1px solid var(--color-stone);
  }

  .nav-inner {
    max-width: var(--max-width-page);
    margin: 0 auto;
    padding: var(--space-md) var(--space-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-name {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    color: var(--color-charcoal);
    text-decoration: none;
  }

  .nav-name:hover {
    color: var(--color-clay);
  }

  .nav-links {
    display: none;
    align-items: center;
    gap: var(--space-lg);
  }

  @media (min-width: 768px) {
    .nav-links {
      display: flex;
    }

    .nav-hamburger {
      display: none;
    }
  }

  .nav-link {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-warm-gray);
    text-decoration: none;
    transition: color var(--transition-fast);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .nav-link:hover, .nav-link.active {
    color: var(--color-clay);
  }

  /* More dropdown */
  .nav-more {
    position: relative;
  }

  .nav-more-btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .more-arrow {
    font-size: 0.6em;
    transition: transform var(--transition-fast);
  }

  .nav-more.open .more-arrow {
    transform: rotate(180deg);
  }

  .nav-dropdown {
    display: none;
    position: absolute;
    top: calc(100% + var(--space-sm));
    right: 0;
    background: var(--color-cream-light);
    border: 1px solid var(--color-stone);
    border-radius: var(--radius-md);
    padding: var(--space-sm) 0;
    min-width: 140px;
    box-shadow: var(--shadow-card);
  }

  .nav-more.open .nav-dropdown {
    display: block;
  }

  .dropdown-link {
    display: block;
    padding: var(--space-sm) var(--space-md);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-warm-gray);
    text-decoration: none;
    transition: background var(--transition-fast), color var(--transition-fast);
  }

  .dropdown-link:hover, .dropdown-link.active {
    color: var(--color-clay);
    background: var(--color-cream);
  }

  /* Hamburger */
  .nav-hamburger {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: var(--space-sm);
  }

  .nav-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--color-charcoal);
    transition: transform var(--transition-fast), opacity var(--transition-fast);
  }

  .nav-hamburger.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .nav-hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .nav-hamburger.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  /* Mobile menu */
  .nav-mobile {
    display: none;
    flex-direction: column;
    padding: var(--space-md) var(--space-lg) var(--space-lg);
    border-top: 1px solid var(--color-stone);
  }

  .nav-mobile.open {
    display: flex;
  }

  @media (min-width: 768px) {
    .nav-mobile {
      display: none !important;
    }
  }

  .mobile-link {
    padding: var(--space-sm) 0;
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-warm-gray);
    text-decoration: none;
    border-bottom: 1px solid var(--color-stone);
  }

  .mobile-link:last-child {
    border-bottom: none;
  }

  .mobile-link:hover, .mobile-link.active {
    color: var(--color-clay);
  }
</style>

<script>
  const moreBtn = document.getElementById('more-btn');
  const navMore = moreBtn?.closest('.nav-more');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  moreBtn?.addEventListener('click', () => {
    navMore?.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!navMore?.contains(e.target as Node)) {
      navMore?.classList.remove('open');
    }
  });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
  });
</script>
```

**Step 2: Add Nav to BaseLayout**

Modify `src/layouts/BaseLayout.astro` — add Nav import and render it before `<slot />`:

Add import:
```astro
import Nav from '../components/Nav.astro';
```

In the body, before `<slot />`:
```astro
<body>
  <Nav />
  <slot />
</body>
```

**Step 3: Verify in dev server**

Run:
```bash
npm run dev
```

Confirm: sticky nav appears, dropdown works, hamburger works on mobile viewport. Kill server.

**Step 4: Commit**

```bash
git add src/components/Nav.astro src/layouts/BaseLayout.astro
git commit -m "feat: add navigation with dropdown and mobile menu"
```

---

### Task 6: Footer Component + SVG Divider

**Files:**
- Create: `src/components/Footer.astro`
- Create: `src/components/SVGDivider.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Create SVGDivider**

Create `src/components/SVGDivider.astro`:
```astro
---
interface Props {
  class?: string;
}

const { class: className } = Astro.props;
---

<div class:list={['svg-divider', className]}>
  <svg viewBox="0 0 800 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,20 C100,35 200,5 300,20 C400,35 500,5 600,20 C700,35 800,15 800,20"
      fill="none"
      stroke="var(--color-stone)"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</div>

<style>
  .svg-divider {
    width: 100%;
    max-width: 200px;
    margin: var(--space-xl) auto;
    opacity: 0.6;
  }

  .svg-divider svg {
    width: 100%;
    height: auto;
  }
</style>
```

**Step 2: Create Footer**

Create `src/components/Footer.astro`:
```astro
---
import SVGDivider from './SVGDivider.astro';
---

<footer class="footer">
  <SVGDivider />
  <div class="footer-inner">
    <div class="footer-links">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
    </div>
    <p class="footer-copy">&copy; {new Date().getFullYear()} Your Name</p>
  </div>
</footer>

<style>
  .footer {
    padding: var(--space-lg) var(--space-lg) var(--space-xl);
  }

  .footer-inner {
    max-width: var(--max-width-page);
    margin: 0 auto;
    text-align: center;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: var(--space-lg);
    margin-bottom: var(--space-md);
  }

  .footer-links a {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-warm-gray);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-links a:hover {
    color: var(--color-clay);
  }

  .footer-copy {
    font-size: var(--text-xs);
    color: var(--color-stone);
  }
</style>
```

**Step 3: Add Footer to BaseLayout**

Modify `src/layouts/BaseLayout.astro` — add Footer import and render after `<slot />`:

Add import:
```astro
import Footer from '../components/Footer.astro';
```

Body becomes:
```astro
<body>
  <Nav />
  <slot />
  <Footer />
</body>
```

**Step 4: Verify and commit**

Run:
```bash
npm run build
```

Expected: Build succeeds.

```bash
git add src/components/Footer.astro src/components/SVGDivider.astro src/layouts/BaseLayout.astro
git commit -m "feat: add footer and SVG divider components"
```

---

### Task 7: Shared UI Components

**Files:**
- Create: `src/components/Card.astro`
- Create: `src/components/TagList.astro`
- Create: `src/components/ContentHeader.astro`
- Create: `src/components/CategoryFilter.astro`

**Step 1: Create TagList**

Create `src/components/TagList.astro`:
```astro
---
interface Props {
  tags: string[];
}

const { tags } = Astro.props;
---

<div class="tag-list">
  {tags.map(tag => (
    <span class="tag">{tag}</span>
  ))}
</div>

<style>
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

  .tag {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--color-olive);
    background: rgba(122, 139, 111, 0.1);
    padding: 0.15em 0.6em;
    border-radius: 999px;
  }
</style>
```

**Step 2: Create Card**

Create `src/components/Card.astro`:
```astro
---
import TagList from './TagList.astro';

interface Props {
  title: string;
  href: string;
  description?: string;
  date?: Date;
  tags?: string[];
  image?: string;
}

const { title, href, description, date, tags, image } = Astro.props;
---

<a href={href} class="card">
  {image && (
    <div class="card-image">
      <img src={image} alt={title} loading="lazy" />
    </div>
  )}
  <div class="card-body">
    {date && (
      <time class="card-date" datetime={date.toISOString()}>
        {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
      </time>
    )}
    <h3 class="card-title">{title}</h3>
    {description && <p class="card-desc">{description}</p>}
    {tags && tags.length > 0 && <TagList tags={tags} />}
  </div>
</a>

<style>
  .card {
    display: block;
    background: var(--color-cream-light);
    border-radius: var(--radius-lg);
    overflow: hidden;
    text-decoration: none;
    box-shadow: var(--shadow-card);
    transition: transform var(--transition-base), box-shadow var(--transition-base);
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-card-hover);
  }

  .card-image img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
  }

  .card-body {
    padding: var(--space-md) var(--space-lg) var(--space-lg);
  }

  .card-date {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--color-warm-gray);
    display: block;
    margin-bottom: var(--space-xs);
  }

  .card-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    color: var(--color-charcoal);
    margin-bottom: var(--space-sm);
    line-height: 1.3;
  }

  .card-desc {
    font-size: var(--text-sm);
    color: var(--color-warm-gray);
    margin-bottom: var(--space-sm);
    line-height: 1.6;
  }
</style>
```

**Step 3: Create ContentHeader**

Create `src/components/ContentHeader.astro`:
```astro
---
import TagList from './TagList.astro';

interface Props {
  title: string;
  date: Date;
  tags?: string[];
  readingTime?: string;
}

const { title, date, tags, readingTime } = Astro.props;
---

<header class="content-header">
  <h1>{title}</h1>
  <div class="content-meta">
    <time datetime={date.toISOString()}>
      {date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
    </time>
    {readingTime && <span class="reading-time">{readingTime}</span>}
  </div>
  {tags && tags.length > 0 && <TagList tags={tags} />}
</header>

<style>
  .content-header {
    margin-bottom: var(--space-xl);
  }

  .content-header h1 {
    margin-bottom: var(--space-sm);
  }

  .content-meta {
    display: flex;
    gap: var(--space-md);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-warm-gray);
    margin-bottom: var(--space-sm);
  }

  .reading-time::before {
    content: '\00B7';
    margin-right: var(--space-md);
  }
</style>
```

**Step 4: Create CategoryFilter**

Create `src/components/CategoryFilter.astro`:
```astro
---
interface Props {
  categories: string[];
  sectionId: string;
}

const { categories, sectionId } = Astro.props;
---

<div class="category-filter" data-section={sectionId}>
  <button class="filter-btn active" data-category="all">All</button>
  {categories.map(cat => (
    <button class="filter-btn" data-category={cat}>{cat}</button>
  ))}
</div>

<style>
  .category-filter {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-bottom: var(--space-xl);
  }

  .filter-btn {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-warm-gray);
    background: none;
    border: 1px solid var(--color-stone);
    border-radius: 999px;
    padding: 0.3em 1em;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .filter-btn:hover {
    border-color: var(--color-clay);
    color: var(--color-clay);
  }

  .filter-btn.active {
    background: var(--color-clay);
    color: var(--color-cream);
    border-color: var(--color-clay);
  }
</style>

<script>
  document.querySelectorAll('.category-filter').forEach(filter => {
    const section = filter.dataset.section;
    const buttons = filter.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = (btn as HTMLElement).dataset.category;
        const cards = document.querySelectorAll(`[data-section-items="${section}"] [data-category]`);

        cards.forEach(card => {
          const el = card as HTMLElement;
          if (category === 'all' || el.dataset.category === category) {
            el.style.display = '';
          } else {
            el.style.display = 'none';
          }
        });
      });
    });
  });
</script>
```

**Step 5: Verify and commit**

Run:
```bash
npm run build
```

Expected: Build succeeds.

```bash
git add src/components/Card.astro src/components/TagList.astro src/components/ContentHeader.astro src/components/CategoryFilter.astro
git commit -m "feat: add shared UI components — Card, TagList, ContentHeader, CategoryFilter"
```

---

### Task 8: Content Collections Configuration

**Files:**
- Create: `src/content.config.ts`

**Step 1: Create content collection schemas**

Create `src/content.config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

const paperself = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paperself' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    date: z.coerce.date(),
    year: z.number(),
    tags: z.array(z.string()),
    link: z.string().url(),
    rating: z.number().min(1).max(5).optional(),
    draft: z.boolean().default(false),
  }),
});

const bookself = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bookself' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    status: z.enum(['reading', 'finished', 'abandoned']),
    draft: z.boolean().default(false),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    video: z.string().url().optional(),
    slides: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const diagrams = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/diagrams' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    category: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    tech: z.array(z.string()),
    github: z.string().url().optional(),
    live: z.string().url().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const ai = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ai' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    category: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const demos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/demos' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    category: z.string().optional(),
    embed_url: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  paperself,
  bookself,
  talks,
  diagrams,
  projects,
  ai,
  demos,
};
```

**Step 2: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds. Collections are registered (may warn about empty collections — that's fine).

**Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: define content collection schemas for all sections"
```

---

### Task 9: Sample Content (One Per Section)

**Files:**
- Create: One sample `.md` file per content collection
- Create: `data/list100.yaml`
- Create: `data/about.yaml`

**Step 1: Create sample blog post**

Create `src/content/blog/welcome.md`:
```markdown
---
title: "Welcome to My Corner of the Internet"
date: 2026-03-09
tags: [meta, personal]
description: "First post — why I built this site and what you'll find here."
draft: false
---

This is a sample blog post. Replace this with your actual content.

## Why This Site

A few reasons:
- A place to think out loud
- A living portfolio that grows with me
- A forcing function to write more

## What You'll Find

Blog posts, paper notes, book reviews, diagrams, and whatever else I'm exploring.
```

**Step 2: Create sample paper**

Create `src/content/paperself/attention-is-all-you-need.md`:
```markdown
---
title: "Attention Is All You Need"
authors: ["Vaswani et al."]
date: 2026-03-01
year: 2017
tags: [transformers, deep-learning, nlp]
link: "https://arxiv.org/abs/1706.03762"
rating: 5
draft: false
---

The paper that started the transformer revolution. Key takeaway: self-attention can replace recurrence entirely for sequence modeling.
```

**Step 3: Create sample book**

Create `src/content/bookself/ddia.md`:
```markdown
---
title: "Designing Data-Intensive Applications"
author: "Martin Kleppmann"
date: 2026-01-15
tags: [systems, databases, distributed]
rating: 5
status: finished
draft: false
---

The best single book on modern data systems. Essential reading for anyone building distributed systems.
```

**Step 4: Create sample talk**

Create `src/content/talks/sample-talk.md`:
```markdown
---
title: "Building Event-Driven Systems on AWS"
event: "AWS Community Day 2025"
date: 2025-11-10
tags: [aws, event-driven, architecture]
draft: false
---

A talk about designing event-driven architectures using EventBridge, SQS, and Lambda.
```

**Step 5: Create sample diagram**

Create `src/content/diagrams/sample-diagram.md`:
```markdown
---
title: "AWS Event-Driven Architecture"
date: 2026-02-20
tags: [aws, architecture, event-driven]
category: "aws"
draft: false
---

<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="80" width="100" height="40" rx="8" fill="#B07D62" opacity="0.8"/>
  <text x="60" y="105" text-anchor="middle" fill="white" font-size="12">EventBridge</text>
  <rect x="150" y="30" width="100" height="40" rx="8" fill="#7A8B6F" opacity="0.8"/>
  <text x="200" y="55" text-anchor="middle" fill="white" font-size="12">Lambda</text>
  <rect x="150" y="130" width="100" height="40" rx="8" fill="#7A8B6F" opacity="0.8"/>
  <text x="200" y="155" text-anchor="middle" fill="white" font-size="12">SQS</text>
  <rect x="290" y="80" width="100" height="40" rx="8" fill="#5C6B4F" opacity="0.8"/>
  <text x="340" y="105" text-anchor="middle" fill="white" font-size="12">DynamoDB</text>
  <line x1="110" y1="95" x2="150" y2="50" stroke="#D4CBC2" stroke-width="2"/>
  <line x1="110" y1="105" x2="150" y2="150" stroke="#D4CBC2" stroke-width="2"/>
  <line x1="250" y1="50" x2="290" y2="95" stroke="#D4CBC2" stroke-width="2"/>
  <line x1="250" y1="150" x2="290" y2="105" stroke="#D4CBC2" stroke-width="2"/>
</svg>

Sample architecture diagram showing an event-driven flow.
```

**Step 6: Create sample project**

Create `src/content/projects/sample-project.md`:
```markdown
---
title: "Real-Time Data Pipeline"
date: 2026-01-01
tags: [aws, data-engineering]
tech: [Python, Terraform, AWS Kinesis, Lambda]
featured: true
draft: false
---

A serverless real-time data pipeline processing millions of events per day.
```

**Step 7: Create sample AI post**

Create `src/content/ai/sample-ai.md`:
```markdown
---
title: "My Take on AI Agents in 2026"
date: 2026-03-05
tags: [agents, llm, opinion]
category: "opinion"
draft: false
---

Thoughts on where AI agents are headed and what actually works today.
```

**Step 8: Create sample demo**

Create `src/content/demos/sample-demo.md`:
```markdown
---
title: "Neural Style Transfer Playground"
date: 2026-02-10
tags: [deep-learning, computer-vision]
category: "DL"
draft: false
---

A playground for experimenting with neural style transfer.
```

**Step 9: Create list100.yaml**

Create `data/list100.yaml`:
```yaml
items:
  - id: 1
    text: "Run a marathon"
    status: "todo"
  - id: 2
    text: "Read 100 research papers"
    status: "in-progress"
    note: "12/100"
  - id: 3
    text: "Give a conference talk"
    status: "done"
    date_completed: "2025-11-10"
    note: "AWS Community Day"
```

**Step 10: Create about.yaml**

Create `data/about.yaml`:
```yaml
name: "Your Name"
tagline: "AWS Solutions Architect. Builder. Learner."
bio: |
  I'm a solutions architect who loves building things.
  This site is my corner of the internet — a living portfolio
  of what I'm learning, building, and thinking about.
social:
  github: "https://github.com/yourusername"
  linkedin: "https://linkedin.com/in/yourusername"
  twitter: "https://twitter.com/yourusername"
```

**Step 11: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds, content collections load without errors.

**Step 12: Commit**

```bash
git add src/content/ data/
git commit -m "feat: add sample content for all sections"
```

---

### Task 10: Section-Specific Card Components

**Files:**
- Create: `src/components/BookCard.astro`
- Create: `src/components/PaperCard.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/TalkCard.astro`
- Create: `src/components/List100Item.astro`
- Create: `src/components/DemoEmbed.astro`

**Step 1: Create BookCard**

Create `src/components/BookCard.astro`:
```astro
---
import TagList from './TagList.astro';

interface Props {
  title: string;
  author: string;
  href: string;
  rating?: number;
  status: string;
  tags: string[];
  cover?: string;
}

const { title, author, href, rating, status, tags, cover } = Astro.props;
---

<a href={href} class="book-card">
  {cover && (
    <div class="book-cover">
      <img src={cover} alt={title} loading="lazy" />
    </div>
  )}
  <div class="book-body">
    <h3 class="book-title">{title}</h3>
    <p class="book-author">{author}</p>
    <div class="book-meta">
      {rating && (
        <span class="book-rating">
          {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </span>
      )}
      <span class={`book-status status-${status}`}>{status}</span>
    </div>
    <TagList tags={tags} />
  </div>
</a>

<style>
  .book-card {
    display: flex;
    gap: var(--space-md);
    background: var(--color-cream-light);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    text-decoration: none;
    box-shadow: var(--shadow-card);
    transition: transform var(--transition-base), box-shadow var(--transition-base);
  }

  .book-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-card-hover);
  }

  .book-cover {
    flex-shrink: 0;
    width: 80px;
  }

  .book-cover img {
    border-radius: var(--radius-sm);
    width: 100%;
  }

  .book-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    color: var(--color-charcoal);
    margin-bottom: var(--space-xs);
  }

  .book-author {
    font-size: var(--text-sm);
    color: var(--color-warm-gray);
    margin-bottom: var(--space-sm);
  }

  .book-meta {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-bottom: var(--space-sm);
  }

  .book-rating {
    color: var(--color-clay);
    font-size: var(--text-sm);
  }

  .book-status {
    font-size: var(--text-xs);
    padding: 0.15em 0.6em;
    border-radius: 999px;
  }

  .status-finished { background: rgba(122, 139, 111, 0.15); color: var(--color-olive); }
  .status-reading { background: rgba(176, 125, 98, 0.15); color: var(--color-clay); }
  .status-abandoned { background: rgba(212, 203, 194, 0.3); color: var(--color-warm-gray); }
</style>
```

**Step 2: Create PaperCard**

Create `src/components/PaperCard.astro`:
```astro
---
import TagList from './TagList.astro';

interface Props {
  title: string;
  authors: string[];
  href: string;
  year: number;
  rating?: number;
  tags: string[];
}

const { title, authors, href, year, rating, tags } = Astro.props;
---

<a href={href} class="paper-card">
  <div class="paper-year">{year}</div>
  <div class="paper-body">
    <h3 class="paper-title">{title}</h3>
    <p class="paper-authors">{authors.join(', ')}</p>
    {rating && (
      <span class="paper-rating">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
    )}
    <TagList tags={tags} />
  </div>
</a>

<style>
  .paper-card {
    display: flex;
    gap: var(--space-md);
    background: var(--color-cream-light);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    text-decoration: none;
    box-shadow: var(--shadow-card);
    transition: transform var(--transition-base), box-shadow var(--transition-base);
  }

  .paper-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-card-hover);
  }

  .paper-year {
    flex-shrink: 0;
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    color: var(--color-stone);
    line-height: 1;
  }

  .paper-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    color: var(--color-charcoal);
    margin-bottom: var(--space-xs);
  }

  .paper-authors {
    font-size: var(--text-sm);
    color: var(--color-warm-gray);
    margin-bottom: var(--space-sm);
  }

  .paper-rating {
    color: var(--color-clay);
    font-size: var(--text-sm);
    display: block;
    margin-bottom: var(--space-sm);
  }
</style>
```

**Step 3: Create ProjectCard**

Create `src/components/ProjectCard.astro`:
```astro
---
import TagList from './TagList.astro';

interface Props {
  title: string;
  href: string;
  description?: string;
  tech: string[];
  tags: string[];
  image?: string;
  github?: string;
  live?: string;
}

const { title, href, description, tech, tags, image, github, live } = Astro.props;
---

<a href={href} class="project-card">
  {image && (
    <div class="project-image">
      <img src={image} alt={title} loading="lazy" />
    </div>
  )}
  <div class="project-body">
    <h3 class="project-title">{title}</h3>
    {description && <p class="project-desc">{description}</p>}
    <div class="project-tech">
      {tech.map(t => (
        <span class="tech-badge">{t}</span>
      ))}
    </div>
    <TagList tags={tags} />
    <div class="project-links">
      {github && <span class="project-link-hint">GitHub</span>}
      {live && <span class="project-link-hint">Live</span>}
    </div>
  </div>
</a>

<style>
  .project-card {
    display: block;
    background: var(--color-cream-light);
    border-radius: var(--radius-lg);
    overflow: hidden;
    text-decoration: none;
    box-shadow: var(--shadow-card);
    transition: transform var(--transition-base), box-shadow var(--transition-base);
  }

  .project-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-card-hover);
  }

  .project-image img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
  }

  .project-body {
    padding: var(--space-md) var(--space-lg) var(--space-lg);
  }

  .project-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    color: var(--color-charcoal);
    margin-bottom: var(--space-sm);
  }

  .project-desc {
    font-size: var(--text-sm);
    color: var(--color-warm-gray);
    margin-bottom: var(--space-sm);
    line-height: 1.6;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-bottom: var(--space-sm);
  }

  .tech-badge {
    font-size: var(--text-xs);
    color: var(--color-clay);
    border: 1px solid var(--color-clay);
    padding: 0.1em 0.5em;
    border-radius: 999px;
  }

  .project-links {
    display: flex;
    gap: var(--space-md);
    margin-top: var(--space-sm);
  }

  .project-link-hint {
    font-size: var(--text-xs);
    color: var(--color-warm-gray);
  }
</style>
```

**Step 4: Create TalkCard**

Create `src/components/TalkCard.astro`:
```astro
---
import TagList from './TagList.astro';

interface Props {
  title: string;
  event: string;
  href: string;
  date: Date;
  tags: string[];
  video?: string;
  slides?: string;
}

const { title, event, href, date, tags, video, slides } = Astro.props;
---

<a href={href} class="talk-card">
  <div class="talk-body">
    <time class="talk-date" datetime={date.toISOString()}>
      {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
    </time>
    <h3 class="talk-title">{title}</h3>
    <p class="talk-event">{event}</p>
    <div class="talk-links">
      {video && <span class="talk-link-badge">Video</span>}
      {slides && <span class="talk-link-badge">Slides</span>}
    </div>
    <TagList tags={tags} />
  </div>
</a>

<style>
  .talk-card {
    display: block;
    background: var(--color-cream-light);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    text-decoration: none;
    box-shadow: var(--shadow-card);
    transition: transform var(--transition-base), box-shadow var(--transition-base);
  }

  .talk-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-card-hover);
  }

  .talk-date {
    font-size: var(--text-xs);
    color: var(--color-warm-gray);
  }

  .talk-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    color: var(--color-charcoal);
    margin: var(--space-xs) 0;
  }

  .talk-event {
    font-size: var(--text-sm);
    color: var(--color-clay);
    margin-bottom: var(--space-sm);
  }

  .talk-links {
    display: flex;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
  }

  .talk-link-badge {
    font-size: var(--text-xs);
    color: var(--color-olive);
    background: rgba(122, 139, 111, 0.1);
    padding: 0.15em 0.6em;
    border-radius: 999px;
  }
</style>
```

**Step 5: Create List100Item**

Create `src/components/List100Item.astro`:
```astro
---
interface Props {
  id: number;
  text: string;
  status: string;
  note?: string;
  date_completed?: string;
}

const { id, text, status, note, date_completed } = Astro.props;
---

<div class={`list-item status-${status}`}>
  <span class="list-number">{String(id).padStart(3, '0')}</span>
  <div class="list-content">
    <span class="list-text">{text}</span>
    {note && <span class="list-note">{note}</span>}
    {date_completed && <span class="list-note">{date_completed}</span>}
  </div>
  <span class={`list-status-dot status-${status}`} title={status}></span>
</div>

<style>
  .list-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-sm) 0;
    border-bottom: 1px solid var(--color-stone);
  }

  .list-item:last-child {
    border-bottom: none;
  }

  .list-number {
    font-family: var(--font-display);
    font-size: var(--text-sm);
    color: var(--color-stone);
    flex-shrink: 0;
  }

  .list-content {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-sm);
  }

  .list-text {
    font-size: var(--text-base);
    color: var(--color-charcoal);
  }

  .status-done .list-text {
    color: var(--color-olive);
  }

  .list-note {
    font-size: var(--text-xs);
    color: var(--color-warm-gray);
    font-style: italic;
  }

  .list-status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .list-status-dot.status-done { background: var(--color-sage); }
  .list-status-dot.status-in-progress { background: var(--color-clay); }
  .list-status-dot.status-todo { background: var(--color-stone); }
</style>
```

**Step 6: Create DemoEmbed**

Create `src/components/DemoEmbed.astro`:
```astro
---
interface Props {
  title: string;
  embed_url?: string;
}

const { title, embed_url } = Astro.props;
---

{embed_url ? (
  <div class="demo-embed">
    <iframe
      src={embed_url}
      title={title}
      loading="lazy"
      sandbox="allow-scripts allow-same-origin"
    ></iframe>
  </div>
) : (
  <div class="demo-placeholder">
    <p>Demo coming soon</p>
  </div>
)}

<style>
  .demo-embed {
    width: 100%;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-card);
    margin: var(--space-lg) 0;
  }

  .demo-embed iframe {
    width: 100%;
    height: 500px;
    border: none;
  }

  .demo-placeholder {
    background: var(--color-cream-light);
    border: 2px dashed var(--color-stone);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    text-align: center;
    color: var(--color-warm-gray);
  }
</style>
```

**Step 7: Verify and commit**

Run:
```bash
npm run build
```

Expected: Build succeeds.

```bash
git add src/components/BookCard.astro src/components/PaperCard.astro src/components/ProjectCard.astro src/components/TalkCard.astro src/components/List100Item.astro src/components/DemoEmbed.astro
git commit -m "feat: add section-specific card components"
```

---

### Task 11: Section List Pages

**Files:**
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/paperself/index.astro`
- Create: `src/pages/bookself/index.astro`
- Create: `src/pages/talks/index.astro`
- Create: `src/pages/list100.astro`
- Create: `src/pages/diagrams/index.astro`
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/ai/index.astro`
- Create: `src/pages/demos/index.astro`

**Step 1: Create blog list page**

Create `src/pages/blog/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import GridLayout from '../../layouts/GridLayout.astro';
import Card from '../../components/Card.astro';

const posts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<GridLayout title="Blog">
  <h1>Blog</h1>
  <div class="card-grid">
    {posts.map(post => (
      <Card
        title={post.data.title}
        href={`/blog/${post.id}`}
        description={post.data.description}
        date={post.data.date}
        tags={post.data.tags}
      />
    ))}
  </div>
</GridLayout>

<style>
  h1 {
    margin-bottom: var(--space-xl);
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-lg);
  }
</style>
```

**Step 2: Create paperself list page**

Create `src/pages/paperself/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import GridLayout from '../../layouts/GridLayout.astro';
import PaperCard from '../../components/PaperCard.astro';

const papers = (await getCollection('paperself'))
  .filter(p => !p.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<GridLayout title="Paperself">
  <h1>Paperself</h1>
  <p class="section-desc">Papers I've read, with my notes and takeaways.</p>
  <div class="card-list">
    {papers.map(paper => (
      <PaperCard
        title={paper.data.title}
        authors={paper.data.authors}
        href={`/paperself/${paper.id}`}
        year={paper.data.year}
        rating={paper.data.rating}
        tags={paper.data.tags}
      />
    ))}
  </div>
</GridLayout>

<style>
  h1 { margin-bottom: var(--space-sm); }
  .section-desc {
    color: var(--color-warm-gray);
    margin-bottom: var(--space-xl);
  }
  .card-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
</style>
```

**Step 3: Create bookself list page**

Create `src/pages/bookself/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import GridLayout from '../../layouts/GridLayout.astro';
import BookCard from '../../components/BookCard.astro';

const books = (await getCollection('bookself'))
  .filter(b => !b.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<GridLayout title="Bookself">
  <h1>Bookself</h1>
  <p class="section-desc">Books I've read, am reading, or abandoned with no shame.</p>
  <div class="card-list">
    {books.map(book => (
      <BookCard
        title={book.data.title}
        author={book.data.author}
        href={`/bookself/${book.id}`}
        rating={book.data.rating}
        status={book.data.status}
        tags={book.data.tags}
        cover={book.data.cover}
      />
    ))}
  </div>
</GridLayout>

<style>
  h1 { margin-bottom: var(--space-sm); }
  .section-desc {
    color: var(--color-warm-gray);
    margin-bottom: var(--space-xl);
  }
  .card-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
</style>
```

**Step 4: Create talks list page**

Create `src/pages/talks/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import GridLayout from '../../layouts/GridLayout.astro';
import TalkCard from '../../components/TalkCard.astro';

const talks = (await getCollection('talks'))
  .filter(t => !t.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<GridLayout title="Talks">
  <h1>Talks</h1>
  <div class="card-grid">
    {talks.map(talk => (
      <TalkCard
        title={talk.data.title}
        event={talk.data.event}
        href={`/talks/${talk.id}`}
        date={talk.data.date}
        tags={talk.data.tags}
        video={talk.data.video}
        slides={talk.data.slides}
      />
    ))}
  </div>
</GridLayout>

<style>
  h1 { margin-bottom: var(--space-xl); }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-lg);
  }
</style>
```

**Step 5: Create list100 page**

Create `src/pages/list100.astro`:
```astro
---
import ContentLayout from '../layouts/ContentLayout.astro';
import List100Item from '../components/List100Item.astro';
import yaml from 'js-yaml';
import fs from 'node:fs';

const listData = yaml.load(fs.readFileSync('data/list100.yaml', 'utf8')) as { items: any[] };
const items = listData.items;
const doneCount = items.filter(i => i.status === 'done').length;
---

<ContentLayout title="List 100">
  <h1>List 100</h1>
  <p class="section-desc">
    {doneCount} of {items.length} done.
  </p>
  <div class="list-container">
    {items.map(item => (
      <List100Item
        id={item.id}
        text={item.text}
        status={item.status}
        note={item.note}
        date_completed={item.date_completed}
      />
    ))}
  </div>
</ContentLayout>

<style>
  h1 { margin-bottom: var(--space-sm); }
  .section-desc {
    color: var(--color-warm-gray);
    margin-bottom: var(--space-xl);
  }
</style>
```

**Note:** This requires `js-yaml`. Install it:
```bash
npm install js-yaml && npm install -D @types/js-yaml
```

**Step 6: Create diagrams list page**

Create `src/pages/diagrams/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import GridLayout from '../../layouts/GridLayout.astro';
import Card from '../../components/Card.astro';
import CategoryFilter from '../../components/CategoryFilter.astro';

const diagrams = (await getCollection('diagrams'))
  .filter(d => !d.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const categories = [...new Set(diagrams.map(d => d.data.category).filter(Boolean))] as string[];
---

<GridLayout title="Diagrams">
  <h1>Diagrams</h1>
  {categories.length > 0 && <CategoryFilter categories={categories} sectionId="diagrams" />}
  <div class="card-grid" data-section-items="diagrams">
    {diagrams.map(d => (
      <div data-category={d.data.category || 'uncategorized'}>
        <Card
          title={d.data.title}
          href={`/diagrams/${d.id}`}
          date={d.data.date}
          tags={d.data.tags}
        />
      </div>
    ))}
  </div>
</GridLayout>

<style>
  h1 { margin-bottom: var(--space-xl); }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-lg);
  }
</style>
```

**Step 7: Create projects list page**

Create `src/pages/projects/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import GridLayout from '../../layouts/GridLayout.astro';
import ProjectCard from '../../components/ProjectCard.astro';

const projects = (await getCollection('projects'))
  .filter(p => !p.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<GridLayout title="Projects">
  <h1>Projects</h1>
  <div class="card-grid">
    {projects.map(project => (
      <ProjectCard
        title={project.data.title}
        href={`/projects/${project.id}`}
        tech={project.data.tech}
        tags={project.data.tags}
        image={project.data.image}
        github={project.data.github}
        live={project.data.live}
      />
    ))}
  </div>
</GridLayout>

<style>
  h1 { margin-bottom: var(--space-xl); }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-lg);
  }
</style>
```

**Step 8: Create AI list page**

Create `src/pages/ai/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import GridLayout from '../../layouts/GridLayout.astro';
import Card from '../../components/Card.astro';
import CategoryFilter from '../../components/CategoryFilter.astro';

const posts = (await getCollection('ai'))
  .filter(p => !p.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const categories = [...new Set(posts.map(p => p.data.category).filter(Boolean))] as string[];
---

<GridLayout title="AI">
  <h1>AI</h1>
  {categories.length > 0 && <CategoryFilter categories={categories} sectionId="ai" />}
  <div class="card-grid" data-section-items="ai">
    {posts.map(post => (
      <div data-category={post.data.category || 'uncategorized'}>
        <Card
          title={post.data.title}
          href={`/ai/${post.id}`}
          date={post.data.date}
          tags={post.data.tags}
        />
      </div>
    ))}
  </div>
</GridLayout>

<style>
  h1 { margin-bottom: var(--space-xl); }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-lg);
  }
</style>
```

**Step 9: Create demos list page**

Create `src/pages/demos/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import GridLayout from '../../layouts/GridLayout.astro';
import Card from '../../components/Card.astro';
import CategoryFilter from '../../components/CategoryFilter.astro';

const demos = (await getCollection('demos'))
  .filter(d => !d.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const categories = [...new Set(demos.map(d => d.data.category).filter(Boolean))] as string[];
---

<GridLayout title="Demos">
  <h1>Demos</h1>
  {categories.length > 0 && <CategoryFilter categories={categories} sectionId="demos" />}
  <div class="card-grid" data-section-items="demos">
    {demos.map(demo => (
      <div data-category={demo.data.category || 'uncategorized'}>
        <Card
          title={demo.data.title}
          href={`/demos/${demo.id}`}
          date={demo.data.date}
          tags={demo.data.tags}
        />
      </div>
    ))}
  </div>
</GridLayout>

<style>
  h1 { margin-bottom: var(--space-xl); }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-lg);
  }
</style>
```

**Step 10: Verify and commit**

Run:
```bash
npm run build
```

Expected: Build succeeds, all section pages generated.

```bash
git add src/pages/ package.json package-lock.json
git commit -m "feat: add all section list pages with filtering"
```

---

### Task 12: Individual Content Pages (Dynamic Routes)

**Files:**
- Create: `src/pages/blog/[id].astro`
- Create: `src/pages/paperself/[id].astro`
- Create: `src/pages/bookself/[id].astro`
- Create: `src/pages/talks/[id].astro`
- Create: `src/pages/diagrams/[id].astro`
- Create: `src/pages/projects/[id].astro`
- Create: `src/pages/ai/[id].astro`
- Create: `src/pages/demos/[id].astro`

**Step 1: Create blog detail page**

Create `src/pages/blog/[id].astro`:
```astro
---
import { getCollection, render } from 'astro:content';
import ContentLayout from '../../layouts/ContentLayout.astro';
import ContentHeader from '../../components/ContentHeader.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({ params: { id: post.id }, props: { post } }));
}

const { post } = Astro.props;
const { Content } = await render(post);

const words = post.body?.split(/\s+/).length || 0;
const readingTime = `${Math.ceil(words / 200)} min read`;
---

<ContentLayout title={post.data.title} description={post.data.description}>
  <ContentHeader
    title={post.data.title}
    date={post.data.date}
    tags={post.data.tags}
    readingTime={readingTime}
  />
  <article class="prose">
    <Content />
  </article>
</ContentLayout>

<style>
  .prose :global(h2) { margin-top: var(--space-xl); margin-bottom: var(--space-md); }
  .prose :global(h3) { margin-top: var(--space-lg); margin-bottom: var(--space-sm); }
  .prose :global(p) { margin-bottom: var(--space-md); }
  .prose :global(ul), .prose :global(ol) { margin-bottom: var(--space-md); padding-left: var(--space-lg); }
  .prose :global(li) { margin-bottom: var(--space-xs); }
  .prose :global(img) { border-radius: var(--radius-md); margin: var(--space-lg) 0; }
  .prose :global(svg) { max-width: 100%; height: auto; margin: var(--space-lg) 0; }
</style>
```

**Step 2: Create paperself detail page**

Create `src/pages/paperself/[id].astro`:
```astro
---
import { getCollection, render } from 'astro:content';
import ContentLayout from '../../layouts/ContentLayout.astro';
import ContentHeader from '../../components/ContentHeader.astro';

export async function getStaticPaths() {
  const papers = await getCollection('paperself');
  return papers.map(p => ({ params: { id: p.id }, props: { paper: p } }));
}

const { paper } = Astro.props;
const { Content } = await render(paper);
---

<ContentLayout title={paper.data.title}>
  <ContentHeader
    title={paper.data.title}
    date={paper.data.date}
    tags={paper.data.tags}
  />
  <div class="paper-meta">
    <p><strong>Authors:</strong> {paper.data.authors.join(', ')}</p>
    <p><strong>Published:</strong> {paper.data.year}</p>
    {paper.data.rating && <p><strong>Rating:</strong> {'★'.repeat(paper.data.rating)}{'☆'.repeat(5 - paper.data.rating)}</p>}
    <p><a href={paper.data.link} target="_blank" rel="noopener noreferrer">Read the paper →</a></p>
  </div>
  <article class="prose">
    <Content />
  </article>
</ContentLayout>

<style>
  .paper-meta {
    background: var(--color-cream-light);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    margin-bottom: var(--space-xl);
  }
  .paper-meta p { margin-bottom: var(--space-xs); font-size: var(--text-sm); }
  .paper-meta p:last-child { margin-bottom: 0; }
  .prose :global(h2) { margin-top: var(--space-xl); margin-bottom: var(--space-md); }
  .prose :global(p) { margin-bottom: var(--space-md); }
</style>
```

**Step 3: Create bookself detail page**

Create `src/pages/bookself/[id].astro`:
```astro
---
import { getCollection, render } from 'astro:content';
import ContentLayout from '../../layouts/ContentLayout.astro';
import ContentHeader from '../../components/ContentHeader.astro';

export async function getStaticPaths() {
  const books = await getCollection('bookself');
  return books.map(b => ({ params: { id: b.id }, props: { book: b } }));
}

const { book } = Astro.props;
const { Content } = await render(book);
---

<ContentLayout title={book.data.title}>
  <ContentHeader
    title={book.data.title}
    date={book.data.date}
    tags={book.data.tags}
  />
  <div class="book-meta">
    <p><strong>Author:</strong> {book.data.author}</p>
    <p><strong>Status:</strong> {book.data.status}</p>
    {book.data.rating && <p><strong>Rating:</strong> {'★'.repeat(book.data.rating)}{'☆'.repeat(5 - book.data.rating)}</p>}
  </div>
  <article class="prose">
    <Content />
  </article>
</ContentLayout>

<style>
  .book-meta {
    background: var(--color-cream-light);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    margin-bottom: var(--space-xl);
  }
  .book-meta p { margin-bottom: var(--space-xs); font-size: var(--text-sm); }
  .book-meta p:last-child { margin-bottom: 0; }
  .prose :global(h2) { margin-top: var(--space-xl); margin-bottom: var(--space-md); }
  .prose :global(p) { margin-bottom: var(--space-md); }
</style>
```

**Step 4: Create talks detail page**

Create `src/pages/talks/[id].astro`:
```astro
---
import { getCollection, render } from 'astro:content';
import ContentLayout from '../../layouts/ContentLayout.astro';
import ContentHeader from '../../components/ContentHeader.astro';

export async function getStaticPaths() {
  const talks = await getCollection('talks');
  return talks.map(t => ({ params: { id: t.id }, props: { talk: t } }));
}

const { talk } = Astro.props;
const { Content } = await render(talk);
---

<ContentLayout title={talk.data.title}>
  <ContentHeader
    title={talk.data.title}
    date={talk.data.date}
    tags={talk.data.tags}
  />
  <div class="talk-meta">
    <p><strong>Event:</strong> {talk.data.event}</p>
    {talk.data.video && <p><a href={talk.data.video} target="_blank" rel="noopener noreferrer">Watch video →</a></p>}
    {talk.data.slides && <p><a href={talk.data.slides} target="_blank" rel="noopener noreferrer">View slides →</a></p>}
  </div>
  <article class="prose">
    <Content />
  </article>
</ContentLayout>

<style>
  .talk-meta {
    background: var(--color-cream-light);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    margin-bottom: var(--space-xl);
  }
  .talk-meta p { margin-bottom: var(--space-xs); font-size: var(--text-sm); }
  .talk-meta p:last-child { margin-bottom: 0; }
  .prose :global(h2) { margin-top: var(--space-xl); margin-bottom: var(--space-md); }
  .prose :global(p) { margin-bottom: var(--space-md); }
</style>
```

**Step 5: Create diagrams detail page**

Create `src/pages/diagrams/[id].astro`:
```astro
---
import { getCollection, render } from 'astro:content';
import ContentLayout from '../../layouts/ContentLayout.astro';
import ContentHeader from '../../components/ContentHeader.astro';

export async function getStaticPaths() {
  const diagrams = await getCollection('diagrams');
  return diagrams.map(d => ({ params: { id: d.id }, props: { diagram: d } }));
}

const { diagram } = Astro.props;
const { Content } = await render(diagram);
---

<ContentLayout title={diagram.data.title}>
  <ContentHeader
    title={diagram.data.title}
    date={diagram.data.date}
    tags={diagram.data.tags}
  />
  <article class="prose diagram-content">
    <Content />
  </article>
</ContentLayout>

<style>
  .diagram-content :global(svg) {
    max-width: 100%;
    height: auto;
    margin: var(--space-lg) 0;
    background: var(--color-cream-light);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
  }
  .prose :global(p) { margin-bottom: var(--space-md); }
</style>
```

**Step 6: Create projects detail page**

Create `src/pages/projects/[id].astro`:
```astro
---
import { getCollection, render } from 'astro:content';
import ContentLayout from '../../layouts/ContentLayout.astro';
import ContentHeader from '../../components/ContentHeader.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(p => ({ params: { id: p.id }, props: { project: p } }));
}

const { project } = Astro.props;
const { Content } = await render(project);
---

<ContentLayout title={project.data.title}>
  <ContentHeader
    title={project.data.title}
    date={project.data.date}
    tags={project.data.tags}
  />
  <div class="project-meta">
    <p><strong>Tech:</strong> {project.data.tech.join(', ')}</p>
    {project.data.github && <p><a href={project.data.github} target="_blank" rel="noopener noreferrer">GitHub →</a></p>}
    {project.data.live && <p><a href={project.data.live} target="_blank" rel="noopener noreferrer">Live demo →</a></p>}
  </div>
  <article class="prose">
    <Content />
  </article>
</ContentLayout>

<style>
  .project-meta {
    background: var(--color-cream-light);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    margin-bottom: var(--space-xl);
  }
  .project-meta p { margin-bottom: var(--space-xs); font-size: var(--text-sm); }
  .project-meta p:last-child { margin-bottom: 0; }
  .prose :global(h2) { margin-top: var(--space-xl); margin-bottom: var(--space-md); }
  .prose :global(p) { margin-bottom: var(--space-md); }
</style>
```

**Step 7: Create AI detail page**

Create `src/pages/ai/[id].astro`:
```astro
---
import { getCollection, render } from 'astro:content';
import ContentLayout from '../../layouts/ContentLayout.astro';
import ContentHeader from '../../components/ContentHeader.astro';

export async function getStaticPaths() {
  const posts = await getCollection('ai');
  return posts.map(p => ({ params: { id: p.id }, props: { post: p } }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<ContentLayout title={post.data.title}>
  <ContentHeader
    title={post.data.title}
    date={post.data.date}
    tags={post.data.tags}
  />
  <article class="prose">
    <Content />
  </article>
</ContentLayout>

<style>
  .prose :global(h2) { margin-top: var(--space-xl); margin-bottom: var(--space-md); }
  .prose :global(p) { margin-bottom: var(--space-md); }
  .prose :global(ul), .prose :global(ol) { margin-bottom: var(--space-md); padding-left: var(--space-lg); }
</style>
```

**Step 8: Create demos detail page**

Create `src/pages/demos/[id].astro`:
```astro
---
import { getCollection, render } from 'astro:content';
import ContentLayout from '../../layouts/ContentLayout.astro';
import ContentHeader from '../../components/ContentHeader.astro';
import DemoEmbed from '../../components/DemoEmbed.astro';

export async function getStaticPaths() {
  const demos = await getCollection('demos');
  return demos.map(d => ({ params: { id: d.id }, props: { demo: d } }));
}

const { demo } = Astro.props;
const { Content } = await render(demo);
---

<ContentLayout title={demo.data.title}>
  <ContentHeader
    title={demo.data.title}
    date={demo.data.date}
    tags={demo.data.tags}
  />
  <DemoEmbed title={demo.data.title} embed_url={demo.data.embed_url} />
  <article class="prose">
    <Content />
  </article>
</ContentLayout>

<style>
  .prose :global(h2) { margin-top: var(--space-xl); margin-bottom: var(--space-md); }
  .prose :global(p) { margin-bottom: var(--space-md); }
</style>
```

**Step 9: Verify and commit**

Run:
```bash
npm run build
```

Expected: Build succeeds, all detail pages generated for sample content.

```bash
git add src/pages/
git commit -m "feat: add individual content detail pages for all sections"
```

---

### Task 13: About Page

**Files:**
- Create: `src/pages/about.astro`

**Step 1: Create about page**

Create `src/pages/about.astro`:
```astro
---
import ContentLayout from '../layouts/ContentLayout.astro';
import yaml from 'js-yaml';
import fs from 'node:fs';

const about = yaml.load(fs.readFileSync('data/about.yaml', 'utf8')) as {
  name: string;
  tagline: string;
  bio: string;
  social: Record<string, string>;
};
---

<ContentLayout title={`About — ${about.name}`} description={about.tagline}>
  <h1>{about.name}</h1>
  <p class="tagline">{about.tagline}</p>
  <div class="bio" set:html={about.bio.replace(/\n/g, '<br/>')} />
  <div class="social-links">
    {Object.entries(about.social).map(([platform, url]) => (
      <a href={url} target="_blank" rel="noopener noreferrer" class="social-link">
        {platform}
      </a>
    ))}
  </div>
</ContentLayout>

<style>
  h1 { margin-bottom: var(--space-xs); }

  .tagline {
    font-size: var(--text-lg);
    color: var(--color-clay);
    margin-bottom: var(--space-xl);
  }

  .bio {
    font-size: var(--text-base);
    line-height: 1.8;
    margin-bottom: var(--space-xl);
    color: var(--color-charcoal);
  }

  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-md);
  }

  .social-link {
    font-size: var(--text-sm);
    color: var(--color-warm-gray);
    border: 1px solid var(--color-stone);
    padding: 0.4em 1em;
    border-radius: 999px;
    text-decoration: none;
    text-transform: capitalize;
    transition: all var(--transition-fast);
  }

  .social-link:hover {
    color: var(--color-clay);
    border-color: var(--color-clay);
  }
</style>
```

**Step 2: Verify and commit**

Run:
```bash
npm run build
```

Expected: Build succeeds, `/about` page generated.

```bash
git add src/pages/about.astro
git commit -m "feat: add about page with YAML-driven content"
```

---

### Task 14: Homepage

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Build the homepage**

Replace `src/pages/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Card from '../components/Card.astro';
import ProjectCard from '../components/ProjectCard.astro';
import SVGDivider from '../components/SVGDivider.astro';
import yaml from 'js-yaml';
import fs from 'node:fs';

const about = yaml.load(fs.readFileSync('data/about.yaml', 'utf8')) as {
  name: string;
  tagline: string;
  bio: string;
};

const featuredProjects = (await getCollection('projects'))
  .filter(p => !p.data.draft && p.data.featured)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);

const recentPosts = (await getCollection('blog'))
  .filter(p => !p.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 5);

const recentPapers = (await getCollection('paperself'))
  .filter(p => !p.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);

const recentBooks = (await getCollection('bookself'))
  .filter(b => !b.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);

const recentReads = [...recentPapers.map(p => ({
  title: p.data.title,
  href: `/paperself/${p.id}`,
  date: p.data.date,
  tags: p.data.tags,
  type: 'paper' as const,
})), ...recentBooks.map(b => ({
  title: b.data.title,
  href: `/bookself/${b.id}`,
  date: b.data.date,
  tags: b.data.tags,
  type: 'book' as const,
}))]
  .sort((a, b) => b.date.valueOf() - a.date.valueOf())
  .slice(0, 3);
---

<BaseLayout title={about.name} description={about.tagline}>
  <main>
    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <h1 class="hero-name animate-fade-up">{about.name}</h1>
        <p class="hero-tagline animate-fade-up">{about.tagline}</p>
      </div>
      <div class="hero-blob" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="var(--color-clay)" fill-opacity="0.06"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.1,73.1,41.6C64.8,54.1,53.8,64.5,41,72.4C28.2,80.3,14.1,85.7,-0.8,87.1C-15.8,88.5,-31.5,85.8,-44.5,78.2C-57.5,70.6,-67.7,58,-74.5,44.1C-81.3,30.2,-84.7,15.1,-84.2,0.3C-83.7,-14.5,-79.3,-29,-71.3,-41.1C-63.4,-53.2,-51.9,-62.9,-39.1,-70.8C-26.3,-78.7,-13.2,-84.8,1.2,-86.9C15.5,-89,30.5,-83.6,44.7,-76.4Z"
            transform="translate(100 100)" />
        </svg>
      </div>
    </section>

    <!-- Featured Projects -->
    {featuredProjects.length > 0 && (
      <section class="section">
        <div class="section-inner">
          <div class="section-header">
            <h2>Projects</h2>
            <a href="/projects" class="section-link">View all →</a>
          </div>
          <div class="card-grid">
            {featuredProjects.map(project => (
              <ProjectCard
                title={project.data.title}
                href={`/projects/${project.id}`}
                tech={project.data.tech}
                tags={project.data.tags}
                image={project.data.image}
                github={project.data.github}
                live={project.data.live}
              />
            ))}
          </div>
        </div>
      </section>
    )}

    <SVGDivider />

    <!-- Recent Blog Posts -->
    {recentPosts.length > 0 && (
      <section class="section">
        <div class="section-inner">
          <div class="section-header">
            <h2>Recent Writing</h2>
            <a href="/blog" class="section-link">View all →</a>
          </div>
          <div class="post-list">
            {recentPosts.map(post => (
              <a href={`/blog/${post.id}`} class="post-item">
                <time datetime={post.data.date.toISOString()}>
                  {post.data.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </time>
                <span class="post-title">{post.data.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    )}

    <SVGDivider />

    <!-- Recent Reads -->
    {recentReads.length > 0 && (
      <section class="section">
        <div class="section-inner">
          <div class="section-header">
            <h2>Recent Reads</h2>
          </div>
          <div class="card-grid card-grid-sm">
            {recentReads.map(read => (
              <Card
                title={read.title}
                href={read.href}
                date={read.date}
                tags={[read.type, ...read.tags]}
              />
            ))}
          </div>
        </div>
      </section>
    )}
  </main>
</BaseLayout>

<style>
  /* Hero */
  .hero {
    position: relative;
    max-width: var(--max-width-page);
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-lg);
    overflow: hidden;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
  }

  .hero-name {
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin-bottom: var(--space-sm);
  }

  .hero-tagline {
    font-size: var(--text-lg);
    color: var(--color-warm-gray);
    max-width: 500px;
  }

  .hero-blob {
    position: absolute;
    top: -20%;
    right: -10%;
    width: 60%;
    max-width: 400px;
    opacity: 1;
    z-index: 0;
  }

  /* Sections */
  .section {
    max-width: var(--max-width-page);
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .section-inner {
    padding: var(--space-lg) 0;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: var(--space-lg);
  }

  .section-header h2 {
    font-size: var(--text-2xl);
  }

  .section-link {
    font-size: var(--text-sm);
    color: var(--color-clay);
  }

  /* Card grid */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-lg);
  }

  .card-grid-sm {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }

  /* Post list (blog) */
  .post-list {
    display: flex;
    flex-direction: column;
  }

  .post-item {
    display: flex;
    align-items: baseline;
    gap: var(--space-lg);
    padding: var(--space-sm) 0;
    border-bottom: 1px solid var(--color-stone);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .post-item:last-child {
    border-bottom: none;
  }

  .post-item:hover .post-title {
    color: var(--color-clay);
  }

  .post-item time {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-stone);
    flex-shrink: 0;
    min-width: 60px;
  }

  .post-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    color: var(--color-charcoal);
    transition: color var(--transition-fast);
  }
</style>
```

**Step 2: Verify dev server**

Run:
```bash
npm run dev
```

Confirm: homepage renders with hero, featured projects, recent posts, recent reads sections. Kill server.

**Step 3: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build homepage with hero, projects, blog, and recent reads"
```

---

### Task 15: Scroll Fade-In Script

**Files:**
- Create: `src/components/ScrollFadeIn.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Create scroll observer component**

Create `src/components/ScrollFadeIn.astro`:
```astro
<script>
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
    observer.observe(el);
  });
</script>
```

**Step 2: Add to BaseLayout**

Add import to `src/layouts/BaseLayout.astro`:
```astro
import ScrollFadeIn from '../components/ScrollFadeIn.astro';
```

Add before closing `</body>`:
```astro
<ScrollFadeIn />
```

**Step 3: Commit**

```bash
git add src/components/ScrollFadeIn.astro src/layouts/BaseLayout.astro
git commit -m "feat: add scroll-triggered fade-in animation"
```

---

### Task 16: Favicon + Grain Texture

**Files:**
- Create: `public/favicon.svg`
- Modify: `src/styles/global.css`

**Step 1: Create a simple SVG favicon**

Create `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#B07D62"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#F5F0E8" font-family="Georgia, serif" font-size="18" font-weight="bold">S</text>
</svg>
```

(Replace "S" with the user's initial.)

**Step 2: Add subtle grain texture**

Add to `src/styles/global.css`, after the `body` rule:
```css
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

**Step 3: Verify and commit**

Run:
```bash
npm run build
```

Expected: Build succeeds.

```bash
git add public/favicon.svg src/styles/global.css
git commit -m "feat: add SVG favicon and subtle grain texture overlay"
```

---

### Task 17: GitHub Action for Build

**Files:**
- Create: `.github/workflows/build.yml`

**Step 1: Create build workflow**

Create `.github/workflows/build.yml`:
```yaml
name: Build

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
```

**Step 2: Commit**

```bash
mkdir -p .github/workflows
git add .github/workflows/build.yml
git commit -m "ci: add GitHub Actions build workflow"
```

---

### Task 18: Final Verification

**Step 1: Full build**

Run:
```bash
npm run build
```

Expected: Build succeeds with zero errors.

**Step 2: Preview the built site**

Run:
```bash
npm run preview
```

Expected: Site serves from `dist/` at `localhost:4321`. Walk through:
- Homepage: hero, projects, blog, recent reads
- Navigation: all links work, dropdown works, mobile hamburger works
- Blog list + detail page
- Paperself, Bookself, Talks, Diagrams, Projects, AI, Demos — list + detail
- List100 page
- About page
- Animations: fade-up on load, fade-in on scroll
- Visual: cream background, earth tones, DM Serif Display headings, warm feel

Kill server.

**Step 3: Final commit**

If any fixes were needed, commit them. Then:

```bash
git log --oneline
```

Verify clean commit history with conventional commit messages.

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Project scaffolding | astro init, directories |
| 2 | Design system | CSS variables, typography, animations |
| 3 | Base layout + fonts | BaseLayout, SEOHead |
| 4 | Content + Grid layouts | ContentLayout, GridLayout |
| 5 | Navigation | Nav component |
| 6 | Footer + divider | Footer, SVGDivider |
| 7 | Shared UI components | Card, TagList, ContentHeader, CategoryFilter |
| 8 | Content collections | Schema definitions |
| 9 | Sample content | One sample per section |
| 10 | Section card components | BookCard, PaperCard, ProjectCard, etc. |
| 11 | Section list pages | All /section/index pages |
| 12 | Detail pages | All /section/[id] pages |
| 13 | About page | YAML-driven about |
| 14 | Homepage | Hero, featured, recent |
| 15 | Scroll animations | IntersectionObserver |
| 16 | Favicon + texture | SVG favicon, grain overlay |
| 17 | CI | GitHub Actions build |
| 18 | Final verification | End-to-end check |
