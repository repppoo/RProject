// Edit this file to update the portfolio. No build step required.
window.PORTFOLIO = {
  "name": "Arif Fahmi",
  "fullName": "Arif Fahmi Bin Ahmad Irwan",
  "email": "farif1280@gmail.com",
  "linkedin": "https://www.linkedin.com/in/arif-fahmi-4262b1334/",
  "github": "https://github.com/repppoo",
  "resume": "./arif-fahmi-resume.pdf",
  "projects": [
    {
      "id": "pop-nexus",
      "number": "01",
      "title": "POP Nexus",
      "subtitle": "Find a payment record in seconds.",
      "category": "AI & Automation",
      "context": "NOVARTIS · INTERNSHIP",
      "visual": "nexus",
      "tags": [
        "Python",
        "Azure AI",
        "Copilot Studio"
      ],
      "summary": "A tool that helps finance staff find payment details in bank PDFs and check the original document.",
      "problem": "Finding one payment meant manually searching through bank documents.",
      "approach": "Built a tool that reads payment details from PDFs, lets users search in everyday language, and links to the original page for checking.",
      "outcome": "Payment lookup reduced from approximately 15 minutes to under 30 seconds. A test sample returned 82 correct extractions out of 82.",
      "tools": [
        "Python",
        "OCR",
        "Azure AI Document Intelligence",
        "Copilot Studio",
        "Power Automate"
      ],
      "result": "~15 min → <30 sec",
      "resultLabel": "Payment lookup time",
      "note": "Results reported in my resume. The 82/82 result describes the tested sample, not a guarantee for every document.",
      "technicalDetails": "Built a document-processing workflow using OCR and Azure AI Document Intelligence to extract structured fields. Connected natural-language retrieval with direct links to the relevant source page."
    },
    {
      "id": "forecastx",
      "number": "02",
      "title": "ForecastX",
      "subtitle": "Bring five teams’ financial plans together.",
      "category": "Web & Data",
      "context": "NOVARTIS · INTERNSHIP",
      "visual": "forecast",
      "tags": [
        "React",
        "TypeScript",
        "Flask"
      ],
      "summary": "One place for finance teams to submit their forecasts, compare changes and keep track of updates.",
      "problem": "Forecasts from different departments needed to be combined into a clear, shared view.",
      "approach": "Built a portal for five departments to submit 12-month cash-flow forecasts. Added a combined view, comparisons between figures, a history of changes and AI-assisted “what if?” analysis.",
      "outcome": "Teams could review their submissions, changes and scenarios in one portal.",
      "tools": [
        "Python",
        "Flask",
        "React",
        "TypeScript",
        "openpyxl",
        "Office Scripts"
      ],
      "result": "5 departments",
      "resultLabel": "One forecasting portal",
      "technicalDetails": "Built a portal collecting 12-month forecasts from five finance departments. Developed Python/Flask and React/TypeScript components with consolidation, variance tracking, audit trails, and AI-assisted what-if analysis."
    },
    {
      "id": "auditmatic",
      "number": "03",
      "title": "Auditmatic",
      "subtitle": "Turn written review notes into clear reports.",
      "category": "AI & Automation",
      "context": "NOVARTIS · INTERNSHIP",
      "visual": "audit",
      "tags": [
        "AI Builder",
        "Power Automate",
        "Power BI"
      ],
      "summary": "A workflow that uses AI to organise written review notes into categories and reporting records.",
      "problem": "Written notes and follow-up decisions needed to be sorted consistently for reporting.",
      "approach": "Connected AI tools with an automated workflow to interpret notes, group the findings and pass the results into Excel, SharePoint and Power BI.",
      "outcome": "Created a connected process that moves written review information into organised records and reports.",
      "tools": [
        "Copilot Studio",
        "AI Builder",
        "Power Automate",
        "SharePoint",
        "Power BI"
      ],
      "result": "Notes → clear reports",
      "resultLabel": "Organised review information",
      "technicalDetails": "Automated the interpretation and classification of reviewer notes and remediation decisions. Connected the resulting outputs to Excel, SharePoint, and Power BI."
    },
    {
      "id": "email-automation",
      "number": "04",
      "title": "Email-to-Database",
      "subtitle": "Save email attachments without the busywork.",
      "category": "AI & Automation",
      "context": "INDEPENDENT PROJECT",
      "visual": "email",
      "tags": [
        "Workflow automation",
        "Email",
        "Database"
      ],
      "summary": "An automation that retrieves email files and saves their related information in a database.",
      "problem": "Manually retrieving files from incoming emails adds repetitive handling to everyday work.",
      "approach": "Connected email file retrieval with a database so incoming files and their details could be handled in one workflow.",
      "outcome": "Reduced manual file handling by connecting email intake with database storage.",
      "tools": [
        "Email integration",
        "Workflow automation",
        "Database integration"
      ],
      "result": "Inbox → database",
      "resultLabel": "Automated file intake"
    },
    {
      "id": "threat-classifier",
      "number": "05",
      "title": "Threat Signal",
      "subtitle": "Spot posts that may need a security review.",
      "category": "Cybersecurity",
      "context": "INDEPENDENT · IN DEVELOPMENT",
      "visual": "threat",
      "tags": [
        "AI classification",
        "Cybersecurity"
      ],
      "summary": "An ongoing AI project that groups social-media posts according to whether they may suggest a cybersecurity threat.",
      "problem": "Social media contains a mix of ordinary discussion and posts that may indicate cybersecurity threats.",
      "approach": "Developing an AI system to categorize posts according to whether they may indicate cybersecurity threats.",
      "outcome": "In development. Evaluation metrics and a public demonstration will be added when available.",
      "tools": [
        "AI classification",
        "Cyber-threat analysis"
      ],
      "result": "In development",
      "resultLabel": "AI × cybersecurity",
      "note": "Threat Signal is the portfolio display name for my ongoing AI Social Media Cyber-Threat Classifier. The browser lab is a separate, newly built educational model trained on synthetic examples; it is not the research project’s production model.",
      "demo": "./index.html#signal-lab",
      "demoLabel": "Try the AI text demo"
    },
    {
      "id": "dfir-desk",
      "number": "06",
      "title": "DFIR Desk",
      "subtitle": "Solve a fictional cyber incident, step by step.",
      "category": "Cybersecurity",
      "context": "ACADEMIC · PLAYABLE PROJECT",
      "visual": "forensic",
      "tags": [
        "JavaScript",
        "Digital forensics",
        "Incident response"
      ],
      "summary": "A browser game where you inspect evidence and answer questions across eight fictional cyber incidents.",
      "problem": "Practising incident investigation needs realistic evidence and clear feedback without requiring a live compromised environment.",
      "approach": "Built a game with case briefings, activity logs, timelines and hints. Players investigate what happened, answer questions, and receive points and feedback. Each question allows two attempts.",
      "outcome": "Delivered a playable investigation experience with scoring and a results screen. This portfolio includes an accessible browser edition using the case data from the supplied project.",
      "tools": [
        "HTML",
        "CSS",
        "JavaScript",
        "Browser storage",
        "Digital forensics"
      ],
      "result": "8 cases · 37 challenges",
      "resultLabel": "Hands-on investigation practice",
      "demo": "./forensic.html",
      "demoLabel": "Play the forensic game",
      "note": "All cases are fictional training material. The portfolio edition adapts the original case data and two-attempt scoring, with a new responsive interface and no player sign-in.",
      "technicalDetails": "Built an HTML, CSS, and JavaScript game with case briefings, VPN and firewall logs, incident timelines, and question-level hints. Challenges cover account compromise, ransomware, persistence, web shells, phishing, brute-force activity, USB incidents, and exfiltration. The original game awards 10 points per correct answer and allows two attempts per question."
    },
    {
      "id": "ransomware-honeypot",
      "number": "07",
      "title": "Ransomware Honeypot",
      "subtitle": "Watch decoy files for suspicious changes.",
      "category": "Cybersecurity",
      "context": "ACADEMIC · PYTHON PROJECT",
      "visual": "honeypot",
      "tags": [
        "Python",
        "Flask",
        "SQLite",
        "Watchdog"
      ],
      "summary": "A monitoring prototype that watches decoy files and records unusual changes for investigation.",
      "problem": "Unexpected changes to decoy files may signal suspicious activity, but an investigator needs a clear record of what changed.",
      "approach": "Built a file monitor and dashboard that record changes, compare file contents, and flag unusual patterns or rapid bursts of activity.",
      "outcome": "Built a prototype for reviewing file activity and alerts. The browser demo uses made-up events to show the rules; the actual Python monitor runs separately.",
      "tools": [
        "Python",
        "Watchdog",
        "SHA-256",
        "Shannon entropy",
        "SQLite",
        "Flask"
      ],
      "result": "File changes → forensic evidence",
      "resultLabel": "Detection and investigation prototype",
      "demo": "./honeypot.html",
      "demoLabel": "Explore the honeypot sandbox",
      "note": "The sandbox does not scan or modify visitor files. Entropy and burst rules are heuristics, not proof of ransomware. The supplied prototype requires deployment hardening before production use.",
      "technicalDetails": "Used Watchdog to monitor honeyfiles and compare SHA-256 hashes, Shannon entropy, and file sizes. An entropy increase of at least 0.3 after a content change is classified as suspicious encryption. A burst tracker flags three or more content-changing events in 20 seconds. SQLite stores events and forensic metadata, and Flask provides searchable event views and recent-activity alerts."
    },
    {
      "id": "traffic-prediction",
      "number": "08",
      "title": "Traffic Volume Prediction",
      "subtitle": "Use past traffic patterns to explore predictions.",
      "category": "Web & Data",
      "context": "ACADEMIC PROJECT",
      "visual": "forecast",
      "tags": [
        "Machine learning",
        "Data analysis"
      ],
      "summary": "An academic exploration of traffic volume prediction using machine learning.",
      "problem": "Traffic volume varies over time, creating an opportunity to explore prediction from observed patterns.",
      "approach": "Worked on traffic volume prediction using machine learning as part of my academic projects.",
      "outcome": "Developed practical experience applying machine learning to a prediction problem.",
      "tools": [
        "Machine learning",
        "Data analysis"
      ],
      "result": "Patterns → predictions",
      "resultLabel": "Academic machine-learning work",
      "note": "Listed in my resume. Dataset details, evaluation metrics, and a live demonstration are not yet included in this portfolio."
    }
  ]
};
