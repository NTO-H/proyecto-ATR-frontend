import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductoService } from '../../../../shared/services/producto.service';
import { Producto } from '../../../../shared/models/Producto.model';
import { Router } from '@angular/router';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-registo-producto',
  templateUrl: './registo-producto.component.html',
  styleUrls: ['./registo-producto.component.scss'],
})
export class RegistoProductoComponent1 implements OnInit {

  photoSelected!: string | ArrayBuffer |null;
  file!: File;

  constructor(private productoS: ProductoService, private router: Router) { }

  ngOnInit() {
  }

  onPhotoSelected(event: HtmlInputEvent|any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement) {
    // this.productoS.crearProducto(title, description,this.file)
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //       // this.router.navigate(['/photos'])
    //     },
    //     err => console.log(err)
    //   );
    return false;
  }


}