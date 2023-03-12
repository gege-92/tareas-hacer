import { v4 as uuidv4 } from 'uuid';

class Tarea {

    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {

        this.id = uuidv4(); // uuidv4() devuelve un identificador a nivel global. ver doc
        this.desc = desc;
        this.completadoEn = null;

    }
}


export { Tarea };