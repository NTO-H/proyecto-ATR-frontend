import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import * as AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { SessionService } from '../../../../shared/services/session.service';
import { ERol } from '../../../../shared/constants/rol.enum';
declare const $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isScrolled = false;
  sidebarVisible = false;
  isMobile = false;
  items: MenuItem[] = [];
  isLoggedIn = false;
  userROL!: string;
  isSticky = false;
  isLoading = false;
  searchQuery = ''; // Bind search input

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private sessionService: SessionService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      AOS.init();
      this.renderer.listen('window', 'resize', () => this.checkScreenSize());
      this.updateMenuItems();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      $(this.elementRef.nativeElement)
        .find('.ui.search')
        .search({
          type: 'category',
          apiSettings: {
            url: '/search/{query}', // Ensure this URL is correct
          },
          onSelect: (result: any) => {
            // Handle the result selection here, if needed
          },
        });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isSticky = scrollTop > 20;
    this.isScrolled = scrollTop > 10;
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      const isNowMobile = window.innerWidth <= 608;
      if (isNowMobile !== this.isMobile) {
        this.isMobile = isNowMobile;
        this.cdr.detectChanges();
      }
    }
  }

  onSearch() {
    this.isLoading = true;
    // Replace with actual search API call
    setTimeout(() => {
      this.isLoading = false;
      // Implement your search logic here
      console.log('Searching for:', this.searchQuery);
    }, 2000);
  }

  showDialog() {
    this.sidebarVisible = true;
  }

  updateMenuItems() {
    this.isLoggedIn = this.isUserLoggedIn();
    this.items = this.isLoggedIn
      ? [
          { label: 'Mi perfil', icon: 'pi pi-user', command: () => this.redirectTo('Mi-perfil') },
          { label: 'Configuración', icon: 'pi pi-cog', command: () => this.redirectTo('Config') },
          { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout() },
        ]
      : [
          { label: 'Iniciar sesión', icon: 'pi pi-sign-in', command: () => this.redirectTo('Sign-in') },
          { label: 'Registrarme', icon: 'pi pi-user-plus', command: () => this.redirectTo('Sign-up') },
          { label: 'Activar cuenta', icon: 'pi pi-check-circle', command: () => this.redirectTo('Activar-cuenta') },
        ];
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.updateMenuItems();
    this.router.navigate(['/auth/login']);
  }

  isUserLoggedIn(): boolean {
    const userData = this.sessionService.getUserData();
    if (userData) {
      this.userROL = userData.rol;
      return this.userROL === ERol.CLIENTE;
    }
    return false;
  }

  redirectTo(route: string): void {
    this.sidebarVisible = false;
    this.router.navigate(route.includes('Sign-in') || route.includes('Sign-up') || route.includes('Activar-cuenta')
      ? ['/auth', route]
      : ['/public', route]);
  }
}
