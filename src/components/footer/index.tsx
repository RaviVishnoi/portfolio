import FooterBrand from './FooterBrand';
import FooterNavigation from './FooterNavigation';
import FooterProjects from './FooterProjects';
import FooterSocials from './FooterSocials';
import FooterStatus from './FooterStatus';
import FooterDivider from './FooterDivider';
import FooterCopyright from './FooterCopyright';
import BackToTop from './BackToTop';

export default function Footer() {
  return (
    <footer className="relative pt-24 overflow-hidden border-t" style={{ background: 'var(--bg-section)', borderColor: 'var(--card-border)' }}>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* Subtle Digital Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Identity (Takes up 4 cols on large screens) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <FooterBrand />
            <div className="mt-8 lg:mt-auto">
              <FooterStatus />
            </div>
          </div>
          
          {/* Quick Links (Takes up 2 cols) */}
          <div className="lg:col-span-2">
            <FooterNavigation />
          </div>
          
          {/* Featured Projects (Takes up 3 cols) */}
          <div className="lg:col-span-3">
            <FooterProjects />
          </div>
          
          {/* Social Connect (Takes up 3 cols) */}
          <div className="lg:col-span-3">
            <FooterSocials />
          </div>

        </div>

        <FooterDivider />
        <FooterCopyright />
      </div>

      <BackToTop />
    </footer>
  );
}
