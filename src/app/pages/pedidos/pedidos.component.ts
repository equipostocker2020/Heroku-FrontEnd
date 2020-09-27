import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/pedido.models';
import Swal from 'sweetalert2';
import { faEdit, faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
import { Producto } from 'src/app/models/producto.models';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: []
})
export class PedidosComponent implements OnInit {

  
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  pedido: Pedido;
  pedidos: Pedido[] = [];
  productos: Producto[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  producto: Producto;
  token: string;
  
  constructor(
    public _pedidoService : PedidoService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarPedido();
    this._usuarioService.usuario;
  }

  cargarPedido() {

    this.cargando = true;

    this._pedidoService.cargarPedido()
              .subscribe( (resp: any) => {
                this.totalRegistros = resp.total;
                this.pedidos = resp.pedidos;
                console.log(resp.pedidos)
                this.cargando = false;
              });

  }

  borrarPedido (pedido: Pedido) {
    console.log(pedido);

    Swal.fire({
      title: ' Esta seguro?',
      icon: 'warning',
      text: ' Esta a punto de borrar el pedido  N°' + pedido.numero_pedido,
      showCancelButton: true,
      confirmButtonColor: '#3085d6'
    })
    .then(borrar => {

      if ( borrar.value){

        this._pedidoService.borrarPedido(pedido._id)
                .subscribe(borrado  => {
                  this.cargarPedido();
                });
      }
    });

  }

  guardarPedido(pedido: Pedido){
    this._pedidoService.actualizarPedido(pedido)
            .subscribe();
            console.log(pedido);
  }

  buscarPedido(termino:string){

    if (termino.length <= 0){
      this.cargarPedido();
      return;
    }
    this.cargando = true;
    this._pedidoService.buscarPedido(termino)
            .subscribe((pedidos: Pedido []) => {
              this.pedidos = pedidos;
              this.cargando = false;
            });
  }

  guardarStorage(token: string, pedido: Pedido) {
    localStorage.setItem('token', token );
    localStorage.setItem('pedido', JSON.stringify(pedido) );

    this.pedido = pedido;
    this.token = token;
    console.log(this.pedido);

  }
  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
  cambiarEstado(pedido: Pedido, value : string){
    
    if (value == 'cancelado'){
  
      Swal.fire({
        title: ' Esta seguro?',
        text: ' Esta a punto de cancelar el pedido  N°' + pedido.numero_pedido,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6'
      })
      .then(cambiar => {
        if ( cambiar.value){
          this._pedidoService.actualizarPedido(pedido)
          .subscribe ((resp: any) => {
            this.cargarPedido();
          });
        }
      });
      this.cargarPedido();
    }else{
      this._pedidoService.actualizarPedido(pedido)
      .subscribe ((resp: any) => {
      });
    }
    
  }
}
  

