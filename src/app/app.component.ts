// import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
// import { NgChatbotAngularModule } from './shared/lib/ng-chatbot-angular.module';
// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { NgxUiLoaderModule } from 'ngx-ui-loader';
// import { CommonModule } from '@angular/common';
// import { NgChatbotAngularModule } from 'ng-chatbot-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxUiLoaderModule,
    CommonModule,
    // NgChatbotAngularModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Correct property name
})

export class AppComponent implements OnInit {
  constructor(private ngxService: NgxUiLoaderService) {}

  // ! chatboot no funcional por el momento
  // title = 'chat';
  // responses = [
  //   'Hi! You can contact us via contactchatbot@chat.com',
  //   'Sure! Our customer service team is available 24/7.',
  //   'Thank you for contacting us. We will get back to you shortly.'
  // ];
  // responseIndex = -1;
  // loading = false; 
  // config = {
  //   title: 'Chat Bot',
  //   subTitle: 'Welcome!',
  // };
  
  // setData(message: string) {
  //   this.loading = true;
  //   setTimeout(() => {

  //     this.responseIndex = (this.responseIndex + 1) % this.responses.length;
  //     this.loading = false; 
  //   }, 1000); 
  // }
  
  // onMessageInput(message: string) {
  //   this.setData(message);
  // }
  ngOnInit() {
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 5000);

    // OR
    this.ngxService.startBackground("do-background-things");
    // Do something here...
    this.ngxService.stopBackground("do-background-things");

    this.ngxService.startLoader("loader-01"); // start foreground spinner of the loader "loader-01" with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stopLoader("loader-01"); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    }, 5000);
  }
}

