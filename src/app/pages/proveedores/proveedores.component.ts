import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/proveedor.models';
import { ProveedorService } from '../../services/proveedor.service';
import Swal from 'sweetalert2';
import { faEdit, faTrash, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styles: [
  ],
})
export class ProveedoresComponent implements OnInit {
  proveedor: Proveedor;
  token: string;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  provedores: Proveedor[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  id: string;

  constructor(
    public _proveedorService: ProveedorService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarProveedores();
    this._usuarioService.usuario;
  }

  cargarProveedores() {
    this.cargando = true;
    this._proveedorService.cargarProveedores()
      .subscribe((resp: any) => {
        console.log(resp);
        console.log(this.token);
        this.totalRegistros = resp.total;
        this.provedores = resp.proveedor;
        this.cargando = false;
      });
  }

  crearProveedor(proveedor: Proveedor) {
    this._proveedorService.crearProveedor(proveedor)
      .subscribe((resp: any) => {
        console.log('resp ', resp);
        this.proveedor.nombre = resp.nombre;
        this.proveedor.cuit = resp.cuit;
        this.proveedor.email = resp.email;
        this.proveedor._id = resp._id;
      });
  }

  buscarProveedor(termino: string) {
    if (termino.length <= 0) {
      this.cargarProveedores();
      return;
    }
    this.cargando = true;
    this._proveedorService.buscarProveedor(termino)
      .subscribe((proveedores: Proveedor[]) => {
        this.provedores = proveedores;
        this.cargando = false;
      });

  }
  guardarStorage(id: string, token: string, proveedor: Proveedor) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('proveedor', JSON.stringify(proveedor));
    this.proveedor = proveedor;
    this.token = token;
  }

  borrarProveedor(proveedor: Proveedor) {
    Swal.fire({
      title: ' Esta seguro?',
      text: ' Esta a punto de borrar a ' + proveedor.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6'
    })
      .then(borrar => {
        console.log(borrar.value);
        if (borrar.value) {
          this._proveedorService.borrarProveedor(proveedor._id)
            .subscribe(borrado => {
              this.cargarProveedores();
            });
        }
      });
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  cambiarEstado(proveedor: Proveedor){
    this._proveedorService.actualizarProveedor(proveedor)
    .subscribe ((resp: any) => {
    });
  }

}


