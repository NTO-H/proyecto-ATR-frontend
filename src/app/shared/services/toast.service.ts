import { Component, Injectable, NgModule } from "@angular/core";
import { MessageService } from 'primeng/api';
import Swal from "sweetalert2";




@Injectable({
    providedIn: 'root'

})

export class Toast {

    constructor(private messageService: MessageService) { }


    // toas SweetAlert
    showToastSwalError(text: string) {
        Swal.fire({
            title: 'Error',
            text: text,
            icon: 'error',
            position: 'bottom-left',
            toast: true,
            timer: 2000
        });
    }

    // Puedes agregar más métodos para otros tipos de toasts
    showToastSwalSuccess(text: string) {
        Swal.fire({
            title: 'Success',
            text: text,
            icon: 'success',
            position: 'center',
            toast: false,
            timer: 2000
        });
    }

    showToastSwalInfo(text: string) {
        Swal.fire({
            title: 'Info',
            text: text,
            icon: 'info',
            position: 'bottom-left',
            toast: true,
            timer: 2000
        });
    }

    showToastPmNgSuccess(message: string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }

    showToastPmNgInfo(message: string) {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
    }

    showToastPmNgWarn(message: string) {
        this.messageService.add({ severity: 'warn', summary: 'Datos incompletos', detail: message });
    }

    showToastPmNgError(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }

    showToastPmNgContrast(message: string) {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: message });
    }

    showToastPmNgSecondary(message: string) {
        this.messageService.add({ severity: 'secondary', summary: 'Secondary', detail: message });
    }

    // selectToastSwal(value: string) {


    //     Swal.fire({
    //         title: "Select field validation",
    //         input: "select",
    //         inputOptions: {
    //             Fruits: {
    //                 apples: "Apples",
    //                 bananas: "Bananas",
    //                 grapes: "Grapes",
    //                 oranges: "Oranges"
    //             },
    //             Vegetables: {
    //                 potato: "Potato",
    //                 broccoli: "Broccoli",
    //                 carrot: "Carrot"
    //             },
    //             icecream: "Ice cream"
    //         },
    //         inputPlaceholder: "Select a fruit",
    //         showCancelButton: true,
    //         inputValidator: (value) => {
    //             return new Promise((resolve) => {
    //                 if (value === "oranges") {
    //                     resolve();
    //                 } else {
    //                     resolve("You need to select oranges :)");
    //                 }
    //             });
    //         }
    //     });
    //     if (value) {
    //         Swal.fire(`You selected: ${value}`);
    //     }
    // }

    // multiForm(){
    //     const { value: formValues } = await Swal.fire({
    //         title: "Multiple inputs",
    //         html: `
    //     <input id="swal-input1" class="swal2-input">
    //     <input id="swal-input2" class="swal2-input">
    //   `,
    //         focusConfirm: false,
    //         preConfirm: () => {
    //             return [
    //                 document.getElementById("swal-input1").value,
    //                 document.getElementById("swal-input2").value
    //             ];
    //         }
    //     });
    //     if (formValues) {
    //         Swal.fire(JSON.stringify(formValues));
    //     }
    // }
}