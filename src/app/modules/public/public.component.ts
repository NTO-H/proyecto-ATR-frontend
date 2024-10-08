import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './public.component.html',
  styleUrl: './public.component.css',
})
export class PublicComponent implements OnInit {
  title = 'frontend';
  isScrolled = false;

  visible: boolean = false;
  sidebarVisible:boolean=false;
  isMobile:boolean=false;
  ngOnInit(): void {
    this.showDialog()
    const ua = navigator.userAgent;
    console.log(ua);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
    this.isMobile=true
    } 
    else if (/Chrome/i.test(ua)) {
      console.log('Navegador Chrome detectado');
    } 
    else {
      console.log('Dispositivo de escritorio detectado');
    }


  }
  
  
    showDialog() {
        this.visible = true;
    }
  // Detecta el scroll del usuario
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isScrolled = scrollPosition > 10;
  }
}
