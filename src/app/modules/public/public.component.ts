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

  ngOnInit(): void {
    this.showDialog()
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
