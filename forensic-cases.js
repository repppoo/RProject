// Case content adapted from Arif's supplied Game_Forensic project.
window.FORENSIC_CASES = [
  {
    "id": "INC-001",
    "title": "Suspicious VPN Activity",
    "difficulty": "Easy",
    "category": "Account Compromise",
    "briefing": "The SOC received an alert that a user account was active during unusual hours.\n\nUser: alice.m\nNormal hours: 09:00 – 18:00\nAlert window: Saturday 02:00 – 03:00\n\nYou have VPN logs and a short firewall snippet. Determine if this is malicious and where it came from.",
    "evidence": "[VPN LOG SNIPPET]\n\n2025-11-08 02:13:22  LOGIN SUCCESS  user=alice.m  ip=203.0.113.42\n2025-11-08 02:44:02  LOGOUT         user=alice.m  ip=203.0.113.42\n\n[FW OUTBOUND SUMMARY]\n02:20  alice.m -> 198.51.100.10:443 (cloud-storage.example)\n02:21  alice.m -> 198.51.100.10:443 (cloud-storage.example)\n02:22  alice.m -> 198.51.100.10:443 (cloud-storage.example)",
    "questions": [
      {
        "id": "q1",
        "prompt": "From which public IP address did Alice connect?",
        "hint": "Look at the VPN LOGIN line.",
        "answer": "203.0.113.42"
      },
      {
        "id": "q2",
        "prompt": "Which external service did Alice access? (hostname only)",
        "hint": "Check the firewall summary hostname.",
        "answer": "cloud-storage.example"
      },
      {
        "id": "q3",
        "prompt": "Is this activity <yes/no> likely suspicious based only on time-of-day?",
        "hint": "Weekend 2AM access vs normal office hours.",
        "answer": "yes"
      },
      {
        "id": "q4",
        "prompt": "Which protocol/port was used to reach the external service? (e.g. https/443)",
        "hint": "Look at the dst port column.",
        "answer": "https/443"
      },
      {
        "id": "q5",
        "prompt": "On which day of the week did this login occur? (e.g. Saturday)",
        "hint": "Check the alert window description.",
        "answer": "Saturday"
      },
      {
        "id": "q6",
        "prompt": "How long (in minutes) did Alice's VPN session last? (just a number)",
        "hint": "Compare LOGIN and LOGOUT timestamps.",
        "answer": "31"
      }
    ]
  },
  {
    "id": "INC-002",
    "title": "BlackCrypt on the File Server",
    "difficulty": "Medium",
    "category": "Ransomware",
    "briefing": "Files on FILE-SRV-01 were suddenly renamed with a .blackcrypt extension.\nRansom notes were created in all share folders.\n\nYou have a short timeline built by another analyst. Use it to identify\npatient zero, the command-and-control (C2) domain, and the initial vector.",
    "evidence": "[TIMELINE]\n\n2025-10-21 09:14  User samir.k receives \"Updated_Bonus_Structure.xlsm\"\n2025-10-21 09:16  User opens attachment and enables macros\n2025-10-21 09:18  HTTP POST from WKST-SAMIR to blackcrypt.cc/loader\n2025-10-21 09:19  First .blackcrypt files appear on WKST-SAMIR\n2025-10-21 09:23  Remote admin logon from WKST-SAMIR -> FILE-SRV-01\n2025-10-21 09:24  .blackcrypt files detected on FILE-SRV-01",
    "questions": [
      {
        "id": "q1",
        "prompt": "Which workstation is patient zero? (exact hostname)",
        "hint": "Which endpoint first showed .blackcrypt files?",
        "answer": "WKST-SAMIR"
      },
      {
        "id": "q2",
        "prompt": "What is the ransomware C2 domain? (just the domain)",
        "hint": "Look at the HTTP POST line.",
        "answer": "blackcrypt.cc"
      },
      {
        "id": "q3",
        "prompt": "What was the initial access vector? (one word, e.g. phishing)",
        "hint": "How did the user first get the malicious macro?",
        "answer": "phishing"
      },
      {
        "id": "q4",
        "prompt": "Which server was encrypted after the pivot? (hostname)",
        "hint": "Check which host shows .blackcrypt after remote logon.",
        "answer": "FILE-SRV-01"
      },
      {
        "id": "q5",
        "prompt": "Which user received the malicious attachment? (username only, e.g. samir.k)",
        "hint": "Look at the first timeline entry.",
        "answer": "samir.k"
      },
      {
        "id": "q6",
        "prompt": "At what time were .blackcrypt files first detected on FILE-SRV-01? (HH:MM, 24h)",
        "hint": "Look at the last line of the timeline.",
        "answer": "09:24"
      }
    ]
  },
  {
    "id": "INC-003",
    "title": "Persistence Check",
    "difficulty": "Hard",
    "category": "Host Forensics",
    "briefing": "You cleaned malware from a workstation, but the user reports that\nmalicious pop-ups returned after reboot.\n\nYou grabbed this registry export. Identify which line proves the malware\nis configured to persist at user logon.",
    "evidence": "[REGISTRY EXPORT]\n\nWindows Registry Editor Version 5.00\n\n[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run]\n\"Teams\"=\"C:\\Users\\user\\AppData\\Local\\Microsoft\\Teams\\current\\Teams.exe\"\n\"SystemHealthMonitor\"=\"C:\\Users\\user\\AppData\\Roaming\\healthsvc.exe\"\n\n[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce]\n\"Cleanup\"=\"C:\\Windows\\Temp\\cleanup.cmd\"",
    "questions": [
      {
        "id": "q1",
        "prompt": "Which value name shows the malicious persistence? (exact value name)",
        "hint": "It is NOT a normal business app like Teams.",
        "answer": "SystemHealthMonitor"
      },
      {
        "id": "q2",
        "prompt": "Which registry hive is this stored in? (HKCU or HKLM)",
        "hint": "Check the beginning of the key path.",
        "answer": "HKCU"
      },
      {
        "id": "q3",
        "prompt": "Which key path is used for persistence? (just the path under the hive)",
        "hint": "Look for CurrentVersion\\Run.",
        "answer": "Software\\Microsoft\\Windows\\CurrentVersion\\Run"
      },
      {
        "id": "q4",
        "prompt": "Is 'SystemHealthMonitor' a Run or RunOnce entry? (answer: Run or RunOnce)",
        "hint": "Check which section the value is inside.",
        "answer": "Run"
      }
    ]
  },
  {
    "id": "INC-004",
    "title": "Suspicious Web Shell",
    "difficulty": "Hard",
    "category": "Web Forensics",
    "briefing": "A legacy web server suddenly starts generating outbound traffic to unknown\nIPs. The blue team suspects a web shell.\n\nYou have a snippet of the HTTP access log. Identify the web shell file name,\nthe attacker IP, and the HTTP method used to send commands.",
    "evidence": "[APACHE ACCESS LOG]\n\n192.0.2.55  -  -  [12/Oct/2025:03:11:22 +0000]  \"GET /index.php HTTP/1.1\" 200 4123\n192.0.2.55  -  -  [12/Oct/2025:03:12:01 +0000]  \"POST /login.php HTTP/1.1\" 302 512\n203.0.113.99  -  -  [12/Oct/2025:03:19:45 +0000]  \"POST /shell.php HTTP/1.1\" 200 44\n203.0.113.99  -  -  [12/Oct/2025:03:20:02 +0000]  \"POST /shell.php HTTP/1.1\" 200 50\n203.0.113.99  -  -  [12/Oct/2025:03:20:10 +0000]  \"POST /shell.php HTTP/1.1\" 200 52",
    "questions": [
      {
        "id": "q1",
        "prompt": "What is the suspected web shell file name? (include extension)",
        "hint": "Look for a small script hit repeatedly by the attacker.",
        "answer": "shell.php"
      },
      {
        "id": "q2",
        "prompt": "What IP address appears to be controlling the shell?",
        "hint": "Which client IP calls shell.php?",
        "answer": "203.0.113.99"
      },
      {
        "id": "q3",
        "prompt": "Which HTTP method is used to send commands to the shell?",
        "hint": "Check the request verb in those lines.",
        "answer": "POST"
      },
      {
        "id": "q4",
        "prompt": "What is the normal homepage file requested by the user? (e.g. index.php)",
        "hint": "Look at the first log entry for 192.0.2.55.",
        "answer": "index.php"
      }
    ]
  },
  {
    "id": "INC-005",
    "title": "Phishing Email Investigation",
    "difficulty": "Medium",
    "category": "Email Forensics",
    "briefing": "A user reported a suspicious email claiming they won a gift card.\nThey clicked the link but closed the browser quickly.\n\nYou have the header snippet and body excerpt. Identify the true sender\ndomain, the suspicious URL host, and the attack type.",
    "evidence": "[EMAIL HEADERS]\n\nFrom: \"Rewards Center\" <promo@win-prizes.co>\nReply-To: \"Rewards Center\" <reply@win-prizes.co>\nTo: user@example.com\nSubject: CLAIM YOUR RM500 GIFT CARD NOW!!!\nReturn-Path: <bounce@mailer.win-prizes.co>\n\n[EMAIL BODY EXCERPT]\n\nClick here to claim:  http://reward-win-login.example-bad.net/login.php\nPlease login with your company email and password to verify your identity.",
    "questions": [
      {
        "id": "q1",
        "prompt": "What is the sender's domain shown in the From header? (e.g. example.com)",
        "hint": "Look at the email address after @ in the From header.",
        "answer": "win-prizes.co"
      },
      {
        "id": "q2",
        "prompt": "What is the suspicious link hostname in the body? (just the host)",
        "hint": "Ignore http:// and path; take the domain part.",
        "answer": "example-bad.net"
      },
      {
        "id": "q3",
        "prompt": "What kind of attack is this? (one word, e.g. phishing)",
        "hint": "They ask user to enter company credentials on fake page.",
        "answer": "phishing"
      },
      {
        "id": "q4",
        "prompt": "Is this email legitimate? (yes/no)",
        "hint": "Think about the link and request for password.",
        "answer": "no"
      },
      {
        "id": "q5",
        "prompt": "Which header field would help track where bounces go? (e.g. Return-Path)",
        "hint": "Look for the field containing bounce@mailer.win-prizes.co.",
        "answer": "Return-Path"
      }
    ]
  },
  {
    "id": "INC-006",
    "title": "Brute Force on Domain Controller",
    "difficulty": "Medium",
    "category": "Windows Logs",
    "briefing": "The domain controller DC-01 shows multiple failed logons followed by one\nsuccessful logon for the same account from the same IP.\n\nYou have a snippet of the Security event log in text format.",
    "evidence": "[WINDOWS SECURITY LOG SNIPPET]\n\nEventID=4625  Logon failure   TargetUserName=itadmin  IpAddress=10.0.5.50\nEventID=4625  Logon failure   TargetUserName=itadmin  IpAddress=10.0.5.50\nEventID=4625  Logon failure   TargetUserName=itadmin  IpAddress=10.0.5.50\nEventID=4624  Logon success   TargetUserName=itadmin  IpAddress=10.0.5.50",
    "questions": [
      {
        "id": "q1",
        "prompt": "Which account was targeted by the brute force? (username only)",
        "hint": "Check TargetUserName.",
        "answer": "itadmin"
      },
      {
        "id": "q2",
        "prompt": "From which IP address did the brute force come?",
        "hint": "Same IpAddress for all events.",
        "answer": "10.0.5.50"
      },
      {
        "id": "q3",
        "prompt": "What is the Windows event ID for the successful logon?",
        "hint": "Compare failure vs success EventID.",
        "answer": "4624"
      },
      {
        "id": "q4",
        "prompt": "What is the Windows event ID for the failed logons?",
        "hint": "See the first three lines.",
        "answer": "4625"
      }
    ]
  },
  {
    "id": "INC-007",
    "title": "USB Drop Investigation",
    "difficulty": "Medium",
    "category": "File System Forensics",
    "briefing": "Malware was found on a workstation after someone plugged in a USB drive.\n\nYou have a short timeline of file system activity and a USB volume label.\nUse it to identify the USB label, drive letter, and which file was likely executed.",
    "evidence": "[TIMELINE]\n\n2025-09-03 14:02  USB volume 'FREEGIFT' mounted as drive E:\n2025-09-03 14:03  E:\\promo\\prize_list.pdf opened\n2025-09-03 14:04  E:\\promo\\claim_prize.exe executed\n2025-09-03 14:05  C:\\Users\\User\\AppData\\Roaming\\giftupdater.exe created",
    "questions": [
      {
        "id": "q1",
        "prompt": "What is the USB volume label? (exact name)",
        "hint": "Look at the mounted volume name.",
        "answer": "FREEGIFT"
      },
      {
        "id": "q2",
        "prompt": "Which drive letter was assigned to the USB? (just the letter + colon, e.g. E:)",
        "hint": "See the mount line.",
        "answer": "E:"
      },
      {
        "id": "q3",
        "prompt": "Which file on the USB was most likely executed by the user? (full path shown)",
        "hint": "Look for 'executed'.",
        "answer": "E:\\promo\\claim_prize.exe"
      },
      {
        "id": "q4",
        "prompt": "What is the name of the malware file created on the local system? (filename only)",
        "hint": "Check the last line, ignore full path.",
        "answer": "giftupdater.exe"
      }
    ]
  },
  {
    "id": "INC-008",
    "title": "Data Exfil via Proxy",
    "difficulty": "Hard",
    "category": "Network / Proxy Logs",
    "briefing": "A workstation is suspected of exfiltrating data to an external server.\n\nYou have an HTTP proxy log snippet showing outbound connections.\nIdentify which host received the large upload and which user account was used.",
    "evidence": "[PROXY LOG SNIPPET]\n\n2025-08-15 18:01  user=jason.l  dst=docs.internal.example  method=GET   bytes=2048\n2025-08-15 18:05  user=jason.l  dst=backup.internal.example  method=PUT   bytes=4096\n2025-08-15 18:12  user=jason.l  dst=dropbox.badhost.net      method=PUT   bytes=52428800\n2025-08-15 18:13  user=jason.l  dst=dropbox.badhost.net      method=PUT   bytes=104857600",
    "questions": [
      {
        "id": "q1",
        "prompt": "Which username appears in all the suspicious proxy entries? (e.g. jason.l)",
        "hint": "Look at the user field.",
        "answer": "jason.l"
      },
      {
        "id": "q2",
        "prompt": "Which external host received the large uploads? (hostname only)",
        "hint": "Look for the dst with very high bytes.",
        "answer": "dropbox.badhost.net"
      },
      {
        "id": "q3",
        "prompt": "Which HTTP method was used for the data exfiltration uploads?",
        "hint": "Check the method used for the large byte counts.",
        "answer": "PUT"
      },
      {
        "id": "q4",
        "prompt": "Roughly how many megabytes were sent in the last line? (just the number, approximate) Hint: 1 MB ≈ 1,048,576 bytes.",
        "hint": "104,857,600 / 1,048,576 ≈ ?",
        "answer": "100"
      }
    ]
  }
];
