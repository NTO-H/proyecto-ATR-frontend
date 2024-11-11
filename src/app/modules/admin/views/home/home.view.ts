import { Component, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { SessionService } from "../../../../shared/services/session.service";
// import { ClientesService } from "../../../../shared/services/clientes.service";
// import { MenuItem } from "primeng/api";
// import { StorageService } from "../../../../shared/services/storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.view.html",
  styleUrls: [
    "./home.view.scss",
    "./menuLateral.scss"
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HomeView {}
