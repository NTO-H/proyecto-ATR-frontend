import { AfterViewInit, Injectable } from '@angular/core';
import { ScriptLoaderService } from './script-loader.service';
import { Subject, BehaviorSubject, Observable, finalize } from 'rxjs';
import { DynamicScripts } from './enums/dynamic-scripts-enum';
import { ScriptLoaderResponse } from './interfaces/script-loader-response';
declare var turnstile: any;

@Injectable()
export class CloudFlareTurnstileService {

    private turnstileToken: Subject<string> = new BehaviorSubject<string>('');
    private turnstileWidgetIds: string[] = [];

    constructor(private initializerString: String, private scriptLoader: ScriptLoaderService, private captchaSiteKey: String) {
        this.scriptLoader.load(this.captchaSiteKey, DynamicScripts.CloudFlareTurnstile).then((data: ScriptLoaderResponse[]) => {
            if (data && data[0]?.loaded) {
                this.initializeTurnstilePromise();
            }
        }).catch(error => console.log(error));
    }

    get $(): Observable<string> {
        return this.turnstileToken.asObservable().pipe(
            finalize(() => this.removeTurnstile()) // Execute when the observable completes
        );
    }

    private removeTurnstile() {
        this.scriptLoader.removeScriptAndTraces(DynamicScripts.CloudFlareTurnstile);
        this.turnstileWidgetIds.forEach(widgetId => turnstile.remove(widgetId));
        this.scriptLoader.removeWindowTraces('turnstile');
    }

    private initializeTurnstilePromise() {
        document.querySelectorAll(`[id^="${this.initializerString}"]`).forEach(elem => {
            turnstile.ready(() => {
                this.turnstileWidgetIds.push(turnstile.render(`#${elem.id}`, {
                    sitekey: this.captchaSiteKey,
                    callback: (token: string) => {
                        if(token){
                            this.turnstileToken.next(token);
                        }
                    },
                }));
            });
        });
    }
}
