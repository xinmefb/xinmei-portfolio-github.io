# Xin Mei Portfolio

Static portfolio website for Xin Mei.

## Pages

- `index.html` - public portfolio
- `admin.html` - browser-based content editor

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

## CMS Note

The CMS page stores edits in the browser using local storage and can export JSON. To make edits update the public site for every visitor, connect a backend CMS or update `data.js` and redeploy.
