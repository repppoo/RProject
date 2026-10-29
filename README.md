# Arif Fahmi — Portfolio

A responsive, cinematic portfolio for AI, automation, software, and cybersecurity work. Built with plain HTML, CSS, and JavaScript; no dependencies, trackers, API keys, or build step.

## Features

- Original animated particle globe with pointer response and motion toggle
- Filterable eight-project gallery and accessible case-study dialogs
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

- **Projects and contact details:** edit `content.js`. Add an object to `projects` to add a case study. The allowed visual names are `nexus`, `forecast`, `audit`, `email`, `threat`, `lab`, `forensic`, and `honeypot`. Update static counts and copy in `index.html` if adding projects or changing biographical content.
- **Resume:** replace `arif-fahmi-resume.pdf` with your latest PDF, preserving the filename.
- **Bio, experience, and links:** edit `index.html`. Keep the matching values in `content.js` in sync.
- **Colours and layout:** edit `styles.css`.

Content is edited in the repository and redeployed. The public site has no admin login or upload service. The workflow demonstration is a simulation and does not read emails or connect to a database.

## GitHub Pages

This repository publishes from main / (root). Updates committed to main deploy automatically through GitHub Pages. All asset paths are relative to support the repository subpath.

## Content provenance

Professional details and project outcomes are based on `Arif_Fahmi_Resume(2).pdf` supplied by Arif. Project artwork is an original illustrative representation, not screenshots of company systems. The POP Nexus extraction figure refers only to the 82-extraction test sample reported in the resume; it is not a general accuracy claim. No employer source code, internal data, or private application URLs are included.

The resume and professional contact details are intentionally included for interview sharing. Review the PDF before making the repository public.


## Interactive additions

- **AI text triage:** browser inference from a small multinomial Naive Bayes model trained on 64 synthetic examples. Uses capped word occurrences, smoothed word likelihoods, and an uncalibrated scaled score. Unfamiliar vocabulary triggers abstention. This is a portfolio teaching demo, not the ongoing research project’s production model or a security assessment.
- **Review automation:** analysing text optionally creates a local browser record, deduplicates exact repeats, retains the latest 20 entries, and exports CSV. No text is transmitted; CSV output escapes formula-like cells. If local storage is blocked, the queue remains available for the current page session.
- **DFIR Desk:** a new responsive game interface reusing all eight cases and 37 questions from the supplied Game_Forensic.zip. The first case’s log date is aligned with the stated Saturday. The supplied original ZIP is unchanged. No audio or sign-in is required.
- **Honeypot sandbox:** a browser simulation of hash/entropy classification and the three-events-in-20-seconds burst rule from Honeypot_Project.zip. No user filesystem access, encryption, or server monitoring occurs in the website. The supplied Python prototype and its database/credentials are not published.

To retrain the teaching model using only the Python standard library:

```sh
python3 train-signal.py signal-model.js
```

Game data: `forensic-cases.js`. Game UI: `forensic-game.js`. Honeypot UI: `honeypot-demo.js`. New styling: `lab-styles.css` plus the intelligence lab additions to `styles.css`.
