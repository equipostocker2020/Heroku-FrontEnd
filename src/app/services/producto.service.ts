import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Router } from '@angular/router';
import { Producto } from '../models/producto.models';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  token: string;
  producto: Producto;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
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
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('producto', JSON.stringify(producto));
    this.producto = producto;
    this.token = token;
  }

  crearProducto(producto: Producto) {
    let url = URL_SERVICIOS + '/producto';
    url += '?token=' + this.token;
    return this.http.post(url, producto)
      .map((resp: any) => {
        console.log(resp);
        Swal.fire('Producto creado', producto.nombre, 'success');
        return resp.producto;
      });
  }

  cargarProductosPorID(id: string) {
    const url = URL_SERVICIOS + '/producto/'+ id;
    return this.http.get(url);
  }

  cargarProductos() {
    const url = URL_SERVICIOS + '/producto';
    return this.http.get(url);
  }

  actualizarProducto(producto: Producto) {
    let url = URL_SERVICIOS + '/producto/' + producto._id;
    url += '?token=' + this.token;
    return this.http.put(url, producto)
      .map((resp: any) => {
        const productoDB: Producto = resp.producto;
        this.guardarStorage(productoDB._id, this.token, productoDB)
        Swal.fire('Producto Actualizado', producto.nombre, 'success')
        return true;
      });
  }

  borrarProducto(id: string) {
    let url = URL_SERVICIOS + '/producto/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .map(resp => {
        Swal.fire('Producto Borrado', 'El producto fue eliminado correctamente', 'success')
        return true;
      });
  }

  buscarProductos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/productos/' + termino;
    return this.http.get(url)
        .map((resp: any) => resp.productos);
  }
}
