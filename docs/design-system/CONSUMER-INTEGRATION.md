# Consumer integration

## Delivery model

The canonical repository publishes immutable private releases of
`@itmitalles-de/simple-business-design-system` to GitHub Packages. Consumers pin
the exact version in both their package manifest and lockfile. Automated pull
requests may propose upgrades, but no consumer follows `main`, a floating tag,
or a CDN URL.

Three React products consume package exports at build time. Office runs the
package only in development/CI and checks generated CSS/SVG into each owned
Nextcloud app. The production host remains Node-free.

## One-time package access

After the first release is published, an organization owner must open the
package settings and add these repositories under **Manage Actions access**
with read access:

- `itmitalles-de/essentials-calls`
- `itmitalles-de/essentials-freelancer`
- `itmitalles-de/essentials-merchant`
- `itmitalles-de/essentials-office`

Consumer workflows then use their scoped `GITHUB_TOKEN` with `contents: read`
and `packages: read`. Do not create a shared long-lived package token when
repository-scoped Actions access is available.

## CI registry setup

Use `actions/setup-node` with the GitHub registry and scope. The generated
runner-only npm configuration references `NODE_AUTH_TOKEN`; no credential is
checked in.

```yaml
permissions:
  contents: read
  packages: read

- uses: actions/setup-node@<full-commit-sha>
  with:
    node-version-file: .nvmrc
    registry-url: https://npm.pkg.github.com
    scope: "@itmitalles-de"
- run: npm ci
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

If a Docker build installs the private package, pass the token as a BuildKit
secret for the install step and remove the temporary npm configuration in the
same layer. Never use an `ARG`, `ENV`, copied `.npmrc`, image label, or build log
for credentials. Existing product images should not be changed until that
secret path is explicitly implemented and inspected.

## React consumers

Install an exact version and import the CSS once at the application's existing
global style entry point:

```json
{
  "dependencies": {
    "@itmitalles-de/simple-business-design-system": "0.1.0"
  }
}
```

```js
import "@itmitalles-de/simple-business-design-system/tokens.css";
import { getIconName, getAccessibleLabel } from "@itmitalles-de/simple-business-design-system/icons";
```

Run the architecture lint against product-owned UI only. Upstream-owned
Nextcloud/Vendure UI is an explicit scope exception, not a reason to weaken the
rules.

```json
{
  "scripts": {
    "lint:design": "simple-business-lint --rules visual,icons src"
  }
}
```

Legacy products may begin with `--rules icons` while visual migration is an
explicit tracked task. A baseline must name exact files/rules and an owner; it
must not silently allow all future violations.

## Office / Nextcloud consumers

Run the generator from a root-level development package and commit its outputs
inside each repository-owned app asset directory:

```text
simple-business-sync-nextcloud --target nextcloud-apps/appointments/css/vendor
simple-business-sync-nextcloud --target nextcloud-apps/essentialsplus/css/vendor
simple-business-sync-nextcloud --check --target <same-directory>
```

Do not install npm or `node_modules` on the Nextcloud production host and do not
place a package manifest inside an app directory. The deployment continues to
copy only app-local generated assets.

## Update sequence

1. Change and validate this source repository.
2. Publish an immutable SemVer release after review.
3. Grant/retain consumer Actions read access.
4. Open exact-version update pull requests in all four products.
5. Regenerate Office assets from the pinned version.
6. Run each product's own lint, test, build, and platform checks.
7. Merge consumers independently; one failed product does not block the others
   from remaining on the previous known-good release.
