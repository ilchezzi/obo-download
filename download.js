'use strict';

// The test intentionally offers only the verified Apple Silicon macOS release.
// The app update checker will be integrated separately once the Pages URL exists.
const button = document.getElementById('download');
const statusText = document.getElementById('status');

async function configureDownload() {
  try {
    const response = await fetch('./updates.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Release information unavailable');
    const manifest = await response.json();
    const release = manifest.platforms['macos-arm64'];
    let repository = manifest.githubRepository;

    // username.github.io/repository/ works immediately without editing placeholders.
    if (!repository && location.hostname.endsWith('.github.io')) {
      const owner = location.hostname.slice(0, -'.github.io'.length);
      const project = location.pathname.split('/').filter(Boolean)[0];
      repository = owner + '/' + (project || owner + '.github.io');
    }

    let target;
    if (release.downloadUrl) {
      target = new URL(release.downloadUrl);
    } else {
      if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository || '')) {
        throw new Error('Set githubRepository in updates.json');
      }
      target = new URL('https://github.com/' + repository + '/releases/download/' +
        encodeURIComponent(release.releaseTag) + '/' + encodeURIComponent(release.assetName));
    }
    if (target.protocol !== 'https:') throw new Error('HTTPS download required');

    button.href = target.href;
    button.removeAttribute('aria-disabled');
    button.setAttribute('aria-label', 'Download ONE BY ONE ' + release.version + ' for macOS, Apple Silicon');
  } catch (error) {
    button.setAttribute('aria-disabled', 'true');
    button.removeAttribute('href');
    statusText.textContent = 'Download unavailable. Please try again later.';
    statusText.hidden = false;
    console.error('Download configuration:', error.message);
  }
}

button.addEventListener('click', (event) => {
  if (button.getAttribute('aria-disabled') === 'true') event.preventDefault();
});
configureDownload();
