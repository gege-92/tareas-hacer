import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, leerInput, pausa, listadoTareasBorrar, confirmarBorrar, mostrarListadoChecklist } from './helpers/inquirer.js';

import { Tareas } from './models/tareas.js';



console.clear();


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        //Cargar tareas si existen para poder listar con la opcion 2
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //opt = await mostrarMenu(); ---> mensajes.js
        //if (opt !== '0') await pausa(); --> mensajes.js
        opt = await inquirerMenu();

        switch (opt) {

            //Crear tarea
            case '1':
                //tareas.crearTarea();
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;

            //Listar tareas
            case '2':
                tareas.listadoCompleto();
                //console.log(tareas.listadoArr);
                break;

            //Listar tareas completadas
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;

            //Listar tareas pendientes
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
                
            //Listar tareas pendientes
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletada(ids);
                //console.log(ids);
                break;

            //Borrar tareas
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if( id !== '0'){
                    const estado = await confirmarBorrar(); // devuelve un boolean
                    if( estado )
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada.');
                }

            break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}

main();