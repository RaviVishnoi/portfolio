export interface Question {
  id: number;
  category: 'Cyber Security' | 'Web Development';
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  question: string;
  options: string[];
  correctAnswer: string;
}

export const allQuestions: Question[] = [
  // --- CYBER SECURITY (25 Questions) ---
  {
    id: 1,
    category: 'Cyber Security',
    difficulty: 'Easy',
    question: 'Which tool is primarily used for network discovery and security auditing?',
    options: ['Nessus', 'Nmap', 'Burp Suite', 'Wireshark'],
    correctAnswer: 'Nmap'
  },
  {
    id: 2,
    category: 'Cyber Security',
    difficulty: 'Medium',
    question: 'What is the primary purpose of a Vulnerability Assessment and Penetration Test (VAPT)?',
    options: ['To monitor network traffic', 'To identify and exploit security weaknesses', 'To configure firewalls', 'To backup sensitive data'],
    correctAnswer: 'To identify and exploit security weaknesses'
  },
  {
    id: 3,
    category: 'Cyber Security',
    difficulty: 'Easy',
    question: 'What does XSS stand for in web security?',
    options: ['Cross-Site Scripting', 'Cross-System Security', 'Extended Secure System', 'Cross Server Scan'],
    correctAnswer: 'Cross-Site Scripting'
  },
  {
    id: 4,
    category: 'Cyber Security',
    difficulty: 'Advanced',
    question: 'Which of the following is an effective mitigation against Cross-Site Request Forgery (CSRF)?',
    options: ['Input validation', 'Anti-CSRF Tokens', 'Using HTTPS only', 'Disabling JavaScript'],
    correctAnswer: 'Anti-CSRF Tokens'
  },
  {
    id: 5,
    category: 'Cyber Security',
    difficulty: 'Medium',
    question: 'In Digital Forensics, what is the purpose of maintaining a "Chain of Custody"?',
    options: ['To encrypt evidence', 'To document the handling and state of evidence', 'To backup files to the cloud', 'To analyze network packets'],
    correctAnswer: 'To document the handling and state of evidence'
  },
  {
    id: 6,
    category: 'Cyber Security',
    difficulty: 'Medium',
    question: 'Which port is commonly used for secure shell (SSH) access?',
    options: ['Port 21', 'Port 22', 'Port 80', 'Port 443'],
    correctAnswer: 'Port 22'
  },
  {
    id: 7,
    category: 'Cyber Security',
    difficulty: 'Easy',
    question: 'What does the CIA triad stand for in information security?',
    options: ['Confidentiality, Integrity, Availability', 'Control, Identity, Access', 'Cyber, Intelligence, Analytics', 'Compliance, Isolation, Auditing'],
    correctAnswer: 'Confidentiality, Integrity, Availability'
  },
  {
    id: 8,
    category: 'Cyber Security',
    difficulty: 'Medium',
    question: 'Which attack involves injecting malicious SQL statements into entry fields?',
    options: ['XSS', 'CSRF', 'SQL Injection', 'Man-in-the-Middle'],
    correctAnswer: 'SQL Injection'
  },
  {
    id: 9,
    category: 'Cyber Security',
    difficulty: 'Advanced',
    question: 'What is the primary function of a SIEM system?',
    options: ['To scan for vulnerabilities', 'To provide real-time analysis of security alerts', 'To block DDoS attacks automatically', 'To encrypt database passwords'],
    correctAnswer: 'To provide real-time analysis of security alerts'
  },
  {
    id: 10,
    category: 'Cyber Security',
    difficulty: 'Medium',
    question: 'What type of firewall inspects the state and context of active connections?',
    options: ['Packet-filtering', 'Proxy firewall', 'Stateful inspection', 'Next-Generation Firewall (NGFW)'],
    correctAnswer: 'Stateful inspection'
  },
  {
    id: 11,
    category: 'Cyber Security',
    difficulty: 'Medium',
    question: 'Which organization provides the Top 10 most critical web application security risks?',
    options: ['NIST', 'OWASP', 'SANS', 'ISO'],
    correctAnswer: 'OWASP'
  },
  {
    id: 12,
    category: 'Cyber Security',
    difficulty: 'Advanced',
    question: 'In networking, what is a "DMZ" (Demilitarized Zone) used for?',
    options: ['To isolate internal networks from external untrusted networks', 'To permanently ban malicious IP addresses', 'To speed up DNS resolution', 'To encrypt internal communications'],
    correctAnswer: 'To isolate internal networks from external untrusted networks'
  },
  {
    id: 13,
    category: 'Cyber Security',
    difficulty: 'Easy',
    question: 'What is "Phishing"?',
    options: ['A type of malware', 'Deceptive attempts to obtain sensitive information', 'Scanning a network for open ports', 'Encrypting files for ransom'],
    correctAnswer: 'Deceptive attempts to obtain sensitive information'
  },
  {
    id: 14,
    category: 'Cyber Security',
    difficulty: 'Medium',
    question: 'Which tool is primarily known as a comprehensive vulnerability scanner?',
    options: ['Wireshark', 'Metasploit', 'Nessus', 'Autopsy'],
    correctAnswer: 'Nessus'
  },
  {
    id: 15,
    category: 'Cyber Security',
    difficulty: 'Medium',
    question: 'What is the principle of "Least Privilege"?',
    options: ['Giving users maximum access by default', 'Giving users only the access rights necessary to perform their job', 'Logging all administrative actions', 'Isolating all servers from the internet'],
    correctAnswer: 'Giving users only the access rights necessary to perform their job'
  },
  {
    id: 16,
    category: 'Cyber Security',
    difficulty: 'Advanced',
    question: 'What does a "Salting" do when hashing passwords?',
    options: ['Encrypts the hash symmetrically', 'Compresses the password length', 'Adds random data to the password before hashing', 'Reverses the hash back to plain text'],
    correctAnswer: 'Adds random data to the password before hashing'
  },
  {
    id: 17,
    category: 'Cyber Security',
    difficulty: 'Medium',
    question: 'Which protocol is responsible for resolving IP addresses to MAC addresses?',
    options: ['DNS', 'ARP', 'DHCP', 'ICMP'],
    correctAnswer: 'ARP'
  },
  {
    id: 18,
    category: 'Cyber Security',
    difficulty: 'Medium',
    question: 'In Digital Forensics, what is "Slack Space"?',
    options: ['Unused memory in RAM', 'The empty space between the end of a file and the end of the cluster', 'Hidden partitions on a hard drive', 'Deleted logs in the event viewer'],
    correctAnswer: 'The empty space between the end of a file and the end of the cluster'
  },
  {
    id: 19,
    category: 'Cyber Security',
    difficulty: 'Easy',
    question: 'What is the main difference between HTTP and HTTPS?',
    options: ['HTTPS is faster', 'HTTPS uses encryption (SSL/TLS)', 'HTTP is used only for internal networks', 'HTTPS uses UDP instead of TCP'],
    correctAnswer: 'HTTPS uses encryption (SSL/TLS)'
  },
  {
    id: 20,
    category: 'Cyber Security',
    difficulty: 'Advanced',
    question: 'What type of attack is "Pass-the-Hash"?',
    options: ['Brute-forcing a hashed password', 'Using an extracted password hash to authenticate without knowing the plaintext', 'Intercepting a hash over an unencrypted network', 'Creating a collision in the MD5 algorithm'],
    correctAnswer: 'Using an extracted password hash to authenticate without knowing the plaintext'
  },
  {
    id: 21,
    category: 'Cyber Security',
    difficulty: 'Medium',
    question: 'What is the primary function of an IDS (Intrusion Detection System)?',
    options: ['To actively block malicious traffic', 'To monitor network traffic for suspicious activity and generate alerts', 'To encrypt incoming connections', 'To balance network load across servers'],
    correctAnswer: 'To monitor network traffic for suspicious activity and generate alerts'
  },
  {
    id: 22,
    category: 'Cyber Security',
    difficulty: 'Advanced',
    question: 'Which technique is often used to bypass Web Application Firewalls (WAF)?',
    options: ['Port scanning', 'Payload encoding (e.g., URL encoding)', 'ARP spoofing', 'DNS rebinding'],
    correctAnswer: 'Payload encoding (e.g., URL encoding)'
  },
  {
    id: 23,
    category: 'Cyber Security',
    difficulty: 'Easy',
    question: 'What does "Authentication" verify?',
    options: ['What the user is allowed to do', 'Who the user is', 'The integrity of the data', 'The speed of the network'],
    correctAnswer: 'Who the user is'
  },
  {
    id: 24,
    category: 'Cyber Security',
    difficulty: 'Medium',
    question: 'Which of the following is a common symptom of a DDoS attack?',
    options: ['Unauthorized file modification', 'Sudden influx of traffic causing service unavailability', 'Unexplained new administrator accounts', 'Data exfiltration to external IPs'],
    correctAnswer: 'Sudden influx of traffic causing service unavailability'
  },
  {
    id: 25,
    category: 'Cyber Security',
    difficulty: 'Advanced',
    question: 'In penetration testing, what is "Pivoting"?',
    options: ['Changing testing tools mid-assessment', 'Using a compromised system to attack other systems on the same network', 'Escalating privileges to root', 'Creating a persistent backdoor'],
    correctAnswer: 'Using a compromised system to attack other systems on the same network'
  },

  // --- WEB DEVELOPMENT (25 Questions) ---
  {
    id: 26,
    category: 'Web Development',
    difficulty: 'Easy',
    question: 'Which technology is primarily used to create web page structure?',
    options: ['HTML', 'Node.js', 'CSS', 'JavaScript'],
    correctAnswer: 'HTML'
  },
  {
    id: 27,
    category: 'Web Development',
    difficulty: 'Easy',
    question: 'Which HTTP method is commonly used to retrieve data from a server?',
    options: ['POST', 'GET', 'DELETE', 'PATCH'],
    correctAnswer: 'GET'
  },
  {
    id: 28,
    category: 'Web Development',
    difficulty: 'Medium',
    question: 'In React, what hook is used to manage local component state?',
    options: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correctAnswer: 'useState'
  },
  {
    id: 29,
    category: 'Web Development',
    difficulty: 'Easy',
    question: 'Which database is a widely-used relational database often paired with PHP?',
    options: ['MongoDB', 'Redis', 'MySQL', 'Neo4j'],
    correctAnswer: 'MySQL'
  },
  {
    id: 30,
    category: 'Web Development',
    difficulty: 'Medium',
    question: 'What does REST stand for in web APIs?',
    options: ['Remote Execute System Transfer', 'Representational State Transfer', 'Responsive Environment Software Tool', 'React Express Server Technology'],
    correctAnswer: 'Representational State Transfer'
  },
  {
    id: 31,
    category: 'Web Development',
    difficulty: 'Medium',
    question: 'Which Node.js framework is most commonly used for building web servers and APIs?',
    options: ['React', 'Express.js', 'Vue.js', 'Angular'],
    correctAnswer: 'Express.js'
  },
  {
    id: 32,
    category: 'Web Development',
    difficulty: 'Advanced',
    question: 'What is the purpose of the virtual DOM in React?',
    options: ['To bypass browser security', 'To directly mutate the actual DOM immediately', 'To optimize rendering by minimizing direct DOM manipulation', 'To store user session data'],
    correctAnswer: 'To optimize rendering by minimizing direct DOM manipulation'
  },
  {
    id: 33,
    category: 'Web Development',
    difficulty: 'Medium',
    question: 'In CSS, which layout system is best suited for 1-dimensional layouts (rows or columns)?',
    options: ['CSS Grid', 'Flexbox', 'Floats', 'Absolute Positioning'],
    correctAnswer: 'Flexbox'
  },
  {
    id: 34,
    category: 'Web Development',
    difficulty: 'Easy',
    question: 'What is Git primarily used for?',
    options: ['Hosting websites', 'Version control', 'Database management', 'Creating UI components'],
    correctAnswer: 'Version control'
  },
  {
    id: 35,
    category: 'Web Development',
    difficulty: 'Advanced',
    question: 'In JavaScript, what does the "Event Loop" do?',
    options: ['Handles memory garbage collection', 'Executes code, collects events, and executes queued sub-tasks', 'Encrypts user passwords', 'Styles the webpage dynamically'],
    correctAnswer: 'Executes code, collects events, and executes queued sub-tasks'
  },
  {
    id: 36,
    category: 'Web Development',
    difficulty: 'Medium',
    question: 'Which of the following is used to handle asynchronous operations in modern JavaScript?',
    options: ['Promises and async/await', 'While loops', 'Strict Mode', 'var declarations'],
    correctAnswer: 'Promises and async/await'
  },
  {
    id: 37,
    category: 'Web Development',
    difficulty: 'Advanced',
    question: 'What is a JWT (JSON Web Token) typically used for?',
    options: ['Styling web pages', 'Stateless authentication and secure information exchange', 'Compressing large images', 'Database indexing'],
    correctAnswer: 'Stateless authentication and secure information exchange'
  },
  {
    id: 38,
    category: 'Web Development',
    difficulty: 'Medium',
    question: 'In PHP, which superglobal array is used to collect form data sent via the POST method?',
    options: ['$_GET', '$_SESSION', '$_POST', '$_REQUEST'],
    correctAnswer: '$_POST'
  },
  {
    id: 39,
    category: 'Web Development',
    difficulty: 'Medium',
    question: 'What does CORS stand for?',
    options: ['Cross-Origin Resource Sharing', 'Cascading Object Rendering System', 'Centralized Open Repository Store', 'Code Optimization and Refactoring Service'],
    correctAnswer: 'Cross-Origin Resource Sharing'
  },
  {
    id: 40,
    category: 'Web Development',
    difficulty: 'Easy',
    question: 'Which HTML tag is used to create a hyperlink?',
    options: ['<link>', '<a>', '<href>', '<url>'],
    correctAnswer: '<a>'
  },
  {
    id: 41,
    category: 'Web Development',
    difficulty: 'Medium',
    question: 'Which of the following commands initializes a new Git repository?',
    options: ['git commit', 'git pull', 'git init', 'git clone'],
    correctAnswer: 'git init'
  },
  {
    id: 42,
    category: 'Web Development',
    difficulty: 'Advanced',
    question: 'What is the primary benefit of Server-Side Rendering (SSR) over Client-Side Rendering (CSR)?',
    options: ['Lower server costs', 'Improved SEO and faster initial page load', 'Offline capabilities', 'Easier state management'],
    correctAnswer: 'Improved SEO and faster initial page load'
  },
  {
    id: 43,
    category: 'Web Development',
    difficulty: 'Easy',
    question: 'What does CSS stand for?',
    options: ['Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'],
    correctAnswer: 'Cascading Style Sheets'
  },
  {
    id: 44,
    category: 'Web Development',
    difficulty: 'Medium',
    question: 'In relational databases like MySQL, what is a "Foreign Key"?',
    options: ['A key used to encrypt the database', 'A unique identifier for a single record', 'A field that uniquely identifies a row in another table', 'The primary password for the DBA'],
    correctAnswer: 'A field that uniquely identifies a row in another table'
  },
  {
    id: 45,
    category: 'Web Development',
    difficulty: 'Medium',
    question: 'What is the purpose of the `useEffect` hook in React?',
    options: ['To create variables', 'To perform side effects in function components', 'To define CSS styles', 'To handle routing'],
    correctAnswer: 'To perform side effects in function components'
  },
  {
    id: 46,
    category: 'Web Development',
    difficulty: 'Advanced',
    question: 'Which of the following best describes "Middleware" in Express.js?',
    options: ['The database engine', 'Functions that have access to the request and response objects', 'The frontend UI framework', 'The deployment server'],
    correctAnswer: 'Functions that have access to the request and response objects'
  },
  {
    id: 47,
    category: 'Web Development',
    difficulty: 'Medium',
    question: 'How do you create a responsive design that adapts to different screen sizes?',
    options: ['By using media queries in CSS', 'By writing separate HTML files', 'By using only JavaScript', 'By setting fixed pixel widths'],
    correctAnswer: 'By using media queries in CSS'
  },
  {
    id: 48,
    category: 'Web Development',
    difficulty: 'Easy',
    question: 'Which JavaScript method is used to convert a JSON string into a JavaScript object?',
    options: ['JSON.stringify()', 'JSON.parse()', 'JSON.toObject()', 'JSON.read()'],
    correctAnswer: 'JSON.parse()'
  },
  {
    id: 49,
    category: 'Web Development',
    difficulty: 'Medium',
    question: 'In Node.js, what is "npm"?',
    options: ['Node Processor Memory', 'Node Package Manager', 'Network Protocol Module', 'New Project Maker'],
    correctAnswer: 'Node Package Manager'
  },
  {
    id: 50,
    category: 'Web Development',
    difficulty: 'Advanced',
    question: 'What is a "Closure" in JavaScript?',
    options: ['A function that executes immediately', 'The process of minifying code', 'A function bundled together with references to its surrounding state', 'A way to close database connections'],
    correctAnswer: 'A function bundled together with references to its surrounding state'
  }
];

// Utility to shuffle an array (Fisher-Yates)
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Helper to get 5 mixed random questions with randomized options
export function getRandomQuestionSet(): Question[] {
  const cyber = allQuestions.filter(q => q.category === 'Cyber Security');
  const web = allQuestions.filter(q => q.category === 'Web Development');

  // Randomize the distribution (e.g., 3/2, 2/3, 4/1, 1/4)
  // To keep it balanced but random, we pick a number of cyber questions between 1 and 4
  const numCyber = Math.floor(Math.random() * 4) + 1;
  const numWeb = 5 - numCyber;

  const shuffledCyber = shuffleArray(cyber).slice(0, numCyber);
  const shuffledWeb = shuffleArray(web).slice(0, numWeb);

  const mixedSet = shuffleArray([...shuffledCyber, ...shuffledWeb]);

  // Randomize the options for each selected question
  return mixedSet.map(q => ({
    ...q,
    options: shuffleArray(q.options)
  }));
}
