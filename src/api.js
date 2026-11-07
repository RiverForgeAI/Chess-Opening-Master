const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8000';

export function apiBaseUrl(env = import.meta.env) {
  if (env.DEV && isPythonApiEnabled(env)) {
    return '/api';
  }

  const raw = (env.VITE_API_BASE_URL ?? '').trim();
  return raw ? raw.replace(/\/$/, '') : DEFAULT_API_BASE_URL;
}

export function isPythonApiEnabled(env = import.meta.env) {
  if (env.PROD) return false;
  return env.DEV && String(env.VITE_USE_PYTHON_API ?? '').toLowerCase() === 'true';
}

export async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal, headers: { Accept: 'application/json', ...(options.headers ?? {}) } });
    const payload = await response.json().catch(() => null);
    clearTimeout(timer);
    return { ok: response.ok, status: response.status, payload, headers: response.headers };
  } catch (error) {
    clearTimeout(timer);
    if (error?.name === 'AbortError') {
      return { ok: false, status: 0, payload: { error: { code: 'timeout', message: 'The request timed out.' } }, timedOut: true };
    }
    return { ok: false, status: 0, payload: { error: { code: 'network_error', message: 'The API could not be reached.' } }, networkError: true };
  }
}

function requireFields(payload, fields) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Malformed API response');
  }
  for (const field of fields) {
    if (!(field in payload)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

export async function startTrainingSession(openingId, depth) {
  const response = await fetchJsonWithTimeout(`${apiBaseUrl()}/training/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ opening_id: openingId, depth })
  });

  if (!response.ok) {
    return { ok: false, errorType: response.payload?.error?.code ?? 'api_error', message: response.payload?.error?.message ?? 'Training could not be started.', response };
  }

  try {
    requireFields(response.payload, ['opening_id', 'depth', 'status', 'history', 'fen', 'current_white_move', 'remaining_white_moves']);
    return { ok: true, payload: response.payload };
  } catch (error) {
    return { ok: false, errorType: 'invalid_response', message: error.message, response };
  }
}

export async function submitTrainingMove({ openingId, depth, history, move }) {
  const response = await fetchJsonWithTimeout(`${apiBaseUrl()}/training/move`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ opening_id: openingId, depth, history, move })
  });

  if (!response.ok) {
    return { ok: false, errorType: response.payload?.error?.code ?? 'api_error', message: response.payload?.error?.message ?? 'The move could not be processed.', response };
  }

  try {
    requireFields(response.payload, ['opening_id', 'depth', 'status', 'outcome', 'history', 'fen', 'black_reply', 'current_white_move', 'remaining_white_moves', 'legal', 'repertoire_correct']);
    return { ok: true, payload: response.payload };
  } catch (error) {
    return { ok: false, errorType: 'invalid_response', message: error.message, response };
  }
}

export function isApiFailure(result) {
  return !result?.ok;
}

export function isValidApiOutcome(payload) {
  if (!payload || typeof payload !== 'object') return false;
  return ['correct', 'off_repertoire', 'illegal'].includes(payload.outcome) && ['in_progress', 'restarted', 'completed'].includes(payload.status);
}
