// $ npm install sqlite3 @types/sqlite3 --save
// $ npm install pouchdb --save

import { Database } from "sqlite3";

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
    conectar() {
        throw new Error("Method not implemented.");
    }
    crearEstructura() {
        throw new Error("Method not implemented.");
    }
    insertarAlumno(alumno: Alumno) {
        throw new Error("Method not implemented.");
    }
    cerrar() {
        throw new Error("Method not implemented.");
    }
}

let mainAdapter = () => {
    let adapter : BDAdapter = new SQLiteAdapter()
    adapter.conectar()
    //adapter.crearEstructura()
    adapter.insertarAlumno({
        nombre : "Pepito",
        codigo : "20141212",
        carrera : "Ingenieria de Sistemas"
    })
    adapter.cerrar()
}

mainAdapter()