import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { CargarProveedorComponent } from './pages/cargar-proveedor/cargar-proveedor.component';
import { ActualizarProveedorComponent } from './pages/actualizar-proveedor/actualizar-proveedor.component';
import { ActualizarUsuarioComponent} from './pages/actualizar-usuario/actualizar-usuario.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CargarProductosComponent } from './pages/cargar-productos/cargar-productos.component';
import { ActualizarProductoComponent } from './pages/actualizar-producto/actualizar-producto.component';
import { ClientesComponent } from './pages/cliente/cliente.component';
import { CargarClienteComponent } from './pages/cargar-cliente/cargar-cliente.component';
import { ActualizarClienteComponent } from './pages/actualizar-cliente/actualizar-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { CargarPedidosComponent } from './pages/cargar-pedidos/cargar-pedidos.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ActualizarPedidoComponent } from './pages/actualizar-pedido/actualizar-pedido.component';
import { ClientePedidosComponent } from './pages/cliente-pedidos/cliente-pedidos.component';
import { CargarUsuariosComponent } from './pages/cargar-usuarios/cargar-usuarios.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent , data: {titulo: 'Home'}},
  { path: 'register', component: RegisterComponent, data: {titulo: 'Registrarse en StockerApp'}},
  { path: 'login', component: LoginComponent, data: {titulo: 'Login'},  },
  { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'},  },
  { path: 'usuarios', component: UsuariosComponent , data: {titulo: 'Pagina de Usuarios'}},
  { path: 'profile', component: ProfileComponent , data: {titulo: 'Ver - Modificar Perfil'}},
  { path: 'proveedores', component: ProveedoresComponent , data: {titulo: 'Pagina de Proveedores'}},
  { path: 'proveedores/cargarproveedor', component: CargarProveedorComponent , data: {titulo: 'Cargar Nuevos Proveedores'}},
  { path: 'proveedor/actualizarproveedor', component: ActualizarProveedorComponent , data: {titulo: 'Ver - Modificar Proveedor'}},
  { path: 'usuario/actualizarusuario', component: ActualizarUsuarioComponent , data: {titulo: 'Ver - Modificar Usuarios'}},
  { path: 'productos', component: ProductosComponent, data: {titulo: 'Pagina de Productos'}},
  { path: 'productos/cargarproductos', component: CargarProductosComponent, data: {titulo: 'Cargar Nuevos Productos'}},
  { path: 'producto/actualizarproducto', component: ActualizarProductoComponent, data: {titulo: 'Ver - Modificar Productos'}},
  { path: 'clientes', component: ClientesComponent , data: {titulo: 'Pagina de Clientes'}},
  { path: 'clientes/cargarcliente', component: CargarClienteComponent , data: {titulo: 'Cargar nuevos clientes'}},
  { path: 'cliente/actualizarcliente', component: ActualizarClienteComponent , data: {titulo: 'Ver - Modificar Cliente'}},
  { path: 'pedidos', component: PedidosComponent, data: {titulo: 'Pagina de Pedido'}},
  { path: 'pedidos/cargarpedido', component: CargarPedidosComponent , data: {titulo: 'Cargar nuevos pedidos'}},
  { path: 'pedido/actualizarpedido', component: ActualizarPedidoComponent , data: {titulo: 'Ver - Modificar pedidos'}},
  { path: 'cliente/clientepedido', component: ClientePedidosComponent, data: {titulo: 'Pedidos del clientes'}},
  { path: 'usuario/cargarusuario', component: CargarUsuariosComponent, data: {titulo: 'Cargar un nuevo Usuario'}},
  { path: '**', redirectTo: '/home' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
