import { useEffect, useState } from 'react';
import { useTerminalContext } from '@/context/InteractiveTerminalContext';
import { LessonCompleteModal } from './LessonCompleteModal';
import clsx from 'clsx';

export function LearnFooter() {
  const { step, success, nextStep, prevStep, lessonData, lessonKey } = useTerminalContext();
  const [showModal, setShowModal] = useState(false);

  const isLastStep = step >= lessonData.length - 1;
  const canComplete = isLastStep && success;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        prevStep();
      } else if (e.key === 'Enter' && success && !e.shiftKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          if (canComplete) {
            setShowModal(true);
          } else {
            nextStep();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [success, nextStep, prevStep, canComplete]);

  return (
    <>
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

          {canComplete ? (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              aria-label="Complete lesson"
              className="px-4 py-2 rounded-lg font-medium transition-all bg-terminal-success hover:bg-terminal-success/90 text-white"
            >
              Complete ✓
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              disabled={!success || isLastStep}
              aria-label="Next step"
              className={clsx(
                'px-4 py-2 rounded-lg font-medium transition-all',
                !success || isLastStep
                  ? 'bg-terminal-surface text-terminal-muted cursor-not-allowed'
                  : 'bg-terminal-prompt hover:bg-terminal-prompt/90 text-white'
              )}
            >
              Next →
            </button>
          )}
        </div>
      </footer>

      {showModal && (
        <LessonCompleteModal
          lessonKey={lessonKey}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
