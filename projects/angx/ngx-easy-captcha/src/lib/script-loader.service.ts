import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DynamicScripts } from './enums/dynamic-scripts-enum';
import { ElementSelectorType } from './enums/element-selector-type';
import { ScriptLoaderResponse } from './interfaces/script-loader-response';
import { Script, ElementSelector } from './interfaces/scripts';
import { ScriptStore } from './script-store';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  private isBrowser = false;
  private scripts: Script[] = ScriptStore;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private getScript(name: DynamicScripts): Script | undefined {
    return ScriptStore.find(s => s.name == name);
  }

  removeScriptAndTraces(name: DynamicScripts, ...elementSelectors: ElementSelector[]) {
    const script = this.getScript(name);
    if (this.isBrowser && script) {
      document.getElementById(script.id ?? '')?.remove();
      script.loaded = false;
      if (elementSelectors && elementSelectors.length > 0) {
        elementSelectors.forEach(elemSelector => {
          if (elemSelector.type === ElementSelectorType.Id) {
            document.getElementById(elemSelector.name)?.remove();
          } else if (elemSelector.type === ElementSelectorType.Class) {
            var elementsToRemove = document.getElementsByClassName(elemSelector.name);
            for (let i = 0; i < elementsToRemove.length; i++) {
              elementsToRemove[i]?.remove();
            }
          }
        });
      }
    }
  }

  removeWindowTraces(name: string) {
    if (this.isBrowser) {
      delete window[name];
    }
  }

  load(siteKey: String, ...scripts: string[]): Promise<ScriptLoaderResponse[]> {
    var promises: any[] = [];
    scripts.forEach((scriptName: string) => {
      const script = this.scripts.find(s => s.name === scriptName);
      if (script && siteKey) {
        script.src = script?.src.replace('CAPTCHA_SITE_KEY', siteKey as string);
      }
      promises.push(this.loadScript(script));
    });
    return Promise.all<ScriptLoaderResponse>(promises);
  }

  loadScript(script: Script | undefined) {
    if (!script) {
      console.error('Can not load null script');
      return;
    }
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (script.loaded) {
        resolve({ script: script.name, loaded: true, status: 'Already Loaded' });
      }
      else {
        if (this.isBrowser) {
          let scriptElement = document.createElement('script');
          scriptElement.id = script.id ?? '';
          scriptElement.type = 'text/javascript';
          scriptElement.src = script.src;
          scriptElement.defer = script.async ?? false;
          scriptElement.async = script.defer ?? false;
          if ((scriptElement as any).readyState) {  //IE
            (scriptElement as any).onreadystatechange = () => {
              if ((scriptElement as any).readyState === "loaded" || (scriptElement as any).readyState === "complete") {
                (scriptElement as any).onreadystatechange = null;
                script.loaded = true;
                resolve({ script: script.name, loaded: true, status: 'Loaded' });
              }
            };
          } else {  //Others
            scriptElement.onload = () => {
              script.loaded = true;
              resolve({ script: script.name, loaded: true, status: 'Loaded' });
            };
          }
          scriptElement.onerror = (error: any) => resolve({ script: script.name, loaded: false, status: 'Loaded' });
          document.getElementsByTagName('head')[0].appendChild(scriptElement);
        }
      }
    });
  }
}
