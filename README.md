# Automated GitHub Release Workflow
This repository demonstrates an automated GitHub release process using GitHub Actions.

## Features

- Automatically creates a new release when code is pushed to the main branch
- Increments version numbers automatically based on the latest release
- Publishes the `release.txt` file as a release asset
- Prints a link to the newly created release in the workflow logs
- Automatically deploys a React site to GitHub Pages after each release
- Displays the latest release URL on the GitHub Pages site

## How It Works

The GitHub Actions workflow (`.github/workflows/release_client.yml`) performs the following steps:

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
3. Edit the workflow file (`.github/workflows/release_client.yml`) to change versioning logic or add additional steps

## GitHub Pages Site

This repository also includes an automated GitHub Pages deployment:

1. After each successful release, a GitHub workflow (`.github/workflows/release_site.yml`) is triggered
2. The workflow builds a React application located in the `site` directory
3. The latest release URL is passed to the React application during the build process
4. The built site is deployed to the `gh-pages` branch
5. The site is accessible at `https://{username}.github.io/{repository-name}/`

### Site Development

To develop the site locally:

1. Navigate to the `site` directory
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. The site will be available at `http://localhost:3000`

You can customize the site by editing the React components in the `site/src` directory.
