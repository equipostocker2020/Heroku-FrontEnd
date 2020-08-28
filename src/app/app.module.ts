import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { CargarProveedorComponent } from './pages/cargar-proveedor/cargar-proveedor.component';
import { ActualizarProveedorComponent } from './pages/actualizar-proveedor/actualizar-proveedor.component';
import { ActualizarUsuarioComponent } from './pages/actualizar-usuario/actualizar-usuario.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CargarProductosComponent } from './pages/cargar-productos/cargar-productos.component';
import { ActualizarProductoComponent } from './pages/actualizar-producto/actualizar-producto.component';
import { ClientesComponent } from './pages/cliente/cliente.component';
import { CargarClienteComponent } from './pages/cargar-cliente/cargar-cliente.component';
import { ActualizarClienteComponent } from './pages/actualizar-cliente/actualizar-cliente.component';
import { PipesModule } from './components/pipes/pipes.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    UsuariosComponent,
    ProveedoresComponent,
    ProfileComponent,
    CargarProveedorComponent,
    ActualizarProveedorComponent,
    ActualizarUsuarioComponent,
    ProductosComponent,
    CargarProductosComponent,
    ActualizarProductoComponent,
    ClientesComponent,
    CargarClienteComponent,
    ActualizarClienteComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
