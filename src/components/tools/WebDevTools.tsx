import React, { useState } from 'react';
import { CopyButton, ToolOutputBlock } from './ToolUIHelpers';
import { CheckCircle2, AlertCircle, RefreshCw, Palette, Binary, ArrowRightLeft } from 'lucide-react';

/* 1. JSON FORMATTER & VALIDATOR */
export const JSONFormatterValidator: React.FC = () => {
  const sample = '{"name":"Ravi Vishnoi","role":"IT Security & Network Security Consultant","experience":3,"skills":["VAPT","Forensics","React","PHP"],"status":{"active":true,"location":"Jaipur"}}';
  const [input, setInput] = useState(sample);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = (spaces = 2) => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, spaces));
      setError('');
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => formatJSON(2)}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 text-slate-900 hover:bg-cyan-400 font-bold transition-all"
        >
          Format (2 Spaces)
        </button>
        <button
          onClick={() => formatJSON(4)}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold glass-card text-theme-muted hover:text-cyan-400 transition-all"
        >
          Format (4 Spaces)
        </button>
        <button
          onClick={minifyJSON}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold glass-card text-theme-muted hover:text-cyan-400 transition-all"
        >
          Minify JSON
        </button>
        <button
          onClick={() => { setInput(''); setOutput(''); setError(''); }}
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-theme-muted mb-1.5">Input JSON</label>
          <textarea
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center text-xs font-medium text-theme-muted mb-1.5">
            <span>Formatted Output</span>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            readOnly
            rows={8}
            value={output}
            placeholder="Formatted output will appear here..."
            className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-cyan-300 focus:outline-none"
          />
        </div>
      </div>

      {error ? (
        <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>Invalid JSON: {error}</span>
        </div>
      ) : output ? (
        <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>Valid JSON structure verified.</span>
        </div>
      ) : null}
    </div>
  );
};

/* 2. JSON TO CSV CONVERTER */
export const JSONToCSVConverter: React.FC = () => {
  const sample = `[
  { "id": 1, "name": "Firewall-Border-01", "ip": "192.168.1.1", "status": "Active" },
  { "id": 2, "name": "Web-Server-Nginx", "ip": "192.168.1.50", "status": "Active" },
  { "id": 3, "name": "SIEM-Collector", "ip": "192.168.1.100", "status": "Monitoring" }
]`;

  const [jsonInput, setJsonInput] = useState(sample);
  const [csvOutput, setCsvOutput] = useState('');
  const [error, setError] = useState('');

  const convertToCSV = () => {
    try {
      setError('');
      const arr = JSON.parse(jsonInput);
      if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error('Input must be an array of objects');
      }

      const headers = Array.from(new Set(arr.flatMap((obj) => Object.keys(obj))));
      const rows = arr.map((obj) => {
        return headers
          .map((h) => {
            const val = obj[h] !== undefined ? String(obj[h]) : '';
            return `"${val.replace(/"/g, '""')}"`;
          })
          .join(',');
      });

      setCsvOutput([headers.join(','), ...rows].join('\n'));
    } catch (e: any) {
      setError(e.message);
      setCsvOutput('');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={convertToCSV}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]"
        >
          Convert JSON Array to CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-theme-muted mb-1.5">JSON Array of Objects</label>
          <textarea
            rows={8}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center text-xs font-medium text-theme-muted mb-1.5">
            <span>CSV Output</span>
            {csvOutput && <CopyButton text={csvOutput} label="Copy CSV" />}
          </div>
          <textarea
            readOnly
            rows={8}
            value={csvOutput}
            placeholder="CSV output..."
            className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-cyan-300 focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};

