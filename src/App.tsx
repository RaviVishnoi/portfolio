import { TokyoSkylineHero } from './components/TokyoSkylineHero';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import CyberSecurityFocus from './components/CyberSecurityFocus';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import DynamicEnvironment from './components/ui/DynamicEnvironment';
import { TimeThemeProvider } from './context/TimeThemeContext';

function App() {
  return (
    <TimeThemeProvider>
      <div className="min-h-screen font-sans selection:bg-cyan-500/30">
        <DynamicEnvironment />
        <CustomCursor />
        <Header />
        <main>
          <TokyoSkylineHero />
          <About />
          <Skills />
          <CyberSecurityFocus />
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
