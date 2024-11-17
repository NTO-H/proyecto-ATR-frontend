import { DynamicScripts } from "./enums/dynamic-scripts-enum";
import { Script } from "./interfaces/scripts";

export const ScriptStore: Script[] = [
    { name: DynamicScripts.GoogleRecaptcha, src: `https://www.google.com/recaptcha/api.js?render=CAPTCHA_SITE_KEY`, id: "google-recaptcha", async: true, defer: true },
    { name: DynamicScripts.CloudFlareTurnstile, src: `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit`, id: "cloudflare-turnstile" },
];