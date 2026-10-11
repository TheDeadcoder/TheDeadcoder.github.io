# Nazmus Sakib | Portfolio

Single-page, tab-navigated portfolio built with **SvelteKit 2**, **Svelte 5** and **Tailwind CSS 4**,
prerendered to static HTML and deployed to GitHub Pages.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in ./build
npm run preview
```

## How it's put together

There is exactly **one route** (`/`). Every section is a tab panel on that page, so there are no
sub-paths to break, no client-side router, and no 404s on refresh. Tabs are deep-linkable through
the URL fragment (`/#projects`, `/#experience`, …), which the browser back button understands.

All seven panels stay in the DOM. Inactive ones carry the `hidden` attribute, so the prerendered
HTML contains the entire portfolio for crawlers while the interface stays tabbed for humans.

Old section URLs from the previous version (`/projects`, `/education`, `/skill_certifications`, …)
are caught by `src/routes/+error.svelte` and redirected to the matching tab, so existing inbound
links and search results keep working.

## Editing content

**All content lives in `src/lib/data/`.** You should never need to touch a component to update the
site.

| File               | Contains                                                    |
| ------------------ | ----------------------------------------------------------- |
| `site.js`          | Name, position, bio, email, social links, SEO metadata       |
| `experience.js`    | Work history (supports nested per-role `projects`)           |
| `projects.js`      | Project cards, metrics, tech stacks, repo/demo links         |
| `research.js`      | Papers for the About view and Research tab, interests        |
| `opensource.js`    | Open-source contributions shown in the About view            |
| `news.js`          | Dated news items shown in the About view                     |
| `education.js`     | Degrees, honours, coursework, certificate links              |
| `achievements.js`  | Competitions grouped by year, with certificate images        |
| `skills.js`        | Skill groups and certifications                              |

Papers and open-source entries each carry a single `status` field (for example `'under review'`
or `'merged'`). Editing that one field updates the word and its marker everywhere it appears.

### Adding a logo

`Logo.svelte` falls back to a typographic monogram when `logo: null`. To use a real logo, drop the
file in `src/lib/logos/` and import it. Optional `mark: 'BO'` overrides the generated initials.

## Theming

Light and dark are driven by a single set of CSS custom properties in `src/app.css`
(`--bg`, `--surface`, `--ink`, `--accent`, …). Components only ever reference semantic tokens like
`bg-surface` or `text-ink-muted`, so changing the palette is a one-file edit.

The theme resolves before first paint via a small inline script in `app.html` (no flash of the wrong
theme). It follows the OS preference until the user clicks the toggle, after which the choice is
remembered in `localStorage`.

## SEO & performance

- `sitemap.xml` generated at build time. **The namespace bug in the previous version is fixed**
  (it declared `https://www.sitemaps.org/...`, which is not a valid namespace URI, so validators
  and Search Console rejected the file; it must be `http://`)
- `robots.txt` pointing at the sitemap
- JSON-LD `Person` and `WebSite` structured data
- Open Graph + Twitter card metadata with a generated `og.png` (1200×630)
- Web app manifest, SVG favicon, Apple touch icon
- Canonical URL, semantic landmarks, skip-to-content link
- WAI-ARIA tabs pattern with full arrow-key/Home/End navigation
- `prefers-reduced-motion` respected throughout
- Images lazy-loaded and decoded async; assets optimised from ~6 MB to ~1 MB

To change the canonical domain, edit `site.url` in `src/lib/data/site.js` and the `Sitemap:` line in
`static/robots.txt`.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `./build` to GitHub
Pages. If you use a custom domain, uncomment the `cname:` line in the workflow. `force_orphan: true`
wipes the branch on each deploy and would otherwise delete the `CNAME` file.
