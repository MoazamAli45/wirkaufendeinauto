import { useState, useEffect } from "react";

const RevealText = () => {
  const words = ["bequem", "einfach", "Schnell"]; // Words to display
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change word every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block overflow-hidden">
      {/* Text with animation */}
      <span
        key={currentWordIndex} // Ensure a fresh render
        className="block text-5xl font-bold text-[#EE202C] transition-all duration-500 ease-in-out"
      >
        {words[currentWordIndex]}
      </span>

      {/* Bottom Line Animation */}
      <div
        key={`line-${currentWordIndex}`} // Reset line animation on each word change
        className="absolute -bottom-[2px] left-0 h-1 bg-[#EE202C] animate-line "
      />
    </div>
  );
};

export default RevealText;
