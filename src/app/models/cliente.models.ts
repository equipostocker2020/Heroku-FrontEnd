import { URL_SERVICIOS } from '../config/config';

const url = URL_SERVICIOS;
export class Cliente {

    constructor(
        public nombre?: string,
        public apellido?: string,
        public email?: string,
        public direccion?: string,
        public cuit?: string,
        public telefono?: string,
        public dni?: string,
        public img?: string,
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