/* 3. REGEX TESTER */
export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Security log: Connection received from 192.168.1.105 and 10.0.0.1 on port 443.');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');

  const testRegex = () => {
    try {
      setError('');
      if (!pattern) {
        setMatches([]);
        return;
      }
      const reg = new RegExp(pattern, flags);
      const res: string[] = [];
      let match;
      if (flags.includes('g')) {
        while ((match = reg.exec(text)) !== null) {
          res.push(match[0]);
          if (match.index === reg.lastIndex) reg.lastIndex++;
        }
      } else {
        const single = reg.exec(text);
        if (single) res.push(single[0]);
      }
      setMatches(res);
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  };

  React.useEffect(() => {
    testRegex();
  }, [pattern, flags, text]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs font-medium text-theme-muted mb-1">Regular Expression</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. [a-z0-9]+"
              className="w-full pl-6 pr-16 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">/</span>
          </div>
        </div>
        <div className="w-24">
          <label className="block text-xs font-medium text-theme-muted mb-1">Flags</label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g, i, m"
            className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-100 text-center focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-theme-muted mb-1">Test String</label>
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {error ? (
        <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-400">
          {error}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center text-xs font-semibold text-cyan-400 mb-1.5">
            <span>Matches Found: {matches.length}</span>
            {matches.length > 0 && <CopyButton text={matches.join('\n')} label="Copy Matches" />}
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 min-h-[50px] flex flex-wrap gap-2">
            {matches.length > 0 ? (
              matches.map((m, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs"
                >
                  {m}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500 italic">No matches in test string.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* 4. UUID GENERATOR */
export const UUIDGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generateUUIDs = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(crypto.randomUUID());
    }
    setUuids(list);
  };

  React.useEffect(() => {
    generateUUIDs();
  }, [count]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-theme-muted">Quantity:</label>
        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        >
          <option value={1}>1 UUID</option>
          <option value={5}>5 UUIDs</option>
          <option value={10}>10 UUIDs</option>
          <option value={20}>20 UUIDs</option>
        </select>
        <button
          onClick={generateUUIDs}
          className="px-4 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-all ml-auto"
        >
          Generate v4 UUIDs
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {uuids.map((u, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-xs text-slate-300"
          >
            <span>{u}</span>
            <CopyButton text={u} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* 5. TIMESTAMP CONVERTER */
export const TimestampConverter: React.FC = () => {
  const [epoch, setEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [humanDate, setHumanDate] = useState<string>('');

  const updateFromEpoch = (sec: number) => {
    setEpoch(sec);
    const d = new Date(sec * 1000);
    setHumanDate(d.toISOString());
  };

  const updateFromHuman = (iso: string) => {
    setHumanDate(iso);
    const ms = Date.parse(iso);
    if (!isNaN(ms)) {
      setEpoch(Math.floor(ms / 1000));
    }
  };

  React.useEffect(() => {
    updateFromEpoch(Math.floor(Date.now() / 1000));
  }, []);

  const d = new Date(epoch * 1000);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-xs text-theme-muted">Convert between Unix Epoch seconds & Human ISO format</span>
        <button
          onClick={() => updateFromEpoch(Math.floor(Date.now() / 1000))}
          className="px-3 py-1 rounded-lg text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
        >
          Set to Current Time
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-theme-muted mb-1">Unix Epoch (Seconds)</label>
          <input
            type="number"
            value={epoch}
            onChange={(e) => updateFromEpoch(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-theme-muted mb-1">ISO 8601 String</label>
          <input
            type="text"
            value={humanDate}
            onChange={(e) => updateFromHuman(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs flex flex-col gap-1.5">
        <div className="flex justify-between text-slate-300">
          <span className="text-theme-muted">UTC Format:</span>
          <span className="font-mono">{d.toUTCString()}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span className="text-theme-muted">Local Locale:</span>
          <span className="font-mono">{d.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

/* 6. COLOR PICKER & HEX/RGB/HSL CONVERTER */
export const ColorConverter: React.FC = () => {
  const [color, setColor] = useState('#06b6d4'); // Cyan-500 default

  const hexToRgb = (hex: string) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map((x) => x + x).join('');
    const num = parseInt(c, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgb = hexToRgb(color);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  
  // HSL Calc
  const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  const hslString = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/80 border border-white/10">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-16 h-16 rounded-xl cursor-pointer border-0 bg-transparent"
        />
        <div className="flex-1">
          <div className="text-sm font-bold text-slate-100 mb-1">Color Preview</div>
          <div className="w-full h-4 rounded-full shadow-inner" style={{ backgroundColor: color }}></div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-xs">
          <div><span className="text-theme-muted mr-3">HEX:</span> <span className="text-cyan-400 font-bold">{color.toUpperCase()}</span></div>
          <CopyButton text={color.toUpperCase()} />
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-xs">
          <div><span className="text-theme-muted mr-3">RGB:</span> <span className="text-emerald-400 font-bold">{rgbString}</span></div>
          <CopyButton text={rgbString} />
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-xs">
          <div><span className="text-theme-muted mr-3">HSL:</span> <span className="text-purple-400 font-bold">{hslString}</span></div>
          <CopyButton text={hslString} />
        </div>
      </div>
    </div>
  );
};
