import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cn } from '../../lib/utils';
import { Question, getRandomQuestionSet } from '../../data/questions';

export type CyberTheme = 'matrix' | 'azure' | 'crimson' | 'light';

interface Palette {
  bg: string;
  accentRgb: string;
  text: string;
  muted: string;
  glow: string;
  terminalBg: string;
  terminalBorder: string;
}

const PALETTES: Record<CyberTheme, Palette> = {
  matrix: {
    bg: '#05080a',
    accentRgb: '70,255,150',
    text: '#eafff2',
    muted: 'rgba(180,255,210,0.65)',
    glow: 'rgba(70,255,150,0.35)',
    terminalBg: 'rgba(6,10,14,0.75)',
    terminalBorder: 'rgba(70,255,150,0.20)',
  },
  azure: {
    bg: '#010204',
    accentRgb: '40,160,255',
    text: '#eaf5ff',
    muted: 'rgba(190,225,255,0.65)',
    glow: 'rgba(40,160,255,0.35)',
    terminalBg: 'rgba(6,10,14,0.75)',
    terminalBorder: 'rgba(40,160,255,0.20)',
  },
  crimson: {
    bg: '#0a0506',
    accentRgb: '255,90,90',
    text: '#fff0ef',
    muted: 'rgba(255,200,198,0.65)',
    glow: 'rgba(255,90,90,0.35)',
    terminalBg: 'rgba(10,5,6,0.75)',
    terminalBorder: 'rgba(255,90,90,0.20)',
  },
  light: {
    bg: '#f1f5f9',
    accentRgb: '6,182,212',
    text: '#0f172a',
    muted: 'rgba(15,23,42,0.60)',
    glow: 'rgba(6,182,212,0.25)',
    terminalBg: 'rgba(255,255,255,0.90)',
    terminalBorder: 'rgba(6,182,212,0.30)',
  },
};

