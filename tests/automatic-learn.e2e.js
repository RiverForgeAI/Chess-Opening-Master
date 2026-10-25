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

test('Strategy Academy switches its board and strategic priorities by depth', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-profile="dad"]').click();
  await page.locator('[data-strategy-opening="italian"]').click();

  const sections = page.locator('.strategy-section');
  await expect(sections.nth(1)).toContainText('king remains on e1');
  await expect(sections.nth(2)).toContainText('c3 and d3');
  await expect(sections.nth(6)).toContainText('bring out the c1-bishop');
  await expect(page.locator('#strategy-board [data-square="e1"] .piece')).toHaveText('♔');

  await page.locator('[data-strategy-depth="10"]').click();

  await expect(sections.nth(1)).toContainText('King on g1 is castled');
  await expect(sections.nth(2)).toContainText('c3, d3 and e4');
  await expect(sections.nth(6)).toContainText('Black’s castled king');
  await expect(page.locator('#strategy-board [data-square="g1"] .piece')).toHaveText('♔');
  await expect(page.locator('#strategy-board [data-square="e1"] .piece')).toHaveText('♖');
});

test('Strategy Academy keeps the reference board beside the selected lesson on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await page.locator('[data-profile="dad"]').click();
  await page.locator('[data-strategy-opening="italian"]').click();

  const boardBox = await page.locator('#strategy-board').boundingBox();
  const lessonBox = await page.locator('.strategy-lesson-column').boundingBox();
  expect(boardBox.x + boardBox.width).toBeLessThan(lessonBox.x);
  await expect(page.locator('.strategy-section')).toHaveCount(8);
  await expect(page.locator('.strategy-reference-column')).toHaveCSS('position', 'sticky');

  await page.locator('[data-strategy-section="7"]').first().click();
  await expect(page.locator('#strategy-current-section')).toContainText('Key Takeaways');
  await expect(page.locator('[data-strategy-section="7"].strategy-nav-step')).toHaveAttribute('aria-current', 'step');
  await expect(page.locator('#strategy-board [data-square="e1"] .piece')).toHaveText('♔');
  await expect.poll(async () => (await page.locator('.strategy-reference-column').boundingBox()).y).toBeLessThan(30);
});

test('Strategy Academy section headings stay clear of the sticky navigation at every viewport width', async ({ page }) => {
  const viewports = [
    { width: 1280, height: 900 },
    { width: 820, height: 900 },
    { width: 390, height: 844 }
  ];

  await page.goto('/');
  await page.locator('[data-profile="dad"]').click();
  await page.locator('[data-strategy-opening="italian"]').click();

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    if (viewport.width === 390) await page.emulateMedia({ reducedMotion: 'reduce' });
    const sectionIndexes = viewport.width === 1280
      ? [4, 0, 1, 2, 3, 5, 6, 7]
      : [4, 7];

    for (const index of sectionIndexes) {
      await page.locator(`.strategy-nav-step[data-strategy-section="${index}"]`).click();
      const heading = page.locator(`#strategy-section-${String.fromCharCode(65 + index)} h3`);

      await expect.poll(async () => heading.evaluate((element) => {
        const headingRect = element.getBoundingClientRect();
        const nav = document.querySelector('.strategy-nav');
        const navRect = nav.getBoundingClientRect();
        const sticky = getComputedStyle(nav).position === 'sticky';
        const gap = headingRect.top - (sticky ? navRect.bottom : 0);
        return gap >= 16 && gap <= 24 && headingRect.bottom <= window.innerHeight;
      }), { message: `Section ${String.fromCharCode(65 + index)} at ${viewport.width}px` }).toBe(true);

      const gap = await heading.evaluate((element) => {
        const nav = document.querySelector('.strategy-nav');
        const boundary = getComputedStyle(nav).position === 'sticky' ? nav.getBoundingClientRect().bottom : 0;
        return element.getBoundingClientRect().top - boundary;
      });
      expect(gap).toBeGreaterThanOrEqual(16);
      expect(gap).toBeLessThanOrEqual(24);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    }
  }
});

