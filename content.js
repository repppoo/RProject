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
      "subtitle": "Find the payment. Skip the paperwork.",
      "category": "AI & Automation",
      "context": "NOVARTIS · INTERNSHIP",
      "visual": "nexus",
      "tags": [
        "Python",
        "Azure AI",
        "Copilot Studio"
      ],
      "summary": "An AI-assisted proof-of-payment retrieval system that turns bank PDFs into searchable, source-linked answers.",
      "problem": "Finding a payment in bank documents meant time-consuming manual searches across PDFs.",
      "approach": "Built a document-processing workflow using OCR and Azure AI Document Intelligence to extract structured fields. Connected natural-language retrieval with direct links to the relevant source page.",
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
      "note": "Results reported in my resume. The 82/82 result describes the tested sample, not a guarantee for every document."
    },
    {
      "id": "forecastx",
      "number": "02",
      "title": "ForecastX",
      "subtitle": "A clearer view of what comes next.",
      "category": "Web & Data",
      "context": "NOVARTIS · INTERNSHIP",
      "visual": "forecast",
      "tags": [
        "React",
        "TypeScript",
        "Flask"
      ],
      "summary": "A cash-flow forecasting portal connecting finance submissions, variance tracking, and AI-assisted scenarios.",
      "problem": "Cash-flow forecasts from different departments needed a consolidated view with traceable changes.",
      "approach": "Built a portal collecting 12-month forecasts from five finance departments. Developed Python/Flask and React/TypeScript components with consolidation, variance tracking, audit trails, and AI-assisted what-if analysis.",
      "outcome": "Brought departmental forecasts into one portal with a shared view of submissions, variances, and scenarios.",
      "tools": [
        "Python",
        "Flask",
        "React",
        "TypeScript",
        "openpyxl",
        "Office Scripts"
      ],
      "result": "5 departments",
      "resultLabel": "One forecasting portal"
    },
    {
      "id": "auditmatic",
      "number": "03",
      "title": "Auditmatic",
      "subtitle": "From reviewer notes to useful insight.",
      "category": "AI & Automation",
      "context": "NOVARTIS · INTERNSHIP",
      "visual": "audit",
      "tags": [
        "AI Builder",
        "Power Automate",
        "Power BI"
      ],
      "summary": "AI-assisted reconciliation review that transforms reviewer notes into structured reporting.",
      "problem": "Free-text reviewer notes and remediation decisions needed consistent interpretation and structured reporting.",
      "approach": "Automated the interpretation and classification of reviewer notes and remediation decisions. Connected the resulting outputs to Excel, SharePoint, and Power BI.",
      "outcome": "Created a connected workflow for review information to move into structured records and reporting.",
      "tools": [
        "Copilot Studio",
        "AI Builder",
        "Power Automate",
        "SharePoint",
        "Power BI"
      ],
      "result": "Notes → insights",
      "resultLabel": "Connected reconciliation review"
    },
    {
      "id": "email-automation",
      "number": "04",
      "title": "Email-to-Database",
      "subtitle": "Less handling. More flow.",
      "category": "AI & Automation",
      "context": "INDEPENDENT PROJECT",
      "visual": "email",
      "tags": [
        "Workflow automation",
        "Email",
        "Database"
      ],
      "summary": "A workflow to retrieve email files and store their associated information in a database.",
      "problem": "Manually retrieving files from incoming emails adds repetitive handling to everyday work.",
      "approach": "Developed a workflow to retrieve email files and store associated information in a database.",
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
      "subtitle": "Reading between the posts.",
      "category": "Cybersecurity",
      "context": "INDEPENDENT · IN DEVELOPMENT",
      "visual": "threat",
      "tags": [
        "AI classification",
        "Cybersecurity"
      ],
      "summary": "An ongoing AI project to classify social media posts for potential cybersecurity threats.",
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
      "subtitle": "Follow the evidence. Solve the incident.",
      "category": "Cybersecurity",
      "context": "ACADEMIC · PLAYABLE PROJECT",
      "visual": "forensic",
      "tags": [
        "JavaScript",
        "Digital forensics",
        "Incident response"
      ],
      "summary": "An interactive digital forensics and incident response game with eight fictional investigations and 37 evidence-based challenges.",
      "problem": "Practising incident investigation needs realistic evidence and clear feedback without requiring a live compromised environment.",
      "approach": "Built an HTML, CSS, and JavaScript game with case briefings, VPN and firewall logs, incident timelines, and question-level hints. Challenges cover account compromise, ransomware, persistence, web shells, phishing, brute-force activity, USB incidents, and exfiltration. The original game awards 10 points per correct answer and allows two attempts per question.",
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
      "note": "All cases are fictional training material. The portfolio edition adapts the original case data and two-attempt scoring, with a new responsive interface and no player sign-in."
    },
    {
      "id": "ransomware-honeypot",
      "number": "07",
      "title": "Ransomware Honeypot",
      "subtitle": "Small decoys. Early warning signals.",
      "category": "Cybersecurity",
      "context": "ACADEMIC · PYTHON PROJECT",
      "visual": "honeypot",
      "tags": [
        "Python",
        "Flask",
        "SQLite",
        "Watchdog"
      ],
      "summary": "A honeyfile monitoring prototype that records file changes and surfaces suspicious encryption patterns in a Flask dashboard.",
      "problem": "Unexpected changes to decoy files can reveal activity worth investigating, but useful alerts need before-and-after evidence.",
      "approach": "Used Watchdog to monitor honeyfiles and compare SHA-256 hashes, Shannon entropy, and file sizes. An entropy increase of at least 0.3 after a content change is classified as suspicious encryption. A burst tracker flags three or more content-changing events in 20 seconds. SQLite stores events and forensic metadata, and Flask provides searchable event views and recent-activity alerts.",
      "outcome": "Built a working monitoring and review prototype with created, modified, deleted, and renamed event handling. The browser sandbox demonstrates the classification rules with synthetic events; the Python monitor runs separately on a host.",
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
      "note": "The sandbox does not scan or modify visitor files. Entropy and burst rules are heuristics, not proof of ransomware. The supplied prototype requires deployment hardening before production use."
    },
    {
      "id": "traffic-prediction",
      "number": "08",
      "title": "Traffic Volume Prediction",
      "subtitle": "Learning from patterns in motion.",
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
