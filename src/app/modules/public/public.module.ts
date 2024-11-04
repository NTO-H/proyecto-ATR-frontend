import { provideHttpClient, withFetch } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [provideClientHydration(), [provideHttpClient(withFetch())],
],
})
export class PublicModule {


 }
