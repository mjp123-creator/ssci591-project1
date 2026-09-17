# SSCI 591 Project 1 — Personal Webpage

A personal webpage for **Jiapei Mei**, developed for SSCI 591: Web & Mobile GIS, Fall 2026. It introduces personal interests and semester learning goals, and gives classmates and the instructor a small interactive example of HTML, CSS, JavaScript, and web mapping.

- **Live website:** [mjp123-creator.github.io/ssci591-project1](https://mjp123-creator.github.io/ssci591-project1/)
- **Source repository:** [mjp123-creator/ssci591-project1](https://github.com/mjp123-creator/ssci591-project1)

## Features

- Personal introduction, portrait, learning goals, and an interests table.
- A **More about me / Show less** button that expands or collapses additional information and updates visible text.
- A Leaflet map centered on the University of Southern California, with an OpenStreetMap basemap and clickable markers for USC and Shunde, Foshan.
- **Take me home** and **Back to USC** buttons that switch between Shunde, Foshan and USC.
- Responsive layout for desktop and phone widths.
- Image alternative text, keyboard focus indicators, a skip link, and accessible expansion and status attributes.
- Status messages for missing map-library resources or failed map tiles.

## Technology

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure, content, table, and controls |
| CSS3 | Typography, portrait sizing, layout, and responsive styles |
| JavaScript | DOM updates, event listeners, and map initialization |
| Leaflet 1.9.4 | Interactive map, marker, popup, and view controls |
| OpenStreetMap | Map tiles and attribution |
| GitHub Pages | Static website hosting |

This is a static website. It has no build step, package installation, backend, or database. Leaflet is loaded from a CDN; the map library and tiles require internet access. The page does not request the visitor's location.

## Project Structure

```text
.
├── index.html          # Page content and external resource references
├── style.css           # Desktop and mobile styles
├── app.js              # Introduction interaction and Leaflet map
├── images/
│   └── selfie.png      # Personal portrait
├── README.md           # Project documentation
├── REPORT_GUIDE.md     # Report outline; not the completed course report
└── .gitignore          # Local files excluded from version control
```

## Run Locally

### Prerequisites

- A modern web browser.
- Git if cloning or synchronizing the repository.
- Python 3 for the optional local server below, or VS Code with Live Server.

### Clone the Repository

```bash
git clone https://github.com/mjp123-creator/ssci591-project1.git
cd ssci591-project1
```

If the repository is already configured in a local folder such as `591`, open that folder instead; cloning again is unnecessary.

### Start a Local Server

Run this command from the directory containing `index.html`:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser. Press **Ctrl+C** in the terminal to stop the server.

Alternatively, open `index.html` with VS Code Live Server. Opening the HTML file directly is also possible, but a local HTTP server is preferable when checking resource loading.

## Implementation Notes

### Introduction Toggle

In `app.js`, `toggleAbout()` reads and reverses the additional paragraph's `hidden` state. It also updates the button label, `aria-expanded`, and the visible status text. A `click` listener calls the function.

This interaction demonstrates a function, JavaScript string output, and an event listener separate from the map buttons.

### Map

The initial center is `[34.0224, -118.2851]`, using latitude followed by longitude. The initial zoom is `14`; the hometown view uses zoom `12`. These coordinates come from the classroom demo and identify USC, not the author's home address. The hometown marker uses `[22.80541, 113.29320]`, a representative point in Shunde, Foshan, based on [Apple Maps](https://maps.apple.com/place?auid=1117349206072835&lsp=57879).

Mouse-wheel zoom is intentionally disabled so scrolling the page does not unexpectedly zoom the map. The map's **+ / −** controls remain available. The return-to-USC interaction respects the browser's reduced-motion preference.

### Asset Paths

Use project-relative paths:

```html
<img src="images/selfie.png" alt="Jiapei Mei">
```

Avoid `/images/selfie.png`: a leading slash points to the domain root rather than the `/ssci591-project1/` project directory. Filenames and capitalization must match the uploaded files exactly.

## Development Workflow

For this individual course project, changes can be committed directly to `main`.

1. Check the current state with `git status`.
2. When the working tree is clean, run `git pull --ff-only` to retrieve remote updates. If it reports diverging history, resolve that situation before continuing; do not force-push.
3. Edit and save the relevant HTML, CSS, JavaScript, or image files.
4. Test locally using the checklist below.
5. Review the changes with `git diff` and stage only the intended files.
6. Commit with a descriptive message, then push.

Example for a photo-path correction:

```bash
git diff
git add index.html
git commit -m "Fix portrait path for GitHub Pages"
git push origin main
```

In VS Code, the equivalent flow is **Source Control → Stage Changes (+) → enter a message → Commit → Push / Sync Changes**. A commit saves a local version; pushing sends it to GitHub. Review local and remote changes before synchronizing.

## Deployment

The site uses GitHub Pages with:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/ (root)`

Keep `index.html` at the repository root. After pushing, check the repository's **Actions** tab for the Pages deployment result, then test the live URL. No custom domain is required.

If the website still shows an older version, confirm that deployment finished successfully, then hard-refresh the page or test in a private window.

## Manual Testing

Repeat these checks after relevant changes and again on the published site:

| Check | Expected result |
| --- | --- |
| Open the page | Content, styles, and portrait load |
| Select More about me | Additional introduction appears; label changes to Show less |
| Select Show less | Additional introduction is hidden again |
| Use Tab and activate a focused button | Focus is visible and the control responds |
| Load the map | Basemap, USC marker, zoom controls, and attribution appear |
| Select the USC marker | A popup identifies the location |
| Select Take me home | Shunde, Foshan is shown; its marker opens a hometown popup |
| Select Back to USC | The view returns to the initial campus zoom |
| Check phone and desktop widths | Main content fits without horizontal scrolling |
| Open browser developer tools | Check Console for errors and Network for failed requests |
| Open the live site without signing in | The page remains accessible |

The latest review in the development conversation verified the deployed portrait, introduction toggle, map controls, and widths of **390px** and **1280px**, with no console errors captured during that session. This is a limited browser check, not a comprehensive cross-browser or accessibility audit. The repository does not currently include an automated test suite.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Portrait is missing | Confirm `images/selfie.png` is committed and uses the correct relative path and capitalization |
| Entire website returns 404 | Check Pages configuration, deployment status, and root-level `index.html` |
| Map library fails to load | Check internet access and the Leaflet CDN requests |
| Map appears but tiles are missing | Check OpenStreetMap tile requests and connectivity |
| Latest edit is absent online | Save, commit, push, wait for deployment, and refresh |
| Changes appear locally but not on GitHub | Check for outgoing commits in VS Code or run `git status -sb` |

## Limitations and Possible Improvements

- The map contains two markers: USC and a representative point in Shunde, Foshan.
- Map functionality depends on external network resources.
- Potential future additions include basketball-court or movie-theater locations; these datasets and features have not been implemented.
- The course report and Brightspace submission are separate deliverables. This README does not replace the required report.

## References and Acknowledgments

- [Leaflet Quick Start Guide](https://leafletjs.com/examples/quick-start/) — map, tile-layer, marker, and popup patterns.
- [Leaflet 1.9.4 API Reference](https://leafletjs.com/reference-1.9.4.html) — map options and methods.
- [OpenStreetMap copyright and attribution](https://www.openstreetmap.org/copyright) — basemap source and attribution information.
- [MDN: addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) — event handling.
- [MDN: textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) — visible text updates.
- SSCI 591 classroom demos — introductory page workflow and USC coordinates.
- Personal portrait supplied by Jiapei Mei.


## Licensing

No project-wide license has been selected. Public repository access does not itself grant permission to reuse the author's portrait or other original material. Leaflet and OpenStreetMap resources remain subject to their respective licenses and attribution requirements.
