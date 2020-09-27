import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto.models';
import { ClienteService } from 'src/app/services/cliente.service';
import { Pedido } from 'src/app/models/pedido.models';
import { Cliente } from 'src/app/models/cliente.models';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-cargar-pedidos',
  templateUrl: './cargar-pedidos.component.html',
  styleUrls: []
})
export class CargarPedidosComponent implements OnInit {

  forma: FormGroup;
  auxProd: Producto[] = [];
  auxCli: Cliente[] = [];
  productos: Producto[] = [];
  clientes: Cliente[] = [];
  pedido: Pedido;
  estado: String = "preparación";
  total: number;
  cantidad: number;
  precio: number;
  usuario: Usuario;

  constructor(
    public _productoService: ProductoService,
    public _pedidoService: PedidoService,
    public router: Router,
    public _clienteService: ClienteService,
    public _usuarioService: UsuarioService

  ) { }

  ngOnInit() {
    this._productoService.cargarProductos()
      .subscribe((resp: any) => {
        this.auxProd = resp.productos;
        for (var i = 0; i < this.auxProd.length; i++) {
          if (this.auxProd[i].estado == 'ACTIVO') {
            this.productos[i] = this.auxProd[i];
          }
        }
      });


    this._clienteService.cargarCliente()
      .subscribe((resp: any) => {
        this.auxCli = resp.clientes;
        for (var i = 0; i < this.auxCli.length; i++) {
          if (this.auxCli[i].estado == 'ACTIVO') {
            this.clientes[i] = this.auxCli[i];
          }
        }
      });

    this.forma = new FormGroup({
      cliente: new FormControl(null, Validators.required),
      producto: new FormControl(null, Validators.required),
      cantidad: new FormControl(null, Validators.required),
      usuario: new FormControl(null, Validators.required)
    });

    this.forma.setValue({
      cliente: '',
      producto: '',
      cantidad: '',
      usuario: this._usuarioService.usuario,
    });
  }

  registrarPedido() {
    if (this.forma.invalid) {
      return;
    }
    // creando usuario a partir de modelo y forma del register html.
    const pedido = new Pedido(
      this.forma.value.cliente,
      this.forma.value.producto,
      this.forma.value.cantidad,
      this.forma.value.usuario

    );
    this._pedidoService.crearPedido(pedido)
      .subscribe(resp => {
        console.log(resp);
        this.router.navigate(['/pedidos']);
      });
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('pedido');
  }

  muestraPrecio(id: string) {
    this._productoService.cargarProductosPorID(id).subscribe((resp: any) => {
      this.precio = resp.productos.precio;
    });
  }

  muestraTotal(cantidad: number) {
    this.total = cantidad * this.precio;
  }
}

