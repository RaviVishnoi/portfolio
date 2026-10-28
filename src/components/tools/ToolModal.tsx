import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ToolItem } from './types';
import {
  PasswordStrengthChecker,
  PasswordGenerator,
  HashGenerator,
  Base64Tool,
  URLEncodeDecode,
  JWTDecoder,
  SecurityHeadersAuditor,
  SecurityChecklistGenerator,
} from './CybersecurityTools';
import {
  JSONFormatterValidator,
  JSONToCSVConverter,
  RegexTester,
  UUIDGenerator,
  TimestampConverter,
  ColorConverter,
} from './WebDevTools';
import {
  SubnetCalculator,
  MACFormatter,
  DNSLookupUtility,
  NetworkTroubleshootingChecklist,
} from './NetworkTools';

interface ToolModalProps {
  tool: ToolItem | null;
  onClose: () => void;
}

export const ToolModal: React.FC<ToolModalProps> = ({ tool, onClose }) => {
  if (!tool) return null;

  const Icon = tool.icon;

  const renderToolComponent = () => {
    switch (tool.id) {
      // Cybersecurity
      case 'password-strength':
        return <PasswordStrengthChecker />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'hash-generator':
        return <HashGenerator />;
      case 'base64-tool':
        return <Base64Tool />;
      case 'url-encode':
        return <URLEncodeDecode />;
      case 'jwt-decoder':
        return <JWTDecoder />;
      case 'security-headers':
        return <SecurityHeadersAuditor />;
      case 'vapt-checklist':
        return <SecurityChecklistGenerator />;

      // Web Dev
      case 'json-formatter':
        return <JSONFormatterValidator />;
      case 'json-to-csv':
        return <JSONToCSVConverter />;
      case 'regex-tester':
        return <RegexTester />;
      case 'uuid-generator':
        return <UUIDGenerator />;
      case 'timestamp-converter':
        return <TimestampConverter />;
      case 'color-converter':
        return <ColorConverter />;

      // Network
      case 'subnet-calculator':
        return <SubnetCalculator />;
      case 'mac-formatter':
        return <MACFormatter />;
      case 'dns-lookup':
        return <DNSLookupUtility />;
      case 'network-checklist':
        return <NetworkTroubleshootingChecklist />;

      default:
        return <div className="text-sm text-theme-muted">Tool interface coming soon.</div>;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl flex flex-col shadow-2xl my-auto z-10 border max-h-[90vh]"
          style={{ background: 'var(--bg)', borderColor: 'var(--card-border)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-slate-950/60 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Icon size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">{tool.title}</h3>
                  {tool.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-theme-muted mt-0.5 line-clamp-1">{tool.description}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1">
            {renderToolComponent()}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
