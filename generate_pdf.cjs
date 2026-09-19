const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 50 });

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

const outPath = path.join(publicDir, 'Ravi_Vishnoi_CV.pdf');
doc.pipe(fs.createWriteStream(outPath));

// Header
doc.fontSize(24).font('Helvetica-Bold').text('Ravi Vishnoi', { align: 'center' });
doc.fontSize(12).font('Helvetica').text('IT Security & Network Security Consultant', { align: 'center' });
doc.moveDown();
doc.fontSize(10).text('Address: Jaipur, Rajasthan | Mobile: +91-7240723262 | Email: ravivishnoi57@gmail.com', { align: 'center' });
doc.moveDown(2);

// Profile
doc.fontSize(14).font('Helvetica-Bold').text('PROFILE');
doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown();
doc.fontSize(10).font('Helvetica').text(
  'IT Security & Network Security Consultant with 3+ years of experience across Cyber Security, IT Support, Web Development and ERP Support. Skilled in Vulnerability Assessment and Penetration Testing (VAPT), firewall policy verification, user access management, endpoint security monitoring and network security operations, with hands-on use of tools such as Nmap, Nessus and Metasploit. Committed to delivering secure, efficient, and reliable IT and network security solutions through continuous learning.',
  { align: 'justify' }
);
doc.moveDown(2);

// Experience
doc.fontSize(14).font('Helvetica-Bold').text('WORK EXPERIENCE');
doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown();

const exp = [
  {
    title: 'IT Security & Network Security Consultant',
    company: 'JECRC University',
    date: 'JAN 2025 - Present',
    desc: [
      'Developed and maintained web applications and internal ERP portals.',
      'Provided ERP support and user training.',
      'Assisted with Internal Vulnerability Assessment and Penetration Testing (VAPT) using Nessus and Nmap.',
      'Supported firewall policy verification, user access management, and network security operations.',
      'Monitored endpoint security and system logs.'
    ]
  },
  {
    title: 'Cyber Security Trainer',
    company: 'CADD Centre Training Services',
    date: 'July 2024 - Aug 2024',
    desc: [
      'Delivered Cyber Security training at R-CAT Jaipur.',
      'Developed customized course material and assessments.'
    ]
  },
  {
    title: 'Digital Forensic Investigator (Remote)',
    company: 'TrojanByte Labs Private Limited',
    date: 'Dec 2023 - June 2024',
    desc: [
      'Hands-on experience with hardware devices such as Tableau, Falcon-NEO2, etc.',
      'Recovering deleted data from hard drives, pendrives, and other storage media.'
    ]
  },
  {
    title: 'Software Executive under PMKVY',
    company: 'Softech Multi Services',
    date: 'March 2022 - Aug 2022',
    desc: [
      'Provided technical and customer support services, collaborated with team members.',
      'Supporting daily operations and client requirements.'
    ]
  }
];

exp.forEach(e => {
  doc.fontSize(12).font('Helvetica-Bold').text(e.title);
  doc.fontSize(10).font('Helvetica-Oblique').text(`${e.company} | ${e.date}`);
  doc.moveDown(0.5);
  e.desc.forEach(item => {
    doc.fontSize(10).font('Helvetica').text(`- ${item}`, { indent: 15 });
  });
  doc.moveDown();
});

// Education
doc.fontSize(14).font('Helvetica-Bold').text('EDUCATION');
doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown();
doc.fontSize(12).font('Helvetica-Bold').text('Master of Computer Applications (Cyber Security)');
doc.fontSize(10).font('Helvetica').text('JECRC University | 2022 - 2024');
doc.moveDown();
doc.fontSize(12).font('Helvetica-Bold').text('Bachelor of Computer Applications');
doc.fontSize(10).font('Helvetica').text('Aishwarya College of Education | 2018 - 2021');
doc.moveDown(2);

// Skills
doc.fontSize(14).font('Helvetica-Bold').text('SKILLS & STRENGTHS');
doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown();

const skills = [
  { category: 'LANGUAGES', items: 'Hindi, English' },
  { category: 'DIGITAL FORENSIC TOOLS', items: 'Cellebrite UFED, MSAB XRY, EnCase, Autopsy, FTK Imager, Oxygen Forensics, DVR Examiner' },
  { category: 'CYBERSECURITY TOOLS', items: 'Nmap, Nessus, Metasploit' },
  { category: 'PROGRAMMING LANGUAGES', items: 'PHP, HTML5, CSS3, JS, SQL' },
  { category: 'STRENGTHS', items: 'Quick Learner, Practical Problem Solving, Team Management, Critical Thinking, Leadership, Communication Skills' }
];

skills.forEach(s => {
  doc.fontSize(10).font('Helvetica-Bold').text(`${s.category}: `, { continued: true })
     .font('Helvetica').text(s.items);
  doc.moveDown(0.5);
});
doc.moveDown(1.5);

// Certifications
doc.fontSize(14).font('Helvetica-Bold').text('CERTIFICATIONS');
doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown();
const certs = [
  'Certified Ethical Hacker Master (CEH Master) EC-Council',
  'Certified Ethical Hacker (CEHv12) Practical EC-Council',
  'Certified Ethical Hacker (CEHv12) Theory EC-Council',
  'Certified Network Defender (CNDv2) EC-Council'
];
certs.forEach(c => doc.fontSize(10).font('Helvetica').text(`- ${c}`, { indent: 15 }));

doc.end();
console.log('PDF generated successfully!');
