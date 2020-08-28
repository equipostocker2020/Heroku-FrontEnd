import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.models';

@Component({
  selector: 'app-cargar-cliente',
  templateUrl: './cargar-cliente.component.html'
})
export class CargarClienteComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public _clienteService: ClienteService
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      direccion: new FormControl(null, Validators.required),
      cuit: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      dni: new FormControl(null, Validators.required),
    });

    this.forma.setValue({
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      cuit: '',
      telefono: '',
      dni: '',
    });

  }
  registrarCliente() {

    if (this.forma.invalid) {
      return;
    }
    // creando cliente a partir de modelo y forma del register html.
    const cliente = new Cliente(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.email,
      this.forma.value.direccion,
      this.forma.value.cuit,
      this.forma.value.telefono,
      this.forma.value.dni
    );
    this._clienteService.crearCliente(cliente)
      .subscribe(resp => {
        console.log(resp);
        this.router.navigate(['/clientes']);
      });
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}
