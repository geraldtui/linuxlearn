import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllProgress } from '@/utils/storage';

export function Hero() {
  const [hasProgress, setHasProgress] = useState(false);

  useEffect(() => {
    const progress = getAllProgress();
    if (Object.keys(progress).length > 0) {
      setHasProgress(true);
    }
  }, []);

  return (
    <section
      className="text-center mb-16"
      aria-labelledby="landing-hero-heading"
    >
      <h1
        id="landing-hero-heading"
        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-terminal-prompt to-terminal-success bg-clip-text text-transparent"
      >
        Learn Linux Commands
      </h1>
      <p className="text-xl text-terminal-muted mb-12 max-w-2xl mx-auto">
        Master the terminal through interactive, hands-on lessons. No
        installation required.
      </p>
      <Link
        href="/learn"
        className="inline-block bg-terminal-prompt text-white px-8 py-4 rounded-lg hover:bg-terminal-prompt/90 transition text-lg font-semibold"
      >
        {hasProgress ? 'Continue Learning' : 'Start Learning'}
      </Link>
    </section>
  );
}
