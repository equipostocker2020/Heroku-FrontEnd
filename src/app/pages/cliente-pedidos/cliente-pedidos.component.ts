import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.models';
import { Pedido } from 'src/app/models/pedido.models';
import { Usuario } from 'src/app/models/usuario.models';
import { ClienteService } from 'src/app/services/cliente.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-pedidos',
  templateUrl: './cliente-pedidos.component.html',
  styleUrls: []
})
export class ClientePedidosComponent implements OnInit {

  token: string;
  cliente: Cliente;
  id: string;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  usuario: Usuario;
  totalRegistros = 0;
  cargando = true;
  pedidos :Pedido [] = [];


  constructor(
    public _clienteService: ClienteService,
    public _usuarioService: UsuarioService,
    public _pedidoService: PedidoService,
    public router: Router,
    public _fileUpLoadService: FileUploadService
  ) {
    this.cliente = this._clienteService.cliente;
    console.log(this.cliente);
    this._usuarioService.usuario;
    this.cargarStorage();
    this.guardarStorage(this._usuarioService.usuario._id, this._usuarioService.token, this.cliente);
  }

  ngOnInit(): void {
    this._pedidoService.cargarPedidoCienteID(this.cliente)
        .subscribe((resp : any ) => {
          this.pedidos = resp.pedidos;
          console.log(this.pedidos);
          this.totalRegistros = resp.total;
          this.cargando = false;
    });
    }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.cliente = JSON.parse(localStorage.getItem('cliente'));
    } else {
      this.token = '';
      this.cliente = null;
    }
  }

  guardarStorage(id: string, token: string, cliente: Cliente) {
    localStorage.setItem('id', this._usuarioService.usuario._id);
    localStorage.setItem('token', this._usuarioService.token);
    localStorage.setItem('cliente', JSON.stringify(cliente));

    this.cliente = cliente;
    this.token = token;
  }

  

  guardarPedido(pedido: Pedido){
    this._pedidoService.actualizarPedido(pedido)
            .subscribe();
            console.log(pedido);
  }



  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
  cambiarEstado(pedido: Pedido){
    Swal.fire({
      title: ' Esta seguro?',
      icon: 'warning',
      text: ' Esta a punto de cancelar el pedido  N°' + pedido.numero_pedido,
      showCancelButton: true,
      confirmButtonColor: '#3085d6'
    })
    .then(cambiar => {

      if ( cambiar.value){

        this._pedidoService.actualizarPedido(pedido)
        .subscribe ((resp: any) => {
        });
      }
    });
  }


}
