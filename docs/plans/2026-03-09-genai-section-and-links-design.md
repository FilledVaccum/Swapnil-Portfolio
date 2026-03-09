# GenAI Section + External Links Design

**Date**: 2026-03-09
**Status**: Approved

## Overview

Two changes:
1. Add a new GenAI section with 10 subcategories
2. Add external link fields to Bookself and Demos schemas, make external links prominent on all detail pages

## GenAI Section

### Content Collection

- Collection name: `genai`
- Content path: `src/content/genai/*.md`
- Uses CategoryFilter for subcategory filtering

### Schema

```yaml
title: string (required)
date: date (required)
tags: string[] (required)
category: string (optional) # subcategory for filtering
description: string (optional)
draft: boolean (default: false)
```

### Categories (frontmatter values)

- Pre-training
- Post-training
- Fine-tuning
- Inference
- Agentic AI
- RAG
- Prompt Engineering
- Evaluation
- Multimodal
- LLMOps

### Navigation

Add GenAI as top-level nav item:

```
Blog | Projects | AI | GenAI | Reading > | More > | About
```

### Pages

- List page: `src/pages/genai/index.astro` (grid + CategoryFilter)
- Detail page: `src/pages/genai/[id].astro` (prose layout)

## External Links on Detail Pages

### Schema Additions

- Bookself: add `buy_link` (optional URL)
- Demos: add `github` (optional URL), `live` (optional URL)

### Detail Page Changes

All detail pages that have external links render them as styled pill buttons in the metadata section:

- Projects: GitHub, Live
- Bookself: Buy/Goodreads link
- Paperself: Read the paper (already exists)
- Demos: GitHub, Live, Embed
- Talks: Video, Slides (already exist)
