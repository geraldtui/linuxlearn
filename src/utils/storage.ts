export interface LessonProgress {
  currentStep: number;
  lastStep: number;
}

export function loadProgress(lessonKey: string): LessonProgress | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const key = `lesson.${lessonKey}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading progress:', error);
    return null;
  }
}

export function saveProgress(lessonKey: string, progress: LessonProgress): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = `lesson.${lessonKey}`;
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

export function clearProgress(lessonKey: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = `lesson.${lessonKey}`;
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
}

export function getAllProgress(): Record<string, LessonProgress> {
  if (typeof window === 'undefined') return {};
  
  try {
    const allKeys = Object.keys(localStorage).filter(key => key.startsWith('lesson.'));
    const progress: Record<string, LessonProgress> = {};
    
    allKeys.forEach(key => {
      const lessonKey = key.replace('lesson.', '');
      const data = localStorage.getItem(key);
      if (data) {
        progress[lessonKey] = JSON.parse(data);
      }
    });
    
    return progress;
  } catch (error) {
    console.error('Error getting all progress:', error);
    return {};
  }
}
