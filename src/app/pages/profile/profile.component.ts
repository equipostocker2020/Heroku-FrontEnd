import { Component, OnInit, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public _fileUpLoadService: FileUploadService
  ) {
    this.usuario = this._usuarioService.usuario;
    console.log(this.usuario);
  }
  ngOnInit(): void { }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.apellido = usuario.apellido;
    this.usuario.email = usuario.email;
    this.usuario.empresa = usuario.empresa;
    this.usuario.telefono = usuario.telefono;
    this.usuario.direccion = usuario.direccion;
    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe((resp: any) => { });
    this.router.navigate(['/dashboard']);
  }

  subirImagen() {
    this._fileUpLoadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario._id)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch(err => {
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
    }
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}
