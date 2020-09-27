import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Router } from '@angular/router';
import { Pedido } from '../models/pedido.models';
import Swal from 'sweetalert2';
import { parse } from 'path';
import { catchError, map } from 'rxjs/operators';
import { Cliente } from '../models/cliente.models';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  token: string;
  pedido: Pedido;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
   }

   estaLogueado(){
    return (this.token.length > 5) ? true : false;
}

cargarStorage(){
  if (localStorage.getItem('token')){
    this.token = localStorage.getItem('token');
    this.pedido = JSON.parse(localStorage.getItem('pedido'));
  } else {
    this.token = '';
    this.pedido = null;
  }
}

guardarStorage( id: string, token: string, pedido: Pedido ) {

  localStorage.setItem('id', id );
  localStorage.setItem('token', token );
  localStorage.setItem('pedido', JSON.stringify(pedido) );

  this.pedido = pedido;
  this.token = token;
}

crearPedido (pedido: Pedido){
  let url = URL_SERVICIOS + '/pedido';
  url += '?token=' + this.token;

  return this.http.post (url, pedido)
    .pipe(
        map(( resp: any ) =>{
          Swal.fire('Pedido creado', pedido.numero_pedido, 'success');
          return resp.pedido;
        }),
        catchError((err: any) => {
          const errores = err.error.mensaje;
          Swal.fire('Error', errores.substring(0), 'error');
          return err.throw(err);
        }));
}

  cargarPedido(){
    const url = URL_SERVICIOS + '/pedido';

    return this.http.get (url);
  }

  cargarPedidoCienteID(cliente: Cliente){
    const url = URL_SERVICIOS + '/pedido/cliente/'+ cliente._id;

    return this.http.get (url);
  }

  cargarPedidoID(pedido: Pedido){
    const url = URL_SERVICIOS + '/pedido/'+ pedido._id;

    return this.http.get (url);
  }

  actualizarPedido(pedido: Pedido){
    let url = URL_SERVICIOS + '/pedido/' + pedido._id;
    url += '?token=' + this.token;

    return this.http.put(url, pedido)
      .pipe(
        map((resp: any) => {
          Swal.fire('Pedido actualizado', pedido.numero_pedido, 'success');
          return resp.proveedor;
        }),
        catchError((err: any) => {
          console.log(err);
          console.log(err.error.errors.message);
          const errores = err.error.errors.message;
          Swal.fire('Error al actualizar pedido', errores.substring(0), 'error');
          this.router.navigate(['/pedidos']);
          return err.throw(err);
        }));
  }

  clientePedidos(cliente: Cliente){
    let url = URL_SERVICIOS + '/pedido/' + cliente._id;
    url += '?token=' + this.token;

    return this.http.get(url)
  }

  borrarPedido(id:string){
    let url = URL_SERVICIOS + '/pedido/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
        .map(resp => {
          Swal.fire ('Pedido Borrado', 'El peddido fue eliminado correctamente', 'success')
          return true;
        });
  }

  buscarPedido(termino: string){
    const url = URL_SERVICIOS + '/busqueda/coleccion/pedido/' + termino;
    return this.http.get(url)
          .map((resp: any) => resp.pedido);
  }
}