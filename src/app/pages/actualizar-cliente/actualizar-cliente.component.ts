import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.models';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';
import { Usuario } from 'src/app/models/usuario.models';
@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styles: [
  ]
})
export class ActualizarClienteComponent implements OnInit {

  token: string;
  cliente: Cliente;
  id: string;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  usuario: Usuario;

  constructor(
    public _clienteService: ClienteService,
    public _usuarioService: UsuarioService,
    public router: Router,
    public _fileUpLoadService: FileUploadService
  ) {
    this.cliente = this._clienteService.cliente;
    console.log(this.cliente);
    this._usuarioService.usuario;
    this.cargarStorage();
    this.guardarStorage(this._usuarioService.usuario._id, this._usuarioService.token, this.cliente);
  }

  ngOnInit(): void { }

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



  guardar(cliente: Cliente) {
    this.cliente.nombre = cliente.nombre;
    this.cliente.apellido = cliente.apellido;
    this.cliente.email = cliente.email;
    this.cliente.direccion = cliente.direccion;
    this.cliente.cuit = cliente.cuit;
    this.cliente.telefono = cliente.telefono;
    this.cliente.dni = cliente.dni;
    this.cliente.usuario = this._usuarioService.usuario;
    this._usuarioService.token = this.token;
    console.log(cliente);

    this._clienteService.actualizarCliente(this.cliente)
      .subscribe((resp: any) => {
        this.router.navigate(['/clientes']);
      });

  }
  subirImagen() {
    this._fileUpLoadService
      .actualizarFoto(this.imagenSubir, 'clientes', this.cliente._id)
      .then(img => {
        this.cliente.img = img;
        Swal.fire('Guardado', 'Imagen del cliente actualizada', 'success');
      }).catch(err => {
        console.log(err);
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
