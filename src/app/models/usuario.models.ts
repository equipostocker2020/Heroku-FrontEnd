/**
 * Clase generada para obtener el mismo model que el backend
 * se mapean los campos para poder utilizarlos instanciandola las veces que la app lo requiera
 * @author: Stocker
*/
import { URL_SERVICIOS } from '../config/config';
const url = URL_SERVICIOS;

export class Usuario {

    constructor(
        public nombre?: string,
        public apellido?: string,
        public email?: string,
        public empresa?: string,
        public password?: string,
        public dni?: string,
        public cuit?: string,
        public telefono?: string,
        public direccion?: string,
        public img?: string,
        public role?: string,
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
