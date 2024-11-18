import { Inject, Injectable, InjectionToken, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleRecaptchaService } from './google-recaptcha.service';
import { CloudFlareTurnstileService } from './cloudflare-turnstile.service';
import { ScriptLoaderService } from './script-loader.service';
import { CaptchaProvider } from './enums/captcha-provider';

export const STRING_INITIALIZER = new InjectionToken<String>('STRING_INITIALIZER');
export const CAPTCHA_PROVIDER = new InjectionToken<CaptchaProvider>('CAPTCHA_PROVIDER');
export const CAPTCHA_SITE_KEY = new InjectionToken<CaptchaProvider>('CAPTCHA_SITE_KEY');

@Injectable({
  providedIn: 'root'
})
export class NgxEasyCaptchaService {

  private googleRecaptchaService!: GoogleRecaptchaService;
  private cloudFlareTurnstileService!: CloudFlareTurnstileService;
  private scriptLoaderService!: ScriptLoaderService;

  constructor(private injector: Injector, @Inject(STRING_INITIALIZER) private initializerString: String, @Inject(CAPTCHA_PROVIDER) private captchaProvider: CaptchaProvider, @Inject(CAPTCHA_SITE_KEY) private captchaSiteKey: String) {
      this.scriptLoaderService = <ScriptLoaderService>this.injector.get(ScriptLoaderService);
      if (this.captchaProvider === CaptchaProvider.Google) {
          if (!this.initializerString) {
              console.error('DOM Id to render cloudflare turnstile is not provided. Please provide DOM selector Id without "#". For eg:\nproviders: [{ provide: STRING_INITIALIZER, useValue: "turnstile-captcha" }]');
          }
          this.googleRecaptchaService = new GoogleRecaptchaService(this.initializerString, this.scriptLoaderService, this.captchaSiteKey);
      } else if (captchaProvider === CaptchaProvider.CloudFlare) {
          if (!this.initializerString) {
              console.error('Re-captcha action is undefined. Please provide valid action. For eg:\nproviders: [{ provide: STRING_INITIALIZER, useValue: "login" }]');
          }
          this.cloudFlareTurnstileService = new CloudFlareTurnstileService(this.initializerString, this.scriptLoaderService, this.captchaSiteKey);
      }
  }

  get $(): Observable<string> {
      if (this.captchaProvider === CaptchaProvider.Google) {
          return this.googleRecaptchaService.$;
      } else if (this.captchaProvider === CaptchaProvider.CloudFlare) {
          return this.cloudFlareTurnstileService.$;
      }
      return new Observable<string>();
  }
}
