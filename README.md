# Xin Mei Portfolio

Static portfolio website for Xin Mei.

## Pages

- `index.html` - public portfolio
- `admin/` - GitHub-login CMS powered by Decap CMS

## GitHub Pages Setup

1. Create a new GitHub repository named `portfolio` or `xinmei-portfolio`.
2. Push this folder to the repository.
3. In GitHub, open `Settings > Pages`.
4. Set source to `Deploy from a branch`.
5. Choose branch `main` and folder `/root`.
6. Save.

The site will be available at:

```text
https://YOUR-GITHUB-USERNAME.github.io/REPOSITORY-NAME/
```

If the repository is named exactly `YOUR-GITHUB-USERNAME.github.io`, the site will be available at:

```text
https://YOUR-GITHUB-USERNAME.github.io/
```

## Content Updates

Portfolio content lives in `content/portfolio.json`.

The CMS at `/admin/` uses Decap CMS with Decap Turbo GitHub login. The admin UI is not linked from the public header. Editing requires access to the Decap Turbo site and GitHub repository connection.

Project cards can link to custom case study pages using the `detailPage` field in `content/portfolio.json`. Rich, image-heavy, or interactive case studies live in `projects/*.html`; duplicate one of those files when creating a new fully custom project page.

## Firebase Hosting

This project is deployed on Firebase Hosting:

https://xin-mei-s-portfolio.web.app

The deployable site is served from `dist/`.

```powershell
npx firebase-tools login
npx firebase-tools deploy --only hosting
```

Do not configure it as a single-page app; this site uses normal static pages.

On Windows, you can also double-click `deploy-firebase.bat` to copy the latest site files into `dist/` and deploy to Firebase Hosting automatically.
