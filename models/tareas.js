/**
 *  _listado:
 * 
 *   { 'uuid-13412-412342-2: { id:12, desc:'asda', completadoEn } }
 * 
 */

import { Tarea } from './tarea.js';

class Tareas {

    _listado = {};

    constructor() {

        this._listado = {};
    }

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach((tarea, index) => {

            index = `${1 + index}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ?
                'Completada'.green :
                'Pendiente'.red;

            console.log(`${index} ${ desc } :: ${estado}`);

        });
    }


    listarPendientesCompletadas(completada = true) {

        console.log();
        let cont = 0;
        this.listadoArr.forEach((tarea) => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ?
                'Completada'.green :
                'Pendiente'.red;

            if (completada) {
                if (completadoEn) {
                    cont += 1;
                    console.log(`${(cont + '.').green} ${ desc } :: ${completadoEn.green}`);
                }
            } else {
                if (!completadoEn) {
                    cont += 1;
                    console.log(`${(cont + '.').green} ${ desc } :: ${estado}`);
                }

            }

        });

    }

    borrarTarea(id = '') {

        //verifico que exista la tarea que quiero borrar
        if (this._listado[id])
            delete this._listado[id];

    }


    toggleCompletada( ids = [] ){

        ids.forEach( id => {

            const tarea = this._listado[id];

            if( !tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach( tarea => {

            if( !ids.includes(tarea.id)){
                const tareaa = this._listado[tarea.id];
                tareaa.completadoEn = null;
            }
        })

    }
}

export { Tareas };