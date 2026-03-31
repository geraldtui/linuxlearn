import { useTerminalContext } from '@/context/InteractiveTerminalContext';
import clsx from 'clsx';

export function LearnProgress() {
  const { lessonData, step, lastStep, setStep } = useTerminalContext();

  return (
    <nav
      className="w-full lg:w-64 lg:max-w-xs shrink-0 bg-terminal-surface border-b lg:border-b-0 lg:border-r border-terminal-surface p-4 overflow-x-auto lg:overflow-y-auto lg:overflow-x-visible"
      aria-label="Lesson steps"
    >
      <h3 className="text-sm font-semibold text-terminal-muted mb-4 uppercase tracking-wide">
        Progress
      </h3>
      
      <div className="space-y-2">
        {lessonData.map((stepData, index) => {
          const isCompleted = index <= lastStep;
          const isCurrent = index === step;
          const isLocked = index > lastStep + 1;

          return (
            <button
              key={index}
              onClick={() => !isLocked && setStep(index)}
              disabled={isLocked}
              className={clsx(
                'w-full text-left px-4 py-3 rounded-lg transition-all',
                'flex items-center gap-3',
                isCurrent && 'bg-terminal-prompt/20 border border-terminal-prompt',
                !isCurrent && !isLocked && 'hover:bg-terminal-surface/50',
                isLocked && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className={clsx(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold',
                isCompleted && 'bg-terminal-success text-white',
                isCurrent && !isCompleted && 'bg-terminal-prompt text-white',
                isLocked && 'bg-terminal-surface text-terminal-muted'
              )}>
                {isCompleted ? '✓' : index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className={clsx(
                  'text-sm font-medium truncate',
                  isCurrent && 'text-terminal-text',
                  !isCurrent && !isLocked && 'text-terminal-muted',
                  isLocked && 'text-terminal-muted/50'
                )}>
                  {stepData.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
