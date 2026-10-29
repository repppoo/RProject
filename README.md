# Arif Fahmi — Portfolio

A responsive, cinematic portfolio for AI, automation, software, and cybersecurity work. Built with plain HTML, CSS, and JavaScript; no dependencies, trackers, API keys, or build step.

## Features

- Original animated particle globe with pointer response and motion toggle
- Filterable six-project gallery and accessible case-study dialogs
- Downloadable resume PDF
- Experience, education, and technical toolkit
- Interactive email-to-database simulation using sample data
- Email copy, LinkedIn, and GitHub contact links
- Mobile navigation, keyboard support, and reduced-motion support

## Run locally

From the repository root:

```sh
python3 -m http.server 8000 
```

Open `http://localhost:8000`.

## Update your content

- **Projects and contact details:** edit `content.js`. Add an object to `projects` to add a case study. The allowed visual names are `nexus`, `forecast`, `audit`, `email`, `threat`, and `lab`. Update static counts and copy in `index.html` if adding projects or changing biographical content.
- **Resume:** replace `arif-fahmi-resume.pdf` with your latest PDF, preserving the filename.
- **Bio, experience, and links:** edit `index.html`. Keep the matching values in `content.js` in sync.
- **Colours and layout:** edit `styles.css`.

Content is edited in the repository and redeployed. The public site has no admin login or upload service. The workflow demonstration is a simulation and does not read emails or connect to a database.

## GitHub Pages

In repository Settings → Pages, use Deploy from a branch, choose main and / (root), then Save. GitHub publishes this static portfolio directly; no build workflow is needed. Updates committed to main redeploy automatically.

All asset paths are relative so the site works under the repository subpath.

## Content provenance

Professional details and project outcomes are based on `Arif_Fahmi_Resume(2).pdf` supplied by Arif. Project artwork is an original illustrative representation, not screenshots of company systems. The POP Nexus extraction figure refers only to the 82-extraction test sample reported in the resume; it is not a general accuracy claim. No employer source code, internal data, or private application URLs are included.

The resume and professional contact details are intentionally included for interview sharing. Review the PDF before making the repository public.
