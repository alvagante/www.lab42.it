# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Jekyll 4.3 static site for Lab42 srl (www.lab42.it), deployed to GitHub Pages via GitHub Actions on push to `main`.

## Common commands

```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build

# Build with drafts
bundle exec jekyll serve --drafts
```

There is no linter or test suite configured.

## Architecture

### Layouts and includes

- `_layouts/default.html` — base HTML shell; loads Google Fonts (Inter, JetBrains Mono), includes header/footer, and injects `assets/css/main.css` + `assets/js/main.js`
- `_layouts/page.html` — extends default; used by all unit pages (puppet, devops, ai, media, about)
- `_includes/header.html` — hardcoded nav links (not driven by `site.nav` from `_config.yml`)
- `_includes/footer.html` — site-wide footer

### Pages and routing

- `index.html` — homepage with hero, stats, unit cards grid, CTA
- `puppet.md`, `devops.md`, `ai.md`, `media.md`, `about.md` — unit/section pages
- `404.html` — custom error page
- Permalinks are set per-page via front matter (e.g. `permalink: /puppet/`)

### Per-unit theming

Pages set `unit: puppet|devops|ai|media` in front matter. The default layout applies `class="unit-{{ page.unit }}"` to `<body>`, enabling per-unit color overrides in CSS. Unit accent colors are:
- puppet: `#FF6B00`
- devops: `#0EA5E9`
- ai: `#8B5CF6`
- media: `#EF4444`

### Content patterns

Unit pages use inline HTML within Markdown for structured elements:
- `.feature-grid` / `.feature-card` — service grids
- `.chip` — technology tags
- `.project-highlight` — featured project blocks
- `.btn` / `.btn-primary` / `.btn-outline` — CTA buttons

### Deployment

`.github/workflows/jekyll.yml` builds with `JEKYLL_ENV=production` and deploys to GitHub Pages. Deploys only trigger from the `main` branch.

### Plugins

- `jekyll-feed` — `/feed.xml`
- `jekyll-seo-tag` — `{% seo %}` in `<head>`
- `jekyll-sitemap` — `/sitemap.xml`
