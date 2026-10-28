import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, className = '', label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
        copied 
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
          : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30'
      } ${className}`}
      title="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
      <span>{copied ? 'Copied!' : (label || 'Copy')}</span>
    </button>
  );
};

export const ToolOutputBlock: React.FC<{
  title?: string;
  value: string;
  copyable?: boolean;
}> = ({ title, value, copyable = true }) => {
  return (
    <div className="flex flex-col gap-1.5 mt-3">
      {title && (
        <div className="flex items-center justify-between text-xs font-medium text-theme-muted">
          <span>{title}</span>
          {copyable && value && <CopyButton text={value} />}
        </div>
      )}
      <div className="relative p-3 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-xs text-slate-200 break-all select-all min-h-[42px] flex items-center">
        {value ? value : <span className="text-slate-500 italic">No output yet...</span>}
      </div>
    </div>
  );
};
