# Automated GitHub Release Workflow
This repository demonstrates an automated GitHub release process using GitHub Actions.

## Features

- Automatically creates a new release when code is pushed to the main branch
- Increments version numbers automatically based on the latest release
- Publishes the `release.txt` file as a release asset
- Prints a link to the newly created release in the workflow logs

## How It Works

The GitHub Actions workflow (`.github/workflows/release.yml`) performs the following steps:

1. Triggers when code is pushed to the main branch
2. Reads major and minor version numbers from `versions.yml` file
3. Finds the latest patch version for the specified major and minor versions
4. Increments the patch version to create a new version
5. Creates a new GitHub release with version v{major}.{minor}.{patch}
6. Attaches the `release.txt` file to the release
7. Outputs the URL of the new release

## Prerequisites

- GitHub repository with push access to the main branch
- GitHub Actions enabled for the repository

## Initial Setup

For the first run, if no releases exist with the specified major and minor versions, the workflow will start with version v{major}.{minor}.0 and increment to v{major}.{minor}.1.

## Customization

To customize the release process:

1. Modify `release.txt` with the content you want to include in each release
2. Edit `versions.yml` to change the major and minor version numbers:
   ```yaml
   major: 1
   minor: 0
   ```
3. Edit the workflow file (`.github/workflows/release.yml`) to change versioning logic or add additional steps
