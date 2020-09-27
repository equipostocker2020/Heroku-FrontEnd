import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor.models';
import { Usuario } from '../../models/usuario.models';
@Component({
  selector: 'app-cargar-proveedor',
  templateUrl: './cargar-proveedor.component.html',
  styles: [
  ],
})
export class CargarProveedorComponent implements OnInit {

  forma: FormGroup;
  usuario: Usuario;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public _proveedorService: ProveedorService
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      cuit: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      situacion_afip: new FormControl(null, Validators.required),
      usuario: new FormControl(null, Validators.required)
    });

    this.forma.setValue({
      nombre: '',
      direccion: '',
      email: '',
      cuit: '',
      telefono: '',
      situacion_afip: '',
      usuario: this._usuarioService.usuario,
    });
  }
  registrarProveedor() {
    if (this.forma.invalid) {
      return;
    }
    console.log(this.forma.value.usuario);
    // creando usuario a partir de modelo y forma del register html.
    const proveedor = new Proveedor(
      this.forma.value.nombre,
      this.forma.value.direccion,
      this.forma.value.email,
      this.forma.value.cuit,
      this.forma.value.telefono,
      this.forma.value.situacion_afip,
      this.forma.value.usuario,
    );
    this._proveedorService.crearProveedor(proveedor)
      .subscribe(resp => {
        console.log(resp);
        this.router.navigate(['/proveedores']);
      });
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}
