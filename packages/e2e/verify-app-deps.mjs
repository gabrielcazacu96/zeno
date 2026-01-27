#!/usr/bin/env node

/**
 * This script verifies that all apps that have e2e tests are listed
 * as dependencies in the e2e package.json.
 *
 * This ensures that `turbo run e2e` will correctly build all tested apps
 * before running e2e tests (via the ^build dependency).
 *
 * The script detects which apps have tests by checking for directories
 * in packages/e2e/tests/ that match app names in apps/.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, "../..")
const appsDir = join(rootDir, "apps")
const testsDir = join(__dirname, "./tests")
const e2ePackageJsonPath = join(__dirname, "./package.json")

// Get all test directories (these correspond to app names)
const testDirs = existsSync(testsDir)
  ? readdirSync(testsDir).filter((name) =>
      statSync(join(testsDir, name)).isDirectory()
    )
  : []

// Get app package names for apps that have tests
const appsWithTests = readdirSync(appsDir)
  .filter((name) => {
    const appPath = join(appsDir, name)
    const hasTests = testDirs.includes(name)
    return (
      hasTests &&
      statSync(appPath).isDirectory() &&
      existsSync(join(appPath, "package.json"))
    )
  })
  .map((name) => {
    const packageJson = JSON.parse(
      readFileSync(join(appsDir, name, "package.json"), "utf-8")
    )
    return packageJson.name
  })

// Get e2e dependencies
const e2ePackageJson = JSON.parse(readFileSync(e2ePackageJsonPath, "utf-8"))
const e2eDeps = Object.keys(e2ePackageJson.dependencies || {})

// Find missing apps
const missingApps = appsWithTests.filter((app) => !e2eDeps.includes(app))

if (missingApps.length > 0) {
  console.error(
    "❌ The following apps have e2e tests but are missing from packages/e2e/package.json dependencies:"
  )
  console.error("")
  for (const app of missingApps) {
    console.error(`   - ${app}`)
  }
  console.error("")
  console.error("Please add them to packages/e2e/package.json:")
  console.error("")
  console.error('  "dependencies": {')
  for (const app of missingApps) {
    console.error(`    "${app}": "*",`)
  }
  console.error("  }")
  console.error("")
  console.error(
    "This ensures e2e tests run against freshly built apps when using `turbo run e2e`."
  )
  process.exit(1)
}

console.log(
  `✅ All ${appsWithTests.length} apps with e2e tests are listed as dependencies`
)
