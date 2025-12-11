// Automated Tests for Taskflow Todo App
// Framework: Playwright
// Run with: npx playwright test

const { test, expect } = require('@playwright/test');

// Helper to clear localStorage before each test
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/index.html');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

// ===========================================
// TC-TODO-001: Add a new task with valid text
// ===========================================
test('TC-TODO-001: Add a new task with valid text', async ({ page }) => {
  // Step 1: Verify app loads
  await expect(page.locator('h1')).toHaveText('Taskflow');
  await expect(page.locator('.empty-state')).toBeVisible();

  // Step 2-3: Click input and type
  const input = page.locator('#todo-input');
  await input.click();
  await input.fill('Buy groceries');

  // Step 4: Click Add Task
  await page.locator('#add-btn').click();

  // Step 5: Verify stats
  await expect(page.locator('#total-count')).toHaveText('1');
  await expect(page.locator('#active-count')).toHaveText('1');
  await expect(page.locator('#completed-count')).toHaveText('0');

  // Step 6: Verify task appears
  await expect(page.locator('.todo-item')).toBeVisible();
  await expect(page.locator('.todo-text')).toHaveText('Buy groceries');
});

// ===========================================
// TC-TODO-002: Add a new task using Enter key
// ===========================================
test('TC-TODO-002: Add a new task using Enter key', async ({ page }) => {
  const input = page.locator('#todo-input');
  
  // Type and press Enter
  await input.fill('Call mom');
  await input.press('Enter');

  // Verify task added
  await expect(page.locator('.todo-text')).toHaveText('Call mom');
  
  // Verify input cleared and focused
  await expect(input).toHaveValue('');
  await expect(input).toBeFocused();
});

// ===========================================
// TC-TODO-003: Cannot add empty task
// ===========================================
test('TC-TODO-003: Cannot add empty task', async ({ page }) => {
  // Try to add empty task
  await page.locator('#add-btn').click();
  
  // Verify no task added
  await expect(page.locator('.empty-state')).toBeVisible();
  await expect(page.locator('#total-count')).toHaveText('0');

  // Try whitespace only
  await page.locator('#todo-input').fill('   ');
  await page.locator('#add-btn').click();
  
  // Still no task
  await expect(page.locator('.empty-state')).toBeVisible();
});

// ===========================================
// TC-TODO-010: Mark task as completed
// ===========================================
test('TC-TODO-010: Mark task as completed', async ({ page }) => {
  // Setup: Add a task
  await page.locator('#todo-input').fill('Test task');
  await page.locator('#add-btn').click();

  // Click checkbox
  await page.locator('.checkbox-wrapper input').click();

  // Verify completed styling
  await expect(page.locator('.todo-item')).toHaveClass(/completed/);
  
  // Verify stats
  await expect(page.locator('#active-count')).toHaveText('0');
  await expect(page.locator('#completed-count')).toHaveText('1');
});

// ===========================================
// TC-TODO-011: Unmark completed task
// ===========================================
test('TC-TODO-011: Unmark completed task', async ({ page }) => {
  // Setup: Add and complete a task
  await page.locator('#todo-input').fill('Test task');
  await page.locator('#add-btn').click();
  await page.locator('.checkbox-wrapper input').click();
  
  // Verify it's completed
  await expect(page.locator('.todo-item')).toHaveClass(/completed/);

  // Uncheck
  await page.locator('.checkbox-wrapper input').click();

  // Verify back to active
  await expect(page.locator('.todo-item')).not.toHaveClass(/completed/);
  await expect(page.locator('#active-count')).toHaveText('1');
  await expect(page.locator('#completed-count')).toHaveText('0');
});

// ===========================================
// TC-TODO-020: Delete a task
// ===========================================
test('TC-TODO-020: Delete a task', async ({ page }) => {
  // Setup: Add a task
  await page.locator('#todo-input').fill('Task to delete');
  await page.locator('#add-btn').click();
  
  await expect(page.locator('#total-count')).toHaveText('1');

  // Hover and click delete
  await page.locator('.todo-item').hover();
  await page.locator('.delete-btn').click();

  // Verify deleted
  await expect(page.locator('.empty-state')).toBeVisible();
  await expect(page.locator('#total-count')).toHaveText('0');
});

