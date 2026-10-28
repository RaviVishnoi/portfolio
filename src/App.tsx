import { useState, useEffect } from 'react';
import { TokyoSkylineHero } from './components/TokyoSkylineHero';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import CyberSecurityFocus from './components/CyberSecurityFocus';
import Tools from './components/Tools';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import DynamicEnvironment from './components/ui/DynamicEnvironment';
import ScrollProgressBar from './components/ui/ScrollProgressBar';
import CommandPalette from './components/ui/CommandPalette';
import { TimeThemeProvider } from './context/TimeThemeContext';

function App() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Global Ctrl + K / Cmd + K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <TimeThemeProvider>
      <div className="min-h-screen font-sans selection:bg-cyan-500/30">
        <ScrollProgressBar />
        <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
        <DynamicEnvironment />
        <CustomCursor />
        <Header onOpenPalette={() => setIsPaletteOpen(true)} />
        <main>
          <TokyoSkylineHero />
          <About />
          <Skills />
          <CyberSecurityFocus />
          <Tools />
          <Experience />
          <Projects />
          <Certifications />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </TimeThemeProvider>
  );
}

export default App;
