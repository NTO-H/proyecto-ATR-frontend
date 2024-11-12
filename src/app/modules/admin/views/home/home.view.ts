import { Component, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
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
