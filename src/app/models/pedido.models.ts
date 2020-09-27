import { Cliente } from './cliente.models';
import { Producto } from './producto.models';
import { Usuario } from './usuario.models';

export class Pedido {
    constructor(
        public cliente?:Cliente,
        public producto?: Producto,
        public cantidad?: Number,
        public usuario?: Usuario,
        public estado?: string,
        public total?:Number,
        public numero_pedido?: string,
        public _id?: string,

    ){}

}
