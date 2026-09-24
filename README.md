# Xin Mei Portfolio

Static portfolio website for Xin Mei, built with plain HTML, CSS, and JavaScript. The site is hosted on Firebase Hosting and includes a Decap CMS admin area for editing portfolio content.

Live site:

https://xin-mei-s-portfolio.web.app

CMS:

https://xin-mei-s-portfolio.web.app/admin/

## Source Structure

```text
.
|-- index.html                 # Main public portfolio homepage
|-- styles.css                 # Shared design system, layout, palette, responsive styles
|-- app.js                     # Homepage data loading, theme toggle, skills tabs, contact rendering
|-- project.html               # Simple generated fallback project detail page
|-- project.js                 # Fallback detail page renderer
|-- case-study.js              # Shared interactions for custom project pages
|-- content/
|   `-- portfolio.json         # CMS-editable portfolio data
|-- projects/
|   |-- firstboard-website.html
|   |-- land-market.html
|   |-- kolam-keli-sayang.html
|   |-- toutdoor.html
|   |-- riseasia.html
|   `-- internal-billboard-update-app.html
|-- admin/
|   |-- index.html             # Decap CMS entry page
|   `-- config.yml             # Decap CMS schema/config
|-- assets/
|   `-- portfolio-hero.png     # Homepage visual asset
|-- dist/                      # Built deploy folder copied by deploy-firebase.bat
|-- firebase.json              # Firebase Hosting config
|-- .firebaserc                # Firebase project mapping
`-- deploy-firebase.bat        # Windows build + deploy helper
```

## Design Direction

The current visual style uses the reference palette supplied by Xin Mei:

```text
#FFFFFF  white
#242424  charcoal
#5C7C89  blue grey
#1F4959  deep teal
#011A28  dark navy
```

Important design variables are in `styles.css` near the top under `:root`. Update those variables first when changing the theme.

The homepage uses:

- `Poppins` for body and interface text.
- `Cormorant Garamond` for large display headings.
- A dark teal hero section inspired by an arched gallery/portal style.
- A light/dark theme toggle saved in `localStorage`.

## Editing Portfolio Content

Portfolio data lives in:

```text
content/portfolio.json
```

Main editable sections:

- `contact.email`
- `contact.phone`
- `contact.whatsapp`
- `contact.linkedin`
- `projects[]`

Each project supports:

- `slug`
- `title`
- `type`
- `detailPage`
- `url`
- `action`
- `featured`
- `description`
- `details`
- `bullets`

`detailPage` controls where the homepage "View details" button goes. Example:

```json
"detailPage": "projects/land-market.html"
```

If `detailPage` is empty, the site falls back to:

```text
project.html?project=PROJECT_SLUG
```

## Custom Case Study Pages

Rich project pages live in:

```text
projects/*.html
```

Use these pages for image-heavy or interactive case studies. They are intentionally separate from the CMS so each project can have a custom layout, screenshots, embeds, galleries, tabs, or workflow sections.

To create a new custom project page:

1. Duplicate one file inside `projects/`.
2. Rename it to a clean URL, for example `my-project.html`.
3. Edit the page title, hero text, sections, images, and links.
4. Add `"detailPage": "projects/my-project.html"` to that project in `content/portfolio.json`.
5. Run `deploy-firebase.bat`.

## CMS

The CMS uses Decap CMS with Decap Turbo GitHub login.

CMS config:

```text
admin/config.yml
```

The public header does not show the CMS link. Admin access is only through:

```text
/admin/
```

When adding new CMS fields, update both:

```text
admin/config.yml
content/portfolio.json
```

## Firebase Deployment

Firebase serves the `dist/` folder.

The easiest deploy method on Windows is:

```text
deploy-firebase.bat
```

The BAT file:

1. Copies source files into `dist/`.
2. Copies `admin/`, `assets/`, `content/`, and `projects/`.
3. Copies JS/CSS/HTML entry files.
4. Runs `npx firebase-tools deploy --only hosting`.

Manual deploy:

```powershell
npx firebase-tools login
npx firebase-tools deploy --only hosting
```

Do not configure Firebase as a single-page app. This site uses normal static pages.

## Local Preview

From the project folder:

```powershell
python -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

## Contact Links

Footer/contact links currently include:

- Email: `xinmei6999@gmail.com`
- Phone: `0172097727`
- WhatsApp: `https://wa.me/60172097727`
- LinkedIn: placeholder `https://www.linkedin.com/`

Replace the LinkedIn placeholder with the real profile URL when available. Update it in:

```text
content/portfolio.json
index.html
```

Then run:

```text
deploy-firebase.bat
```
