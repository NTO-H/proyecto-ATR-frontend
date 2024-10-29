import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isScrolled = false;
  sidebarVisible: boolean = false;
  isMobile: boolean = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to detect the environment
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) { // Check if we're in the browser
      const ua = navigator.userAgent;
      console.log(ua);

      // Detect if the viewport size is mobile-like
      if (window.innerWidth <= 768) {
        this.isMobile = true;
        console.log('El navegador está en un tamaño de móvil');
      } else {
        this.isMobile = false;
        console.log('El navegador está en un tamaño de escritorio');
      }

      // Detect if the browser is Chrome
      if (/Chrome/i.test(ua)) {
        console.log('Navegador Chrome detectado');
      } else {
        console.log('Navegador no es Chrome');
      }

      // Listen for window resize events
      window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
          this.isMobile = true;
          console.log('El navegador ahora está en un tamaño de móvil');
        } else {
          this.isMobile = false;
          console.log('El navegador ahora está en un tamaño de escritorio');
        }
      });
    } else {
      console.log('No se está ejecutando en un navegador');
    }
  }

  // // Detects user scroll
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   if (isPlatformBrowser(this.platformId)) { // Check if we're in the browser
  //     const scrollPosition =
  //       window.pageYOffset ||
  //       document.documentElement.scrollTop ||
  //       document.body.scrollTop ||
  //       0;
  //     this.isScrolled = scrollPosition > 10;
  //   }
  // }

  showDialog() {
    this.sidebarVisible = true;
  }

  redirectTo(route: string): void {
    console.log(route);
    if (route === 'login') {
      this.router.navigate(['/auth/login']);
    } else {
      console.log("click", route);
      this.router.navigate(['/public', route]);
    }
  }
}
