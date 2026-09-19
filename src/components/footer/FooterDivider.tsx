export default function FooterDivider() {
  return (
    <div className="w-full relative h-px mt-16 mb-8 overflow-hidden rounded-full" style={{ background: 'var(--card-border)' }}>
      {/* Animated glowing light travelling across */}
      <div 
        className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm shadow-[0_0_15px_rgba(6,182,212,1)]"
        style={{
          animation: 'travelLeftRight 4s ease-in-out infinite alternate'
        }}
      />
      <style>{`
        @keyframes travelLeftRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
