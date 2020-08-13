import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente.models';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  token: string;
  cliente: Cliente;

  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
     this.cargarStorage();
  }

  estaLogueado(){
    return (this.token.length > 5) ? true : false;
  }


  cargarStorage(){
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.cliente = JSON.parse(localStorage.getItem('cliente'));
    } else {
      this.token = '';
      this.cliente = null;
    }
  }


guardarStorage( id: string, token: string, cliente: Cliente ) {

  localStorage.setItem('id', id );
  localStorage.setItem('token', token );
  localStorage.setItem('cliente', JSON.stringify(cliente) );

  this.token = token;
  this.cliente = cliente;
  console.log(this.cliente);
}

cargarCliente(){
    const url = URL_SERVICIOS + '/cliente';

    return this.http.get (url);
  }

crearCliente( cliente: Cliente ) {
  let url = URL_SERVICIOS + '/cliente';
  url += '?token=' + this.token;

  return this.http.post( url, cliente )
            .map( ( resp: any) => {
              Swal.fire('Cliente creado', cliente.email, 'success' );
              return resp.cliente;
            });
}

actualizarCliente(cliente: Cliente){
  let url = URL_SERVICIOS + '/cliente/' + cliente._id;
  url += '?token=' + this.token;

  return this.http.put(url, cliente)
        .map((resp: any) => {
            const clienteDB: Cliente = resp.cliente;
            this.guardarStorage( cliente._id, this.token, clienteDB);
            Swal.fire('Cliente Actualizado', cliente.nombre, 'success');
            return true;
        });
}

buscarCliente(termino: string){
  const url = URL_SERVICIOS + '/busqueda/coleccion/cliente/' + termino;

  return this.http.get(url)
        .map((resp: any) => resp.cliente);
}

borrarCliente(id: string){
  let url = URL_SERVICIOS + '/cliente/' + id;
  url += '?token=' + this.token;

  return this.http.delete(url)
        .map(resp => {
          Swal.fire('Cliente Borrado', 'El cliente fue eliminado correctamente', 'success');
          return true;
        });
}

}