// ===========================================
// TC-TODO-021: Clear all completed tasks
// ===========================================
test('TC-TODO-021: Clear all completed tasks', async ({ page }) => {
  // Setup: Add multiple tasks
  await page.locator('#todo-input').fill('Active task');
  await page.locator('#add-btn').click();
  await page.locator('#todo-input').fill('Done task 1');
  await page.locator('#add-btn').click();
  await page.locator('#todo-input').fill('Done task 2');
  await page.locator('#add-btn').click();

  // Complete two tasks
  const checkboxes = page.locator('.checkbox-wrapper input');
  await checkboxes.nth(1).click();
  await checkboxes.nth(2).click();

  await expect(page.locator('#completed-count')).toHaveText('2');

  // Clear completed
  await page.locator('#clear-completed-btn').click();

  // Verify only active remains
  await expect(page.locator('#total-count')).toHaveText('1');
  await expect(page.locator('#completed-count')).toHaveText('0');
  await expect(page.locator('.todo-text')).toHaveText('Active task');
});

// ===========================================
// TC-TODO-030: Filter - Show all tasks
// ===========================================
test('TC-TODO-030: Filter - Show all tasks', async ({ page }) => {
  // Setup: Add active and completed tasks
  await page.locator('#todo-input').fill('Active');
  await page.locator('#add-btn').click();
  await page.locator('#todo-input').fill('Completed');
  await page.locator('#add-btn').click();
  await page.locator('.checkbox-wrapper input').first().click();

  // Switch to Completed filter
  await page.locator('[data-filter="completed"]').click();
  await expect(page.locator('.todo-item')).toHaveCount(1);

  // Switch back to All
  await page.locator('[data-filter="all"]').click();
  
  // Verify all visible
  await expect(page.locator('.todo-item')).toHaveCount(2);
});

// ===========================================
// TC-TODO-031: Filter - Show only active tasks
// ===========================================
test('TC-TODO-031: Filter - Show only active tasks', async ({ page }) => {
  // Setup
  await page.locator('#todo-input').fill('Active 1');
  await page.locator('#add-btn').click();
  await page.locator('#todo-input').fill('Active 2');
  await page.locator('#add-btn').click();
  await page.locator('#todo-input').fill('Completed');
  await page.locator('#add-btn').click();
  
  // Complete one
  await page.locator('.checkbox-wrapper input').last().click();

  // Filter active
  await page.locator('[data-filter="active"]').click();

  // Verify only active shown
  await expect(page.locator('.todo-item')).toHaveCount(2);
  await expect(page.locator('.todo-item.completed')).toHaveCount(0);
});

// ===========================================
// TC-TODO-032: Filter - Show only completed tasks
// ===========================================
test('TC-TODO-032: Filter - Show only completed tasks', async ({ page }) => {
  // Setup
  await page.locator('#todo-input').fill('Active');
  await page.locator('#add-btn').click();
  await page.locator('#todo-input').fill('Completed 1');
  await page.locator('#add-btn').click();
  await page.locator('#todo-input').fill('Completed 2');
  await page.locator('#add-btn').click();
  
  // Complete two
  await page.locator('.checkbox-wrapper input').nth(1).click();
  await page.locator('.checkbox-wrapper input').nth(2).click();

  // Filter completed
  await page.locator('[data-filter="completed"]').click();

  // Verify only completed shown
  await expect(page.locator('.todo-item')).toHaveCount(2);
  await expect(page.locator('.todo-item.completed')).toHaveCount(2);
});

// ===========================================
// TC-TODO-040: Data persists after page refresh
// ===========================================
test('TC-TODO-040: Data persists after page refresh', async ({ page }) => {
  // Add tasks
  await page.locator('#todo-input').fill('Persistent task 1');
  await page.locator('#add-btn').click();
  await page.locator('#todo-input').fill('Persistent task 2');
  await page.locator('#add-btn').click();
  
  // Complete one
  await page.locator('.checkbox-wrapper input').first().click();

  // Refresh
  await page.reload();

  // Verify persistence
  await expect(page.locator('.todo-item')).toHaveCount(2);
  await expect(page.locator('#total-count')).toHaveText('2');
  await expect(page.locator('#active-count')).toHaveText('1');
  await expect(page.locator('#completed-count')).toHaveText('1');
});
