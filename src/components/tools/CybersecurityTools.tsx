import React, { useState, useEffect } from 'react';
import { CopyButton, ToolOutputBlock } from './ToolUIHelpers';
import { RefreshCw, CheckCircle2, AlertCircle, ShieldAlert, KeyRound, Lock, Hash, Binary, Globe, FileCode2, ShieldCheck, Cpu } from 'lucide-react';

/* 1. PASSWORD STRENGTH CHECKER */
export const PasswordStrengthChecker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const calculateScore = (pwd: string) => {
    if (!pwd) return { score: 0, text: 'Empty', color: 'bg-slate-700' };
    let score = 0;
    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 14) score += 20;
    if (/[a-z]/.test(pwd)) score += 15;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 15;

    let text = 'Very Weak';
    let color = 'bg-red-500';
    if (score >= 80) {
      text = 'Very Strong';
      color = 'bg-emerald-500';
    } else if (score >= 60) {
      text = 'Strong';
      color = 'bg-cyan-500';
    } else if (score >= 40) {
      text = 'Medium';
      color = 'bg-amber-500';
    } else if (score >= 20) {
      text = 'Weak';
      color = 'bg-orange-500';
    }
    return { score, text, color };
  };

  const { score, text, color } = calculateScore(password);

  const checks = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'Contains lowercase letter (a-z)', valid: /[a-z]/.test(password) },
    { label: 'Contains uppercase letter (A-Z)', valid: /[A-Z]/.test(password) },
    { label: 'Contains numeric digit (0-9)', valid: /[0-9]/.test(password) },
    { label: 'Contains special symbol (!@#$%^&*)', valid: /[^a-zA-Z0-9]/.test(password) },
    { label: 'Optimal length (14+ characters)', valid: password.length >= 14 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-medium text-theme-muted mb-1.5">Enter Password to Test</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type a password..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors pr-20"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
          <span className="text-theme-muted">Entropy Strength</span>
          <span className={`${score >= 60 ? 'text-emerald-400' : score >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
            {text} ({score}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div className={`h-full transition-all duration-300 ${color}`} style={{ width: `${score}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5">
        {checks.map((chk, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            {chk.valid ? (
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle size={14} className="text-slate-600 shrink-0" />
            )}
            <span className={chk.valid ? 'text-slate-200' : 'text-slate-500'}>{chk.label}</span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-500 italic mt-1">
        * Client-side only. Passwords are never stored, sent across a network, or logged.
      </p>
    </div>
  );
};

/* 2. PASSWORD GENERATOR */
export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const generate = () => {
    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setGeneratedPassword('');
      return;
    }

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars[array[i] % chars.length];
    }
    setGeneratedPassword(pwd);
  };

  useEffect(() => {
    generate();
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  return (
    <div className="flex flex-col gap-4">
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between gap-2">
        <span className="font-mono text-sm sm:text-base text-cyan-400 break-all select-all font-semibold">
          {generatedPassword || 'Select at least one character type'}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <CopyButton text={generatedPassword} />
          <button
            onClick={generate}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Regenerate"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs font-medium text-theme-muted mb-1">
          <span>Password Length: {length}</span>
          <span className="text-cyan-400">{length < 12 ? 'Weak' : length < 16 ? 'Moderate' : 'High Security'}</span>
        </div>
        <input
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-cyan-500 cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={useUpper}
            onChange={(e) => setUseUpper(e.target.checked)}
            className="rounded accent-cyan-500"
          />
          Uppercase (A-Z)
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={useLower}
            onChange={(e) => setUseLower(e.target.checked)}
            className="rounded accent-cyan-500"
          />
          Lowercase (a-z)
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
            className="rounded accent-cyan-500"
          />
          Numbers (0-9)
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
            className="rounded accent-cyan-500"
          />
          Symbols (!@#$...)
        </label>
      </div>
    </div>
  );
};

/* 3. HASH GENERATOR & IDENTIFIER */
export const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('CyberSecurity_RaviVishnoi');
  const [hashes, setHashes] = useState<{ [key: string]: string }>({});
  const [lookupHash, setLookupHash] = useState('');
  const [identifiedType, setIdentifiedType] = useState<string>('');

  const computeHashes = async (str: string) => {
    if (!str) {
      setHashes({});
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(str);

    const calc = async (algo: string) => {
      const buffer = await crypto.subtle.digest(algo, data);
      return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    };

    try {
      const sha1 = await calc('SHA-1');
      const sha256 = await calc('SHA-256');
      const sha384 = await calc('SHA-384');
      const sha512 = await calc('SHA-512');
      setHashes({
        'SHA-256': sha256,
        'SHA-512': sha512,
        'SHA-1': sha1,
        'SHA-384': sha384,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    computeHashes(input);
  }, [input]);

  const identifyHash = (val: string) => {
    const cleaned = val.trim();
    if (!cleaned) {
      setIdentifiedType('');
      return;
    }
    const len = cleaned.length;
    const isHex = /^[0-9a-fA-F]+$/.test(cleaned);

    if (!isHex) {
      if (cleaned.startsWith('$2a$') || cleaned.startsWith('$2b$') || cleaned.startsWith('$2y$')) {
        setIdentifiedType('Bcrypt Hash (60 chars, Blowfish crypt)');
        return;
      }
      setIdentifiedType('Unknown format (non-hex characters detected)');
      return;
    }

    switch (len) {
      case 32:
        setIdentifiedType('MD5 / NTLM / MD4 (128-bit)');
        break;
      case 40:
        setIdentifiedType('SHA-1 / RIPEMD-160 (160-bit)');
        break;
      case 64:
        setIdentifiedType('SHA-256 / SHA3-256 / BLAKE2s / Haval-256 (256-bit)');
        break;
      case 96:
        setIdentifiedType('SHA-384 / SHA3-384 (384-bit)');
        break;
      case 128:
        setIdentifiedType('SHA-512 / SHA3-512 / Whirlpool / BLAKE2b (512-bit)');
        break;
      default:
        setIdentifiedType(`Custom length (${len} hex characters)`);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="block text-xs font-medium text-theme-muted mb-1.5">Input Text to Hash</label>
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter plain text..."
          className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        {Object.entries(hashes).map(([algo, h]) => (
          <ToolOutputBlock key={algo} title={algo} value={h} />
        ))}
      </div>

      <div className="pt-3 border-t border-white/10">
        <label className="block text-xs font-semibold text-cyan-400 mb-1">Hash Identifier Utility</label>
        <input
          type="text"
          value={lookupHash}
          onChange={(e) => {
            setLookupHash(e.target.value);
            identifyHash(e.target.value);
          }}
          placeholder="Paste hash to identify algorithm (e.g. 5d41402abc4b2a76b9719d911017c592)..."
          className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
        />
        {identifiedType && (
          <div className="mt-2 p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-300 font-medium">
            Probable Type: <span className="font-semibold text-white">{identifiedType}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* 4. BASE64 ENCODER / DECODER */
export const Base64Tool: React.FC = () => {
  const [text, setText] = useState('Cyber Security & Network Defense Portfolio');
  const [encoded, setEncoded] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setError('');
      // UTF-8 safe btoa
      const enc = btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
      setEncoded(enc);
    } catch (e: any) {
      setError(e.message);
    }
  }, [text]);

  const handleDecodeInput = (val: string) => {
    setEncoded(val);
    try {
      setError('');
      const dec = decodeURIComponent(Array.prototype.map.call(atob(val), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      setText(dec);
    } catch {
      setError('Invalid Base64 sequence');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between items-center text-xs font-medium text-theme-muted mb-1.5">
          <span>Plaintext (UTF-8)</span>
          <CopyButton text={text} label="Copy Text" />
        </div>
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter plain text..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <div className="flex justify-between items-center text-xs font-medium text-theme-muted mb-1.5">
          <span>Base64 Output / Input</span>
          <CopyButton text={encoded} label="Copy Base64" />
        </div>
        <textarea
          rows={3}
          value={encoded}
          onChange={(e) => handleDecodeInput(e.target.value)}
          placeholder="Enter Base64 to decode..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {error && (
        <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};

/* 5. URL ENCODER / DECODER */
export const URLEncodeDecode: React.FC = () => {
  const [input, setInput] = useState('https://portfolio.security.local/vapt?query=user audit&filter=admin#dashboard');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setError('');
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setError('Malformed URI sequence');
    }
  }, [input, mode]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode('encode')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            mode === 'encode' ? 'bg-cyan-500 text-slate-900 border-cyan-400 font-bold' : 'glass-card text-theme-muted'
          }`}
        >
          Encode URI Component
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            mode === 'decode' ? 'bg-cyan-500 text-slate-900 border-cyan-400 font-bold' : 'glass-card text-theme-muted'
          }`}
        >
          Decode URI Component
        </button>
      </div>

      <div>
        <label className="block text-xs font-medium text-theme-muted mb-1.5">Input String</label>
        <textarea
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {error ? (
        <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-400">
          {error}
        </div>
      ) : (
        <ToolOutputBlock title="Processed Result" value={output} />
      )}
    </div>
  );
};

/* 6. JWT DECODER */
export const JWTDecoder: React.FC = () => {
  const sampleJWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJhdmkgVmlzaG5vaSIsInJvbGUiOiJTZWN1cml0eSBDb25zdWx0YW50IiwiZXhwIjoxNzk4NzU1MjAwLCJpYXQiOjE1MTYyMzkwMjJ9.4z_p8H0J6c9vYyBf3_z_m9Z2xWpX8q_v1r_k3v1r_k3';

  const [token, setToken] = useState(sampleJWT);
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  const parseJWT = (jwt: string) => {
    try {
      setError('');
      const parts = jwt.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('JWT must have exactly 3 parts separated by dots (header.payload.signature)');
      }

      const decodePart = (b64: string) => {
        let str = b64.replace(/-/g, '+').replace(/_/g, '/');
        while (str.length % 4) str += '=';
        return JSON.parse(decodeURIComponent(escape(atob(str))));
      };

      setHeader(JSON.stringify(decodePart(parts[0]), null, 2));
      setPayload(JSON.stringify(decodePart(parts[1]), null, 2));
      setSignature(parts[2]);
    } catch (e: any) {
      setError(e.message || 'Invalid JWT token');
      setHeader('');
      setPayload('');
      setSignature('');
    }
  };

  useEffect(() => {
    parseJWT(token);
  }, [token]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-medium text-theme-muted mb-1.5">Paste JWT Token</label>
        <textarea
          rows={3}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste encoded eyJ... token here"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {error ? (
        <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-400">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-rose-400 mb-1">
              <span>HEADER: ALGORITHM & TOKEN TYPE</span>
              <CopyButton text={header} />
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 border border-rose-500/20 text-xs font-mono text-rose-300 overflow-x-auto max-h-48">
              {header}
            </pre>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-purple-400 mb-1">
              <span>PAYLOAD: DATA / CLAIMS</span>
              <CopyButton text={payload} />
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 border border-purple-500/20 text-xs font-mono text-purple-300 overflow-x-auto max-h-48">
              {payload}
            </pre>
          </div>
        </div>
      )}

      {signature && (
        <div>
          <span className="block text-xs font-semibold text-cyan-400 mb-1">SIGNATURE</span>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-500/20 font-mono text-xs text-slate-400 break-all">
            {signature}
          </div>
        </div>
      )}
    </div>
  );
};

/* 7. HTTP SECURITY HEADERS AUDITOR / CHECKLIST */
export const SecurityHeadersAuditor: React.FC = () => {
  const [headersInput, setHeadersInput] = useState(
`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=()`
  );

  const securityBestPractices = [
    { name: 'Strict-Transport-Security (HSTS)', key: 'strict-transport-security', desc: 'Forces browser to only connect via secure HTTPS.' },
    { name: 'Content-Security-Policy (CSP)', key: 'content-security-policy', desc: 'Restricts sources of executable scripts, preventing XSS attacks.' },
    { name: 'X-Frame-Options', key: 'x-frame-options', desc: 'Prevents Clickjacking by disallowing framing.' },
    { name: 'X-Content-Type-Options', key: 'x-content-type-options', desc: 'Prevents MIME-sniffing vulnerabilities (nosniff).' },
    { name: 'Referrer-Policy', key: 'referrer-policy', desc: 'Controls how much referrer metadata is passed with requests.' },
    { name: 'Permissions-Policy', key: 'permissions-policy', desc: 'Restricts browser hardware capabilities (camera, microphone, geolocation).' },
  ];

  const parsedKeys = headersInput
    .toLowerCase()
    .split('\n')
    .map((line) => line.split(':')[0].trim());

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-medium text-theme-muted mb-1.5">
          Paste Raw HTTP Response Headers (or edit to evaluate audit posture)
        </label>
        <textarea
          rows={5}
          value={headersInput}
          onChange={(e) => setHeadersInput(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-cyan-400">Security Audit Evaluation:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {securityBestPractices.map((rec) => {
            const isPresent = parsedKeys.includes(rec.key);
            return (
              <div
                key={rec.key}
                className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                  isPresent
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-rose-950/20 border-rose-500/30'
                }`}
              >
                {isPresent ? (
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={`text-xs font-bold ${isPresent ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {rec.name}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{rec.desc}</p>
                  <span className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded ${isPresent ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {isPresent ? 'Implemented' : 'Missing'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* 8. VAPT & SECURITY AUDIT CHECKLIST GENERATOR */
export const SecurityChecklistGenerator: React.FC = () => {
  const [profile, setProfile] = useState<'web' | 'network' | 'api'>('web');
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const checklists = {
    web: [
      { id: 'w1', title: 'SQL Injection (SQLi)', desc: 'Verify parameterized queries / ORM prepared statements across all input surfaces.' },
      { id: 'w2', title: 'Cross-Site Scripting (XSS)', desc: 'Audit context-aware output encoding, React/Vue escaping, and CSP headers.' },
      { id: 'w3', title: 'Broken Object Level Authorization (BOLA/IDOR)', desc: 'Verify server validates logged-in user owns the requested record ID.' },
      { id: 'w4', title: 'Cross-Site Request Forgery (CSRF)', desc: 'Confirm SameSite=Strict/Lax cookies and anti-CSRF token verification on state changes.' },
      { id: 'w5', title: 'Security Misconfiguration', desc: 'Disable debug stack traces in production, change default credentials, remove unused endpoints.' },
      { id: 'w6', title: 'Sensitive Data Exposure', desc: 'Ensure HTTPS encryption everywhere, verify credit card / PII data is masked and tokenized.' },
    ],
    network: [
      { id: 'n1', title: 'Port & Service Reconnaissance (Nmap)', desc: 'Audit listening TCP/UDP ports; close unnecessary legacy services (Telnet, FTP, SMBv1).' },
      { id: 'n2', title: 'Firewall Policy & Ingress Rules', desc: 'Enforce default-deny rule on border firewalls; restrict SSH/RDP to specific VPN IPs.' },
      { id: 'n3', title: 'VLAN Segmentation & DMZ Isolation', desc: 'Separate administrative subnets, IoT devices, user Wi-Fi, and public-facing web servers.' },
      { id: 'n4', title: 'DNS Security & Zone Transfers', desc: 'Restrict DNS AXFR zone transfers to authorized secondary nameservers only.' },
      { id: 'n5', title: 'WPA3 / 802.1X Wireless Security', desc: 'Eliminate WEP/WPA-TKIP; enforce WPA2/WPA3 Enterprise with RADIUS authentication.' },
    ],
    api: [
      { id: 'a1', title: 'Rate Limiting & DoS Throttling', desc: 'Implement token bucket / Leaky bucket throttling per IP and API key.' },
      { id: 'a2', title: 'JWT Secret Strength & Expiration', desc: 'Ensure HS256 secrets are 256+ bits, verify short expiration (exp) and token revocation.' },
      { id: 'a3', title: 'Strict CORS Whitelisting', desc: 'Prevent wildcards Access-Control-Allow-Origin: * on authenticated endpoints.' },
      { id: 'a4', title: 'Mass Assignment Prevention', desc: 'Use strict DTOs (Data Transfer Objects) to reject unauthorized payload fields.' },
      { id: 'a5', title: 'API Versioning & Deprecated Endpoints', desc: 'Retire legacy v1 endpoints that might lack newer authentication filters.' },
    ]
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentList = checklists[profile];
  const completedCount = currentList.filter((item) => checkedItems[item.id]).length;
  const progressPercent = Math.round((completedCount / currentList.length) * 100);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {(['web', 'network', 'api'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setProfile(type)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all uppercase tracking-wider ${
              profile === type
                ? 'bg-cyan-500 text-slate-900 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'glass-card text-theme-muted hover:text-cyan-400'
            }`}
          >
            {type} VAPT Checklist
          </button>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-300">Audit Completion: </span>
          <span className="text-xs font-bold text-cyan-400">{completedCount} / {currentList.length} items</span>
        </div>
        <div className="w-32 h-2.5 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {currentList.map((item) => {
          const isDone = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                isDone ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200' : 'glass-card hover:border-cyan-500/30'
              }`}
            >
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => {}}
                className="mt-0.5 rounded accent-cyan-500 cursor-pointer"
              />
              <div>
                <h5 className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                  {item.title}
                </h5>
                <p className="text-[11px] text-theme-muted mt-0.5">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
