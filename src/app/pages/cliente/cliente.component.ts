import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.models';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-clientes',
  templateUrl: './cliente.component.html'
})
export class ClientesComponent implements OnInit {
  cliente: Cliente;
  token: string;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  clientes: Cliente[] = [] ;
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  id: string;

  constructor(
    public _clienteService : ClienteService,
  ) { }

  ngOnInit(){
    this.cargarClientes();
  }

  cargarClientes(){
    this.cargando = true;

    this._clienteService.cargarCliente()
        .subscribe (( resp: any) => {
          console.log(resp);
          console.log(this.token);
          this.totalRegistros = resp.total;
          this.clientes = resp.clientes;
          this.cargando = false;
        });
    }

  guardarCliente(cliente: Cliente){
    this._clienteService.actualizarCliente(cliente)
          .subscribe();
  }

  crearCliente( cliente: Cliente){

    this._clienteService.crearCliente(cliente)
          .subscribe((resp: any) => {
            console.log('resp', resp);
            this.cliente.nombre = resp.nombre;
            this.cliente.apellido = resp.apellido;
            this.cliente.email = resp.email;
            this.cliente.direccion = resp.direccion;
            this.cliente.cuit = resp.cuit;
            this.cliente.telefono = resp.telefono;
            this.cliente.dni = resp.dni;
            this.cliente._id = resp._id;

          });

  }

  buscarCliente(termino: string){

    if (termino.length <= 0){
      this.cargarClientes();
      return;
    }
    this.cargando = true;
    this._clienteService.buscarCliente(termino)
            .subscribe((clientes: Cliente []) => {
              this.clientes = clientes;
              this.cargando = false;
            });

  }

  guardarStorage( id: string, token: string, cliente: Cliente){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('cliente', JSON.stringify(cliente));

    this.cliente = cliente;
    this.token = token;
    console.log(this.cliente);

  }

  }
