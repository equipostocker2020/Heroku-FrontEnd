import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { Producto } from '../../models/producto.models';
import { ProductoService } from '../../services/producto.service';
import { Proveedor } from 'src/app/models/proveedor.models';
import { URL_SERVICIOS } from 'src/app/config/config';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpClient } from '@angular/common/http';
import { ProveedorService } from '../../services/proveedor.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.models';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from 'src/app/models/pedido.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  imgUrl = '';
  usuario: Usuario;
  producto: Producto;
  proveedor: Proveedor;
  productos: Producto[] = [];
  proveedores: Proveedor [] = [];
  clientes: Cliente [] = [];
  pedidos: Pedido [] = [];
  token: string;
  file: File;
  urlPrueba: string;
  imagenUsuario: '';

  constructor(
    public _usuarioService: UsuarioService,
    public _productoService: ProductoService,
    public _fileUpLoadService: FileUploadService,
    public _proveedorService: ProveedorService,
    public _clienteService: ClienteService,
    public _pedidosService : PedidoService,
    public http: HttpClient,
  ) {
    this.usuario = _usuarioService.usuario;
    this._productoService.cargarProductos().subscribe((resp: any) => {
      this.productos = resp.productos;
    });
    this._proveedorService.cargarProveedores().subscribe((resp: any) => {
      this.proveedores = resp.proveedor;
    });
    this._clienteService.cargarCliente().subscribe((resp: any ) => {
    this.clientes = resp.clientes;
    });
    this._pedidosService.cargarPedido().subscribe((resp:any) =>{
      this.pedidos = resp.pedidos;
    });
  }

  ngOnInit() {
    this._usuarioService.cargarUsuarios()
      .subscribe((resp: any) => {
        for (const index of resp.usuarios) {
          if (index._id === this.usuario._id) {
            if (resp.usuarios[0].img === this.usuario.img) {
              this.usuario.img = this.usuario.img;
            } else {
              console.log(index.img);
              this.usuario.img = index.img;
            }
            this.imgUrl = URL_SERVICIOS + '/upload/usuarios/' + this.usuario.img;
            return this.usuario.img;
          }
        }
      });
  }

  obtenerProductos(producto: Producto) {
    this._productoService.cargarProductos()
      .subscribe((resp: any) => {
        this.productos = resp.productos;
        console.log(this.productos);
        console.log(this.productos[0]);
      });
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}
