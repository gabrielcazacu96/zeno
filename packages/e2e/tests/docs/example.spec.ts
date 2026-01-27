import { expect, test } from "@playwright/test"

test("sign-in with api", async ({ page }) => {
  const response = await page.goto("http://localhost:5002", {
    waitUntil: "networkidle",
  })
  await expect(response?.status()).toBe(200)
})
