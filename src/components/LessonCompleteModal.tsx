import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface LessonCompleteModalProps {
  lessonKey: string;
  onClose: () => void;
}

export function LessonCompleteModal({ lessonKey, onClose }: LessonCompleteModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
    });

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Lesson complete"
    >
      <div className="bg-terminal-surface border border-terminal-prompt/30 rounded-2xl p-10 max-w-md w-full mx-4 text-center shadow-2xl">
        <div className="text-5xl mb-4">🎉</div>

        <h2 className="text-2xl font-bold text-terminal-text mb-3">
          Lesson Complete!
        </h2>

        <p className="text-terminal-muted mb-8">
          Great work! You&apos;ve successfully completed this lesson. Keep the momentum going and tackle the next one.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/learn"
            className="block w-full bg-terminal-prompt hover:bg-terminal-prompt/90 text-white font-semibold py-3 px-6 rounded-lg transition-all"
          >
            Browse More Lessons
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-terminal-muted hover:text-terminal-text py-2 px-6 rounded-lg transition-all text-sm"
          >
            Stay on this lesson
          </button>
        </div>
      </div>
    </div>
  );
}
