'use strict';
// Accept only the three assignment-supported ArcGIS application families.
function getAppURL(value) {
  if (!value) return null;
  const url = new URL(value);
  const valid = url.protocol === 'https:' && !url.username && !url.password && (
    (url.hostname === 'storymaps.arcgis.com' && /^\/stories\/[a-f0-9]{32}\/?$/i.test(url.pathname)) ||
    (url.hostname === 'experience.arcgis.com' && /^\/experience\/[a-f0-9]{32}\/?$/i.test(url.pathname)) ||
    (url.hostname === 'www.arcgis.com' && /^\/apps\/dashboards\/[a-f0-9]{32}\/?$/i.test(url.pathname))
  );
  if (!valid) throw new Error('Use a published StoryMaps, Experience Builder, or Dashboards URL.');
  return url.href;
}
try {
 const url = getAppURL(window.PROJECT2_APP_URL);
 if (url) {
  const frame = document.getElementById('app');
  frame.src = url; frame.hidden = false;
  const link = document.getElementById('direct');
  link.href = url; link.hidden = false;
  document.getElementById('pending').hidden = true;
 }
} catch (error) {
 document.getElementById('pending').textContent = 'The application link is invalid. Please correct config.js before publication.';
 console.error(error.message);
}
