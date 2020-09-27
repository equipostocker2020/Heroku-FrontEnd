import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor.models';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';
import { Usuario } from 'src/app/models/usuario.models';


@Component({
  selector: 'app-actualizar-proveedor',
  templateUrl: './actualizar-proveedor.component.html',
  styles: [
  ],
})
export class ActualizarProveedorComponent implements OnInit {
  token: string;
  proveedor: Proveedor;
  id: string;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  usuario: Usuario;

  constructor(
    public _proveedorService: ProveedorService,
    public _usuarioService: UsuarioService,
    public router: Router,
    public _fileUpLoadService: FileUploadService
  ) {
    this.proveedor = this._proveedorService.proveedor;
    this._usuarioService.usuario;
    this.cargarStorage();
    this.guardarStorage(this._usuarioService.usuario._id, this._usuarioService.token, this.proveedor);
  }

  ngOnInit(): void { }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.proveedor = JSON.parse(localStorage.getItem('proveedor'));
    } else {
      this.token = '';
      this.proveedor = null;
    }
  }

  guardarStorage(id: string, token: string, proveedor: Proveedor) {
    localStorage.setItem('id', this._usuarioService.usuario._id);
    localStorage.setItem('token', this._usuarioService.token);
    localStorage.setItem('proveedor', JSON.stringify(proveedor));
    this.proveedor = proveedor;
    this.token = token;
  }

  guardar(proveedor: Proveedor) {
    this.proveedor.nombre = proveedor.nombre;
    this.proveedor.direccion = proveedor.direccion;
    this.proveedor.cuit = proveedor.cuit;
    this.proveedor.email = proveedor.email;
    this.proveedor.telefono = proveedor.telefono;
    this.proveedor.situacion_afip = proveedor.situacion_afip;
    this.proveedor.usuario = this._usuarioService.usuario;
    this._usuarioService.token = this.token;
    this._proveedorService.actualizarProveedor(this.proveedor)
      .subscribe((resp: any) => {
        this.router.navigate(['/proveedores']);
      });
  }

  subirImagen() {
    this._fileUpLoadService
      .actualizarFoto(this.imagenSubir, 'proveedores', this.proveedor._id)
      .then(img => {
        this.proveedor.img = img;
        Swal.fire('Guardado', 'Imagen del proveedor actualizada', 'success');
      }).catch(err => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if (!file) {
      return this.imagenTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

}
