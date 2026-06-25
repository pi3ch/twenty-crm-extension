# Changelog

All notable changes to Twenty CRM LinkedIn Capture Extension.

## [1.2.0] - 2026-06-25

### Added

- Optional custom-field mapping, configured in an "Optional custom fields"
  section in the popup (off by default, settings synced):
  - Account owner — a workspace member assigned as the owner of new People and
    Companies, chosen from a dropdown (with a manual member-ID fallback).
  - Lead status — a select field set to its "new" value on newly created People.
  - Lead source — a select field set to a fixed value on newly created People.
- These apply on record creation only, so updates never overwrite an existing
  record's owner, status, or source.

### Notes

- The feature has no effect on workspaces that leave it unconfigured. Unknown
  fields are pruned automatically, and a value/option mismatch falls back to
  creating the record without the optional fields, so a misconfiguration can
  never block a capture.

## [1.1.0] - 2026-06-25

### Changed

- Authentication now uses a Twenty API key entered in the popup, instead of the
  session cookie. The key is stored in the browser's local extension storage.
- Requests send credentials so deployments behind an authenticating reverse
  proxy pass the gateway; this is a no-op for instances without one.
- Connection test now probes the `people` query rather than a removed root field.

### Added

- Schema-tolerant writes: input fields the target Twenty schema does not accept
  are dropped automatically, and the location field is resolved by introspection
  (scalar `city`/`location` or an ADDRESS composite, with country detection).
- Resilient LinkedIn scraping using structural anchors (page heading, contact
  row, company entity, labelled photo) that tolerate UI/class changes.

### Fixed

- Capture and update against current Twenty schema and the redesigned LinkedIn DOM.
- Search panel no longer flickers while typing.

### Removed

- Profile photo upload via the GraphQL multipart mutation, which is no longer
  available; the photo URL is captured instead.

### Maintenance

- Updated dependencies (WXT, Vue, TypeScript) and refreshed documentation.

## [1.0.0] - 2024-12-17

### ✨ Features

- **LinkedIn Profile Capture** - One-click capture of LinkedIn profiles to Twenty CRM
- **Company Page Capture** - Capture LinkedIn company pages
- **Auto Company Creation** - Automatically creates company records when adding contacts
- **Profile Photo Upload** - Uploads LinkedIn profile photos to Twenty's storage via GraphQL
- **Duplicate Detection** - Checks for existing records by LinkedIn URL and name matching
- **Manual Linking** - Search CRM and link LinkedIn profile to existing contacts
- **Update from LinkedIn** - Refresh existing CRM records with current LinkedIn data
- **Multi-language Support** - Extracts company names from headlines in multiple languages:
  - English: "at Company"
  - French: "chez Company", "à Company"
  - German: "bei Company"
  - Spanish: "en Company"
  - Symbol: "@ Company"

### 🔧 Technical

- Session-based authentication using Twenty's existing login cookie
- GraphQL API integration for all CRM operations
- GraphQL multipart upload for profile photos
- Floating UI button with status indicators
- Menu dropdown for additional actions
- URL change detection for LinkedIn SPA navigation

### 📋 Data Captured

**People:**

- First name & Last name
- Job title / headline
- Profile photo (uploaded)
- Location
- LinkedIn URL
- Current company (linked or created)

**Companies:**

- Company name
- LinkedIn URL
- Website
- Employee count
