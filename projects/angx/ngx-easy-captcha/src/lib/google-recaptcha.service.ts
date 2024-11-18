import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ScriptLoaderService } from './script-loader.service';
import { Subject, BehaviorSubject, Observable, finalize } from 'rxjs';
import { DynamicScripts } from './enums/dynamic-scripts-enum';
import { ElementSelectorType } from './enums/element-selector-type';
import { ScriptLoaderResponse } from './interfaces/script-loader-response';
import { ElementSelector } from './interfaces/scripts';

declare var grecaptcha: any;

@Injectable()
export class GoogleRecaptchaService {

  private recaptchaToken: Subject<string> = new BehaviorSubject<string>('');

  constructor(private initializerString: String, private scriptLoader: ScriptLoaderService, private captchaSiteKey: String) {
    this.scriptLoader.load(this.captchaSiteKey, DynamicScripts.GoogleRecaptcha).then((data: ScriptLoaderResponse[]) => {
      if (data && data[0]?.loaded) {
        this.initializeRecaptchaPromise();
      }
    }).catch(error => console.log(error));
  }

  get $(): Observable<string> {
    return this.recaptchaToken.asObservable().pipe(
      finalize(() => this.removeRecaptcha()) // Execute when the observable completes
    );
  }

  private removeRecaptcha() {
    this.scriptLoader.removeScriptAndTraces(DynamicScripts.GoogleRecaptcha, {name: 'grecaptcha-badge', type: ElementSelectorType.Class} as ElementSelector)
  }

  private initializeRecaptchaPromise() {
    grecaptcha.ready(() => {
      grecaptcha.execute(this.captchaSiteKey, { action: this.initializerString }).then((token: string) => {
        if(token){
          this.recaptchaToken.next(token);
        }
      });
    });
  }
}