test('Strategy Academy uses one compact lesson at a time on narrow screens', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('[data-profile="daughter"]').click();
  await page.locator('[data-strategy-opening="italian"]').click();

  await expect(page.locator('.strategy-section:visible')).toHaveCount(1);
  await expect(page.locator('.strategy-focus .kitten-svg')).toBeVisible();
  expect(await page.locator('.strategy-nav-step span').first().evaluate((step) => getComputedStyle(step, '::before').content)).toContain('🐾');
  await page.locator('.strategy-section.selected [data-strategy-section="1"]').click();
  await expect(page.locator('.strategy-section:visible')).toHaveCount(1);
  await expect(page.locator('#strategy-current-section')).toContainText('Ideal Piece Development');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('Learn and Strategy Academy boards fit viewport width and height without clipping', async ({ page }) => {
  const viewports = [
    { width: 1440, height: 900 },
    { width: 1024, height: 768 },
    { width: 900, height: 600 },
    { width: 768, height: 700 },
    { width: 390, height: 844 },
    { width: 900, height: 500 }
  ];

  await startItalian(page, 'learn');
  await page.locator('#why-button').click();

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    const board = page.locator('#board .board-shell');
    const geometry = await board.evaluate((shell) => {
      const shellRect = shell.getBoundingClientRect();
      const grid = shell.querySelector('.board-grid');
      const gridRect = grid.getBoundingClientRect();
      const squares = [...grid.querySelectorAll('.square')];
      const squareRects = squares.map((square) => square.getBoundingClientRect());
      const squareDimensions = squareRects.flatMap((rect) => [rect.width, rect.height]);
      const largestPiece = Math.max(...[...grid.querySelectorAll('.piece')].map((piece) => piece.getBoundingClientRect().height));
      const cellHeight = Math.min(...squareRects.map((rect) => rect.height));
      const coordinates = [...grid.querySelectorAll('.coordinate')];
      const overlay = shell.querySelector('.board-overlay svg')?.getBoundingClientRect();
      return {
        width: shellRect.width,
        height: shellRect.height,
        gridWidth: gridRect.width,
        gridHeight: gridRect.height,
        squareCount: squares.length,
        squaresFit: squareRects.every((rect) => (
          rect.left >= gridRect.left && rect.right <= gridRect.right
          && rect.top >= gridRect.top && rect.bottom <= gridRect.bottom
        )),
        squareSize: Math.max(...squareRects.map((rect) => Math.abs(rect.width - rect.height))),
        squareSizeSpread: Math.max(...squareDimensions) - Math.min(...squareDimensions),
        coordinateCount: coordinates.length,
        coordinatesFit: coordinates.every((coordinate) => {
          const rect = coordinate.getBoundingClientRect();
          return rect.left >= gridRect.left && rect.right <= gridRect.right
            && rect.top >= gridRect.top && rect.bottom <= gridRect.bottom;
        }),
        pieceFitsCell: largestPiece <= cellHeight,
        overlayWidth: overlay?.width,
        overlayHeight: overlay?.height,
        boardBottom: shellRect.bottom,
        documentHeight: document.documentElement.scrollHeight,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    });

    expect(geometry.width).toBeGreaterThan(0);
    expect(Math.abs(geometry.width - geometry.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(geometry.gridWidth - geometry.gridHeight)).toBeLessThanOrEqual(1);
    expect(geometry.squareCount).toBe(64);
    expect(geometry.squaresFit).toBe(true);
    expect(geometry.squareSize).toBeLessThanOrEqual(1);
    expect(geometry.squareSizeSpread).toBeLessThanOrEqual(1);
    expect(geometry.coordinateCount).toBe(16);
    expect(geometry.coordinatesFit).toBe(true);
    expect(geometry.pieceFitsCell).toBe(true);
    expect(geometry.boardBottom).toBeLessThanOrEqual(geometry.documentHeight);
    expect(geometry.horizontalOverflow).toBe(false);
    expect(geometry.overlayWidth).toBeCloseTo(geometry.gridWidth, 0);
    expect(geometry.overlayHeight).toBeCloseTo(geometry.gridHeight, 0);

    const coach = await page.locator('.coach-panel').boundingBox();
    expect(coach.width).toBeGreaterThan(0);
    await expect(page.locator('#why-button')).toBeVisible();
    await expect(page.locator('.inline-teaching.expanded')).toBeVisible();
  }

  await page.goto('/');
  await page.locator('[data-profile="dad"]').click();
  await page.locator('[data-strategy-opening="italian"]').click();

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    const board = page.locator('#strategy-board .board-shell');
    const dimensions = await board.evaluate((shell) => {
      const rect = shell.getBoundingClientRect();
      const squares = [...shell.querySelectorAll('.square')];
      const gridRect = shell.querySelector('.board-grid').getBoundingClientRect();
      const squareDimensions = squares.flatMap((square) => {
        const squareRect = square.getBoundingClientRect();
        return [squareRect.width, squareRect.height];
      });
      return {
        width: rect.width,
        height: rect.height,
        squareCount: squares.length,
        squareSizeSpread: Math.max(...squareDimensions) - Math.min(...squareDimensions),
        coordinateCount: shell.querySelectorAll('.coordinate').length,
        allSquaresReachable: squares.every((square) => {
          const squareRect = square.getBoundingClientRect();
          return squareRect.left >= gridRect.left && squareRect.right <= gridRect.right
            && squareRect.top >= gridRect.top && squareRect.bottom <= gridRect.bottom
            && squareRect.bottom <= document.documentElement.scrollHeight;
        }),
        boardBottom: rect.bottom,
        documentHeight: document.documentElement.scrollHeight,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    });

    expect(dimensions.width).toBeGreaterThan(0);
    expect(Math.abs(dimensions.width - dimensions.height)).toBeLessThanOrEqual(1);
    expect(dimensions.squareCount).toBe(64);
    expect(dimensions.squareSizeSpread).toBeLessThanOrEqual(1);
    expect(dimensions.coordinateCount).toBe(16);
    expect(dimensions.allSquaresReachable).toBe(true);
    expect(dimensions.boardBottom).toBeLessThanOrEqual(dimensions.documentHeight);
    expect(dimensions.horizontalOverflow).toBe(false);
    await page.locator('.strategy-nav-step[data-strategy-section="4"]').click();
    await expect(page.locator('.strategy-nav-step[data-strategy-section="4"]')).toHaveAttribute('aria-current', 'step');
  }
});

test('each family profile retains its own board squares and frame styling', async ({ page }) => {
  const boardThemes = [];
  for (const profile of ['dad', 'son', 'daughter']) {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await page.locator(`[data-profile="${profile}"]`).click();
    await page.locator('[data-strategy-opening="italian"]').click();
    boardThemes.push(await page.locator('#strategy-board .square.light').first().evaluate((square) => ({
      light: getComputedStyle(square).backgroundImage,
      dark: getComputedStyle(square.parentElement.querySelector('.square.dark')).backgroundImage,
      frame: getComputedStyle(square.closest('.board-shell')).getPropertyValue('--board-frame').trim()
    })));
    if (profile === 'daughter') {
      await expect(page.locator('.strategy-focus .kitten-svg')).toBeVisible();
      await expect(page.locator('.strategy-nav-step span').first()).toBeVisible();
    }
  }
  expect(new Set(boardThemes.map((theme) => theme.light)).size).toBe(3);
  expect(new Set(boardThemes.map((theme) => theme.dark)).size).toBe(3);
  expect(new Set(boardThemes.map((theme) => theme.frame)).size).toBe(3);
});
