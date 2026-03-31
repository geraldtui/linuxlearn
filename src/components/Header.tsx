import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

export function Header() {
  const router = useRouter();
  const isLearnSection = router.pathname.includes('/learn');

  return (
    <header className="bg-terminal-surface border-b border-terminal-surface">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-terminal-text hover:text-terminal-prompt transition"
          aria-label="LinuxLearn home"
        >
          LinuxLearn
        </Link>

        <nav className="flex items-center gap-6" aria-label="Main">
          <Link
            href="/learn"
            className={clsx(
              'transition',
              isLearnSection
                ? 'text-terminal-prompt font-medium'
                : 'text-terminal-muted hover:text-terminal-text'
            )}
          >
            Learn
          </Link>
        </nav>
      </div>
    </header>
  );
}
