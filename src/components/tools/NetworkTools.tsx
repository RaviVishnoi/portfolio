import React, { useState } from 'react';
import { CopyButton, ToolOutputBlock } from './ToolUIHelpers';
import { Network, Server, Globe, Search, CheckCircle2, ShieldCheck, Binary } from 'lucide-react';

/* 1. IPv4 SUBNET & CIDR CALCULATOR */
export const SubnetCalculator: React.FC = () => {
  const [ip, setIp] = useState('192.168.1.15');
  const [cidr, setCidr] = useState(24);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const ipToInt = (ipStr: string) => {
    return ipStr
      .split('.')
      .reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
  };

  const intToIp = (intVal: number) => {
    return [
      (intVal >>> 24) & 255,
      (intVal >>> 16) & 255,
      (intVal >>> 8) & 255,
      intVal & 255,
    ].join('.');
  };

  const calculateSubnet = () => {
    try {
      setError('');
      const octets = ip.split('.');
      if (octets.length !== 4 || octets.some((o) => isNaN(Number(o)) || Number(o) < 0 || Number(o) > 255)) {
        throw new Error('Please enter a valid IPv4 address (e.g. 192.168.1.1)');
      }

      if (cidr < 0 || cidr > 32) {
        throw new Error('CIDR must be between 0 and 32');
      }

      const ipInt = ipToInt(ip);
      const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
      const networkInt = (ipInt & maskInt) >>> 0;
      const broadcastInt = (networkInt | ~maskInt) >>> 0;

      const totalHosts = Math.pow(2, 32 - cidr);
      const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : totalHosts - 2;

      const firstHostInt = cidr >= 31 ? networkInt : networkInt + 1;
      const lastHostInt = cidr >= 31 ? broadcastInt : broadcastInt - 1;

      // IP Class
      const firstOctet = Number(octets[0]);
      let ipClass = 'A';
      if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'B';
      else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'C';
      else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'D (Multicast)';
      else if (firstOctet >= 240) ipClass = 'E (Experimental)';

      // Private check
      const isPrivate =
        (firstOctet === 10) ||
        (firstOctet === 172 && Number(octets[1]) >= 16 && Number(octets[1]) <= 31) ||
        (firstOctet === 192 && Number(octets[1]) === 168);

      setResult({
        networkAddress: intToIp(networkInt),
        broadcastAddress: intToIp(broadcastInt),
        subnetMask: intToIp(maskInt),
        wildcardMask: intToIp(~maskInt >>> 0),
        firstUsableHost: intToIp(firstHostInt),
        lastUsableHost: intToIp(lastHostInt),
        totalHosts: totalHosts.toLocaleString(),
        usableHosts: usableHosts.toLocaleString(),
        ipClass,
        ipType: isPrivate ? 'RFC 1918 Private' : 'Public Routable',
        cidrNotation: `${intToIp(networkInt)}/${cidr}`,
      });
    } catch (e: any) {
      setError(e.message);
      setResult(null);
    }
  };

  React.useEffect(() => {
    calculateSubnet();
  }, [ip, cidr]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-theme-muted mb-1">IPv4 Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value.trim())}
            placeholder="192.168.1.1"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-theme-muted mb-1">CIDR Subnet Mask</label>
          <select
            value={cidr}
            onChange={(e) => setCidr(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {Array.from({ length: 33 }, (_, i) => 32 - i).map((m) => (
              <option key={m} value={m}>
                /{m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-400">
          {error}
        </div>
      ) : result ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
            <span className="text-[11px] text-theme-muted block">Network Address (CIDR)</span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono text-xs font-bold text-cyan-400">{result.cidrNotation}</span>
              <CopyButton text={result.cidrNotation} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
            <span className="text-[11px] text-theme-muted block">Subnet Mask</span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono text-xs font-bold text-slate-200">{result.subnetMask}</span>
              <CopyButton text={result.subnetMask} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
            <span className="text-[11px] text-theme-muted block">Usable Host Range</span>
            <div className="font-mono text-xs font-semibold text-emerald-400 mt-1">
              {result.firstUsableHost} — {result.lastUsableHost}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
            <span className="text-[11px] text-theme-muted block">Broadcast Address</span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono text-xs font-bold text-slate-200">{result.broadcastAddress}</span>
              <CopyButton text={result.broadcastAddress} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
            <span className="text-[11px] text-theme-muted block">Usable / Total Hosts</span>
            <div className="font-mono text-xs font-bold text-cyan-300 mt-1">
              {result.usableHosts} usable ({result.totalHosts} total)
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
            <span className="text-[11px] text-theme-muted block">Classification & Scope</span>
            <div className="font-mono text-xs font-semibold text-purple-300 mt-1">
              Class {result.ipClass} • {result.ipType}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

/* 2. MAC ADDRESS FORMATTER */
export const MACFormatter: React.FC = () => {
  const [inputMac, setInputMac] = useState('001A2B3C4D5E');
  const [colonFormat, setColonFormat] = useState('');
  const [hyphenFormat, setHyphenFormat] = useState('');
  const [ciscoFormat, setCiscoFormat] = useState('');
  const [bareFormat, setBareFormat] = useState('');
  const [error, setError] = useState('');

  const formatMAC = (val: string) => {
    const cleaned = val.replace(/[^0-9a-fA-F]/g, '').toUpperCase();
    if (cleaned.length !== 12) {
      setError(`MAC address must contain 12 hex characters (Current: ${cleaned.length})`);
      setColonFormat('');
      setHyphenFormat('');
      setCiscoFormat('');
      setBareFormat('');
      return;
    }
    setError('');
    setBareFormat(cleaned);
    setColonFormat(cleaned.match(/.{1,2}/g)!.join(':'));
    setHyphenFormat(cleaned.match(/.{1,2}/g)!.join('-'));
    setCiscoFormat(cleaned.match(/.{1,4}/g)!.join('.').toLowerCase());
  };

  React.useEffect(() => {
    formatMAC(inputMac);
  }, [inputMac]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-medium text-theme-muted mb-1.5">
          Enter MAC Address (any separator or unformatted)
        </label>
        <input
          type="text"
          value={inputMac}
          onChange={(e) => setInputMac(e.target.value)}
          placeholder="00:1A:2B:3C:4D:5E or 001a.2b3c.4d5e"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {error ? (
        <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-400">
          {error}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-white/10">
            <div>
              <span className="text-[11px] text-theme-muted block">Standard IEEE Colon (Linux / Unix / macOS)</span>
              <span className="font-mono text-xs font-bold text-cyan-400">{colonFormat}</span>
            </div>
            <CopyButton text={colonFormat} />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-white/10">
            <div>
              <span className="text-[11px] text-theme-muted block">Windows Hyphen Notation</span>
              <span className="font-mono text-xs font-bold text-slate-200">{hyphenFormat}</span>
            </div>
            <CopyButton text={hyphenFormat} />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-white/10">
            <div>
              <span className="text-[11px] text-theme-muted block">Cisco IOS Quad Notation</span>
              <span className="font-mono text-xs font-bold text-emerald-400">{ciscoFormat}</span>
            </div>
            <CopyButton text={ciscoFormat} />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-white/10">
            <div>
              <span className="text-[11px] text-theme-muted block">Raw Hex String</span>
              <span className="font-mono text-xs font-bold text-purple-400">{bareFormat}</span>
            </div>
            <CopyButton text={bareFormat} />
          </div>
        </div>
      )}
    </div>
  );
};

/* 3. DNS RECORD LOOKUP (PUBLIC DOH RESOLVER) */
export const DNSLookupUtility: React.FC = () => {
  const [domain, setDomain] = useState('cloudflare.com');
  const [recordType, setRecordType] = useState('A');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupDNS = async () => {
    const cleanDomain = domain.replace(/https?:\/\//, '').split('/')[0].trim();
    if (!cleanDomain) {
      setError('Please provide a valid domain name');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setResults([]);
      // Using Cloudflare DNS-over-HTTPS JSON API
      const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${cleanDomain}&type=${recordType}`, {
        headers: { Accept: 'application/dns-json' },
      });
      const data = await res.json();
      if (data.Answer && Array.isArray(data.Answer)) {
        setResults(data.Answer);
      } else {
        setError(`No ${recordType} records found for ${cleanDomain}`);
      }
    } catch (e: any) {
      setError(`DNS query failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    lookupDNS();
  }, [recordType]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-theme-muted mb-1">Target Domain</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="e.g. google.com or github.com"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="w-32">
          <label className="block text-xs font-medium text-theme-muted mb-1">Record Type</label>
          <select
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="A">A (IPv4)</option>
            <option value="AAAA">AAAA (IPv6)</option>
            <option value="CNAME">CNAME</option>
            <option value="MX">MX (Mail)</option>
            <option value="TXT">TXT / SPF</option>
            <option value="NS">NS (Name Server)</option>
            <option value="SOA">SOA</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={lookupDNS}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-all disabled:opacity-50"
          >
            {loading ? 'Resolving...' : 'Resolve DNS'}
          </button>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 italic">
        * Queries public Cloudflare DNS-over-HTTPS (DoH) JSON endpoint securely.
      </p>

      {error ? (
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-400">
          {error}
        </div>
      ) : results.length > 0 ? (
        <div className="flex flex-col gap-2">
          {results.map((ans, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex flex-col">
                <span className="font-mono text-cyan-400 font-semibold">{ans.data}</span>
                <span className="text-[10px] text-slate-500">TTL: {ans.TTL}s | Type Code: {ans.type}</span>
              </div>
              <CopyButton text={ans.data} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

/* 4. NETWORK TROUBLESHOOTING CHECKLIST */
export const NetworkTroubleshootingChecklist: React.FC = () => {
  const steps = [
    { layer: 'Layer 1: Physical', title: 'Link State & Cable Integrity', cmd: 'ethtool eth0 or ip link show', desc: 'Verify physical link light, carrier status, and no cable/SFP faults.' },
    { layer: 'Layer 2: Data Link', title: 'ARP Resolution & Gateway MAC', cmd: 'ip neigh show or arp -a', desc: 'Confirm default gateway IP resolves to expected router MAC address.' },
    { layer: 'Layer 3: Network', title: 'IP Assignment & Routing Table', cmd: 'ip addr show && ip route show', desc: 'Verify static/DHCP IP subnet configuration and default route 0.0.0.0/0 gateway.' },
    { layer: 'Layer 3: ICMP Test', title: 'Local & Remote Reachability', cmd: 'ping -c 4 8.8.8.8', desc: 'Test end-to-end packet delivery without DNS dependency.' },
    { layer: 'Layer 4: Transport', title: 'Port Connectivity & Listening Sockets', cmd: 'nc -zv <host> 443 or ss -tuln', desc: 'Verify TCP handshake completion or if firewall drops SYN packets.' },
    { layer: 'Layer 7: Application', title: 'DNS Resolution & HTTP Response', cmd: 'curl -Iv https://<target>', desc: 'Test DNS lookup latency, SSL certificate validity, and HTTP response code.' },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-300">
        Systematic OSI bottom-up network troubleshooting sequence with quick verification commands.
      </div>

      <div className="flex flex-col gap-2.5">
        {steps.map((st, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 px-2 py-0.5 rounded">
                {st.layer}
              </span>
              <CopyButton text={st.cmd} label="Copy Cmd" />
            </div>
            <h5 className="text-xs font-bold text-slate-100 mt-1">{st.title}</h5>
            <p className="text-[11px] text-theme-muted mt-0.5">{st.desc}</p>
            <div className="mt-2 p-2 rounded-lg bg-black/60 font-mono text-[11px] text-cyan-300 border border-white/5">
              $ {st.cmd}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
