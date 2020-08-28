import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.models';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor.models';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styles: [
  ]
})
export class ActualizarProductoComponent implements OnInit {

  token: string;
  producto: Producto;
  id: string;
  proveedores: Proveedor[] = [];
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    public _productoService: ProductoService,
    public _usuarioService: UsuarioService,
    public router: Router,
    public _proveedorService: ProveedorService,
    public _fileUpLoadService: FileUploadService
  ) {
    this.producto = this._productoService.producto;
    this._usuarioService.usuario;
    this.cargarStorage();
    this.guardarStorage(this._usuarioService.usuario._id, this._usuarioService.token, this.producto);
  }

  ngOnInit(): void {
    this._proveedorService.cargarProveedores()
      .subscribe((resp: any) => {
        this.proveedores = resp.proveedor;
      });
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.producto = JSON.parse(localStorage.getItem('producto'));
    } else {
      this.token = '';
      this.producto = null;
    }
  }

  guardarStorage(id: string, token: string, producto: Producto) {
    localStorage.setItem('id', this._usuarioService.usuario._id);
    localStorage.setItem('token', this._usuarioService.token);
    localStorage.setItem('producto', JSON.stringify(producto));

    this.producto = producto;
    this.token = token;
  }

  guardar(producto: Producto) {
    this.producto.nombre = producto.nombre;
    this.producto.descripcion = producto.descripcion;
    this.producto.stock = producto.stock;
    this.producto.precio = producto.precio;
    this.producto.proveedor = producto.proveedor;
    this._usuarioService.token = this.token;
    this._productoService.actualizarProducto(this.producto)
      .subscribe((resp: any) => {
        this.router.navigate(['/productos']);
        console.log(resp);
      });
  }

  subirImagen() {
    this._fileUpLoadService
      .actualizarFoto(this.imagenSubir, 'productos', this.producto._id)
      .then(img => {
        this.producto.img = img;
        Swal.fire('Guardado', 'Imagen del producto actualizada', 'success');
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
    };
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}
