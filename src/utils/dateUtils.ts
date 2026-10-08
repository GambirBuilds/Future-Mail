export interface TimeRemaining {
  totalSeconds: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function calculateTimeRemaining(targetDateIso: string, referenceDate: Date = new Date()): TimeRemaining {
  const target = new Date(targetDateIso).getTime();
  const current = referenceDate.getTime();
  const diff = target - current;

  if (diff <= 0) {
    return {
      totalSeconds: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalSeconds,
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
  };
}

export function calculateJourneyProgress(
  createdAtIso: string,
  scheduledForIso: string,
  referenceDate: Date = new Date()
): number {
  const start = new Date(createdAtIso).getTime();
  const end = new Date(scheduledForIso).getTime();
  const now = referenceDate.getTime();

  if (end <= start) return 100;
  if (now >= end) return 100;
  if (now <= start) return 0;

  const total = end - start;
  const elapsed = now - start;
  const percentage = Math.round((elapsed / total) * 100);
  return Math.min(100, Math.max(0, percentage));
}

export function formatTemporalDate(dateIso: string): string {
  try {
    const d = new Date(dateIso);
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateIso;
  }
}

export function formatShortDate(dateIso: string): string {
  try {
    const d = new Date(dateIso);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateIso;
  }
}

export function generateStardate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1).getTime();
  const endOfYear = new Date(year + 1, 0, 1).getTime();
  const fraction = ((date.getTime() - startOfYear) / (endOfYear - startOfYear)) * 1000;
  return `FM-${year}.${fraction.toFixed(0).padStart(3, '0')}`;
}

export function getDaysUntil(targetDateIso: string): number {
  const diffMs = new Date(targetDateIso).getTime() - Date.now();
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
