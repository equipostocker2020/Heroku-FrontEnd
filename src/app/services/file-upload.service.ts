import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from './usuario.service';

const url = URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  token: string;

  constructor(public _usuarioService: UsuarioService) {
    this.cargarStorage();
    this._usuarioService.usuario;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'proveedores' | 'productos' | 'clientes',
    id: string
  ) {
    try {
      let url = `${URL_SERVICIOS}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        body: formData
      });
      const data = await resp.json();
      console.log(data);
      if (data.ok) {
        return data.nombreArchivo;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
