# Project Index — GitHub Pages Dashboard

A responsive, portfolio-style homepage for collecting links to your GitHub Pages sites, web apps, tools, and experiments.

## The one file you edit

**`projects.js`** is the project directory. Add, rename, describe, categorize, and link projects there. The page automatically builds project cards and category filters from the entries.

Example entry:

```js
{
  name: "My Project",
  category: "Web App",
  status: "LIVE",
  description: "A short explanation of what this project does.",
  url: "https://yourusername.github.io/my-project/",
  icon: "✳",
  tags: ["JavaScript", "GitHub Pages"]
}
```

Copy an object, change its fields, and add it inside the `window.PROJECTS` array. Put a comma between adjacent objects. You do not need to edit `index.html`, `style.css`, or `app.js` to add a project.

## Publish on GitHub Pages

1. Create a new **public** GitHub repository, for example `project-index`.
2. Upload `index.html`, `style.css`, `app.js`, `projects.js`, and `README.md` to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch **main** and folder **/ (root)**, then save.
6. Wait for GitHub to publish the site. For a repository named `project-index`, the address is usually `https://YOUR-USERNAME.github.io/project-index/`.

If you want the main account site at `https://YOUR-USERNAME.github.io/`, name the repository exactly `YOUR-USERNAME.github.io`.

## Notes

- This is a static site: no build step or paid service is needed.
- Project links open in a new tab.
- Use the URL of each project's **published site** if you want to send visitors to the live project; use its repository URL if you want them to view the source.
- Replace the sample GitHub links and sample project card in `projects.js` with your real links.
- The “GitHub” buttons in the header/footer currently use the generic GitHub homepage. Update the `githubLink` in `app.js` and the matching links in `index.html` to your profile URL.
