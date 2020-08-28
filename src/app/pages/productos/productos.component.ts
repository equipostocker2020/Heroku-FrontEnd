import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.models';
import Swal from 'sweetalert2';
import { ProductoService } from '../../services/producto.service';
import { faEdit, faTrash, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ],
})
export class ProductosComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  productos: Producto[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  producto: Producto;
  token: string;

  constructor(
    public _productoService: ProductoService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this._usuarioService.usuario;
  }

  cargarProductos() {
    this.cargando = true;
    this._productoService.cargarProductos()
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.productos = resp.productos;
        this.cargando = false;
      });
  }

  borrarProducto(producto: Producto) {
    Swal.fire({
      title: ' Esta seguro?',
      text: ' Esta a punto de borrar a ' + producto.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6'
    })
      .then(borrar => {
        if (borrar.value) {
          this._productoService.borrarProducto(producto._id)
            .subscribe(borrado => {
              this.cargarProductos();
            });
        }
      });
  }

  guardarProducto(producto: Producto) {
    this._productoService.actualizarProducto(producto)
      .subscribe();
  }

  buscarProducto(termino: string) {
    if (termino.length <= 0) {
      this.cargarProductos();
      return;
    }
    this.cargando = true;
    this._productoService.buscarProductos(termino)
      .subscribe((productos: Producto[]) => {
        this.productos = productos;
        this.cargando = false;
      });
  }

  guardarStorage(token: string, producto: Producto) {
    localStorage.setItem('token', token);
    localStorage.setItem('producto', JSON.stringify(producto));
    this.producto = producto;
    this.token = token;
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

}
