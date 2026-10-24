import { expect, test } from '@playwright/test';

async function startItalian(page, mode) {
  await page.goto('/');
  await page.locator('[data-profile="dad"]').click();
  await page.locator('[data-opening="italian"]').click();
  await page.locator(`[data-mode="${mode}"]`).click();
}

test('Learn auto-opens the current explanation after e4 e5, and Practice/Mastery do not', async ({ page }) => {
  await startItalian(page, 'learn');

  await page.locator('#board [data-square="e2"]').click();
  await page.locator('#board [data-square="e4"]').click();
  await expect(page.locator('#board [data-square="e5"] .piece')).toHaveText('♟');
  await page.locator('#board [data-square="g1"]').click();

  const panel = page.locator('#teaching-panel');
  await expect(panel).toHaveClass(/expanded/);
  await expect(panel).toContainText('Nf3');
  await expect(panel).toContainText('Nf3 develops toward the centre');
  const arrow = page.locator('.board-overlay svg line');
  await expect(arrow).toHaveCount(1);
  await expect(arrow).toHaveAttribute('x1', '81.25');
  await expect(arrow).toHaveAttribute('y1', '93.75');
  await expect(arrow).toHaveAttribute('x2', '68.75');
  await expect(arrow).toHaveAttribute('y2', '68.75');

  await page.locator('[data-action="close-why"]').click();
  await expect(panel).not.toHaveClass(/expanded/);
  await page.locator('#board [data-square="d2"]').click();
  await page.locator('#board [data-square="g1"]').click();
  await expect(panel).not.toHaveClass(/expanded/);

  for (const mode of ['practice', 'mastery']) {
    await startItalian(page, mode);
    const practicePanel = page.locator('#teaching-panel');
    await page.locator('#board [data-square="e2"]').click();
    await expect(practicePanel).not.toHaveClass(/expanded/);
    await expect(page.locator('#board [data-square="e2"]')).not.toHaveClass(/recommended-piece/);
    await expect(page.locator('.board-overlay svg line')).toHaveCount(0);
  }
});

test('10-move Learn keeps showing teaching text after the fifth White move', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-profile="dad"]').click();
  await page.locator('[data-opening="italian"]').click();
  await page.locator('[data-depth="10"]').click();
  await page.locator('[data-mode="learn"]').click();

  for (const [from, to] of [
    ['e2', 'e4'],
    ['g1', 'f3'],
    ['f1', 'c4'],
    ['c2', 'c3'],
    ['d2', 'd3']
  ]) {
    await page.locator(`#board [data-square="${from}"]`).click();
    await page.locator(`#board [data-square="${to}"]`).click();
    await page.waitForTimeout(750);
  }

  const feedback = page.locator('#feedback');
  await expect(feedback).toContainText('Castling gets the king safe');
  await expect(feedback).not.toContainText(/undefined|null/i);
});
