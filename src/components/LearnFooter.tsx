import { useEffect } from 'react';
import { useTerminalContext } from '@/context/InteractiveTerminalContext';
import clsx from 'clsx';

export function LearnFooter() {
  const { step, lastStep, success, nextStep, prevStep, lessonData } = useTerminalContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        prevStep();
      } else if (e.key === 'Enter' && success && !e.shiftKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          nextStep();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [success, nextStep, prevStep]);

  return (
    <footer className="bg-terminal-surface border-t border-terminal-surface px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={step === 0}
          aria-label="Previous step"
          className={clsx(
            'px-4 py-2 rounded-lg font-medium transition-all',
            step === 0
              ? 'bg-terminal-surface text-terminal-muted cursor-not-allowed'
              : 'bg-terminal-surface hover:bg-terminal-surface/70 text-terminal-text'
          )}
        >
          ← Previous
        </button>

        <div className="text-sm text-terminal-muted">
          <span className="font-semibold text-terminal-text">{step + 1}</span>
          {' / '}
          {lessonData.length}
        </div>

        <button
          type="button"
          onClick={nextStep}
          disabled={!success || step >= lessonData.length - 1}
          aria-label="Next step"
          className={clsx(
            'px-4 py-2 rounded-lg font-medium transition-all',
            !success || step >= lessonData.length - 1
              ? 'bg-terminal-surface text-terminal-muted cursor-not-allowed'
              : 'bg-terminal-prompt hover:bg-terminal-prompt/90 text-white'
          )}
        >
          Next →
        </button>
      </div>
    </footer>
  );
}
