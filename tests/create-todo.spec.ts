import { test, expect } from '@playwright/test';

test('create todo', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByTestId('add-task').click();

  await page.getByTestId('name').fill('TODO 1');
  await page.getByTestId('description').fill('Lorem ipsum dolor sit amet...');
  await page.getByTestId('save').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByTestId('item-dropdown').first().click();
  page.on('dialog', dialog => dialog.accept());
  await page.getByTestId('delete').first().click();
});

