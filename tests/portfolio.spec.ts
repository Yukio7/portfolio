import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import sharp from "sharp";

async function ready(page: Page) {
  await page.goto("/");
  await expect(page.locator(".world-status")).toContainText("SYSTEM ONLINE", { timeout: 30000 });
}

async function goTo(page: Page, chapter: string) {
  if (await page.locator(".menu-toggle").isVisible()) {
    await page.getByRole("button", { name: "Ouvrir le menu", exact: true }).click();
    await page.locator(`#mobile-menu a[href='#${chapter}']`).click();
  } else {
    await page.locator(`.chapter-rail a[href='#${chapter}']`).click();
  }
  await expect.poll(() => page.locator(`#${chapter}`).evaluate((element) => Math.abs(element.getBoundingClientRect().top - 80))).toBeLessThan(5);
}

async function scenePixels(page: Page) {
  const buffer = await page.locator("canvas").screenshot();
  return sharp(buffer).removeAlpha().raw().toBuffer({ resolveWithObject: true });
}

test("renders a nonblank, moving infrastructure without runtime errors", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await ready(page);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("ArthurManhaudier.");
  const first = await scenePixels(page);
  let highlights = 0;
  let coral = 0;
  for (let index = 0; index < first.data.length; index += 3) {
    if (first.data[index] > 70) highlights++;
    if (first.data[index] > 90 && first.data[index] > first.data[index + 1] * 1.3) coral++;
  }
  expect(highlights).toBeGreaterThan(500);
  expect(coral).toBeGreaterThan(100);
  await page.mouse.move(250, 400);
  await expect.poll(async () => {
    const next = await scenePixels(page);
    let changed = 0;
    for (let index = 0; index < first.data.length; index += 3) if (Math.abs(first.data[index] - next.data[index]) > 8) changed++;
    return changed;
  }).toBeGreaterThan(100);
  await page.screenshot({ path: testInfo.outputPath("hero.png") });
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("navigates through the cloud, pipeline, projects and skills", async ({ page }, testInfo) => {
  await ready(page);
  await goTo(page, "cloud");
  await expect(page.locator(".portfolio")).toHaveAttribute("data-chapter", "2");
  await page.getByRole("button", { name: "S3", exact: true }).click();
  await expect(page.locator(".service-detail")).toContainText("stockage objet");
  await page.screenshot({ path: testInfo.outputPath("cloud.png") });
  await goTo(page, "devops");
  await expect(page.locator(".pipeline-strip li")).toHaveCount(7);
  await expect.poll(() => page.locator(".deployment-status").evaluate((element) => Number(getComputedStyle(element).opacity)), { timeout: 15000 }).toBeGreaterThan(0.9);
  await page.screenshot({ path: testInfo.outputPath("devops.png") });
  await goTo(page, "projects");
  await expect(page.getByRole("heading", { name: "Projets à venir" })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("projects.png") });
  await goTo(page, "skills");
  await page.getByRole("button", { name: "Terraform", exact: true }).click();
  await expect(page.locator(".skills-directory button").filter({ hasText: "Terraform" })).toHaveAttribute("aria-pressed", "true");
  await page.screenshot({ path: testInfo.outputPath("skills.png") });
  await goTo(page, "contact");
  await expect(page.locator(".contact-name")).toHaveText("Arthur Manhaudier");
  await expect(page.locator(".contact-links a")).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath("contact.png") });
});

test("respects reduced motion and retains keyboard navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await ready(page);
  await expect(page.locator(".motion-toggle")).toHaveAttribute("aria-pressed", "true");
  const first = await scenePixels(page);
  const second = await scenePixels(page);
  expect(first.data.equals(second.data)).toBe(true);
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#about$/);
  await page.getByRole("button", { name: "Activer les animations", exact: true }).click();
  await expect(page.locator(".motion-toggle")).toHaveAttribute("aria-pressed", "false");
});

test("keeps all content available without WebGL", async ({ page }) => {
  await page.addInitScript(`
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, ...args) {
      if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') return null;
      return original.call(this, type, ...args);
    };
  `);
  await page.goto("/");
  await expect(page.locator(".world-status")).toContainText("READING MODE", { timeout: 30000 });
  await expect(page.locator("main section")).toHaveCount(8);
  await goTo(page, "contact");
  await expect(page.locator(".contact-name")).toBeVisible();
});

test("has no serious accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await ready(page);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
});