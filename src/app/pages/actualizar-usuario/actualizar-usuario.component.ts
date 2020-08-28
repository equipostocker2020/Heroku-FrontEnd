import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styles: [],
})
export class ActualizarUsuarioComponent implements OnInit {
  token: string;
  usuario: Usuario;
  id: string;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public _fileUpLoadService: FileUploadService
  ) {
    this.usuario = this._usuarioService.usuario;
    this._usuarioService.usuario;
    this.cargarStorage();
    this.guardarStorage(
      this._usuarioService.usuario._id,
      this._usuarioService.token,
      this.usuario
    );
  }

  ngOnInit(): void { }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuarioActualizar'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('idActualizar', this._usuarioService.usuario._id);
    localStorage.setItem('token', this._usuarioService.token);
    localStorage.setItem('usuarioActualizar', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  resetStorage() {
    localStorage.setItem('id', this._usuarioService.usuario._id);
    localStorage.setItem('token', this._usuarioService.token);
    localStorage.setItem(
      'usuario',
      JSON.stringify(this._usuarioService.usuario)
    );
    this.usuario = this._usuarioService.usuario;
    this.token = this.token;
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.apellido = usuario.apellido;
    this.usuario.email = usuario.email;
    this.usuario.empresa = usuario.empresa;
    this.usuario.dni = usuario.dni;
    this.usuario.cuit = usuario.cuit;
    this.usuario.direccion = usuario.direccion;
    this._usuarioService.token = this.token;
    this._usuarioService
      .actualizarUsuario(this.usuario)
      .subscribe((resp: any) => {
        this.router.navigate(['/usuarios']);
        this.resetStorage();
      });
  }

  subirImagen() {
    this._fileUpLoadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario._id)
      .then((img) => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen del usuario actualizada', 'success');
      })
      .catch((err) => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if (!file) {
      return (this.imagenTemp = null);
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
