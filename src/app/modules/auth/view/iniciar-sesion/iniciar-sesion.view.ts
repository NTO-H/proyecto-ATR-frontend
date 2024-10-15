// import { Component, ViewEncapsulation } from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { Router } from "@angular/router";
// import Swal from "sweetalert2";
// import { catchError, finalize, throwError } from "rxjs";
// import { NgxUiLoaderService } from "ngx-ui-loader";
// import { SignInService } from "../../commons/services/sign-in.service";
// import { ERol } from "../../../../shared/constants/rol.enum";
//   import { SessionService } from "../../../../shared/services/session.service";
// import { HttpErrorResponse } from "@angular/common/http";
// import { StorageService } from "../../../../shared/services/storage.service";

// @Component({
//   selector: "app-iniciar-sesion",
//   templateUrl: "./iniciar-sesion.view.html",
//   styleUrls: ["./frm.scss"],
//   encapsulation: ViewEncapsulation.None,
// })
// export class IniciarSesionView {
//   loginForm: FormGroup;
//   errorMessage!: string;
//   userROL!: string;
//   public loading = false; // Variable para manejar la carga

//   constructor(
//     private ngxService: NgxUiLoaderService,
//     private signInService: SignInService,
//     private storageService: StorageService,
//     private sessionService: SessionService,
//     private fb: FormBuilder,
//     private router: Router
//   ) {
//     this.loginForm = this.fb.group({
//       email: ["", Validators.required],
//       password1: ["", Validators.required],
//     });
//   }

//   login(): void {
//     if (this.loginForm.invalid) {
//       Swal.fire({
//         title: "Campos incompletos",
//         text: "Por favor, completa todos los campos",
//         icon: "warning",
//         confirmButtonText: "Entendido",
//       });
//       return;
//     }

//     // Verificar conexión a Internet
//     if (!navigator.onLine) {
//       Swal.fire({
//         title: "Sin conexión a Internet",
//         text: "Por favor, verifica tu conexión y vuelve a intentarlo.",
//         icon: "error",
//         confirmButtonText: "Ok",
//       });
//       return;
//     }

//     const email = this.loginForm.value.email;
//     const password1 = this.loginForm.value.password1;

//     this.loading = true; // Iniciar carga
//     this.ngxService.start();

//     this.signInService
//       .signIn({ email, password1 })
//       .pipe(
//         catchError((error: HttpErrorResponse) => {
//           if (error.status === 0) {
//             this.errorMessage = "No se pudo conectar con el servidor. Por favor, intenta más tarde.";
//           } else if (error.status >= 500) {
//             this.errorMessage = "El servidor está experimentando problemas. Por favor, intenta más tarde.";
//           } else {
//             this.errorMessage = error.error.message || "Error en la solicitud.";
//           }

//           Swal.fire({
//             title: "Error!",
//             text: this.errorMessage,
//             icon: "error",
//             confirmButtonText: "Ok",
//           });

//           return throwError(this.errorMessage);
//         }),
//         finalize(() => {
//           this.ngxService.stop();
//           this.loading = false; // Finalizar carga
//         })
//       )
//       .subscribe(
//         (response) => {
//           if (response) {
//             this.storageService.setToken(response.token);
//             const userData = this.sessionService.getUserData();
//             if (userData) {
//               this.userROL = userData.rol;
//               let navigateTo = "";

//               if (this.userROL === ERol.ADMIN) {
//                 navigateTo = "admin/inicio";
//               } else if (this.userROL === ERol.ADMPRF) {
//                 navigateTo = "purificadoraAdm/Home";
//               } else if (this.userROL === ERol.REPARTIDOR) {
//                 navigateTo = "repartidor/Home";
//               }

//               this.router.navigate([navigateTo]).then(() => {
//                 if (navigateTo === "repartidor/Home") {
//                   window.location.reload();
//                 } else {
//                   // Mostrar alerta de éxito
//                   Swal.fire({
//                     title: "Acceso exitoso",
//                     text: "Has iniciado sesión correctamente.",
//                     icon: "success",
//                     confirmButtonText: "Continuar",
//                   });
//                 }
//               });
//             }
//           }
//         },
//         (err) => {
//           this.loading = false;
//         }
//       );
//   }
// }
