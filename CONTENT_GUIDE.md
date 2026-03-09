# Content Guide

All content lives in this repo. Add or update files, push to GitHub, and the site rebuilds automatically.

## Adding Content

### Blog

Create `src/content/blog/<slug>.md`:

```markdown
---
title: "Your Post Title"
date: 2026-03-09
tags: [aws, serverless, architecture]
description: "A short summary for cards and SEO."
draft: false
---

Markdown content here. Supports inline SVGs, code blocks, images, lists.
```

### Paperself (Paper Notes)

Create `src/content/paperself/<slug>.md`:

```markdown
---
title: "Paper Title"
authors: ["Author One", "Author Two"]
date: 2026-03-09
year: 2017
tags: [transformers, deep-learning]
link: "https://arxiv.org/abs/..."
rating: 5
draft: false
---

Your notes and takeaways from the paper.
```

### Bookself (Book Reviews)

Create `src/content/bookself/<slug>.md`:

```markdown
---
title: "Book Title"
author: "Author Name"
date: 2026-03-09
tags: [systems, databases]
cover: "/images/books/cover.jpg"
rating: 5
status: finished
draft: false
---

Your review or notes. Status options: reading, finished, abandoned.
```

### Talks

Create `src/content/talks/<slug>.md`:

```markdown
---
title: "Talk Title"
event: "Conference Name 2026"
date: 2026-03-09
tags: [aws, architecture]
video: "https://youtube.com/..."
slides: "/files/talks/slides.pdf"
draft: false
---

Talk summary or transcript.
```

### Projects

Create `src/content/projects/<slug>.md`:

```markdown
---
title: "Project Name"
date: 2026-03-09
tags: [aws, data-engineering]
tech: [Python, Terraform, AWS Kinesis]
github: "https://github.com/..."
live: "https://live-url.com"
image: "/images/projects/screenshot.png"
featured: true
draft: false
---

Project description, architecture decisions, learnings.

Set featured: true to show on the homepage (max 3 shown).
```

### AI

Create `src/content/ai/<slug>.md`:

```markdown
---
title: "Post Title"
date: 2026-03-09
tags: [agents, llm, opinion]
category: "opinion"
draft: false
---

Content here. Category is used for filtering on the AI page.
```

### Demos

Create `src/content/demos/<slug>.md`:

```markdown
---
title: "Demo Title"
date: 2026-03-09
tags: [deep-learning, computer-vision]
category: "DL"
embed_url: "https://your-demo-url.com"
draft: false
---

Description of the demo. Category options for filtering: ML, DL, GenAI, etc.
The embed_url will be rendered as an iframe. Omit it to show a "coming soon" placeholder.
```

### Diagrams

Create `src/content/diagrams/<slug>.md`:

```markdown
---
title: "Diagram Title"
date: 2026-03-09
tags: [aws, architecture]
category: "aws"
draft: false
---

Inline SVG or description here. SVGs render directly in the page.

<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <!-- your SVG content -->
</svg>
```

### List100

Edit `data/list100.yaml` — add or update items:

```yaml
items:
  - id: 4
    text: "Learn Rust"
    status: "todo"
  - id: 5
    text: "Write 50 blog posts"
    status: "in-progress"
    note: "12/50"
  - id: 6
    text: "Run a marathon"
    status: "done"
    date_completed: "2026-01-15"
    note: "Mumbai Marathon"
```

Status options: `todo`, `in-progress`, `done`

### About

Edit `data/about.yaml`:

```yaml
name: "Swapnil Tiwari"
tagline: "AWS Solutions Architect. Builder. Learner."
bio: |
  Your bio here. Supports multiple lines.
  Each line break is preserved on the site.
social:
  github: "https://github.com/FilledVaccum"
  linkedin: "https://www.linkedin.com/in/swapniltiwaridelhi/"
  twitter: "https://x.com/orangetraveller"
```

## Workflow

```bash
# 1. Create or edit content files
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "feat: add blog post about X"
git push
```

GitHub Action builds automatically on push to `main`.

## Tips

- **Hide content**: Set `draft: true` in frontmatter to hide without deleting
- **File names become URLs**: `src/content/blog/my-post.md` → `/blog/my-post`
- **Images**: Put in `public/images/` and reference as `/images/filename.png`
- **SVGs in blogs**: Paste inline SVG directly in the markdown body
- **Categories**: Used for filtering on Diagrams, AI, and Demos pages. Just use a new value in frontmatter — no code changes needed
- **Featured projects**: Set `featured: true` to show on homepage (latest 3 shown)

## Using an LLM to Author Content

Tell an LLM:

> "Create a blog post about event-driven architecture on AWS. Save it to src/content/blog/event-driven-aws.md with tags [aws, architecture, serverless]."

The file structure is simple enough that any LLM can create correctly formatted content files.
