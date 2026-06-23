import React from 'react';

const items = [
  "DATA OPERATOR",
  "DATA MINER",
  "PROJECT COORDINATOR",
  "FRESHERS WELCOME",
  "ODISHA HIRING",
  "AB IT SOLUTIONS"
];

export default function Ticker() {
  const renderRow = (reverse = false, speed = "55s") => {
    // Repeat items to fill space and guarantee seamless looping
    const repeatedItems = Array(8).fill(items).flat();
    
    return (
      <div className="group flex whitespace-nowrap overflow-hidden py-3.5 transition-all duration-500 cursor-pointer">
        <div 
          className={`flex gap-12 items-center group-hover:[animation-play-state:paused] ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
          style={{ animationDuration: speed, willChange: 'transform' }}
        >
          {repeatedItems.map((item, index) => (
            <div key={index} className="flex items-center gap-12">
              <span className="text-textMuted font-mono text-xs md:text-sm tracking-[0.25em] font-semibold text-3d">
                {item}
              </span>
              <span 
                className={`font-mono text-sm select-none ${
                  index % 2 === 0 
                    ? 'text-brandTeal text-3d-teal' 
                    : 'text-brandAmber text-3d-amber'
                }`}
              >
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden flex flex-col relative z-20 ticker-container-3d py-6 gap-4">
      <div className="ticker-row-3d-top">
        {renderRow(false, "60s")}
      </div>
      <div className="ticker-row-3d-bottom">
        {renderRow(true, "52s")}
      </div>
    </div>
  );
}
