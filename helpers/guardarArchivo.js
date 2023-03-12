import fs from 'fs';

const dataPath = './db/data.json';

const guardarDB = (data) => {

    fs.writeFileSync(dataPath, JSON.stringify(data));

}


const leerDB = () => {

    // verifico que exista el archivo que quiero leer
    if (!fs.existsSync(dataPath))
        return 'No existe el file';

    const info = fs.readFileSync(dataPath, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    return data;
}

export { guardarDB, leerDB };