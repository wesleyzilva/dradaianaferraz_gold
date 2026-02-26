import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const GTM_CONTAINER_ID = 'GTM-PG7CRPC7';
type WindowWithDataLayer = Window & typeof globalThis & { dataLayer?: unknown[] };

function initGoogleTagManager(containerId: string): void {
  if (!containerId) {
    return;
  }

  const scriptId = 'gtm-script';
  if (document.getElementById(scriptId)) {
    return;
  }

  const appWindow = window as unknown as WindowWithDataLayer;
  const dataLayer = appWindow.dataLayer || [];
  dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  appWindow.dataLayer = dataLayer;

  const gtmScript = document.createElement('script');
  gtmScript.id = scriptId;
  gtmScript.async = true;
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
  document.head.appendChild(gtmScript);

  const existingNoScript = document.getElementById('gtm-noscript');
  if (!existingNoScript) {
    const noScript = document.createElement('noscript');
    noScript.id = 'gtm-noscript';
    noScript.innerHTML =
      `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(noScript, document.body.firstChild);
  }
}

initGoogleTagManager(GTM_CONTAINER_ID);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
