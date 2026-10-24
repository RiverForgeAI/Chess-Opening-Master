const STORAGE_PREFIX = 'chess-opening-master:';
const SCHEMA = 2;

const blankProgress = () => ({ schema: SCHEMA, openings: {} });
const freshRecord = () => ({
  attempts: 0, completions: 0, mistakes: {}, hints: 0, assistedAttempts: 0,
  perfectCompletions: 0, streak: 0, bestStreak: 0, mastery: false, lastPlayed: null
});

function migrate(parsed) {
  const progress = parsed && typeof parsed.openings === 'object' ? parsed.openings : {};
  if (parsed?.schema === SCHEMA) return { schema: SCHEMA, openings: progress };
  const migrated = {};
  for (const [key, record] of Object.entries(progress)) {
    migrated[key.includes(':') ? key : `${key}:5`] = record;
  }
  for (const [key, record] of Object.entries(progress)) {
    if (!key.includes(':')) migrated[`${key}:5`] = record;
  }
  return { schema: SCHEMA, openings: migrated };
}

export function loadProgress(profileId) {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${profileId}`);
    if (!raw) return blankProgress();
    const parsed = JSON.parse(raw);
    if (typeof parsed.openings !== 'object' || !parsed.openings) return blankProgress();
    return migrate(parsed);
  } catch {
    return blankProgress();
  }
}

export function saveProgress(profileId, progress) {
  localStorage.setItem(`${STORAGE_PREFIX}${profileId}`, JSON.stringify({ ...progress, schema: SCHEMA }));
}

export function recordCompletion(profileId, openingId, mode, assisted, depth = 5) {
  const progress = loadProgress(profileId);
  const key = `${openingId}:${depth}`;
  const record = progress.openings[key] ?? freshRecord();
  record.attempts += 1;
  record.completions += 1;
  if (assisted) record.assistedAttempts += 1;
  if (mode === 'mastery') {
    if (!assisted) {
      record.streak += 1;
      record.perfectCompletions += 1;
      record.bestStreak = Math.max(record.bestStreak, record.streak);
      if (record.streak >= 3) record.mastery = true;
    } else {
      record.streak = 0;
    }
  }
  record.lastPlayed = new Date().toISOString();
  progress.openings[key] = record;
  saveProgress(profileId, progress);
  return record;
}

export function recordMistake(profileId, openingId, moveNumber, depth = 5) {
  const progress = loadProgress(profileId);
  const key = `${openingId}:${depth}`;
  const record = progress.openings[key] ?? freshRecord();
  record.attempts += 1;
  record.mistakes[moveNumber] = (record.mistakes[moveNumber] ?? 0) + 1;
  record.streak = 0;
  progress.openings[key] = record;
  saveProgress(profileId, progress);
}

export function loadTheme(profileId) { return localStorage.getItem(`${STORAGE_PREFIX}theme:${profileId}`) ?? profileId; }
export function saveTheme(profileId, theme) { localStorage.setItem(`${STORAGE_PREFIX}theme:${profileId}`, theme); }