export interface CyberNetworkHeroProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  terminalLines?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string } | false;
  theme?: CyberTheme;
  nodeDensity?: number;
  linkDistance?: number;
  typeSpeedMs?: number;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_LINES = [
  '$ whoami',
  '> RAVI VISHNOI',
  '> Cyber Security | VAPT | Full Stack Developer',
  '$ profile --info',
  '> Experience: 3+ Years',
  '> Focus: Cyber Security & Web Development',
  '> Specialization: VAPT | Digital Forensics | Web Applications',
  '> Development: React.js | Node.js | PHP | MySQL',
  '> Security: Nmap | Nessus | Manual VAPT | Network Analysis',
  '$ system --status',
  '> Portfolio: ONLINE',
  '> Security Module: READY',
  '> Development Environment: READY',
  '> Database: CONNECTED',
  '> API Services: ACTIVE',
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function CyberNetworkHero({
  eyebrow = 'RAVI_VISHNOI',
  title = 'Secure & Scalable Web Solutions',
  subtitle = 'Building robust applications with a security-first approach.',
  terminalLines = DEFAULT_LINES,
  primaryCta = { label: 'View Projects', href: '#projects' },
  secondaryCta = { label: 'Contact Me', href: '#contact' },
  theme = 'matrix',
  nodeDensity = 9000,
  linkDistance = 130,
  typeSpeedMs = 32,
  className,
  style,
}: CyberNetworkHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const palette = PALETTES[theme];

  // Game State
  type TerminalMode = 'typing' | 'playing' | 'set_complete';
  const [terminalMode, setTerminalMode] = useState<TerminalMode>('typing');
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSetScore, setCurrentSetScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; correctAnswer: string } | null>(null);

  const generateNewSet = () => {
    setCurrentQuestions(getRandomQuestionSet());
    setCurrentQuestionIndex(0);
    setCurrentSetScore(0);
    setFeedback(null);
    setTerminalMode('playing');
  };

  const startGame = () => {
    generateNewSet();
  };

  const handleAnswer = (selectedOption: string) => {
    if (feedback) return; // Prevent multiple clicks

    const currentQ = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    
    setFeedback({ isCorrect, correctAnswer: currentQ.correctAnswer });
    setTotalAttempted(prev => prev + 1);

    if (isCorrect) {
      setCurrentSetScore(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentQuestionIndex(prev => {
        if (prev >= 4) {
          setTerminalMode('set_complete');
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduceMotion(mediaQuery.matches);
    updateMotion();
    mediaQuery.addEventListener?.('change', updateMotion);
    return () => mediaQuery.removeEventListener?.('change', updateMotion);
  }, []);

  useEffect(() => {
    if (reduceMotion || terminalMode !== 'typing') {
      if (reduceMotion && terminalMode === 'typing') {
        setTyped(terminalLines.join('\n'));
      }
      return;
    }

    let cancelled = false;
    let characterIndex = 0;
    let timeoutId: number;
    const currentLine = terminalLines[lineIndex] ?? '';

    const tick = () => {
      if (cancelled) return;
      characterIndex += 1;
      setTyped(currentLine.slice(0, characterIndex));
      if (characterIndex < currentLine.length) {
        timeoutId = window.setTimeout(tick, typeSpeedMs);
      } else {
        timeoutId = window.setTimeout(() => {
          if (!cancelled) setLineIndex((index) => (index + 1) % terminalLines.length);
        }, 1100);
      }
    };

    timeoutId = window.setTimeout(tick, typeSpeedMs);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [lineIndex, terminalLines, typeSpeedMs, reduceMotion, terminalMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !wrapper || !context) return;

    let width = 0;
    let height = 0;
    let devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: NetworkNode[] = [];
    let animationFrame = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    const resize = () => {
      const bounds = wrapper.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      const count = clamp(Math.round((width * height) / nodeDensity), 24, 160);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const drawFrame = () => {
      context.clearRect(0, 0, width, height);
      const isLight = theme === 'light';
      const mouseActive = mouseX > -1000 && mouseY > -1000;
      const mouseLinkDist = Math.max(220, linkDistance * 1.7);

      nodes.forEach((node) => {
        if (!reduceMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          // Smooth magnetic pull toward cursor
          if (mouseActive) {
            const mDist = Math.hypot(node.x - mouseX, node.y - mouseY);
            if (mDist < mouseLinkDist && mDist > 4) {
              const pull = (1 - mDist / mouseLinkDist) * 0.40;
              node.x += ((mouseX - node.x) / mDist) * pull;
              node.y += ((mouseY - node.y) / mDist) * pull;
            }
          }
        }
      });

      // 1. Inter-node network lines
      for (let firstIndex = 0; firstIndex < nodes.length; firstIndex += 1) {
        for (let secondIndex = firstIndex + 1; secondIndex < nodes.length; secondIndex += 1) {
          const first = nodes[firstIndex];
          const second = nodes[secondIndex];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance > linkDistance) continue;

          const p = 1 - distance / linkDistance;
          if (isLight) {
            // Darker high-contrast blue lines for light theme
            context.strokeStyle = `rgba(3, 105, 161, ${0.15 + p * 0.35})`;
            context.lineWidth = 1.3;
          } else {
            // Luminous lines for dark theme
            context.strokeStyle = `rgba(${palette.accentRgb}, ${0.18 + p * 0.45})`;
            context.lineWidth = 1.1;
          }

          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.stroke();
        }
      }

      // 2. Cursor Connection Lines
      if (mouseActive && !reduceMotion) {
        for (let firstIndex = 0; firstIndex < nodes.length; firstIndex += 1) {
          const node = nodes[firstIndex];
          const mouseDistance = Math.hypot(node.x - mouseX, node.y - mouseY);
          if (mouseDistance < mouseLinkDist) {
            const p = 1 - mouseDistance / mouseLinkDist;
            context.save();
            if (isLight) {
              // Deep dark blue laser connection in light theme
              context.shadowColor = 'rgba(2, 132, 199, 0.6)';
              context.shadowBlur = 6;
              context.strokeStyle = `rgba(2, 78, 122, ${0.35 + p * 0.5})`;
              context.lineWidth = 1.6 + p * 1.5;
            } else {
              // Bright luminous light-cyan laser connection in dark theme
              context.shadowColor = `rgba(${palette.accentRgb}, 0.95)`;
              context.shadowBlur = 14;
              context.strokeStyle = `rgba(224, 247, 255, ${0.45 + p * 0.55})`;
              context.lineWidth = 1.6 + p * 1.6;
            }

            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(mouseX, mouseY);
            context.stroke();
            context.restore();
          }
        }

        // Central Cursor Power Beacon
        context.save();
        if (isLight) {
          context.shadowColor = 'rgba(2, 132, 199, 0.8)';
          context.shadowBlur = 12;
          context.strokeStyle = 'rgba(2, 78, 122, 0.9)';
          context.lineWidth = 2;
          context.beginPath();
          context.arc(mouseX, mouseY, 11, 0, Math.PI * 2);
          context.stroke();

          context.fillStyle = '#0f172a'; // Dark core in light mode
          context.beginPath();
          context.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
          context.fill();
        } else {
          context.shadowColor = `rgba(${palette.accentRgb}, 1.0)`;
          context.shadowBlur = 18;
          context.strokeStyle = 'rgba(224, 247, 255, 0.9)';
          context.lineWidth = 2;
          context.beginPath();
          context.arc(mouseX, mouseY, 11, 0, Math.PI * 2);
          context.stroke();

          context.fillStyle = '#ffffff'; // Pure light core in dark mode
          context.beginPath();
          context.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
          context.fill();
        }
        context.restore();
      }

      // 3. Network Dots: LIGHT/BRIGHT in Dark Themes, DARK in Light Theme
      for (let firstIndex = 0; firstIndex < nodes.length; firstIndex += 1) {
        const node = nodes[firstIndex];
        const mouseDistance = mouseActive ? Math.hypot(node.x - mouseX, node.y - mouseY) : 9999;
        const nearby = mouseDistance < mouseLinkDist;

        context.save();
        if (isLight) {
          // --- LIGHT THEME: SOLID DARK DOTS FOR HIGH CONTRAST ---
          const radius = nearby ? 5.0 : 3.0;
          context.shadowColor = 'rgba(2, 132, 199, 0.45)';
          context.shadowBlur = nearby ? 8 : 4;

          // Deep dark slate/navy dot (#0f172a)
          context.fillStyle = nearby ? '#02182b' : '#0f172a';
          context.beginPath();
          context.arc(node.x, node.y, radius, 0, Math.PI * 2);
          context.fill();

          // Electric blue ring around nearby dots
          if (nearby) {
            context.strokeStyle = '#0284c7';
            context.lineWidth = 1.5;
            context.stroke();
          }
        } else {
          // --- DARK THEME: LIGHT / BRIGHT / LUMINOUS DOTS ---
          const radius = nearby ? 4.8 : 2.8;
          context.shadowColor = `rgba(${palette.accentRgb}, 1.0)`;
          context.shadowBlur = nearby ? 16 : 8;

          // Luminous bright light-cyan / white dot (#f0f9ff / #ffffff)
          context.fillStyle = nearby ? '#ffffff' : 'rgba(235, 248, 255, 0.95)';
          context.beginPath();
          context.arc(node.x, node.y, radius, 0, Math.PI * 2);
          context.fill();

          // Extra bright center star sparkle for nearby nodes
          if (nearby) {
            context.fillStyle = '#ffffff';
            context.beginPath();
            context.arc(node.x, node.y, radius * 0.5, 0, Math.PI * 2);
            context.fill();
          }
        }
        context.restore();
      }
    };
    const loop = () => {
      drawFrame();
      if (!reduceMotion) animationFrame = requestAnimationFrame(loop);
    };

    const onMouseMove = (event: MouseEvent) => {
      const bounds = wrapper.getBoundingClientRect();
      mouseX = event.clientX - bounds.left;
      mouseY = event.clientY - bounds.top;
    };
    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    resize();
    drawFrame();
    if (!reduceMotion) {
      animationFrame = requestAnimationFrame(loop);
      wrapper.addEventListener('mousemove', onMouseMove);
      wrapper.addEventListener('mouseleave', onMouseLeave);
    }
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      wrapper.removeEventListener('mousemove', onMouseMove);
      wrapper.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, [nodeDensity, linkDistance, palette.accentRgb, reduceMotion]);

  /* ---------- Button style helpers (inline, so Tailwind purge can't miss them) ---------- */
  const primaryButtonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 28px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '0.01em',
    textDecoration: 'none',
    color: palette.bg,
    background: `rgb(${palette.accentRgb})`,
    boxShadow: `0 0 24px ${palette.glow}, 0 6px 18px rgba(0,0,0,0.35)`,
    border: '1px solid transparent',
    cursor: 'pointer',
    transition:
      'transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms cubic-bezier(0.16,1,0.3,1)',
  };

  const secondaryButtonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 28px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '0.01em',
    textDecoration: 'none',
    color: palette.text,
    background: `rgba(${palette.accentRgb},0.06)`,
    border: `1px solid rgba(${palette.accentRgb},0.55)`,
    cursor: 'pointer',
    transition:
      'transform 200ms cubic-bezier(0.16,1,0.3,1), background 200ms cubic-bezier(0.16,1,0.3,1)',
  };

  return (
    <section
      ref={wrapRef}
      id="home"
      aria-labelledby="cyber-network-title"
      className={cn(
        'cyber-network-hero relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-6',
        className
      )}
      style={{ background: palette.bg, ...style }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${palette.bg}00, ${palette.bg}cc 85%)`,
        }}
      />

      <div className="relative z-[1] mx-auto grid w-full max-w-5xl gap-10 py-28 md:grid-cols-2 md:items-center">
        <div>
          <p
            className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: palette.muted }}
          >
            {eyebrow}
          </p>
          <h1
            id="cyber-network-title"
            className="font-sans text-[clamp(2.2rem,5.2vw,3.65rem)] font-extrabold leading-[1.05] tracking-tight"
            style={{ color: palette.text }}
          >
            {title}
          </h1>
          <p
            className="mt-4 max-w-md font-sans text-base leading-relaxed md:text-lg"
            style={{ color: palette.muted }}
          >
            {subtitle}
          </p>

          {/* Buttons — inline styles ensure they render correctly even if Tailwind purge misses them */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginTop: '32px',
            }}
          >
            <a
              href={primaryCta.href}
              style={primaryButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid rgb(${palette.accentRgb})`;
                e.currentTarget.style.outlineOffset = '3px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              {primaryCta.label}
            </a>
            {secondaryCta ? (
              <a
                href={secondaryCta.href}
                style={secondaryButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = `rgba(${palette.accentRgb},0.16)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = `rgba(${palette.accentRgb},0.06)`;
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `2px solid rgb(${palette.accentRgb})`;
                  e.currentTarget.style.outlineOffset = '3px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>

        <div
          className="w-full rounded-xl border backdrop-blur-sm overflow-hidden"
          style={{
            borderColor: palette.terminalBorder,
            background: palette.terminalBg,
            boxShadow: `0 0 40px ${palette.glow}, 0 8px 32px rgba(0,0,0,0.15)`,
            transition: 'background 0.4s ease, border-color 0.4s ease',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{
              borderColor: palette.terminalBorder,
              background: theme === 'light' ? 'rgba(226,232,240,0.6)' : 'rgba(0,0,0,0.25)',
            }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span
              className="ml-2 font-mono text-xs font-semibold"
              style={{ color: palette.muted }}
            >
              secure-shell — ravi@portfolio:~
            </span>
          </div>
          {/* Terminal content */}
          <div className="min-h-[260px] px-5 py-5 font-mono text-xs md:text-sm relative flex flex-col">
            {terminalMode === 'typing' && (
              <>
                <div className="flex-grow">
                  {reduceMotion ? (
                    <pre className="whitespace-pre-wrap" style={{ color: palette.text }}>
                      {typed}
                    </pre>
                  ) : (
                    <>
                      {terminalLines.slice(0, lineIndex).map((line, index) => (
                        <div
                          key={`${line}-${index}`}
                          className="mb-1"
                          style={{ color: palette.muted }}
                        >
                          {line}
                        </div>
                      ))}
                      <div style={{ color: palette.text }} className="flex items-center gap-1">
                        <span style={{ color: `rgb(${palette.accentRgb})` }}>▶</span>
                        {typed}
                        <span
                          aria-hidden="true"
                          className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-current animate-pulse"
                        />
                      </div>
                    </>
                  )}
                </div>
                {/* Game Start Button */}
                <div className="mt-4 pt-4 border-t border-cyan-500/10">
                  <button
                    onClick={startGame}
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-400 hover:text-white transition-all text-xs rounded group"
                  >
                    <span>$ start_game</span>
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity">--module=tech_challenge</span>
                  </button>
                </div>
              </>
            )}

            {terminalMode === 'playing' && currentQuestions.length > 0 && (
              <div className="flex flex-col h-full" style={{ color: palette.text }}>
                <div className="mb-4 whitespace-pre font-bold leading-tight" style={{ color: `rgb(${palette.accentRgb})` }}>
                  {`╔══════════════════════════════════════╗\n║       TECH SECURITY CHALLENGE        ║\n╚══════════════════════════════════════╝`}
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-grow">
                    <div className="text-cyan-400 mb-2 font-semibold flex items-center justify-between">
                      <span>{`QUESTION SET: 0${currentQuestionIndex + 1}`}</span>
                      <span>{`VISIBLE: ${currentQuestionIndex + 1} / 5`}</span>
                    </div>
                    
                    <div className="text-white p-4 rounded bg-black/40 border border-slate-800/60 shadow-inner">
                      <div className="text-xs text-slate-400 mb-2 font-semibold">[{currentQuestions[currentQuestionIndex].category} • {currentQuestions[currentQuestionIndex].difficulty}]</div>
                      <div className="text-sm md:text-base mb-4 font-sans leading-relaxed">
                        <span className="text-cyan-500 mr-2">[{String(currentQuestionIndex + 1).padStart(2, '0')}]</span>
                        {currentQuestions[currentQuestionIndex].question}
                      </div>
                      
                      {!feedback ? (
                        <div className="flex flex-col gap-2">
                          {currentQuestions[currentQuestionIndex].options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAnswer(option)}
                              className="text-left px-4 py-2 border border-slate-700 bg-slate-900/60 hover:bg-cyan-900/40 hover:border-cyan-500/50 hover:text-cyan-300 transition-all text-xs md:text-sm rounded group flex items-start gap-2"
                            >
                              <span className="text-slate-500 group-hover:text-cyan-500">○</span> 
                              <span>{option}</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3 mt-4 p-3 bg-black/60 rounded border border-slate-700">
                          <div className={`font-bold flex items-center gap-2 ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            {feedback.isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}
                            <span className="text-slate-400 text-xs font-normal ml-auto">&gt; ANSWER VERIFIED</span>
                          </div>
                          {!feedback.isCorrect && (
                            <div className="text-xs text-slate-300">
                              <span className="text-slate-500">Correct Answer:</span> {feedback.correctAnswer}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {terminalMode === 'set_complete' && (
              <div className="flex flex-col h-full" style={{ color: palette.text }}>
                <div className="mb-4 whitespace-pre font-bold leading-tight" style={{ color: `rgb(${palette.accentRgb})` }}>
                  {`╔══════════════════════════════════════╗\n║          SESSION COMPLETE            ║\n╚══════════════════════════════════════╝`}
                </div>
                
                <div className="mb-6 bg-black/40 p-5 rounded border border-slate-800/60 flex flex-col md:flex-row gap-8">
                  <div>
                    <div className="text-cyan-400 font-bold mb-2 border-b border-cyan-500/30 pb-1">SCORE</div>
                    <div className="text-lg font-bold">
                      <span className="text-slate-400 text-sm font-normal mr-2">Current Set:</span>
                      <span className={currentSetScore >= 3 ? 'text-green-400' : 'text-yellow-400'}>{currentSetScore} / 5</span>
                    </div>
                    <div className="text-sm mt-2">
                      <span className="text-slate-400 mr-2">Total Correct:</span>
                      <span className="text-white">{totalCorrect}</span>
                    </div>
                    <div className="text-sm mt-1">
                      <span className="text-slate-400 mr-2">Attempted:</span>
                      <span className="text-white">{totalAttempted}</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end text-xs text-slate-500 font-mono italic">
                    &gt; SYSTEM LOG: SET EVALUATED<br/>
                    &gt; READY FOR NEW CHALLENGE
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap gap-3">
                  <button
                    onClick={generateNewSet}
                    className="px-4 py-2 border border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-400 transition-all text-xs rounded font-bold"
                  >
                    [ NEW CHALLENGE ]
                  </button>
                  <button
                    onClick={() => { setTerminalMode('typing'); setLineIndex(0); setTyped(''); }}
                    className="px-4 py-2 border border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-all text-xs rounded text-slate-300"
                  >
                    [ EXIT ]
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <a 
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
        aria-label="Scroll down to About section"
      >
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: palette.muted }}>Scroll</span>
        <div className="w-5 h-8 border-2 rounded-full flex justify-center p-1" style={{ borderColor: palette.muted }}>
          <div className="w-1 h-2 rounded-full animate-bounce" style={{ backgroundColor: `rgb(${palette.accentRgb})` }} />
        </div>
      </a>
    </section>
  );
}