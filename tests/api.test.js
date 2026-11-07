import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiBaseUrl, isPythonApiEnabled, startTrainingSession, submitTrainingMove } from '../src/api.js';

describe('python API configuration', () => {
  it('keeps API mode disabled by default', () => {
    expect(isPythonApiEnabled({ DEV: true, PROD: false, VITE_USE_PYTHON_API: 'false' })).toBe(false);
  });

  it('prevents production builds from enabling the Codespaces API', () => {
    expect(isPythonApiEnabled({ DEV: false, PROD: true, VITE_USE_PYTHON_API: 'true' })).toBe(false);
  });

  it('uses a same-origin API proxy in development when Python mode is enabled', () => {
    expect(apiBaseUrl({ DEV: true, PROD: false, VITE_USE_PYTHON_API: 'true' })).toBe('/api');
  });

  it('uses a direct backend host when one is provided and proxy mode is off', () => {
    expect(apiBaseUrl({ DEV: true, PROD: false, VITE_USE_PYTHON_API: 'false', VITE_API_BASE_URL: 'https://codespace-8000.app.github.dev/' })).toBe('https://codespace-8000.app.github.dev');
  });
});

describe('python API client', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('starts a training session successfully', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers(),
      json: async () => ({
        opening_id: 'italian',
        depth: 5,
        status: 'in_progress',
        history: [],
        fen: 'startfen',
        current_white_move: 1,
        remaining_white_moves: 5,
      }),
    }));

    const result = await startTrainingSession('italian', 5);

    expect(result.ok).toBe(true);
    expect(result.payload.history).toEqual([]);
    expect(fetch).toHaveBeenCalledWith(
      '/api/training/start',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('handles a correct e4 response with automatic e5', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers(),
      json: async () => ({
        opening_id: 'italian',
        depth: 5,
        status: 'in_progress',
        outcome: 'correct',
        history: ['e4', 'e5'],
        fen: 'after-e5',
        black_reply: 'e5',
        current_white_move: 2,
        remaining_white_moves: 4,
        legal: true,
        repertoire_correct: true,
      }),
    }));

    const result = await submitTrainingMove({
      openingId: 'italian',
      depth: 5,
      history: [],
      move: 'e4',
    });

    expect(result.ok).toBe(true);
    expect(result.payload.black_reply).toBe('e5');
    expect(result.payload.history).toEqual(['e4', 'e5']);
  });

  it('returns a timeout-style failure for malformed or unavailable responses', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers(),
      json: async () => ({ ok: true }),
    }));

    const malformed = await submitTrainingMove({
      openingId: 'italian',
      depth: 5,
      history: [],
      move: 'e4',
    });
    expect(malformed.ok).toBe(false);
    expect(malformed.errorType).toBe('invalid_response');

    vi.stubGlobal('fetch', vi.fn().mockImplementation(() => Promise.reject(new Error('network-error'))));
    const network = await startTrainingSession('italian', 5);
    expect(network.ok).toBe(false);
    expect(network.errorType).toBe('network_error');
  });
});
