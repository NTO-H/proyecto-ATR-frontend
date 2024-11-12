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
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
// import * as AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { SessionService } from '../../../../shared/services/session.service';
import { ERol } from '../../../../shared/constants/rol.enum';
import { DatosEmpresaService } from '../../../../shared/services/datos-empresa.service';
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
  empresaData: any;
  
  imageUrl!: string;
  defaultImageUrl: string = 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1730395938/images-AR/wyicw2mh3xxocscx0diz.png'


  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private sessionService: SessionService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private datosEmpresaService: DatosEmpresaService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadCompanyData(); // Cargar los datos de la empresa al iniciar

    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      // AOS.init();
      this.renderer.listen('window', 'resize', () => this.checkScreenSize());
      this.updateMenuItems();
    }
  }

  loadCompanyData() {
    this.datosEmpresaService.traerDatosEmpresa().subscribe(
      (data) => {
        this.empresaData = data[0];  // Guardar los datos en la variable
        this.imageUrl=this.empresaData?.logo;
        console.log('Datos de la empresa:', this.imageUrl);
      },
      (error) => {

        console.error('Error al cargar los datos de la empresa:', error);
      }
    );
  }
    ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      $(this.elementRef.nativeElement)
        .find('.ui.search')
        .search({
          type: 'category',
          apiSettings: {
            url: '/search/{query}', // Asegúrate de que esta URL sea correcta
          },
          onSelect: (result: any) => {
            // Manejar la selección del resultado aquí, si es necesario
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
    // Reemplaza con la llamada real a la API de búsqueda
    setTimeout(() => {
      this.isLoading = false;
      // Implementa tu lógica de búsqueda aquí
      console.log('Buscando:', this.searchQuery);
    }, 2000);
  }

  showDialog() {
    this.sidebarVisible = true;
  }
  popupVisible: boolean = false;

  // Alterna la visibilidad del popup
  togglePopup() {
    this.popupVisible = !this.popupVisible;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.popupVisible = false;
    }
  }

  updateMenuItems() {
    this.isLoggedIn = this.isUserLoggedIn();

    // Asigna items de menú con el tipo correcto
    this.items = this.isLoggedIn
      ? [
          {
            label: 'Mi perfil',
            icon: 'pi pi-user',
            command: (event: MenuItemCommandEvent) => this.redirectTo('Mi-perfil'),
          },
          {
            label: 'Configuración',
            icon: 'pi pi-cog',
            command: (event: MenuItemCommandEvent) => this.redirectTo('Config'),
          },
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: (event: MenuItemCommandEvent) => this.logout(),
          },
        ]
      : [
          {
            label: 'Iniciar sesión',
            icon: 'pi pi-sign-in',
            command: (event: MenuItemCommandEvent) => this.redirectTo('Sign-in'),
          },
          {
            label: 'Registrarme',
            icon: 'pi pi-user-plus',
            command: (event: MenuItemCommandEvent) => this.redirectTo('Sign-up'),
          },
          {
            label: 'Activar cuenta',
            icon: 'pi pi-check-circle',
            command: (event: MenuItemCommandEvent) => this.redirectTo('Activar-cuenta'),
          },
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
    this.router.navigate(
      route.includes('Sign-in') ||
      route.includes('Sign-up') ||
      route.includes('Activar-cuenta')
        ? ['/auth', route]
        : ['/public', route]
    );
  }
}
