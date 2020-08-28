import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

const url = URL_SERVICIOS;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'proveedores' | 'clientes' | 'productos'): string {
    if (!img) {
      return `${url}/upload/usuarios/no-image`;
    } else if (img) {
      return `${url}/upload/${tipo}/${img}`;
    } else {
      return `${url}/upload/usuarios/no-image`;
    }
  }
}
