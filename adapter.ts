// $ npm install sqlite3 @types/sqlite3 --save
// $ npm install pouchdb @types/pouchdb --save

import { Database } from "sqlite3";
import * as PouchDB from "pouchdb"

class AdapterFactory
{
    obtenerAdapter(tipo : string) : BDAdapter
    {
        if (tipo == "sqlite")
        {
            return new SQLiteAdapter()
        }else if (tipo == "pouchdb")
        {
            return new PouchDBAdapter()
        }else
        {
            return null
        }
    }
}

interface Alumno
{
    codigo : string
    nombre : string
    carrera : string
}

abstract class BDAdapter
{
    abstract conectar()
    abstract crearEstructura()
    abstract insertarAlumno(alumno : Alumno)
    abstract cerrar()
}

class SQLiteAdapter extends BDAdapter
{
    db : Database | null = null
    conectar()
    {
        this.db = new Database("alumnos.sqlite")
    }
    crearEstructura()
    {
        this.db.run(`CREATE TABLE alumno (codigo TEXT, nombre TEXT, carrera TEXT)`)
    }
    insertarAlumno(alumno : Alumno)
    {
        this.db.run(`INSERT INTO alumno VALUES 
                        ('${alumno.codigo}', '${alumno.nombre}', '${alumno.carrera}')`)
    }
    cerrar()
    {
        this.db.close()
        this.db = null
    }

}

class PouchDBAdapter extends BDAdapter
{
    db : PouchDB.Database | null = null
    conectar() {
        this.db = new PouchDB("./alumnos.db")
    }

    crearEstructura() {}

    insertarAlumno(alumno: Alumno) {
        let doc = {
            codigo : alumno.codigo,
            nombre : alumno.nombre,
            carrera : alumno.carrera
        }
        this.db.put(doc)
    }
    cerrar() {
        this.db.close()
    }
}

let mainAdapter = () => {
    let tipo = process.argv[2]

    let factory : AdapterFactory = new AdapterFactory()
    let adapter : BDAdapter = factory.obtenerAdapter(tipo)

    adapter.conectar()
    adapter.crearEstructura()
    adapter.insertarAlumno({
        nombre : "Pepito",
        codigo : "20141212",
        carrera : "Ingenieria de Sistemas"
    }) 
    adapter.cerrar()
}

mainAdapter()