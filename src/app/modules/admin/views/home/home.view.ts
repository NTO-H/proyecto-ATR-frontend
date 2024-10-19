import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
// import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SessionService } from "../../../../shared/services/session.service";
import { ClientesService } from "../../../../shared/services/clientes.service";
import { MenuItem } from "primeng/api";
import { StorageService } from "../../../../shared/services/storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.view.html",
  styleUrls: [
    "./home.view.scss",
    "./menuLateral.scss",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HomeView implements OnInit {
  openSubmenu: string | null = null;
  activeLink: HTMLElement | null = null;
  mostrarCalendario: boolean = false;
  fecha: string;
  fechaTexto: string;
  fechaSeleccionada: Date;
  id!: string;
  data: any = {};
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(
    private storageService: StorageService,
    private clientesService: ClientesService,
    private router: Router, 
    private sessionService: SessionService,
    // private ngxService: NgxUiLoaderService,
  ) {
    this.fechaSeleccionada = new Date();
    this.fecha = this.obtenerFechaYYYYMMDD();
    this.fechaTexto = this.obtenerFechaTexto();
  }




  isTextVisible: boolean = true; // Se puede ocultar o mostrar

  mostrar() {
    // this.openSubmenu = this.openSubmenu === submenu ? null : submenu;
    this.isTextVisible = !this.isTextVisible; // Cambia la visibilidad del texto
  }

  



  toggleCalendar() {
    this.mostrarCalendario = !this.mostrarCalendario;
  }

  ngOnInit() {
    // this.getData();
    this.items = [
      { label: 'Electronics' },
      { label: 'Computer' },
      { label: 'Accessories' },
      { label: 'Keyboard' },
      { label: 'Wireless' }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  setActiveLink(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    if (this.activeLink) {
      this.activeLink.classList.remove("m-tree__itemContent__selected");
    }
    target.classList.add("m-tree__itemContent__selected");
    this.activeLink = target;
  }

  toggleSubmenu(submenuId: string) {
    this.openSubmenu = this.openSubmenu === submenuId ? null : submenuId;
  }

  // getData(): void {
  //   const userData = this.sessionService.getId();
  //   if (userData) {
  //     this.id = userData;
  //     if (this.id) {
  //       this.clientesService.purificadora(this.id).subscribe((data) => {
  //         this.data = data;
  //       });
  //     }
  //   }
  // }

  redirectToAdminBoutique(route: string): void {
    this.router.navigate([route === "login" ? "/auth/login" : `/admin/${route}`]);
  }

  logout() {
    this.storageService.removeItem('token');
    this.router.navigate(["/auth/login"]);
  }

  redirectToCotrolClientes(route: string): void {
    this.router.navigate([route === "login" ? "/auth/login" : `/admin/control-clientes/${route}`]);
  }

  redirectToProductos(route: string): void {
    this.router.navigate([route === "login" ? "/auth/login" : `/admin/control-productos/${route}`]);
  }

  redirectToRenta(route: string): void {
    this.router.navigate([route === "login" ? "/auth/login" : `/admin/control-renta/${route}`]);
  }

  redirectToReportes(route: string): void {
    this.router.navigate([route === "login" ? "/auth/login" : `/admin/reportes/${route}`]);
  }
  redirectToConfiguracion(route: string): void {
    this.router.navigate([route === "login" ? "/auth/login" : `/admin/configuracion/${route}`]);
  }

  redirectToVentas(route: string): void {
    this.router.navigate([route === "login" ? "/auth/login" : `/admin/control-venta/${route}`]);
  }
  redirectoPoliticas(route: string): void {
    this.router.navigate([route === "login" ? "/auth/login" : `/admin/politicas/${route}`]);
  }

  obtenerFechaYYYYMMDD() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${dia}-${mes}-${año}`;
  }

  obtenerFechaTexto() {
    const diasSemana = [
      "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
    ];
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const fecha = new Date();
    const diaSemana = diasSemana[fecha.getDay()];
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    return `${diaSemana} / ${mes} / ${año}`;
  }
}
