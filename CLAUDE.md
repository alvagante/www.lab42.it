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

### Testing without local Ruby/bundler

If `bundle`/`jekyll` aren't installed on the host, build via the official Docker image instead of installing gems locally:

```bash
docker run --rm -v "$PWD":/srv/jekyll -w /srv/jekyll jekyll/jekyll:4.2.2 jekyll build

# or to serve with live reload:
docker run --rm -v "$PWD":/srv/jekyll -w /srv/jekyll -p 4000:4000 jekyll/jekyll:4.2.2 jekyll serve --livereload --host 0.0.0.0
```

Remove `_site/` and `.jekyll-cache/` afterward — they're build artifacts, not checked in.

## Architecture

The site presents Lab42 as an independent research lab with three fields: Infrastructure, AI, Media. Copy is dry and short: no marketing superlatives, one idea per sentence.

### Layouts and includes

- `_layouts/default.html` — base HTML shell; system font stacks (no web fonts), includes header/footer, and injects `assets/css/main.css` + `assets/js/main.js`
- `_layouts/page.html` — extends default; renders the hero from front matter (`eyebrow`, `headline`, `accent`, `subtitle`, `note`, `hero_cta`)
- `_includes/header.html` — hardcoded nav links (not driven by `site.nav` from `_config.yml`)
- `_includes/footer.html` — site-wide footer
- `_includes/contact.html` — closing contact panel (`title`, `text`, `eyebrow`, `button` params)
- `_includes/exhibit.html` — one product or site with its screenshot; `id` matches an entry in `_data/projects.yml`, `layout="panel"` for the wide two-column version

### Projects data

`_data/projects.yml` is the single source for the seven major products and sites (Smack, Pabawi, example42, OpenSkills, La Brigata dei Geek Estinti, Abnormalia, Alvagante): name, field, status, links, copy and screenshot. Screenshots of external sites are 1600x833 WebP in `assets/images/projects/`, captured from the top of each homepage at 1440px width.

### Pages and routing

- `index.html` — homepage: hero, three fields, index of experiments (all exhibits), contact rows
- `infrastructure.md` — `/infrastructure/`; example42 consulting and Pabawi
- `puppet.md`, `devops.md` — consulting sub-pages under Infrastructure
- `ai.md` — Smack, smaller open-source experiments (Wlaudio, AgentsPulse, loopq), AI consulting
- `media.md` — podcasts, Abnormalia, Alvagante, OpenSkills
- `smack.html` — dark product page for Smack, with its own `.smack-*` styles
- `about.md`, `privacy.md`, `cookies.md`, `404.html`
- Permalinks are set per-page via front matter (e.g. `permalink: /infrastructure/`)

### Navigation

The header nav has four entries: **Infrastructure**, **AI**, **Media**, **About**. The Infrastructure link is marked active when the URL contains `/infrastructure`, `/puppet`, or `/devops`.

### Per-unit theming

Pages set `unit: infrastructure|puppet|devops|ai|media` in front matter. The default layout applies `class="unit-{{ page.unit }}"` to `<body>`, which overrides `--accent` (text) and `--signal` (rules, dots). Exhibits set the same variables through `.field-*`. Signal colors:
- infrastructure (and puppet): `#FF6B00`
- devops: `#0EA5E9`
- ai: `#8B5CF6`
- media: `#EF4444`

### Content patterns

Pages use inline HTML within Markdown:
- `.section` / `.section-head` — numbered section with eyebrow, heading and a short side note
- `.exhibit` (`--card`, `--panel`) / `.exhibit-grid` — products and sites with screenshots (via `exhibit.html`)
- `.field-list` / `.field-row` — the three fields on the homepage
- `.card-grid` (`--three`, `--four`) / `.card` — text-only cells for services and small projects
- `.link-list` / `.link-row` — one-line linked rows
- `.spec-list` — two-column label/description list
- `.readout` — small facts strip (`dl`)
- `.statement` — a single open question in serif italic
- `.chips` / `.chip`, `.btn` / `.btn-primary` / `.btn-outline`, `.text-link`

### Deployment

`.github/workflows/jekyll.yml` builds with `JEKYLL_ENV=production` and deploys to GitHub Pages. Deploys only trigger from the `main` branch.

### Plugins

- `jekyll-feed` — `/feed.xml`
- `jekyll-seo-tag` — `{% seo %}` in `<head>`
- `jekyll-sitemap` — `/sitemap.xml`
