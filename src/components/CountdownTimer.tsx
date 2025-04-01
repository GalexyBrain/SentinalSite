
import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-04-28').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setFinished(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
      {finished ? (
        <div className="col-span-4 text-center p-6 bg-black/30 rounded-lg backdrop-blur-sm border border-red-500/20">
          <div className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-red-500 to-red-700">
            Event Started!
          </div>
        </div>
      ) : (
        Object.entries(timeLeft).map(([unit, value]) => (
          <div 
            key={unit} 
            className="text-center p-4 sm:p-6 bg-black/30 rounded-lg backdrop-blur-sm border border-red-500/20 hover:border-red-500/40 transition-all transform hover:scale-105 group"
          >
            <div className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-red-500 to-red-700 group-hover:scale-110 transition-transform">
              {value}
            </div>
            <div className="text-xs sm:text-sm text-gray-300 uppercase mt-2">{unit}</div>
          </div>
        ))
      )}
    </div>
  );
}
