# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Jekyll 4.3 static site for Lab42 (www.lab42.it), deployed to GitHub Pages via GitHub Actions on push to `main`.

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
- `_layouts/page.html` — extends default; used by all unit pages (example42, puppet, devops, ai, media, about)
- `_includes/header.html` — hardcoded nav links (not driven by `site.nav` from `_config.yml`)
- `_includes/footer.html` — site-wide footer

### Pages and routing

- `index.html` — homepage with hero, stats, unit cards grid, CTA
- `example42.md` — main infrastructure unit page at `/example42/`; covers Puppet consulting, DevOps, cloud infra, and the example42.com open-source community
- `puppet.md`, `devops.md` — sub-pages under the example42 unit (nav marks them active under the example42 link)
- `ai.md`, `media.md`, `about.md` — top-level section pages
- `404.html` — custom error page
- Permalinks are set per-page via front matter (e.g. `permalink: /example42/`)

### Navigation

The header nav has four entries: **example42**, **AI**, **Media**, **About**. The example42 link is marked active when the URL contains `/example42`, `/puppet`, or `/devops`.

### Per-unit theming

Pages set `unit: example42|puppet|devops|ai|media` in front matter. The default layout applies `class="unit-{{ page.unit }}"` to `<body>`, enabling per-unit color overrides in CSS. Unit accent colors are:
- example42 (and puppet): `#FF6B00`
- devops: `#0EA5E9`
- ai: `#8B5CF6`
- media: `#EF4444`

### Content patterns

Unit pages use inline HTML within Markdown for structured elements:
- `.feature-grid` / `.feature-card` — service grids
- `.chip` — technology tags
- `.project-highlight` / `.project-highlight--example42` — featured project blocks
- `.btn` / `.btn-primary` / `.btn-outline` — CTA buttons
- `.consulting-grid` / `.consulting-card` / `.consulting-card--featured` — consulting offer cards (ai.md)
- `.wlaudio-feature` — hero block for the Wlaudio project (ai.md)
- `.podcast-grid` / `.podcast-card` — podcast show cards (media.md)
- `.lang-badge` — language indicator badge on podcast cards (media.md)

### Deployment

`.github/workflows/jekyll.yml` builds with `JEKYLL_ENV=production` and deploys to GitHub Pages. Deploys only trigger from the `main` branch.

### Plugins

- `jekyll-feed` — `/feed.xml`
- `jekyll-seo-tag` — `{% seo %}` in `<head>`
- `jekyll-sitemap` — `/sitemap.xml`
