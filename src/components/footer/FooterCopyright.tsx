import { useState, useEffect } from 'react';

export default function FooterCopyright() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-theme-muted text-sm pb-8">
      <p>
        &copy; {year} Ravi Vishnoi. All rights reserved.
      </p>
      <p className="flex items-center gap-1 font-medium">
        Designed & Developed by <span className="text-cyan-500">Ravi Vishnoi</span>
      </p>
    </div>
  );
}
