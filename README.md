# 429999 Journal

A lightweight personal internet journal for `@429999group`, built with plain HTML, CSS and JavaScript. The site covers crypto culture, memes, technology, AI, funding, startups and the strange behavior of people online.

There are no frameworks, build tools, dependencies, external APIs, cookies or tracking. Every page works by opening the HTML file directly and all paths are relative for GitHub Pages compatibility.

## File structure

```text
.
├── index.html
├── style.css
├── script.js
├── 404.html
├── README.md
├── assets/
│   ├── avatar.png
│   ├── avatar-480.webp
│   ├── avatar-900.webp
│   ├── favicon.svg
│   └── og-image.svg
├── data/
│   └── notes.json
└── notes/
    ├── note-001.html
    ├── note-002.html
    └── note-003.html
```

## Preview locally

For a quick preview, open `index.html` in a browser.

For behavior that matches GitHub Pages more closely, run a small local static server from the project folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

No installation is required.

## Edit site text

- Homepage sections, navigation, about text and footer: `index.html`
- Random thoughts, conviction explanations and system messages: `script.js`
- Note listing data for future integrations: `data/notes.json`
- Long-form article content: files in `notes/`
- Visual tokens, layout and responsive behavior: `style.css`
- 404 copy: `404.html`

## Add a new note

1. Duplicate one file in `notes/`.
2. Rename it using the next available filename, such as `note-004.html`.
3. Update the page title, description, canonical placeholder, article metadata and visible article content.
4. Keep asset links relative to the note folder, for example `../style.css`.
5. Add a new article card to the `LATEST NOTES` section in `index.html`.
6. Add the note metadata to `data/notes.json`.
7. Update related-note links where useful.

## Avatar

The official avatar lives at:

```text
assets/avatar.png
```

The supplied image is used unchanged. If the brand asset is intentionally replaced later, keep the same filename or update every `src` reference in `index.html`. Preserve a square aspect ratio to avoid layout shift.

The two WebP files are lightweight display derivatives used for faster loading. `avatar.png` remains the unchanged official source and browser fallback.

## Social links

The editable social links are grouped together in the `ABOUT` section of `index.html`:

- X / Twitter: `https://x.com/429999group`
- GitHub: `https://github.com`
- Email: ``

Replace the placeholder email and adjust the profile URLs if needed.

## SEO placeholders

Before production launch, replace:

```text
https://example.com/429999-journal/
```

in canonical and Open Graph metadata with the final public URL. Repeat this for each article page.

The lightweight social preview graphic is `assets/og-image.svg`. Some social platforms prefer PNG or JPG, so it can later be exported to a 1200 by 630 pixel raster image without changing the layout.

## Deploy to GitHub Pages

1. Create a repository.
2. Upload all project files while preserving the folder structure.
3. Open the repository **Settings**.
4. Open **Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select the `main` branch and the root folder.
7. Save.
8. Wait for deployment to finish.

All links and asset references are relative. The site therefore works inside a repository subdirectory such as:

```text
🤓/
```

The included `404.html` is automatically used by GitHub Pages for missing routes.

## Progressive enhancement

Core content and navigation remain visible without JavaScript. JavaScript enhances:

- Mobile navigation
- Random thought dialog
- Conviction simulator
- Archive filtering
- Rabbit-hole disclosures
- `429999` keyboard easter egg
- Occasional system messages
- Current year
- Desktop custom cursor

Motion is reduced or removed when the visitor enables `prefers-reduced-motion`.
