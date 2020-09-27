import { Proveedor } from './proveedor.models';
import { URL_SERVICIOS } from '../config/config';
import { Usuario } from './usuario.models';

const url = URL_SERVICIOS;

export class Producto {

    constructor(
        public nombre?: string,
        public descripcion?: string,
        public stock?: number,
        public precio?: string,
        public proveedor?: Proveedor,
        public usuario?: Usuario,
        public img?: string,
        public _id?: string,
        public estado?: string,
        // tslint:disable-next-line: variable-name
    ) { }

    get imagenUrls() {
        if (!this.img) {
            return `${url}/upload/usuarios/no-image`;
        } else if (this.img.includes('https')) {
            return this.img;
        } else if (this.img) {
            return `${url}/upload/usuarios/${this.img}`;
        } else {
            return `${url}/upload/usuarios/no-image`;
        }
    }

}
