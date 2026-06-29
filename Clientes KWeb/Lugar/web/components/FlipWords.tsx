"use client";

import { useEffect, useState } from "react";

export default function FlipWords({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className="relative inline-block">
      <span key={i} className="blur-in inline-block text-clay">
        {words[i]}
      </span>
    </span>
  );
}
