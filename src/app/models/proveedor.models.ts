import { URL_SERVICIOS } from '../config/config';

const url = URL_SERVICIOS;

export class Proveedor {

    constructor(
        public nombre?: string,
        public direccion?: string,
        public email?: string,
        public cuit?: string,
        public telefono?: string,
        public situacion_afip?: string,
        public img?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,
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