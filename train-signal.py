"""Rebuild the portfolio's educational multinomial Naive Bayes model.
Only Python's standard library is needed. The examples below are synthetic,
hand-written teaching data, not a validated threat intelligence dataset.
Usage: python3 scripts/train-signal.py [output_path]
"""
import collections, json, math, re, sys
from pathlib import Path

REVIEW = '''An attacker is selling stolen customer records on a forum.
Someone leaked employee passwords and private credentials online.
A database dump with personal information is offered for sale.
Criminals are distributing ransomware and demanding bitcoin payments.
Our files were encrypted and a ransom note appeared today.
A phishing email asks users to verify their password on a fake login page.
Urgent account suspension message redirects to a fraudulent credential harvesting site.
An unknown sender requests your password and verification code immediately.
A malicious attachment installs malware and steals browser cookies.
We detected unauthorized access to the company server overnight.
Repeated failed login attempts were followed by an unknown successful login.
A threat actor claims to have stolen our private source code.
The attacker threatens to publish confidential company documents.
An exposed server contains customer credentials without authentication.
Suspicious outbound connections are sending confidential data to an unknown host.
Someone is advertising stolen access tokens and session cookies for sale.
A fake support account requests a payment and your one time code.
Malware is spreading through a downloadable invoice attachment.
The infected endpoint is communicating with a command and control server.
A backdoor allows remote unauthorized commands on the compromised machine.
The account was hijacked and is sending fraudulent messages.
A user reports missing files replaced with encrypted copies and a ransom demand.
A forum post offers unauthorized access to corporate email accounts.
The leaked database contains real passwords and payment details.
A malicious link downloads an executable disguised as a document.
We observed unusual data transfers from a compromised server.
A scam website impersonates a bank to steal login credentials.
The attacker uploaded a web shell and accessed confidential files.
A suspicious script disables security tools and deletes backups.
Stolen administrator credentials are being shared in a public chat.
An unknown process is encrypting documents and renaming files rapidly.
A criminal group claims a breach and posts stolen customer data.'''.splitlines()
ROUTINE = '''I am attending a cybersecurity awareness workshop tomorrow.
Our team published a guide explaining how to report phishing emails.
The company is hiring a security analyst for the monitoring team.
We completed the scheduled server maintenance successfully.
A new article explains how ransomware detection works in a training lab.
I built a honeypot project to study suspicious file activity safely.
The class practised digital forensics using fictional incident evidence.
Our password policy now requires stronger authentication for everyone.
Please use the official help desk to report suspicious links.
We are teaching employees never to share passwords or verification codes.
The security team published guidance on protecting customer records.
Today I learned about database encryption and access control.
A tutorial demonstrates malware analysis in an isolated educational environment.
The training exercise used synthetic data and no real credentials.
I am sharing my portfolio of Python and automation projects.
We launched a new dashboard to improve finance reporting.
The team updated software and verified backups during routine maintenance.
Our documentation explains how to rotate access tokens securely.
An article discusses the history of computer security and cryptography.
The university is hosting a capture the flag competition.
I reviewed a research paper on detecting phishing websites.
We tested our incident response plan with a tabletop exercise.
The newsletter describes common scams and how to avoid them.
My project visualizes traffic data using machine learning.
We are organising a workshop on secure software development.
The security awareness presentation covers stolen password prevention.
I am studying for a network certification and practising in a lab.
Our team announced a scheduled update to the company website.
The developer fixed a bug and added tests to the application.
An educational example shows why confidential documents need protection.
We published tips to avoid fake login pages and protect your account.
The help desk reminds everyone to enable multi factor authentication.'''.splitlines()
STOP = set('a an and are as at be been by for from has have i in into is it its of on or our that the their this to was we were with your you'.split())
def tokens(text):
 return [t for t in re.findall(r'[a-z0-9]+',text.lower()) if len(t)>2 and t not in STOP]
counts=[collections.Counter(),collections.Counter()]
for label,rows in enumerate([ROUTINE,REVIEW]):
 for text in rows: counts[label].update(tokens(text))
vocabulary=sorted(set(counts[0])|set(counts[1]))
totals=[sum(c.values())+len(vocabulary) for c in counts]
weights={t:round(math.log((counts[1][t]+1)/totals[1])-math.log((counts[0][t]+1)/totals[0]),6) for t in vocabulary}
model={'version':'portfolio-nb-1','algorithm':'Multinomial Naive Bayes','trainingExamples':len(REVIEW)+len(ROUTINE),'synthetic':True,'stopwords':sorted(STOP),'weights':weights,'bias':0,'temperature':3}
base=Path(__file__).resolve().parent
out=Path(sys.argv[1]) if len(sys.argv)>1 else base.parent/'dist/signal-model.js'
out.write_text('// Educational model trained on synthetic examples. See train-signal.py.\nwindow.SIGNAL_MODEL = '+json.dumps(model,separators=(',',':'))+';\n')
print(f'Trained {len(vocabulary)} word weights on {model["trainingExamples"]} synthetic examples.')
