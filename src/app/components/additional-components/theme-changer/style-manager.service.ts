import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleManagerService {
  setStyle(key: string, href: string): void {
    getLinkElementForKey(key).setAttribute('href', href);
  }
  removeStyle(key: string): void {
    const existElLink = getExistingLinkElementByKey(key);
    if (existElLink) document.head.removeChild(existElLink);
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(
    `link[rel="stylesheet"].${getClassNameForKey(key)}`
  );
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `app-${key}`;
}
