import { describe, expect, it } from 'vitest';
import { openings } from '../src/openings.js';
import { teachingFor } from '../src/teaching.js';
import fs from 'node:fs';

describe('Show Me Why', () => {
  it('renders inline instead of a teaching modal', () => {
    const source = fs.readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
    const styles = fs.readFileSync(new URL('../src/refinement.css', import.meta.url), 'utf8');
    expect(source).toContain('inline-teaching');
    expect(source).not.toContain('teaching-backdrop');
    expect(source).toContain('Your move <strong>${attempted}</strong> is legal, but this repertoire recommends');
    const teachingSlice = source.slice(source.indexOf('function showTeaching()'), source.indexOf('function startMode('));
    expect(teachingSlice).not.toContain('role="dialog"');
    expect(styles).toContain('.coach-panel{height:auto;max-height:none;min-height:0;overflow:visible');
    expect(styles).toContain('.inline-teaching.expanded{height:auto;max-height:none;min-height:0');
    expect(styles).toContain('@media(max-width:760px){.training-layout{grid-template-columns:minmax(0,1fr)');
  });
  it('provides e4 guidance for the Italian opening', () => {
    const lesson = teachingFor(openings.find((opening) => opening.id === 'italian'), openings.find((opening) => opening.id === 'italian').moves, 0, 'dad');
    expect(lesson.san).toBe('e4');
    expect(lesson.move).toEqual({ from: 'e2', to: 'e4' });
    expect(lesson.highlights.map((item) => item.square)).toEqual(['d5', 'f5']);
    expect(lesson.explanation.length).toBeGreaterThan(30);
  });

  it('explains Italian c3 by preparing the d4 central advance', () => {
    const italian = openings.find((opening) => opening.id === 'italian');
    const lesson = teachingFor(italian, italian.moves, 3, 'dad');
    expect(lesson.san).toBe('c3');
    expect(lesson.why).toMatch(/prepare.*d4/i);
    expect(lesson.simple).toMatch(/push.*d-pawn.*d4/i);
  });

  for (const opening of openings) {
    it(`${opening.name} teaching data matches the current move`, () => {
      const lesson = teachingFor(opening, opening.moves, 0, 'daughter');
      expect(lesson.san).toBe(opening.moves[0]);
      expect(lesson.move.from).toMatch(/^[a-h][1-8]$/);
      expect(lesson.move.to).toMatch(/^[a-h][1-8]$/);
    });
  }

  it('uses each family profile’s existing explanation style', () => {
    const italian = openings.find((opening) => opening.id === 'italian');
    const daughter = teachingFor(italian, italian.moves, 0, 'daughter');
    const son = teachingFor(italian, italian.moves, 0, 'son');
    const dad = teachingFor(italian, italian.moves, 0, 'dad');
    expect(daughter.explanation).toBe(daughter.simple);
    expect(son.explanation).toContain('This directly supports');
    expect(dad.explanation).toContain(dad.plan);
  });
});
