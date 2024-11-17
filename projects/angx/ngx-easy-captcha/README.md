# @angx/ngx-easy-captcha

Easy Captcha Implementation for Angular (Supports Angular 18)!

![Angular Easy Captcha](https://raw.githubusercontent.com/angx-libs/ngx-easy-captcha/master/src/assets/google.PNG) ![Angular Easy Captcha](https://raw.githubusercontent.com/angx-libs/ngx-easy-captcha/master/src/assets/cloudflare.PNG)

@angx/ngx-easy-captcha has a very easy implementation for both [Google Recaptcha](https://www.google.com/recaptcha/about) and [CloudFlare Turnstile](https://www.cloudflare.com/en-in/products/turnstile).

## Features ##

- Captcha implementation as an Angular Service.
- Can switch between Google's Recaptcha V3 and CloudFlare's Turnstile in seconds.
- Supports Angular 18.
- Dynamic JavaScript loading only when required and destroys scripts and DOM Elements on Unsubscribe.

## Install ##

To use @angx/ngx-easy-captcha in your project install it via [npm](https://www.npmjs.com/package/@angx/ngx-easy-captcha):

```
npm i @angx/ngx-easy-captcha --save
```

## Usage ##

#### Google Recaptcha ####

STRING_INITIALIZER is the action (login, register, enquiryform etc.) that is protected by the captcha service. See [Detailed Example](https://github.com/angx-libs/ngx-easy-captcha/tree/master/src/app/google-recaptcha-example)

```
@Component({
  ...
  providers: [NgxEasyCaptchaService,
    { provide: CAPTCHA_PROVIDER, useValue: CaptchaProvider.Google },
    { provide: CAPTCHA_SITE_KEY, useValue: '' }, // Enter your Google Enterprise Recaptcha Site Key Here
    { provide: STRING_INITIALIZER, useValue: "login/register" }
  ],
 ...
})

export class GoogleRecaptchaExampleComponent implements OnDestroy {
  captchaSubscription!: Subscription;
  captchaToken!: string;

  constructor(private captchaService: NgxEasyCaptchaService) {
    this.captchaSubscription = this.captchaService.$.subscribe((token: string) => {
      this.captchaToken = token;
      console.log(token);
    });
  }

  ...

  ngOnDestroy(): void {
    this.captchaSubscription?.unsubscribe();
  }
}
```
#### CloudFlare TurnStile ####

STRING_INITIALIZER is the id of the div element where captcha needs to be shown. If multiple forms are protected on same page, use id with common prefixes and pass that prefix (In the below example, pass element id: "cloudflare-captcha"). See [Detailed Example](https://github.com/angx-libs/ngx-easy-captcha/tree/master/src/app/cloudflare-turnstile-example)

```
 <div class="mt-3" id="cloudflare-captcha-signup"></div>
 <div class="mt-3" id="cloudflare-captcha-signin"></div>
```

```
@Component({
  ...
  providers: [NgxEasyCaptchaService,
    { provide: CAPTCHA_PROVIDER, useValue: CaptchaProvider.CloudFlare },
    { provide: CAPTCHA_SITE_KEY, useValue: '' }, // Enter your Cloudflare Turnstile Site Key Here
    { provide: STRING_INITIALIZER, useValue: "cloudflare-captcha" }
  ],
 ...
})

export class CloudflareTurnstileExampleComponent implements OnDestroy{
  captchaSubscription!: Subscription;
  captchaToken!: string;

  constructor(private captchaService: NgxEasyCaptchaService) {
    this.captchaSubscription = this.captchaService.$.subscribe((token: string) => {
      this.captchaToken = token;
      console.log(token);
    });
  }

  ...

  ngOnDestroy(): void {
    this.captchaSubscription?.unsubscribe();
  }
}
```

## Support ##

If you like my work and feel like buying me a coffee, please feel free to do so: 

[Buy Me A Coffee](https://buymeacoffee.com/er.abhishek)

## Credits ##

Abhishek Singh 

[Github](https://github.com/asingh0601)
[Twitter](https://twitter.com/only_abhishek)